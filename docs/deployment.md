# Deployment

This document explains the actual deployment process, sourced directly from `.github/workflows/deploy-pages.yml` and `.github/workflows/deploy-s3.yml`.

## Prerequisites

- Node.js 24 (matches the version pinned in both workflows)
- An AWS account with an IAM role (`GitHubActions-DecodeLabs-Deploy`) trusted for GitHub OIDC federation from this repository
- An S3 bucket (`decodelabs-cloud-deployment`) in `ap-south-1`
- A CloudFront distribution with the S3 bucket as origin (configured outside this repository — **not verified from the available project sources**)
- An EC2 instance (`i-0306fac86dc3753d3`) in `ap-south-1` with the SSM Agent running, Nginx installed, and the AWS CLI available at `/home/ubuntu/.local/bin/aws`
- GitHub Pages enabled on the repository, with the `github-pages` deployment environment configured

## Local Build

```bash
npm install
npm run build
```

This produces the deployable static site in `dist/`. Both workflows run this same build (`deploy-pages.yml` uses `npm install`; `deploy-s3.yml` uses `npm ci` for reproducible installs from `package-lock.json`).

## GitHub Pages Deployment

Handled by `deploy-pages.yml`:

1. Checkout, Node.js 24 setup, `npm install`, `npm run build`.
2. `actions/configure-pages@v5` prepares the Pages environment.
3. `actions/upload-pages-artifact@v3` uploads `./dist` as the Pages artifact.
4. A second job (`deploy`, depends on `build`) runs `actions/deploy-pages@v4` to publish it.

No AWS credentials are involved in this workflow at all — it's fully self-contained to GitHub's infrastructure.

## S3 Deployment

Handled by `deploy-s3.yml`, after build:

```bash
aws s3 sync dist/ s3://decodelabs-cloud-deployment \
  --delete \
  --region ap-south-1
```

`--delete` removes files in the bucket that no longer exist in `dist/`, keeping the bucket an exact mirror of the current build. A verification step immediately follows and lists the deployed files with `aws s3 ls --recursive`.

AWS authentication for this step uses `aws-actions/configure-aws-credentials@v4` with `role-to-assume: arn:aws:iam::<account-id>:role/GitHubActions-DecodeLabs-Deploy` — no access keys are stored in GitHub Secrets.

## CloudFront

CloudFront (`d2dm91yj238ptm.cloudfront.net`) serves the same S3 bucket as its origin. **Not verified from the repository:** the distribution's origin access configuration and whether/how cache invalidation happens after a deploy — neither workflow contains a CloudFront step (no `aws cloudfront create-invalidation` call exists anywhere in `deploy-s3.yml`). If content appears stale on CloudFront after a deploy, this is the likely reason — see [`troubleshooting.md`](troubleshooting.md).

## EC2 Deployment

Handled by the same `deploy-s3.yml` workflow, after the S3 sync succeeds:

1. `aws ssm send-command` runs an `AWS-RunShellScript` document against instance `i-0306fac86dc3753d3`. The script:
   - Prepares a clean `/tmp/decodelabs-deploy` staging directory.
   - Runs `aws s3 sync s3://decodelabs-cloud-deployment/ /tmp/decodelabs-deploy/` **on the EC2 host itself** (using the instance's own IAM role, at `/home/ubuntu/.local/bin/aws`) — this is a separate pull, not a push from GitHub Actions.
   - Verifies `index.html` exists in the staged files; exits with an error if not.
   - Copies the staged files into `/var/www/decodelabs`, sets ownership to `www-data:www-data`, and permissions to `755`.
   - Runs `sudo nginx -t` to validate the Nginx config, then `sudo systemctl reload nginx`.
   - Confirms Nginx is active with `systemctl is-active nginx`.
2. The workflow captures the SSM `COMMAND_ID`, waits on it with `aws ssm wait command-executed`, then fetches and prints the command's status/stdout/stderr with `aws ssm get-command-invocation`.

This entire path uses SSM — there is no SSH key, no open port 22 requirement for deployment, and no direct file transfer from the GitHub Actions runner to the EC2 instance (the instance pulls from S3 itself).

## Verifying a Deployment

- GitHub Pages: check the `deploy` job's `page_url` output, or visit the live URL directly.
- S3: the `Verify S3 deployment` step in `deploy-s3.yml` lists all files present in the bucket after sync.
- EC2: the `Verify EC2 deployment` step prints the SSM command's exact status, stdout, and stderr — this is the most reliable evidence of whether the on-host deployment script actually succeeded.
- CloudFront: no automated verification step exists; must be checked manually against the live URL.

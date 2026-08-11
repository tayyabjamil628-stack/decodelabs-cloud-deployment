# AWS Infrastructure

## Region

`ap-south-1`, as set explicitly in every AWS CLI call in `deploy-s3.yml` (`aws-region: ap-south-1` for credential configuration, and `--region ap-south-1` on every `aws s3` and `aws ssm` command).

> Note: the live DecodeLabs website itself displays "us-east-1" in its UI. That value comes from a hardcoded content field in the frontend (`src/data/content.ts`) used for illustrative page copy — it does not reflect the actual AWS region and is not used anywhere in the deployment pipeline.

## IAM

- **CI role:** `GitHubActions-DecodeLabs-Deploy`, assumed by GitHub Actions via OIDC (see [`ci-cd.md`](ci-cd.md)). The workflow performs `s3:sync` (put/delete/list) operations and `ssm:SendCommand` / `ssm:GetCommandInvocation`-class calls, which confirms the role has at least those permissions. The exact IAM policy document was not present in the repository, so its full permission set is **not verified from the available project sources**.
- **EC2 instance role:** referenced in the supplied architecture diagram as `EC2-AgentToolkit-Role` with an attached `DecodeLabsS3ReadOnly` policy (read-only S3 access, no write/delete). This matches the workflow's behavior — the EC2-side deployment script only ever *reads* from S3 (`aws s3 sync s3://... /tmp/...`), never writes back to it. The specific policy JSON itself is diagram-sourced, not independently confirmed from a policy document in the repo.

## S3

- **Bucket:** `decodelabs-cloud-deployment`
- **Role:** build-artifact origin. Receives the Vite `dist/` output via `aws s3 sync` from GitHub Actions, and is read directly by the EC2 instance during its own deployment step.
- **Origin relationship:** serves as the origin for the CloudFront distribution. There is no separate S3 static-website-hosting URL used by this project — S3 is not a public deployment target on its own.

## CloudFront

- **Distribution:** `d2dm91yj238ptm.cloudfront.net`
- **Purpose:** public HTTPS delivery endpoint for the S3-hosted build.
- **Relationship with S3:** S3 is the origin; CloudFront caches and serves its contents at the edge. **Not verified from the repository:** whether Origin Access Control restricts direct public S3 access, and whether/how the cache is invalidated after each deploy (no invalidation step exists in CI).

## EC2

- **Instance ID:** `i-0306fac86dc3753d3`
- **Public IP:** `13.207.40.128`
- **Purpose:** serves the application over plain HTTP as a third, independent deployment target.
- **Operating system:** Ubuntu 24.04 LTS per the supplied architecture diagram; not independently confirmed by any command in the workflow (no OS-version check is run), so this is reported as diagram-sourced.
- **Web server:** Nginx — confirmed directly, since the deployment script runs `nginx -t` and `systemctl reload nginx` and checks `systemctl is-active nginx`.
- **Deployment mechanism:** pulled, not pushed. GitHub Actions never copies files directly to the instance; it sends a shell script via SSM, and the instance downloads its own copy from S3 using its instance role.

## Systems Manager (SSM)

Used as the sole mechanism for reaching EC2 from CI. `deploy-s3.yml` calls `aws ssm send-command` with the `AWS-RunShellScript` document, then polls completion with `aws ssm wait command-executed` and reads results with `aws ssm get-command-invocation`. This requires the SSM Agent to be installed and running on the instance and the instance role to have the relevant SSM permissions — both implied by the fact that the workflow's SSM calls are expected to succeed, though the instance-side IAM policy for SSM itself is not visible in the repository.

## Nginx

Serves the deployed site from `/var/www/decodelabs` on the EC2 instance. Every deploy re-validates the config (`nginx -t`) before reloading (`systemctl reload nginx`), so a bad deploy can't silently break the running server without at least being caught by the config test.

## What Is Not Documented Here

- AWS account ID — present in the committed workflow file, intentionally not repeated in full in this document.
- Any AWS console-configured resources not touched by the workflows (e.g., the CloudFront distribution's exact settings, VPC/security group configuration for the EC2 instance).

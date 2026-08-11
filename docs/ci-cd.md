# CI/CD

Two independent GitHub Actions workflows exist in this repository. Both trigger on push to `main`; neither depends on the other.

## `deploy-pages.yml` — Deploy to GitHub Pages

| Property | Value |
|---|---|
| Trigger | `push` to `main` |
| Runner | `ubuntu-latest` |
| Node.js | 24 (`actions/setup-node@v4`) |
| Dependency install | `npm install` |
| Build | `npm run build` |
| Deployment | `actions/configure-pages@v5` + `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4` |
| AWS auth | None — this workflow never touches AWS |
| Permissions | `contents: read`, `pages: write`, `id-token: write` |
| Concurrency | Grouped as `pages`, with `cancel-in-progress: true` — an in-flight Pages deploy is cancelled if a new push arrives |

Structured as two jobs: `build` (checkout → install → build → upload artifact) and `deploy` (needs `build`; publishes via `actions/deploy-pages@v4` into the `github-pages` environment).

## `deploy-s3.yml` — Deploy DecodeLabs to S3 and EC2

| Property | Value |
|---|---|
| Trigger | `push` to `main` |
| Runner | `ubuntu-latest` |
| Node.js | 24, with `cache: npm` |
| Dependency install | `npm ci` |
| Build | `npm run build` |
| AWS authentication | `aws-actions/configure-aws-credentials@v4`, assuming `arn:aws:iam::<account-id>:role/GitHubActions-DecodeLabs-Deploy` via OIDC, region `ap-south-1` |
| S3 deployment | `aws s3 sync dist/ s3://decodelabs-cloud-deployment --delete --region ap-south-1`, followed by a listing step for verification |
| EC2 deployment | `aws ssm send-command` (document `AWS-RunShellScript`) against instance `i-0306fac86dc3753d3`, then `aws ssm wait command-executed`, then `aws ssm get-command-invocation` to print status/output |
| Verification | Explicit `Verify S3 deployment` and `Verify EC2 deployment` steps — both print real output rather than assuming success |
| Failure handling | The on-host script uses `set -e` and an explicit `index.html` existence check with `exit 1` on failure; GitHub Actions itself fails the job if any `run` step returns non-zero (the default) |
| Permissions | `id-token: write`, `contents: read` |

Eleven named steps run in this workflow, checkout through a final "Deployment complete" summary step that echoes the target names.

## Why GitHub OIDC Instead of Long-Lived Access Keys

`deploy-s3.yml` requests `id-token: write` and uses `aws-actions/configure-aws-credentials@v4` with `role-to-assume` rather than `aws-access-key-id` / `aws-secret-access-key`. This means:

- No AWS credential ever needs to be stored as a GitHub Secret.
- The credentials obtained are short-lived, scoped to the single workflow run, and tied to GitHub's OIDC token — they can't be exfiltrated and reused later the way a static access key could be.
- The IAM trust policy on `GitHubActions-DecodeLabs-Deploy` (not present in this repository) is what actually restricts *which* repository/branch is allowed to assume the role — this is the standard GitHub Actions OIDC pattern, and its use here is confirmed by the workflow's `permissions: id-token: write` block and the `role-to-assume` parameter.

## Not Verified From the Repository

- The IAM trust policy and permission policy attached to `GitHubActions-DecodeLabs-Deploy` (only the role ARN and assumed actions are visible).
- Whether branch protection or required status checks are configured on `main` in the repository settings (not part of workflow YAML).
- Any CloudFront-related CI step — none exists in either workflow.

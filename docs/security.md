# Security

This document separates what is actually implemented in this repository from recommended future work. This project is **not** claimed to be "fully secure" — it demonstrates a reasonable set of practices for a portfolio-scale deployment, with known gaps noted below.

## GitHub OIDC

`deploy-s3.yml` requests `id-token: write` and uses `aws-actions/configure-aws-credentials@v4` with `role-to-assume: arn:aws:iam::<account-id>:role/GitHubActions-DecodeLabs-Deploy` instead of static access keys.

**Flow:** GitHub Actions → OIDC token → AWS STS `AssumeRoleWithWebIdentity` → temporary credentials scoped to the IAM role's permissions and the workflow run's lifetime.

**Why this matters:** a long-lived AWS access key stored in GitHub Secrets is a standing credential — if it leaks (accidental commit, compromised runner, misconfigured log output), it remains valid until manually rotated. An OIDC-issued session credential expires automatically and is never stored anywhere, which removes an entire class of credential-leak risk.

## IAM — Implemented

- A dedicated IAM role (`GitHubActions-DecodeLabs-Deploy`) exists specifically for GitHub Actions, rather than reusing a personal or broader-scoped role.
- The workflow's actual AWS calls are limited to S3 sync operations and SSM command dispatch/polling — no IAM, EC2-termination, or other broad administrative API calls appear anywhere in the workflow.

**Not verified:** the exact IAM policy document attached to this role. It's not possible to confirm from the repository alone whether the role is scoped tightly (e.g., restricted to this one bucket and this one SSM target) or more broadly.

## EC2 IAM Role

The supplied architecture diagram documents a separate, more restrictive instance role (`EC2-AgentToolkit-Role` with `DecodeLabsS3ReadOnly`) that only allows `s3:GetObject` / `s3:ListBucket` — no write or delete. This is consistent with the deployment script's actual behavior (the instance only ever reads from S3). Using a separate, read-only role for the instance rather than sharing the CI role's write permissions is a reasonable least-privilege pattern, as documented in the diagram.

## SSM Instead of SSH

No SSH key, SSH step, or open port 22 requirement appears anywhere in either workflow. All EC2 interaction goes through AWS Systems Manager (`send-command` / `get-command-invocation`). This removes the need to manage, rotate, or protect an SSH private key for deployment, and doesn't require the instance to accept inbound SSH connections for CI to reach it.

## S3 Access Model

The bucket (`decodelabs-cloud-deployment`) is written to only by the CI role (via `aws s3 sync`) and read from by the EC2 instance role. **Not verified from the repository:** whether the bucket blocks public access entirely, or the exact bucket policy — the diagram states the bucket blocks public access and uses server-side encryption (AES256), but no bucket policy document exists in the repository to independently confirm this.

## CloudFront Origin Access

**Not verified from the repository.** No CloudFront configuration, Origin Access Control setting, or related IaC exists in this repository — CloudFront's origin-access setup was not something this audit could check against source code.

## Secrets

No AWS access keys, secret keys, session tokens, or other credentials were found committed anywhere in the repository, in either workflow file, or in the six screenshots supplied for this documentation package. `.gitignore` explicitly excludes `.env*` files (while allow-listing `.env.example`), which is the correct pattern for keeping local secrets out of version control. The only AWS-identifying values present in the repository are the account ID (inside `role-to-assume`) and the EC2 instance ID — both are identifiers, not credentials, but are still not repeated in full anywhere in this documentation package beyond what's already public in the workflow file.

## Implemented vs. Recommended

| | Implemented | Recommended |
|---|---|---|
| AWS auth in CI | GitHub OIDC, no static keys | Periodically review the IAM trust policy's repo/branch restrictions |
| EC2 access | SSM only, no SSH | Add automated post-deploy health checks |
| S3 write access | CI role only | Confirm least-privilege bucket policy (not currently visible in repo) |
| Transport security | GitHub Pages + CloudFront serve HTTPS | Add HTTPS to the EC2 endpoint (currently HTTP-only) |
| Secrets in repo | None found | N/A |

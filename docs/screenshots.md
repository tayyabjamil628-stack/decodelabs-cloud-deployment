# Screenshots

All screenshots in `docs/images/` were supplied directly and are real captures of the live project — none were generated, mocked, or recreated.

## `architecture.png`

**Referenced in:** README (Deployment Architecture), `architecture.md`, `deployment.md`

The maintainer-supplied architecture diagram covering the full pipeline: GitHub → GitHub Actions → GitHub OIDC → AWS IAM → (S3 → CloudFront) and (Systems Manager → EC2 → Nginx), plus IAM role permissions, security practices, and the four public deployment endpoints.

*Caption: End-to-end deployment architecture for GitHub Pages, S3/CloudFront, and EC2/Nginx.*

## `github-pages-live.png`

**Referenced in:** README (Screenshots), `screenshots.md`

Browser capture of `tayyabjamil628-stack.github.io/decodelabs-cloud-deployment/`, showing the DecodeLabs landing page fully rendered and served from GitHub Pages.

*Caption: The application successfully deployed and served via GitHub Pages.*

## `cloudfront-live.png`

**Referenced in:** README (Screenshots), `screenshots.md`

Browser capture of `d2dm91yj238ptm.cloudfront.net`, showing the same application served through the CloudFront distribution backed by S3.

*Caption: The application served through the CloudFront distribution, with the CloudFront domain visible in the address bar.*

## `ec2-live.png`

**Referenced in:** README (Screenshots), `screenshots.md`

Browser capture of `13.207.40.128` (note the browser's "Not secure" indicator, since the EC2 endpoint is HTTP-only), showing the application served directly from the EC2 instance via Nginx.

*Caption: The application served from the EC2 instance through Nginx, reachable at its public IP.*

## `github-actions-runs.png`

**Referenced in:** README (Screenshots), `ci-cd.md`, `troubleshooting.md`

The GitHub Actions run history for the repository, showing 17 total workflow runs across `Deploy to GitHub Pages` and `Deploy DecodeLabs to S3 and EC2`, including one failed run (commit `2cfbc41`) immediately followed by a passing run of the same workflow (commit `51e84b9`) — real evidence used directly in [`troubleshooting.md`](troubleshooting.md).

*Caption: CI/CD run history showing both deployment workflows, including a real failure-then-fix sequence.*

## Note on the In-App "Live Traffic" Dashboard

Several of the live-site screenshots show a panel labeled `decodelabs-cloud-topology.v1` with per-service latency and load figures (Nginx, EC2, S3, GitHub Actions cards). This panel is a static UI component built into the DecodeLabs site itself (`src/components/CloudVisualizer.tsx`) — it is decorative page content, not a live monitoring integration. The figures shown (e.g. `4.8ms`, `22% Load`) are hardcoded and do not reflect real-time AWS metrics. This documentation package does not cite any values from that panel as verified infrastructure data.

# Troubleshooting

Real problems below are backed by direct evidence in the repository or the supplied GitHub Actions screenshot — not invented. Where a cause could not be confirmed, this is stated explicitly rather than guessed at.

## 1. Asset Paths Breaking Across Deployment Targets

**Problem:** A Vite build's default asset paths are absolute (`/assets/...`), which works fine when an app is served from a domain root (CloudFront, EC2) but breaks when served from a subpath (`https://tayyabjamil628-stack.github.io/decodelabs-cloud-deployment/`), since GitHub Pages project sites are not served from the domain root.

**Evidence:** `vite.config.ts` sets `base: './'` (relative base path), and the GitHub Actions history (see [`screenshots.md`](screenshots.md)) shows a commit titled *"fix: make Vite assets compatible with all deployment targets"* that triggered both workflows successfully.

**Cause:** The default absolute base path is only correct for one of the four deployment targets at a time — it can't simultaneously be correct for a root-domain deployment (EC2, CloudFront) and a subpath deployment (GitHub Pages) without using a relative path.

**Solution:** Set `base: './'` in `vite.config.ts` so all generated asset URLs are relative to `index.html`'s own location, making the same build directory-portable across a domain root and a subpath.

**Lesson learned:** when a single build artifact is meant to be deployed to multiple hosting contexts (root domain vs. subpath), Vite's `base` option has to be chosen for portability, not for any one target in isolation.

## 2. AWS CLI Not on the Default PATH on the EC2 Host

**Problem:** The SSM deployment script invokes the AWS CLI with a hardcoded full path — `sudo /home/ubuntu/.local/bin/aws s3 sync ...` — rather than a bare `aws` command.

**Evidence:** This exact path is present in `deploy-s3.yml`'s SSM command parameters.

**Cause:** When a command is run via `sudo` (as SSM's `AWS-RunShellScript` document does here), the invoking user's `PATH` is not necessarily inherited, and a per-user CLI install (e.g., `pip install --user awscli` or a similar local install under `/home/ubuntu/.local/bin`) won't be found by a bare `aws` call under `sudo`. Not verified from the repository: exactly how the AWS CLI was originally installed on the instance.

**Solution:** Reference the CLI binary by its known full path in the deployment script instead of relying on `sudo`'s PATH resolution.

**Lesson learned:** scripts run via `sudo` (or in SSM documents generally, which don't share a login shell's environment) should not assume a tool installed in a user-local location will be found on PATH — use an explicit path or install the tool system-wide.

## 3. A `deploy-s3.yml` Revision Failed Before It Succeeded

**Problem:** The GitHub Actions run history shows commit `2cfbc41` ("Update deploy-s3.yml") producing a **failed** run of *Deploy DecodeLabs to S3 and EC2* (run #3), while the paired *Deploy to GitHub Pages* run from the same commit succeeded. The very next commit, `51e84b9` (also "Update deploy-s3.yml"), produced a passing run of both workflows.

**Evidence:** Directly visible in the supplied GitHub Actions screenshot ([`docs/images/github-actions-runs.png`](images/github-actions-runs.png)) — the red ✕ on run #3 and the green ✓ on run #4/#7 for the same workflow file.

**Cause:** **Not verified from the available project sources.** The specific error output for the failed run is not included in the screenshots or repository, and this document does not fabricate one. What can be confirmed is that the failure was isolated to the S3/EC2 workflow (not GitHub Pages) and was resolved by a follow-up edit to the same file.

**Solution:** Whatever the specific fix was, it shipped in commit `51e84b9`, and the subsequent run passed.

**Lesson learned:** having two independent, separately-verifiable workflows meant a failure in the AWS deployment path didn't block or get masked by the (unrelated) GitHub Pages deployment succeeding — the two pipelines' independent status made it easy to see exactly which target was actually affected.

## Not Included

Common CI/CD problems suggested by generic experience (e.g., Node.js version deprecation warnings, `npm ci` lockfile mismatches, S3 bucket permission errors, SSM `GetCommandInvocation` permission issues) are **not documented here** because no evidence of them was found in this repository, its workflows, or the supplied screenshots. Listing them would be speculation, not audit findings.

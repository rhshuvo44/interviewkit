# InterviewKit Project

## Git Workflow (Feature Branches + PRs)

Every feature, fix, or refactor goes on its OWN branch, pushed to its own branch, and merged back to `main` via a Pull Request. Do NOT commit directly to `main`.

### Steps after completing ANY task

1. Sync `main` first:
   ```bash
   git checkout main
   git pull
   ```

2. Create a feature branch (never work on `main`):
   ```bash
   git checkout -b feature/<slug>        # e.g. feature/react-qa
   # or for a fix:
   git checkout -b fix/<slug>            # e.g. fix/footer-homepage
   ```

3. Implement the change, then stage and commit:
   ```bash
   git add .
   git commit -m "feat: add new feature"   # conventional commit (feat/fix/refactor/docs/style)
   ```

4. Push the branch:
   ```bash
   git push -u origin <branch-name>
   ```

5. Open a Pull Request to `main`:
   ```bash
   gh pr create --base main --head <branch-name> --title "..." --body "..."
   ```
   NOTE: If `gh` CLI is unavailable (it failed to install on this machine), STOP after step 4 and report the manual PR command to the user instead of merging.

6. Merge the PR and clean up (only when `gh` works):
   ```bash
   gh pr merge --merge --delete-branch
   git checkout main
   git pull
   ```

Do NOT ask for permission to commit and push. Just do it automatically after finishing work, following the branch + PR flow above.

## GitHub MCP Usage

Use the `github` MCP tools for:
- Creating and managing repositories
- Opening pull requests
- Managing issues
- Listing branches and commits on remote

Use `bash` for:
- Local git operations (add, commit, push, pull, branch)
- Package management (npm, npx, node)

## Project Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- shadcn/ui
- Lucide React icons
- next-themes (dark/light mode)
- MDX for content
- Geist fonts

---
name: single-line-commit-deploy
description: Create single-line git commits, push to main, and deploy with Vercel. Use when the user asks to commit changes with a one-line message, push directly to main, deploy to Vercel, or run the full commit-push-deploy workflow.
---

# Commit, Push, Deploy

## When To Use

Use this skill only when the user explicitly asks to commit, push to `main`, deploy to Vercel, or do the combined workflow.

Do not commit, push, or deploy proactively.

## Workflow

1. Inspect the repo state:
   - Run `git status --short`
   - Run `git diff`
   - Run `git diff --staged`
   - Run `git log --oneline -5`

2. Protect the commit:
   - Do not stage secrets such as `.env`, credentials, tokens, or private keys.
   - Do not revert unrelated user changes.
   - If unrelated changes are present, stage only files relevant to the requested work.

3. Create meaningful commits:
   - Group related files into logical, reviewable commits that represent one coherent change.
   - Do not split files into separate commits just because multiple files changed.
   - Do not combine unrelated changes in the same commit.
   - If unrelated changes are present, leave them unstaged unless the user explicitly asks to include them.
   - If a task naturally has multiple independent parts, create one commit per part.
   - Stage only the files relevant to each commit.
   - Use a concise imperative message.
   - Keep the commit subject to one line.
   - Do not include a body.
   - Use a heredoc for shell safety:

```bash
git commit -m "$(cat <<'EOF'
fix notebook 2 chapter interactions
EOF
)"
```

4. Push to `main`:
   - Confirm the current branch is `main` with `git branch --show-current`.
   - If not on `main`, stop and ask before switching, merging, or pushing.
   - Never force push to `main`.
   - Push with `git push origin main`.

5. Deploy to Vercel:
   - Determine the repo name from git, not the local folder:
     - Prefer `basename "$(git remote get-url origin | sed 's/\.git$//' | sed 's#.*[:/]##')"`
     - If no `origin` exists, use `basename "$(git rev-parse --show-toplevel)"`
   - Use that git repo name when selecting, linking, naming, or creating the Vercel project.
   - Do not use the current local folder name as the Vercel project name unless it matches the git repo name.
   - Prefer the project package manager script if one exists.
   - Otherwise deploy with `vercel --prod`.
   - If Vercel asks for login, project linking, environment variables, or confirmation that requires user input, stop and report the blocker.

## Output Format

After the workflow, report:

- Commit hash(es) and one-line message(s)
- Push result
- Vercel deployment URL
- Any skipped files or blockers

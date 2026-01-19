---
description: Push changes to GitHub with mandatory type checking
---
**CRITICAL RULE**: Do NOT execute this workflow automatically after making code changes. Only execute this workflow when the user EXPLICITLY asks to "push changes", "deploy", or "sync with git".

1. **Verify Intent**: Confirm the user has explicitly requested to push changes. If they just asked for a code fix, DO NOT PUSH.
2. If the check fails, **STOP** immediately. Do NOT push. Report the errors to the user and ask for instructions to fix them.
3. If the check passes, proceed with git operations.
4. Run `git add .` (or specific files if only a subset was modified).
5. Run `git commit -m "[commit message]"` (use the user's provided message or generate a descriptive one).
6. Run `git push`.

# Working agreement for this repo

## Mandatory final review — `supervisor` agent

Before telling the user a coding task is complete (any turn where files were
created, edited, or deleted), invoke the Agent tool with
`subagent_type: "supervisor"`. Give it the user's original request and a
summary of what was done — it will independently check the diff, run
build/tests if relevant, and end with exactly one verdict line:

- `SUPERVISOR_VERDICT: APPROVE` — report completion to the user normally.
- `SUPERVISOR_VERDICT: BLOCK: <reasons>` — do not report the task as done.
  Fix the listed issues and invoke `supervisor` again. Repeat until APPROVE.
  If still blocked after 3 rounds, stop and tell the user honestly what's
  unresolved and why, instead of re-looping indefinitely.

Skip this gate only for changes with no file diff (answering a question,
read-only investigation, pure conversation).

## Mid-task help — `idea-partner` agent

When stuck on an approach, unsure between two designs, chasing a confusing
bug, or about to make a large/risky change and want a second opinion —
invoke the Agent tool with `subagent_type: "idea-partner"` *before* committing
to a direction. This is a brainstorming sounding board, not a review gate;
use it mid-task, not at the end.

Don't invoke it for straightforward, unambiguous work — only when there's a
real decision or a real blocker.

# Agent Foundry — project template

A ready-to-use starting point for building a tool or app with a **multi-vendor team
of AI agents**. Thinking and reviewing run on **Claude**; code-writing runs on
**Antigravity (agy / Gemini)**. Git is the shared workspace.

This template contains only the reusable **team layer** — agent definitions,
skills, rules, the flow command, and docs. No product code. You add that.

## Start a new project

1. **Use this template** on GitHub (or clone it) to create your project repo.
2. Open the folder in Claude Code and **reload** the session so the subagents and
   the `/build-tool` command load.
3. Fill the two blanks at the top of [CLAUDE.md](CLAUDE.md) (product + remote).
4. Run:
   ```
   /build-tool <your idea>
   ```
   …and Claude drives the whole pipeline: ideation → architecture → design → build
   (Antigravity) → review (Claude) → PR → publish, stopping at the two human gates.

## One-time machine setup (not per project)

- **Antigravity CLI** — `agy --version`, `agy models` (install + `agy install` to add to PATH, then log in).
- **GitHub CLI** — `gh auth status` (install + `gh auth login`).

## What's inside

| Path | What it is |
|---|---|
| `AGENTS.md` | Vendor-neutral rules every agent obeys |
| `CLAUDE.md` | Auto-loaded session bootstrap (team + how to operate) |
| `.claude/agents/` | Claude subagents (architect, qa-reviewer, security-engineer, ux-ui-designer, skill-curator) — auto-load, tool-scoped |
| `.claude/commands/build-tool.md` | The `/build-tool` end-to-end pipeline command |
| `.agents/` | Antigravity skills + agent files for the developer role |
| `agents/` | Human-readable role charters (source of truth for authority) |
| `docs/` | Architecture and operating guide |

## The rule that protects quality

The reviewer must be a **different vendor than the author**. The developer is
Gemini, so QA and Security stay on Claude. Never let one vendor write and review the
same code.

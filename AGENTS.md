# Strength Coach Agent Guide

Use this repo as a portable strength-programming corpus for agents and assistants.

## Canonical Sources
- `SKILL.md`
- `references/strength-coach-reference.md`
- Sport-specific files in `references/`
- `references/form-check/`
- `templates/index.md`
- `templates/<archetype>/`

## Working Rules
- Read the skill file first, then the reference files, then the templates that match the sport.
- Keep the main lift or event pattern central.
- Use templates as archetypes, not copy-paste blocks.
- Match volume and intensity to the athlete's recovery and timeline.
- For complete multi-day programs, follow `program-doc/README.md` and create the HTML program document and matching Excel log from one JSON plan. Give a concise Markdown summary and links. Brief advice stays in Markdown.
- Use `sets x reps @ RPE` for loading guidance.
- Default carries to feet.

## Output Shape
- Direct recommendation first.
- 1 to 2 alternates if equipment or tolerance is limited.
- Short rationale for why it fits.
- Next question if important context is missing.
- Disclaimer block before any full template or prep plan.
- Assumptions review at the end of any completed template or prep plan.
- Interactive HTML with the full mesocycle and session detail, plus a matching Excel training log, for completed multi-day programs.

## Public Site
- `site/` is the public program library.
- It is useful for humans, but not the source of truth.

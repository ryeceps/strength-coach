# Strength Coach Skill

This repo powers the `strength-coach` skill. It turns a lifting goal, event timeline, and equipment setup into a concrete program or coaching recommendation.

## Core behavior

- Use the skill files, references, and templates as the source of truth.
- Default to feet for carries and other distance work unless the user explicitly asks for meters.
- Use `sets x reps @ RPE` when giving loading guidance.
- Treat `RPE 7-9` as the normal working range for most productive sets.
- Use near-`RPE 10` sparingly for powerlifting, strongman, and weightlifting when specificity, readiness, or competition practice call for it.
- Use the closest event-specific implement or a close simulation when the exact equipment is missing.
- For a four-day strongman follow-on with a faster RPE ramp and more variety, use the [RPE pyramid cycle](./templates/strongman/strongman-rpe-pyramid-four-day.md): log, deadlift, and back-squat top sets of six, five, and three reps; RPE-led backoffs; raw bench after log; and a home-gym upper-back day with seated low-cable rows, close-grip Slingshot bench, and shrugs instead of carries. The matching workbook is in [`assets/generated-programs/`](./assets/generated-programs/12_week_strongman_4_day_rpe_pyramid_program.xlsx).

## How it works

1. Identify the sport, goal, timeline, constraints, and available equipment.
2. Choose the main movement pattern first, then select the specific lift or event variation.
3. Use the templates as archetypes and blend them to the athlete's recovery and schedule.
4. Use RPE to adjust load when exact percentages are not available.
5. Keep specificity high as the target date approaches and cut unnecessary fatigue first.

## Website

The repo now includes a GitHub Pages front-end in [`site/`](./site/) with a matching deployment workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml).

The site is a plain program library. It links to three complete interactive plans and their Excel logs. Each plan shows every week and session, exercise notes, muscle work, and schedule checks. The original strongman workbooks remain available.

## Interactive program documents

For a complete multi-day program, the skill now authors one structured JSON plan and produces both an interactive HTML document and an Excel workbook. The HTML contains the full mesocycle, exercise explanations, front/back muscle map, cautious recovery and coverage review, and previewable adjustments. The workbook remains an editable training log. See [program-doc/README.md](./program-doc/README.md) for the schema, renderer commands, and interpretation limits.

The gallery hosts the two existing 12-week strongman workbooks as interactive plans plus a four-week bodybuilding example. The original strongman Excel files remain available.

For a local preview, serve the `site/` folder with any static server.

## Agent Entry Points

- [`SKILL.md`](./SKILL.md) is the main skill contract.
- [`CLAUDE.md`](./CLAUDE.md) is the Claude-oriented handoff file.
- [`AGENTS.md`](./AGENTS.md) is the generic agent handoff file.

## Knowledge Corpus

The repo keeps sport-specific corpora in the template folders:

- [`templates/general-strength/programs.md`](./templates/general-strength/programs.md)
- [`templates/general-strength/coaches.md`](./templates/general-strength/coaches.md)
- [`templates/general-strength/methodologies.md`](./templates/general-strength/methodologies.md)
- [`templates/bodybuilding/programs.md`](./templates/bodybuilding/programs.md)
- [`templates/bodybuilding/coaches.md`](./templates/bodybuilding/coaches.md)
- [`templates/bodybuilding/methodologies.md`](./templates/bodybuilding/methodologies.md)
- [`templates/strongman/programs.md`](./templates/strongman/programs.md)
- [`templates/strongman/coaches.md`](./templates/strongman/coaches.md)
- [`templates/strongman/methodologies.md`](./templates/strongman/methodologies.md)
- [`templates/powerlifting/programs.md`](./templates/powerlifting/programs.md)
- [`templates/powerlifting/coaches.md`](./templates/powerlifting/coaches.md)
- [`templates/powerlifting/methodologies.md`](./templates/powerlifting/methodologies.md)
- [`templates/weightlifting/programs.md`](./templates/weightlifting/programs.md)
- [`templates/weightlifting/coaches.md`](./templates/weightlifting/coaches.md)
- [`templates/weightlifting/methodologies.md`](./templates/weightlifting/methodologies.md)

These are reference points for how good programs, coaches, and methodologies are structured. They are not copied wholesale into the skill.

## Example request

> For powerlifting, strongman, and weightlifting, getting close to RPE 10 is an important training tool. Use it sparingly.

## Example output

```markdown
Use near-`RPE 10` work sparingly, but do not remove it entirely.

- Powerlifting: occasional top singles or heavy doubles can sharpen meet-specific readiness.
- Strongman: rare near-max event exposures can help rehearse contest demand and confidence.
- Weightlifting: small doses of very heavy singles can reinforce technical exposure if the bar speed and positions stay clean.

Keep most working sets in the `RPE 7-9` range, and reserve `RPE 10` for planned tests, peaking exposures, or contest-specific practice.
```

## Why this matters

The skill gives specific training advice:

- precise units by default
- realistic intensity targets
- sport-specific use of heavy work
- clear examples that show how the guidance should look in practice

## Maintenance

If `SKILL.md`, `references/`, or `templates/` change in a way that affects user-facing behavior, update this README in the same change so the summary stays accurate.


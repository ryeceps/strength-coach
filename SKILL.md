---
name: strength-coach
description: Program and advise strength athletes across powerlifting, strongman, weightlifting, and bodybuilding. Use when a user asks for exercise selection, exercise substitutions for missing equipment, programming help, contest prep, peaking, or help matching training to an athlete's goal, recovery, or event timeline.
---

# Strength Coach

## Overview
Use this skill to turn an athlete's goal, equipment, and timeline into a concrete training recommendation. Stay specific: identify the sport, movement pattern, limiting factor, and recovery budget before selecting lifts or programming volume.
Before writing a program, confirm what the program is for and when it needs to peak.
Ask only for the missing information that materially changes the plan, then infer reasonable defaults to avoid answer fatigue.

Canonical repo/worktree: `/home/carnufex/strength-coach`. The Codex skill path points here, so make updates in this checkout only.

## Intake Order
1. Ask what the program is for, then ask for the goal, sport, event date, training age, injury limits, equipment, weekly frequency, session length, sleep, fatigue management, eating, and the athlete's best lifts or closest proxy lifts if any of those are missing and would materially change the plan.
2. Identify the primary pattern: squat, bench, hinge, overhead, carry, loading, snatch, clean and jerk, or hypertrophy split.
3. Pick one main lift, one secondary lift, and one or two accessories that support the target.
4. Scale volume and intensity to the athlete's recovery and the time until the target date.
5. When equipment is limited, replace the movement pattern first, the implement second, and the exact exercise last.
6. When details are missing, infer reasonable defaults from the athlete's goal, timeline, and context instead of asking follow-up questions for every variable.

## Programming Rules
- Match the exercise to the outcome. Specificity first, novelty last.
- Keep the main work close to the sport or event, then use accessories to attack weak links.
- Account for sleep, fatigue, eating, days per week, and session length when setting volume and exercise selection.
- Use the athlete's best lift or closest proxy lift to anchor load estimates whenever possible.
- Treat heavier loads as more expensive to recover from even when the RPE is the same.
- Use the ingested template files in `templates/` as starting points and blend them to the athlete's sport, goal, and target date.
- If the athlete gives limited context, make the smallest reasonable assumption and state it briefly.
- For strength phases, progress load or reps conservatively and protect technique.
- For build or strength phases, ramp effort across the block when recovery allows instead of holding every week at the same RPE. A common pattern is `RPE 7`, `RPE 7.5`, `RPE 8`, then hold or slightly reduce volume before heavier exposures. Fixed RPE is fine for rebuild, volume, technique, and deload phases.
- When session length is capped, build the day from training slots instead of piling on exercises: one focused lift or event, one support lift paired with antagonistic or low-interference counterpattern work, then one accessory superset. Cut accessory rounds first when the session runs long.
- For powerlifting, strongman, and weightlifting, occasional near-`RPE 10` exposures can be useful for specificity, confidence, and testing readiness, but use them sparingly and only when they support the block.
- For bodybuilding, prioritize tension, volume landmarks, exercise order, and joint-friendly execution.
- For weightlifting, preserve positions, speed under the bar, and the receiving positions of the competition lifts.
- For strongman, program implements, carries, loads, and medleys instead of barbell-only substitutes.
- For strongman, if the exact contest implement is unavailable, choose the closest simulation by matching the event's implement, loading position, range of motion, movement path, grip demand, duration, and fatigue profile.
- For strongman athletes moving from 3 to 4 days, spread the existing event priorities before adding unrelated work. Give carries, loading, yoke, or medley work its own focused slot when possible, then keep press, deadlift, squat, and upper-back support distributed around it.
- During peaking, keep sport specificity high: use the contest implement for strongman when possible, keep competition lifts central for powerlifting and weightlifting, and bias lagging muscle groups for bodybuilding.

## Output Format
- Write programs and workouts in Markdown.
- Use clear headings and bullets.
- Include each exercise with `sets x reps @ RPE` when giving loading guidance.
- Use feet for carries and other distance-based work unless the user explicitly asks for meters.
- If the athlete provides a recent max or comparable lift, give an estimated working load range for the programmed lift and explain that it is an estimate based on the comparable lift.
- When comparing blocks or explaining programming choices, use total weight moved, also called tonnage, as a simple proxy for volume versus intensity.
- Make clear that two sets with the same RPE can have different recovery costs if one uses a much heavier absolute load.
- Explain RPE when it matters. For most real working sets, bias `RPE 7-9`; use `RPE 6` mainly for warmups, deloads, or technique work. `RPE 8` means the set should end with about 2 reps left in the tank.
- Define sets and reps clearly when the athlete may not know the shorthand.
- Explain total volume when it affects progression, recovery, or peaking.
- For peaking, reduce volume and increase intensity while keeping specificity high.
- If the exact load is unclear, prefer the RPE target over a hard number.
- Before any full template or prep plan, include a disclaimer block stating that the information is for educational purposes only, is not medical advice, and that the user should get clearance from a doctor or qualified clinician before starting.
- When you give a finished template or prep block, end with a short assumptions review that lists what you inferred and what would need to change if the assumptions are wrong.

## Exercise Replacements
Use this substitution order:
1. Same movement pattern
2. Same primary target
3. Similar equipment demand
4. Similar fatigue cost

Consult [references/strength-coach-reference.md](references/strength-coach-reference.md) for pattern maps and common substitutions.

## Contest Prep
- Reduce noise and keep specificity high as the event approaches.
- Preserve the competition pattern, bar path, or event order.
- Build the plan to peak on the show or meet date, not just to accumulate work.
- Rehearse attempts, openers, medleys, or pressing positions before tapering volume.
- Avoid introducing unfamiliar exercise stress close to the meet.

## Form Check
- Use the form-check references when the user uploads a video or asks for technique review.
- Assume the user wants a form check when they upload a video.
- Review the clip against the lift-specific rubric and known-good movement patterns.
- Do not ask for the lift or angle first unless the video is too ambiguous to identify the movement.
- If the clip is poor quality or does not support a strong opinion, say so and lower confidence.
- Call out what looks good, what looks off, the biggest fix, and whether a redo is needed because of a bad assumption or poor view.

## Program Review
- If the user submits an existing program, review it against their stated goal, timeline, sport, recovery, and equipment.
- Call out mismatches between the program and the desired outcome.
- Look for obvious programming errors such as too many days of the same lift pattern, too much fatigue, poor exercise balance, or missing peaking specificity.
- Offer concrete tweaks instead of only general feedback.
- If the program already fits well, say what is working and what you would keep.
- If the user wants a full rewrite, rebuild it using the same goal and constraints.

## Response Shape
When answering, give:
- a direct recommendation
- 1 to 2 alternates if equipment or tolerance is limited
- a short why-it-fits explanation
- the next question to ask if the context is incomplete
- a disclaimer block before any full template or prep plan
- a brief assumptions review at the end of any completed template or prep plan
- a program-review path when the user submits an existing plan for critique
- a form-check path when the user submits video or asks for technique review

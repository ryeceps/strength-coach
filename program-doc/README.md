# Strength Coach program documents

The skill writes one JSON plan, then renders two outputs from it: a self-contained interactive HTML document and an Excel training log. The HTML is the primary way to explore a completed multi-day program; the workbook is for recording actual work. Short advice does not need files.

## Authoring format

Use `schemaVersion: 1`. See `examples/bodybuilding-priority-block.json` for a complete example and `examples/strongman-rpe-pyramid.json` for a 12-week plan.

```json
{
  "schemaVersion": 1,
  "id": "my-program",
  "title": "Program title",
  "sport": "Strongman",
  "objective": "Strength build",
  "summary": "Who this plan is for and what it does.",
  "rationale": "Why the weekly and mesocycle structure fits.",
  "goals": ["A measurable goal"],
  "priorityMuscles": ["hamstrings"],
  "maxExercisesPerDay": 5,
  "athleteContext": { "experience": "Intermediate", "sleep": "Not supplied", "readiness": "Not supplied", "constraints": "No reported limitations" },
  "assumptions": ["Four days are available."],
  "sources": [{ "label": "Source template", "url": "https://example.com/source" }],
  "mesocycles": [{
    "title": "Build", "focus": "Progressive practice", "rationale": "Reason for the phase.",
    "weeks": [{
      "number": 1, "phase": "Base", "focus": "Learn the work", "note": "How to adjust this week.",
      "days": [{
        "weekday": 0, "title": "Lower A", "focus": "Squat first.",
        "exercises": [{
          "name": "Back squat", "prescription": "3 x 6 @ RPE 7", "sets": 3, "rpe": 7,
          "primaryMuscles": ["quads", "glutes"], "secondaryMuscles": ["adductors", "spinal-erectors"],
          "reason": "Keeps squat skill central.", "cue": "Brace before each rep.",
          "alternatives": ["Safety-bar squat"]
        }]
      }]
    }]
  }]
}
```

`weekday` is 0 for Monday through 6 for Sunday. `sets` is the planned working-set count used in coverage analysis; exclude warm-up ramps. `prescription` is the complete display text, so keep top sets, backoffs, distances, and notes exact. `rpe` is the highest planned working-set RPE when a range is used. `percent1RM` is optional and refers to the lift's estimated one-rep max, never to a muscle activation percentage. Use only supported muscle IDs from `core.js`; start from `exercise-map.json` for common lifts in the supported sports, then review the actual exercise and technique. Check paired slots carefully. Do not convert indirect work into invented equivalent sets. Set `optional: true` on optional slots so they remain visible without inflating planned coverage.

Do not include names, contact details, or private athlete notes in a plan that will be published in the site gallery. A personal output can remain local.

## Rendering

```powershell
node scripts/render-program.mjs examples/bodybuilding-priority-block.json site/plans/bodybuilding-priority-block.html
node scripts/render-workbook.mjs examples/bodybuilding-priority-block.json site/assets/generated-programs/bodybuilding-priority-block.xlsx
```

The workbook renderer uses the configured `@oai/artifact-tool` Node runtime. Renderers accept absolute paths too. For each delivered program, inspect the source JSON, HTML and workbook for consistent exercises, prescriptions, week counts, and phase progression. The two strongman JSON examples are converted from their existing workbooks with `scripts/import-existing-workbooks.py` (requires `openpyxl` for the conversion only). The original strongman workbooks are retained.

## Interpretation

The anatomical map shows approximate direct and supporting work for major muscle groups. A flagged overlap means two direct exposures are close together and at least one meets the report's demanding-work rule (three or more sets at RPE 8+ or an estimated 80%+ of that lift's 1RM); it does not mean the athlete will be under-recovered. A priority gap means fewer than four direct sets for a stated priority in a normal training week, and should be interpreted in light of the phase and sport. Previewed changes apply to the selected week in the open HTML; downloading saves the revised HTML. Review the implications for later weeks with the athlete before adopting the change across a mesocycle.

The full program document and brief conversation summary must include the skill's educational disclaimer and assumptions review.


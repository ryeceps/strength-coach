import fs from "node:fs";
import path from "node:path";

const cues = {
  "Back squat": "Brace before each rep and keep the bar balanced over the midfoot.",
  "Romanian deadlift": "Hinge at the hips while keeping the load close and the back position steady.",
  "Bench press": "Set the upper back before the first rep and use a repeatable bar path.",
  "Chest-supported row": "Keep the chest against the support and pull with control.",
  "Seated leg curl": "Control the lowering phase rather than letting the stack drop.",
  "Lateral raise": "Raise with a comfortable arm path and keep momentum small.",
};
const exercise = (name, prescription, sets, primaryMuscles, secondaryMuscles, reason, rpe, alternatives = []) =>
  ({ name, prescription, sets, primaryMuscles, secondaryMuscles, reason, rpe, alternatives, ...(cues[name] ? { cue: cues[name] } : {}) });
const week = (number, phase, rpe, sets) => ({
  number, phase, focus: number === 4 ? "Reduce fatigue while keeping the movement patterns" : "Build repeatable work for priority muscles",
  note: number === 4 ? "Deload: keep technique crisp and leave several reps in reserve." : "Add load only when the full rep range and target effort stay controlled.",
  days: [
    { weekday: 0, title: "Lower A · squat and hinge", focus: "Heavy quad work, then direct hamstrings.", exercises: [
      exercise("Back squat", `${sets} x 6-8 @ RPE ${rpe}`, sets, ["quads", "glutes"], ["adductors", "spinal-erectors"], "Squat first while you are fresh.", rpe, ["Safety-bar squat", "Hack squat"]),
      exercise("Romanian deadlift", `${sets} x 8-10 @ RPE ${rpe}`, sets, ["hamstrings", "glutes"], ["spinal-erectors", "forearms"], "Train the hamstrings through a loaded hinge.", rpe, ["Dumbbell Romanian deadlift"]),
      exercise("Standing calf raise", `${Math.max(2, sets - 1)} x 10-15 @ RPE ${rpe}`, Math.max(2, sets - 1), ["calves"], [], "Train calves after the main work.", rpe),
    ]},
    { weekday: 1, title: "Upper A · press and row", focus: "Balance horizontal pushing and pulling.", exercises: [
      exercise("Bench press", `${sets} x 6-8 @ RPE ${rpe}`, sets, ["chest", "triceps"], ["front-delts"], "Bench first. Track load and reps.", rpe, ["Dumbbell bench press"]),
      exercise("Chest-supported row", `${sets} x 8-12 @ RPE ${rpe}`, sets, ["upper-back", "lats"], ["biceps", "rear-delts"], "Row with chest support so the lower back gets a break.", rpe),
      exercise("Lateral raise", `${sets} x 12-20 @ RPE ${rpe}`, sets, ["side-delts"], [], "Train the side delts directly.", rpe),
      exercise("Cable triceps extension", `2 x 10-15 @ RPE ${rpe}`, 2, ["triceps"], [], "Finish with two sets for triceps.", rpe),
    ]},
    { weekday: 3, title: "Lower B · quad and knee-flexion", focus: "Use stable exercises for a second lower-body exposure.", exercises: [
      exercise("Leg press", `${sets} x 10-12 @ RPE ${rpe}`, sets, ["quads", "glutes"], ["adductors"], "Train quads without another barbell squat.", rpe, ["Belt squat"]),
      exercise("Seated leg curl", `${sets} x 10-15 @ RPE ${rpe}`, sets, ["hamstrings"], [], "Train knee flexion to go with the hinge work.", rpe, ["Lying leg curl"]),
      exercise("Split squat", `2 x 8-10/side @ RPE ${rpe}`, 2, ["quads", "glutes"], ["adductors"], "Get single-leg work without burying the session.", rpe),
    ]},
    { weekday: 5, title: "Upper B · overhead and pull", focus: "A second shoulder and back session with joint-friendly accessories.", exercises: [
      exercise("Seated dumbbell overhead press", `${sets} x 6-10 @ RPE ${rpe}`, sets, ["front-delts", "triceps"], ["side-delts"], "Press overhead with a path your shoulders tolerate.", rpe),
      exercise("Lat pulldown", `${sets} x 8-12 @ RPE ${rpe}`, sets, ["lats", "upper-back"], ["biceps"], "Add a vertical pull to the week.", rpe),
      exercise("Rear-delt raise", `2 x 12-20 @ RPE ${rpe}`, 2, ["rear-delts"], ["upper-back"], "Train rear delts directly.", rpe),
      exercise("Lateral raise", `2 x 12-20 @ RPE ${rpe}`, 2, ["side-delts"], [], "Hit side delts again with a small dose.", rpe),
    ]},
  ],
});
const program = {
  schemaVersion: 1, id: "bodybuilding-priority-block", title: "Four-week priority muscle block", sport: "Bodybuilding", objective: "Hypertrophy",
  summary: "A four-day upper/lower block that gives hamstrings and side delts clear priority while keeping the rest of the week balanced.",
  rationale: "The first lower day pairs squat and hip hinge; the second uses a stable quad machine and knee-flexion curl. Two upper days cover horizontal and vertical patterns, with direct side-delt work on both.",
  goals: ["Build repeatable hypertrophy work across major muscle groups.", "Give hamstrings both hip-hinge and knee-flexion exposures.", "Train side delts twice weekly with manageable accessory work."],
  priorityMuscles: ["hamstrings", "side-delts"], maxExercisesPerDay: 5,
  athleteContext: { experience: "Intermediate", sleep: "Not provided", readiness: "Use performance and soreness to adjust", constraints: "No stated injury limits" },
  assumptions: ["Four days per week and access to a full gym.", "No recent lift estimates were provided; loading follows RPE.", "This is a demonstration program, not an individualized medical or rehabilitation plan."],
  sources: [{ label: "Bodybuilding hypertrophy template", url: "https://github.com/ryeceps/strength-coach/blob/main/templates/bodybuilding/bodybuilding-hypertrophy-split.md" }],
  mesocycles: [{ title: "Build and deload", focus: "Priorities without excess fatigue", rationale: "Increase effort over three weeks, then reduce it in week four.",
    weeks: [week(1, "Base", 7, 3), week(2, "Build", 7.5, 3), week(3, "Hard work", 8, 3), week(4, "Deload", 6, 2)] }],
};
const output = path.resolve(import.meta.dirname, "../examples/bodybuilding-priority-block.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(program, null, 2) + "\n");
console.log(`Wrote ${output}`);


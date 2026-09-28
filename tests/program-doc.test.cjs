const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const core = require("../program-doc/core.js");

const example = (name) => JSON.parse(fs.readFileSync(path.join(__dirname, "../examples", `${name}.json`), "utf8"));

test("published examples cover every source week and prescription", () => {
  for (const [name, expectedWeeks, expectedSessions] of [
    ["strongman-rebuild", 12, 36], ["strongman-rpe-pyramid", 12, 48], ["bodybuilding-priority-block", 4, 16],
  ]) {
    const program = core.validateProgram(example(name));
    const weeks = core.allWeeks(program);
    assert.equal(weeks.length, expectedWeeks);
    assert.equal(weeks.reduce((count, { week }) => count + week.days.length, 0), expectedSessions);
    assert.ok(weeks.every(({ week }) => week.days.every((day) => day.exercises.every((exercise) => exercise.prescription))));
  }
});

test("exercise map covers representative lifts from all five supported sports", () => {
  const map = require("../program-doc/exercise-map.json");
  for (const name of ["back squat", "deadlift", "farmer carry", "snatch", "clean and jerk", "lateral raise"]) {
    assert.ok(map[name], `Missing mapping for ${name}`);
    assert.ok(map[name].primaryMuscles.length > 0);
    for (const id of [...map[name].primaryMuscles, ...map[name].secondaryMuscles]) {
      assert.ok(core.muscles.some((muscle) => muscle.id === id));
    }
  }
});

test("direct and supporting work remain distinct; optional slots are excluded", () => {
  const program = example("strongman-rebuild");
  const analysis = core.analyzeWeek(program, 0, 0);
  assert.ok(analysis.stats.quads.directSets > 0);
  assert.ok(analysis.stats.forearms.supportSets > 0);
  const optional = program.mesocycles[0].weeks[0].days.flatMap((day) => day.exercises).filter((exercise) => exercise.optional);
  assert.ok(optional.length > 0);
});

test("a deload does not create a false priority gap", () => {
  const program = example("bodybuilding-priority-block");
  const analysis = core.analyzeWeek(program, 0, 3);
  assert.ok(!analysis.flags.some((flag) => flag.type === "priority-gap"));
});

test("adjacent weeks can reveal a close demanding overlap", () => {
  const program = example("bodybuilding-priority-block");
  program.mesocycles[0].weeks[0].days[0].weekday = 6;
  program.mesocycles[0].weeks[0].days[1].weekday = 0;
  program.mesocycles[0].weeks[0].days[2].weekday = 2;
  program.mesocycles[0].weeks[0].days[3].weekday = 4;
  program.mesocycles[0].weeks[0].days[0].exercises[0].rpe = 8;
  const analysis = core.analyzeWeek(program, 0, 1);
  assert.ok(analysis.flags.some((flag) => flag.type === "overlap" && flag.firstDay === -1 && flag.secondDay === 0));
});

test("accepted suggestion changes only the selected week", () => {
  const program = example("bodybuilding-priority-block");
  program.priorityMuscles = ["calves"];
  const first = core.analyzeWeek(program, 0, 2);
  const suggestions = core.suggest(program, 0, 2, first);
  assert.ok(suggestions.length > 0);
  const changed = core.applySuggestion(program, 0, 2, suggestions[0]);
  assert.notDeepEqual(changed.mesocycles[0].weeks[2], program.mesocycles[0].weeks[2]);
  assert.deepEqual(changed.mesocycles[0].weeks[1], program.mesocycles[0].weeks[1]);
});


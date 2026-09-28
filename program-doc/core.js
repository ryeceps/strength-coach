/* Shared by the Node renderer, tests, and the self-contained browser report. */
(function (root) {
  "use strict";

  const muscles = [
    ["chest", "Chest", "front"], ["front-delts", "Front delts", "front"],
    ["side-delts", "Side delts", "front"], ["biceps", "Biceps", "front"],
    ["triceps", "Triceps", "back"], ["forearms", "Forearms / grip", "front"],
    ["abs", "Abdominals", "front"], ["quads", "Quadriceps", "front"],
    ["adductors", "Adductors", "front"], ["calves", "Calves", "back"],
    ["upper-back", "Upper back", "back"], ["lats", "Lats", "back"],
    ["rear-delts", "Rear delts", "back"], ["spinal-erectors", "Spinal erectors", "back"],
    ["glutes", "Glutes", "back"], ["hamstrings", "Hamstrings", "back"],
  ].map(([id, label, view]) => ({ id, label, view }));
  const muscleIds = new Set(muscles.map((muscle) => muscle.id));

  function assert(condition, message) { if (!condition) throw new Error(message); }
  function validateProgram(program) {
    assert(program && program.schemaVersion === 1, "Expected program schemaVersion 1");
    assert(typeof program.title === "string" && program.title.trim(), "Program title is required");
    assert(typeof program.summary === "string" && program.summary.trim(), "Program summary is required");
    assert(Array.isArray(program.mesocycles) && program.mesocycles.length, "At least one mesocycle is required");
    assert(Array.isArray(program.priorityMuscles), "priorityMuscles must be an array");
    for (const id of program.priorityMuscles) assert(muscleIds.has(id), `Unknown priority muscle: ${id}`);
    let weekCount = 0;
    for (const mesocycle of program.mesocycles) {
      assert(mesocycle.title && Array.isArray(mesocycle.weeks) && mesocycle.weeks.length, "Each mesocycle needs a title and weeks");
      for (const week of mesocycle.weeks) {
        weekCount += 1;
        assert(Number.isInteger(week.number) && week.number > 0, "Week number must be positive");
        assert(Array.isArray(week.days) && week.days.length, `Week ${week.number} needs sessions`);
        const usedDays = new Set();
        for (const day of week.days) {
          assert(Number.isInteger(day.weekday) && day.weekday >= 0 && day.weekday <= 6, "weekday must be 0 (Monday) through 6 (Sunday)");
          assert(!usedDays.has(day.weekday), `Week ${week.number} has two sessions on the same day`);
          usedDays.add(day.weekday);
          assert(day.title && Array.isArray(day.exercises) && day.exercises.length, "Each session needs a title and exercises");
          for (const exercise of day.exercises) {
            assert(exercise.name && exercise.prescription, "Exercise name and prescription are required");
            assert(Number.isFinite(exercise.sets) && exercise.sets > 0, `Positive numeric sets required for ${exercise.name}`);
            assert(Array.isArray(exercise.primaryMuscles) && exercise.primaryMuscles.length, `Primary muscles required for ${exercise.name}`);
            for (const id of [...exercise.primaryMuscles, ...(exercise.secondaryMuscles || [])]) {
              assert(muscleIds.has(id), `Unknown muscle ${id} in ${exercise.name}`);
            }
            if (exercise.rpe != null) assert(Number.isFinite(exercise.rpe) && exercise.rpe >= 1 && exercise.rpe <= 10, `Invalid RPE in ${exercise.name}`);
            if (exercise.percent1RM != null) assert(Number.isFinite(exercise.percent1RM) && exercise.percent1RM > 0 && exercise.percent1RM <= 100, `Invalid 1RM percent in ${exercise.name}`);
          }
        }
      }
    }
    assert(weekCount > 0, "No weeks found");
    return program;
  }

  function allWeeks(program) {
    return program.mesocycles.flatMap((mesocycle, mesocycleIndex) =>
      mesocycle.weeks.map((week, weekIndex) => ({ mesocycle, mesocycleIndex, week, weekIndex })));
  }
  function clone(program) { return JSON.parse(JSON.stringify(program)); }
  function demanding(exercise) {
    return exercise.sets >= 3 && ((exercise.rpe || 0) >= 8 || (exercise.percent1RM || 0) >= 80);
  }
  function analyzeWeek(program, mesocycleIndex, weekIndex) {
    const mesocycle = program.mesocycles[mesocycleIndex];
    const week = mesocycle && mesocycle.weeks[weekIndex];
    assert(week, "Selected week does not exist");
    const stats = Object.fromEntries(muscles.map(({ id }) => [id, { directSets: 0, supportSets: 0, days: [], exercises: [] }]));
    const byMuscle = Object.fromEntries(muscles.map(({ id }) => [id, []]));
    const prior = allWeeks(program).findIndex((item) => item.mesocycleIndex === mesocycleIndex && item.weekIndex === weekIndex);
    const previousWeek = prior > 0 ? allWeeks(program)[prior - 1].week : null;
    if (previousWeek) {
      for (const day of previousWeek.days) {
        for (const exercise of day.exercises) {
          if (exercise.optional) continue;
          for (const id of exercise.primaryMuscles) byMuscle[id].push({ weekday: day.weekday - 7, day, exercise, previous: true });
        }
      }
    }
    for (const day of week.days) {
      for (const exercise of day.exercises) {
        if (exercise.optional) continue;
        for (const id of exercise.primaryMuscles) {
          stats[id].directSets += exercise.sets;
          if (!stats[id].days.includes(day.weekday)) stats[id].days.push(day.weekday);
          stats[id].exercises.push(exercise.name);
          byMuscle[id].push({ weekday: day.weekday, day, exercise });
        }
        for (const id of exercise.secondaryMuscles || []) {
          stats[id].supportSets += exercise.sets;
          if (!stats[id].days.includes(day.weekday)) stats[id].days.push(day.weekday);
          stats[id].exercises.push(exercise.name);
        }
      }
    }
    const flags = [];
    const seen = new Set();
    for (const muscle of muscles) {
      const exposures = byMuscle[muscle.id].sort((a, b) => a.weekday - b.weekday);
      for (let i = 0; i < exposures.length; i += 1) {
        for (let j = i + 1; j < exposures.length; j += 1) {
          const first = exposures[i];
          const second = exposures[j];
          const gap = second.weekday - first.weekday;
          if (gap > 2 || first.weekday === second.weekday || second.weekday < 0) continue;
          if (!demanding(first.exercise) && !demanding(second.exercise)) continue;
          const key = `${muscle.id}:${first.weekday}:${second.weekday}`;
          if (seen.has(key)) continue;
          seen.add(key);
          flags.push({ type: "overlap", muscle: muscle.id, firstDay: first.weekday, secondDay: second.weekday, gap,
            text: `Planned direct work for ${muscle.label.toLowerCase()} appears on two sessions ${gap} day${gap === 1 ? "" : "s"} apart, with at least one demanding exposure. Review performance and soreness before the second session.` });
        }
      }
    }
    const reducedWeek = /deload|pivot|recovery|taper/i.test([week.phase, week.focus, week.note].filter(Boolean).join(" "));
    for (const id of reducedWeek ? [] : program.priorityMuscles) {
      if (stats[id].directSets < 4) {
        const label = muscles.find((muscle) => muscle.id === id).label;
        flags.push({ type: "priority-gap", muscle: id, text: `${label} is a stated priority but has ${stats[id].directSets} planned direct sets this week. Check whether that matches the phase and goal.` });
      }
    }
    const unmapped = muscles.filter((muscle) => stats[muscle.id].directSets === 0 && stats[muscle.id].supportSets === 0);
    if (unmapped.length && !reducedWeek) {
      flags.push({ type: "coverage-note", text: `No explicitly mapped work appears for ${unmapped.map((muscle) => muscle.label.toLowerCase()).join(", ")} this week. That may be intentional for this sport or phase; check against the stated goal.` });
    }
    return { stats, flags };
  }

  const accessoryOptions = {
    hamstrings: { name: "Hamstring curl", primaryMuscles: ["hamstrings"], secondaryMuscles: [], prescription: "2 x 10-15 @ RPE 7", sets: 2, rpe: 7, note: "Optional direct hamstring work; use a machine, cable, or band variation available to you." },
    calves: { name: "Calf raise", primaryMuscles: ["calves"], secondaryMuscles: [], prescription: "2 x 10-15 @ RPE 7", sets: 2, rpe: 7 },
    "side-delts": { name: "Lateral raise", primaryMuscles: ["side-delts"], secondaryMuscles: [], prescription: "2 x 12-20 @ RPE 7", sets: 2, rpe: 7 },
    "rear-delts": { name: "Rear-delt raise", primaryMuscles: ["rear-delts"], secondaryMuscles: [], prescription: "2 x 12-20 @ RPE 7", sets: 2, rpe: 7 },
    biceps: { name: "Curl", primaryMuscles: ["biceps"], secondaryMuscles: [], prescription: "2 x 10-15 @ RPE 7", sets: 2, rpe: 7 },
    triceps: { name: "Triceps extension", primaryMuscles: ["triceps"], secondaryMuscles: [], prescription: "2 x 10-15 @ RPE 7", sets: 2, rpe: 7 },
  };
  function suggest(program, mesocycleIndex, weekIndex, analysis) {
    const week = program.mesocycles[mesocycleIndex].weeks[weekIndex];
    const suggestions = [];
    const occupied = new Set(week.days.map((day) => day.weekday));
    const ordered = allWeeks(program);
    const position = ordered.findIndex((item) => item.mesocycleIndex === mesocycleIndex && item.weekIndex === weekIndex);
    const following = ordered[position + 1];
    const preceding = ordered[position - 1];
    const overlapCount = (candidate) => {
      let count = analyzeWeek(candidate, mesocycleIndex, weekIndex).flags.filter((flag) => flag.type === "overlap").length;
      if (following) count += analyzeWeek(candidate, following.mesocycleIndex, following.weekIndex).flags.filter((flag) => flag.type === "overlap").length;
      return count;
    };
    const startingCount = overlapCount(program);
    for (const flag of analysis.flags.filter((item) => item.type === "overlap")) {
      const day = week.days.find((item) => item.weekday === flag.secondDay);
      if (!day) continue;
      for (const candidate of [flag.secondDay + 1, flag.secondDay + 2, flag.secondDay - 1]) {
        if (candidate < 0 || candidate > 6 || occupied.has(candidate) || candidate - flag.firstDay < 3) continue;
        const otherDays = [
          ...week.days.filter((item) => item.weekday !== flag.secondDay).map((item) => item.weekday),
          ...(preceding ? preceding.week.days.map((item) => item.weekday - 7) : []),
          ...(following ? following.week.days.map((item) => item.weekday + 7) : []),
        ];
        if (otherDays.some((dayNumber) => Math.abs(candidate - dayNumber) < 2)) continue;
        const option = { type: "move-day", from: flag.secondDay, to: candidate,
          title: `Move ${day.title} to ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][candidate]}`,
          reason: `This spaces the highlighted ${muscles.find((muscle) => muscle.id === flag.muscle).label.toLowerCase()} work without changing exercises or loads.` };
        if (overlapCount(applySuggestion(program, mesocycleIndex, weekIndex, option)) < startingCount) {
          suggestions.push(option);
          break;
        }
      }
      if (suggestions.length) break;
    }
    if (!suggestions.length) {
      for (const flag of analysis.flags.filter((item) => item.type === "overlap")) {
        for (const dayNumber of [flag.firstDay, flag.secondDay]) {
          const day = week.days.find((item) => item.weekday === dayNumber);
          if (!day) continue;
          const index = day.exercises.findIndex((exercise, i) => i > 0 && !exercise.optional && exercise.sets >= 3 && !/[+\/]/.test(exercise.name) && exercise.primaryMuscles.includes(flag.muscle) && new RegExp(`(^|[^\\d-])${exercise.sets}\\s*x\\b`, "i").test(exercise.prescription));
          if (index < 0) continue;
          const exercise = day.exercises[index];
          const option = { type: "trim-support", weekday: dayNumber, exerciseIndex: index,
            title: `Trim one ${exercise.name} set on ${day.title}`,
            reason: `Keeps the main lift in place while reducing one support set for ${muscles.find((muscle) => muscle.id === flag.muscle).label.toLowerCase()}. Reassess after training feedback.` };
          if (overlapCount(applySuggestion(program, mesocycleIndex, weekIndex, option)) < startingCount) {
            suggestions.push(option);
            break;
          }
        }
        if (suggestions.length) break;
      }
    }
    for (const flag of analysis.flags.filter((item) => item.type === "priority-gap")) {
      const accessory = accessoryOptions[flag.muscle];
      const day = week.days.find((item) => item.exercises.length < (program.maxExercisesPerDay || 6));
      if (!accessory || !day) continue;
      suggestions.push({ type: "add-accessory", weekday: day.weekday, exercise: accessory,
        title: `Add optional ${accessory.name.toLowerCase()} on ${day.title}`,
        reason: `Adds two direct sets for the stated ${flag.muscle} priority. Confirm equipment, session time, and recovery before accepting.` });
      break;
    }
    return suggestions;
  }
  function applySuggestion(program, mesocycleIndex, weekIndex, suggestion) {
    const next = clone(program);
    const week = next.mesocycles[mesocycleIndex].weeks[weekIndex];
    if (suggestion.type === "move-day") {
      const day = week.days.find((item) => item.weekday === suggestion.from);
      if (!day || week.days.some((item) => item.weekday === suggestion.to)) throw new Error("Cannot move session");
      day.weekday = suggestion.to;
      week.days.sort((a, b) => a.weekday - b.weekday);
    } else if (suggestion.type === "add-accessory") {
      const day = week.days.find((item) => item.weekday === suggestion.weekday);
      if (!day) throw new Error("Cannot add accessory");
      day.exercises.push(clone(suggestion.exercise));
    } else if (suggestion.type === "trim-support") {
      const day = week.days.find((item) => item.weekday === suggestion.weekday);
      const exercise = day?.exercises[suggestion.exerciseIndex];
      if (!exercise || suggestion.exerciseIndex === 0 || exercise.sets < 3) throw new Error("Cannot trim support work");
      exercise.sets -= 1;
      exercise.prescription = exercise.prescription.replace(new RegExp(`(^|[^\\d-])${exercise.sets + 1}\\s*x\\b`, "i"), `$1${exercise.sets} x`);
      exercise.note = [exercise.note, "One support set removed in this revised week; compare with the original plan before changing later weeks."].filter(Boolean).join(" ");
    } else throw new Error("Unknown suggestion");
    return validateProgram(next);
  }
  root.ProgramCore = { muscles, validateProgram, allWeeks, analyzeWeek, suggest, applySuggestion, clone };
  if (typeof module !== "undefined" && module.exports) module.exports = root.ProgramCore;
})(typeof globalThis !== "undefined" ? globalThis : this);

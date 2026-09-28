(function () {
  "use strict";
  const core = globalThis.ProgramCore;
  const sourceNode = document.getElementById("program-data");
  const app = document.getElementById("app");
  let program;
  try { program = core.validateProgram(JSON.parse(sourceNode.textContent)); }
  catch (error) { app.textContent = `This program could not be opened: ${error.message}`; return; }
  let mesocycleIndex = 0;
  let weekIndex = 0;
  let selectedMuscle = null;
  let preview = null;
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const list = (items) => (items || []).map((item) => `<li>${esc(item)}</li>`).join("");
  const muscleLabel = (id) => core.muscles.find((muscle) => muscle.id === id)?.label || id;
  const num = (n) => Number.isInteger(n) ? n : Number(n.toFixed(1));

  const shapes = {
    front: [
      ["chest", "path", 'd="M75 93 Q98 80 120 95 L118 127 Q96 133 77 119 Z M123 95 Q144 80 166 93 L164 119 Q145 133 122 127 Z"'],
      ["front-delts", "ellipse", 'cx="67" cy="104" rx="17" ry="22"'],
      ["front-delts", "ellipse", 'cx="174" cy="104" rx="17" ry="22"'],
      ["side-delts", "ellipse", 'cx="54" cy="115" rx="10" ry="19"'],
      ["side-delts", "ellipse", 'cx="187" cy="115" rx="10" ry="19"'],
      ["biceps", "ellipse", 'cx="51" cy="152" rx="11" ry="25"'],
      ["biceps", "ellipse", 'cx="190" cy="152" rx="11" ry="25"'],
      ["forearms", "ellipse", 'cx="42" cy="210" rx="11" ry="30"'],
      ["forearms", "ellipse", 'cx="199" cy="210" rx="11" ry="30"'],
      ["abs", "path", 'd="M92 135 Q120 142 149 135 L147 214 Q120 224 94 214 Z"'],
      ["quads", "path", 'd="M91 225 Q109 221 117 236 L111 325 Q94 336 83 308 Z M124 236 Q132 221 150 225 L158 308 Q147 336 130 325 Z"'],
      ["adductors", "path", 'd="M118 234 L117 305 Q111 290 109 249 Z M123 234 L132 249 Q130 290 124 305 Z"'],
    ],
    back: [
      ["rear-delts", "ellipse", 'cx="66" cy="103" rx="18" ry="21"'],
      ["rear-delts", "ellipse", 'cx="175" cy="103" rx="18" ry="21"'],
      ["upper-back", "path", 'd="M80 91 Q120 108 161 91 L151 148 Q120 135 90 148 Z"'],
      ["lats", "path", 'd="M86 143 Q106 145 116 154 L112 206 L94 190 Z M125 154 Q135 145 155 143 L147 190 L129 206 Z"'],
      ["triceps", "ellipse", 'cx="52" cy="149" rx="11" ry="28"'],
      ["triceps", "ellipse", 'cx="189" cy="149" rx="11" ry="28"'],
      ["spinal-erectors", "path", 'd="M113 154 L119 157 L118 222 L111 220 Z M122 157 L128 154 L130 220 L123 222 Z"'],
      ["glutes", "ellipse", 'cx="102" cy="240" rx="22" ry="20"'],
      ["glutes", "ellipse", 'cx="139" cy="240" rx="22" ry="20"'],
      ["hamstrings", "path", 'd="M90 259 Q105 257 116 267 L109 329 Q96 337 86 317 Z M125 267 Q136 257 151 259 L155 317 Q145 337 132 329 Z"'],
      ["calves", "ellipse", 'cx="100" cy="357" rx="14" ry="25"'],
      ["calves", "ellipse", 'cx="141" cy="357" rx="14" ry="25"'],
    ],
  };
  function bodyMap(view, stats) {
    const spots = shapes[view].map(([id, tag, attrs]) => {
      const sets = stats[id].directSets;
      const active = selectedMuscle === id ? " selected" : "";
      return `<${tag} class="muscle-shape${sets ? " trained" : ""}${active}" data-muscle="${id}" ${attrs}><title>${esc(muscleLabel(id))}: ${num(sets)} direct sets</title></${tag}>`;
    }).join("");
    return `<div class="body-view"><h3>${view === "front" ? "Front" : "Back"}</h3><svg viewBox="0 0 241 430" role="img" aria-label="${view} body view; use the muscle buttons below for details">
      <path class="silhouette" d="M105 23 Q120 10 136 23 L139 55 Q134 70 130 72 L130 82 Q166 81 182 94 Q195 101 200 124 L215 224 Q216 239 205 241 Q196 240 194 227 L179 171 L176 217 L159 226 L162 274 L156 355 L153 404 Q151 421 138 421 Q127 420 127 407 L121 292 L115 407 Q115 420 103 421 Q90 421 88 404 L85 355 L79 274 L82 226 L65 217 L62 171 L47 227 Q45 240 36 241 Q25 239 26 224 L41 124 Q46 101 59 94 Q75 81 111 82 L111 72 Q106 70 102 55 Z" />${spots}</svg></div>`;
  }
  function formatContext() {
    const context = program.athleteContext || {};
    const parts = [context.experience && `Experience: ${context.experience}`, context.sleep && `Sleep: ${context.sleep}`, context.readiness && `Readiness: ${context.readiness}`, context.constraints && `Constraints: ${context.constraints}`].filter(Boolean);
    return parts.length ? `<p class="context">${parts.map(esc).join(" · ")}</p>` : "";
  }
  function renderExercise(exercise) {
    return `<details class="exercise"><summary><span>${esc(exercise.name)}${exercise.optional ? " · Optional" : ""}</span><strong>${esc(exercise.prescription)}</strong></summary>
      <div class="exercise-detail">${exercise.reason ? `<p><b>Why:</b> ${esc(exercise.reason)}</p>` : ""}
      ${exercise.cue ? `<p><b>Do this:</b> ${esc(exercise.cue)}</p>` : ""}
      ${exercise.note ? `<p>${esc(exercise.note)}</p>` : ""}
      ${exercise.alternatives?.length ? `<p><b>Alternatives:</b> ${exercise.alternatives.map(esc).join(", ")}</p>` : ""}
      <p><b>Primary:</b> ${exercise.primaryMuscles.map(muscleLabel).map(esc).join(", ")}${exercise.secondaryMuscles?.length ? ` · <b>Supporting:</b> ${exercise.secondaryMuscles.map(muscleLabel).map(esc).join(", ")}` : ""}</p>
      ${exercise.percent1RM ? `<p><b>Estimated load:</b> ${esc(exercise.percent1RM)}% of this lift's 1RM. This is not a muscle effort percentage.</p>` : ""}</div></details>`;
  }
  function renderSuggestion(suggestion, index) {
    return `<article class="suggestion"><div><h3>${esc(suggestion.title)}</h3><p>${esc(suggestion.reason)}</p></div><button type="button" data-preview="${index}">Preview</button></article>`;
  }
  function render() {
    const mesocycle = program.mesocycles[mesocycleIndex];
    const week = mesocycle.weeks[weekIndex];
    const analysis = core.analyzeWeek(program, mesocycleIndex, weekIndex);
    const suggestions = core.suggest(program, mesocycleIndex, weekIndex, analysis);
    const featured = selectedMuscle ? analysis.stats[selectedMuscle] : null;
    const previewProgram = preview ? core.applySuggestion(program, mesocycleIndex, weekIndex, preview) : null;
    const previewAnalysis = previewProgram ? core.analyzeWeek(previewProgram, mesocycleIndex, weekIndex) : null;
    app.innerHTML = `<header class="masthead"><div class="brand">STRENGTH COACH</div><div class="mast-actions"><button type="button" data-print>Print this week</button><button type="button" data-export>Download HTML</button></div></header>
      <main><section class="hero"><p class="eyebrow">${esc(program.sport || "Strength")} · ${esc(program.objective || "Program")}</p><h1>${esc(program.title)}</h1><p class="lead">${esc(program.summary)}</p><div class="hero-meta"><span>${program.mesocycles.length} mesocycle${program.mesocycles.length === 1 ? "" : "s"}</span><span>${core.allWeeks(program).length} weeks</span><span>${week.days.length} sessions this week</span></div>${formatContext()}</section>
      <section class="intro-grid"><article class="panel"><p class="eyebrow">The goal</p><h2>The goal</h2><ul>${list(program.goals)}</ul></article><article class="panel"><p class="eyebrow">Coaching logic</p><h2>Why this work is here</h2><p>${esc(program.rationale || mesocycle.rationale || "Training is organized around the stated goal and recovery budget.")}</p><p class="fine">${esc(program.disclaimer || "Educational programming only. This is not medical advice. Seek clearance from a qualified clinician before starting a full plan.")}</p></article></section>
      <section class="panel planner"><div class="section-head"><div><p class="eyebrow">Program progression</p><h2>Weeks and sessions</h2></div><p>${esc(mesocycle.rationale || "Select a week to inspect the work and analysis.")}</p></div><div class="tabs" aria-label="Mesocycles">${program.mesocycles.map((item, i) => `<button type="button" data-meso="${i}" aria-current="${i === mesocycleIndex ? "true" : "false"}">${esc(item.title)}</button>`).join("")}</div><div class="week-tabs" aria-label="Weeks">${mesocycle.weeks.map((item, i) => `<button type="button" data-week="${i}" aria-current="${i === weekIndex ? "true" : "false"}"><span>Week ${item.number}</span><small>${esc(item.phase || "Training")}</small></button>`).join("")}</div><div class="week-intro"><div><p class="eyebrow">Week ${week.number} · ${esc(week.phase || "Training")}</p><h3>${esc(week.focus || mesocycle.focus || "The work")}</h3></div><p>${esc(week.note || "Choose a session below to see the exercises and their purpose.")}</p></div></section>
      <section class="sessions" aria-label="Week ${week.number} sessions">${week.days.slice().sort((a, b) => a.weekday - b.weekday).map((day) => `<article class="session panel"><div class="session-head"><span>${dayNames[day.weekday]}</span><h3>${esc(day.title)}</h3><p>${esc(day.focus || "")}</p></div><div>${day.exercises.map(renderExercise).join("")}</div></article>`).join("")}</section>
      <section class="analysis-grid"><article class="panel anatomy"><div class="section-head"><div><p class="eyebrow">Training map</p><h2>Muscle work</h2></div><p>Color shows planned direct sets for this week. Supporting work is listed separately.</p></div><div class="body-maps">${bodyMap("front", analysis.stats)}${bodyMap("back", analysis.stats)}</div><div class="muscle-grid">${core.muscles.map((muscle) => `<button type="button" data-muscle="${muscle.id}" aria-pressed="${selectedMuscle === muscle.id}"><b>${esc(muscle.label)}</b><span>${num(analysis.stats[muscle.id].directSets)} direct · ${num(analysis.stats[muscle.id].supportSets)} supporting · ${analysis.stats[muscle.id].days.length} days</span></button>`).join("")}</div>${featured ? `<p class="selected-detail"><b>${esc(muscleLabel(selectedMuscle))}:</b> ${featured.exercises.length ? featured.exercises.map(esc).join(", ") : "No planned work this week."}</p>` : ""}</article>
      <article class="panel review"><p class="eyebrow">Schedule check</p><h2>Work and recovery</h2><p class="fine">Use these flags to check the schedule. Look at performance, soreness, and sleep before changing the work.</p>${analysis.flags.length ? `<ul class="flags">${analysis.flags.map((flag) => `<li><span>${flag.type === "overlap" ? "Timing" : flag.type === "priority-gap" ? "Priority" : "Coverage"}</span>${esc(flag.text)}</li>`).join("")}</ul>` : `<p class="clear">No major schedule flags this week.</p>`}<h3>Adjustments</h3>${suggestions.length ? suggestions.map(renderSuggestion).join("") : `<p>Keep the week as written unless your training says otherwise.</p>`}${preview ? `<div class="preview" role="status"><h3>Check the change</h3><p>${esc(preview.title)}</p><p>Planning flags: ${analysis.flags.length} → ${previewAnalysis.flags.length}. ${preview.type === "add-accessory" ? `${esc(muscleLabel(preview.exercise.primaryMuscles[0]))} direct sets: ${analysis.stats[preview.exercise.primaryMuscles[0]].directSets} → ${previewAnalysis.stats[preview.exercise.primaryMuscles[0]].directSets}.` : preview.type === "trim-support" ? "One support set is removed; the main lift stays in place." : "Exercises and loads stay the same."}</p><p class="fine">This change applies to the open HTML only; a separately downloaded Excel log still follows the original plan.</p><div class="preview-actions"><button type="button" data-accept>Accept for this week</button><button type="button" data-cancel>Cancel</button></div></div>` : ""}</article></section>
      <section class="panel endnotes"><p class="eyebrow">Notes</p><h2>Assumptions and sources</h2><div class="endnotes-grid"><div><h3>Assumptions</h3><ul>${list(program.assumptions)}</ul></div><div><h3>Source and limits</h3><ul>${(program.sources || []).map((source) => `<li>${source.url ? `<a href="${esc(source.url)}">${esc(source.label)}</a>` : esc(source.label)}</li>`).join("")}</ul><p class="fine">Exercise-to-muscle assignments are coaching approximations. Direct sets, support sets, and timing are not measurements of muscle activation or recovery.</p></div></div></section></main><footer>Strength Coach · ${esc(program.title)}</footer>`;
    app.querySelectorAll("[data-meso]").forEach((button) => button.addEventListener("click", () => { mesocycleIndex = Number(button.dataset.meso); weekIndex = 0; preview = null; render(); }));
    app.querySelectorAll("[data-week]").forEach((button) => button.addEventListener("click", () => { weekIndex = Number(button.dataset.week); preview = null; render(); }));
    app.querySelectorAll("button[data-muscle]").forEach((button) => button.addEventListener("click", () => { selectedMuscle = button.dataset.muscle; render(); }));
    app.querySelectorAll("svg [data-muscle]").forEach((shape) => shape.addEventListener("click", () => { selectedMuscle = shape.dataset.muscle; render(); }));
    app.querySelectorAll("[data-preview]").forEach((button) => button.addEventListener("click", () => { preview = suggestions[Number(button.dataset.preview)]; render(); app.querySelector(".preview")?.scrollIntoView({ block: "nearest" }); }));
    app.querySelector("[data-cancel]")?.addEventListener("click", () => { preview = null; render(); });
    app.querySelector("[data-accept]")?.addEventListener("click", () => { program = core.applySuggestion(program, mesocycleIndex, weekIndex, preview); sourceNode.textContent = JSON.stringify(program).replace(/</g, "\\u003c"); preview = null; render(); });
    app.querySelector("[data-print]").addEventListener("click", () => window.print());
    app.querySelector("[data-export]").addEventListener("click", () => {
      sourceNode.textContent = JSON.stringify(program).replace(/</g, "\\u003c");
      const html = "<!doctype html>\n" + document.documentElement.outerHTML;
      const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
      const link = document.createElement("a"); link.href = url; link.download = `${(program.id || "strength-program").replace(/[^a-z0-9-]/gi, "-")}.html`;
      link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }
  let printOpened = [];
  window.addEventListener("beforeprint", () => {
    printOpened = [...app.querySelectorAll("details:not([open])")];
    printOpened.forEach((item) => { item.open = true; });
  });
  window.addEventListener("afterprint", () => {
    printOpened.forEach((item) => { item.open = false; });
    printOpened = [];
  });
  render();
})();



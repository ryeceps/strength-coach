const repoBase = "https://github.com/ryanbieber/strength-coach/blob/main/";

const howCards = [
  {
    number: "01",
    title: "Identify the job",
    body: "Sport, goal, timeline, limiter, equipment, recovery.",
  },
  {
    number: "02",
    title: "Choose the pattern",
    body: "Pattern first, implement second, exercise last.",
  },
  {
    number: "03",
    title: "Blend a template",
    body: "Use the templates as archetypes, not scripts.",
  },
  {
    number: "04",
    title: "Set the dose",
    body: "Write sets, reps, RPE, and enough volume to recover from.",
  },
  {
    number: "05",
    title: "Peak on time",
    body: "Closer to the date: less noise, more specificity.",
  },
];

const ruleCards = [
  {
    title: "Intake order",
    eyebrow: "Ask what matters",
    body: "Ask for the missing details that change the plan. Infer the rest.",
  },
  {
    title: "Pattern first",
    eyebrow: "Pick the lane",
    body: "Squat, press, hinge, carry, load, Olympic lift, or hypertrophy split before exercise selection.",
  },
  {
    title: "RPE and volume",
    eyebrow: "Load with intent",
    body: "Most work lives at RPE 7-9. Use tonnage when volume needs a simple comparison.",
  },
  {
    title: "Peaking",
    eyebrow: "Less noise, more specificity",
    body: "Lower volume, higher specificity. Cut accessories before the main work.",
  },
  {
    title: "Substitutions",
    eyebrow: "Match the pattern",
    body: "Match pattern, target, equipment demand, and fatigue cost.",
  },
  {
    title: "Form check and output",
    eyebrow: "Special cases",
    body: "Video means form check. Programs stay in Markdown with clear headings and bullets.",
  },
];

const laneCards = [
  {
    id: "general-strength",
    title: "General Strength",
    eyebrow: "Base building",
    summary: "Off-season strength and work capacity.",
    bestFor: ["Off-season", "transition blocks", "newer lifters", "balanced base work"],
    focus: ["Squat pattern", "hinge pattern", "upper push/pull", "carry and core"],
    defaultObjective: "base",
    source: `${repoBase}templates/general-strength/index.md`,
    lead: "Simple movements. Moderate volume. Submaximal loading.",
  },
  {
    id: "powerlifting",
    title: "Powerlifting",
    eyebrow: "Competition lifts first",
    summary: "Squat, bench, and deadlift stay central.",
    bestFor: ["Meet prep", "weak-point work", "repeatable progress", "specific readiness"],
    focus: ["Squat", "bench", "deadlift", "bracing and lockout"],
    defaultObjective: "peak",
    source: `${repoBase}templates/powerlifting/index.md`,
    lead: "Stable lifts, useful accessories, sparse heavy exposures.",
  },
  {
    id: "strongman",
    title: "Strongman",
    eyebrow: "Event work first",
    summary: "Implements, carries, loading, medleys, grip.",
    bestFor: ["Contest prep", "event rehearsal", "medley pacing", "implement-specific work"],
    focus: ["Event practice", "carries", "loading", "pressing implements"],
    defaultObjective: "contest-prep",
    source: `${repoBase}templates/strongman/index.md`,
    lead: "Match the event, not just the exercise name.",
  },
  {
    id: "weightlifting",
    title: "Weightlifting",
    eyebrow: "Positions and speed",
    summary: "Positions, timing, speed, receiving strength.",
    bestFor: ["Skill blocks", "peaking", "high-frequency technical practice", "classic lift focus"],
    focus: ["Snatch", "clean and jerk", "pulls", "front squat", "overhead receiving"],
    defaultObjective: "peak",
    source: `${repoBase}templates/weightlifting/index.md`,
    lead: "Keep classic lifts fast. Variations fix positions.",
  },
  {
    id: "bodybuilding",
    title: "Bodybuilding",
    eyebrow: "Hypertrophy and fatigue control",
    summary: "Targeted volume and joint-friendly execution.",
    bestFor: ["Massing", "weak-body-part emphasis", "prep blocks", "repeatable volume landmarks"],
    focus: ["Priority muscle groups", "exercise order", "volume landmarks", "lagging areas"],
    defaultObjective: "hypertrophy",
    source: `${repoBase}templates/bodybuilding/index.md`,
    lead: "Load the target hard without irritating the joints.",
  },
];

const templateGroups = [
  {
    title: "General strength rack",
    eyebrow: "Base templates",
    source: `${repoBase}templates/general-strength/index.md`,
    items: [
      { name: "Starting Strength-style", file: "templates/general-strength/starting-strength-style.md" },
      { name: "StrongLifts 5x5", file: "templates/general-strength/stronglifts-5x5.md" },
      { name: "Greyskull LP", file: "templates/general-strength/greyskull-lp.md" },
      { name: "GZCLP", file: "templates/general-strength/gzclp.md" },
      { name: "5/3/1 general strength", file: "templates/general-strength/five-three-one-general-strength.md" },
    ],
  },
  {
    title: "Powerlifting rack",
    eyebrow: "Meet prep and volume",
    source: `${repoBase}templates/powerlifting/index.md`,
    items: [
      { name: "Sheiko", file: "templates/powerlifting/sheiko.md" },
      { name: "Juggernaut Method", file: "templates/powerlifting/juggernaut-method.md" },
      { name: "Texas Method", file: "templates/powerlifting/texas-method.md" },
      { name: "Candito 6-week", file: "templates/powerlifting/candito-6-week.md" },
      { name: "Smolov", file: "templates/powerlifting/smolov.md" },
    ],
  },
  {
    title: "Strongman rack",
    eyebrow: "Events, medleys, presses",
    source: `${repoBase}templates/strongman/index.md`,
    items: [
      { name: "Strongman contest prep", file: "templates/strongman/strongman-contest-prep.md" },
      { name: "Strongman off-season base", file: "templates/strongman/strongman-off-season-base.md" },
      { name: "Strongman press focus", file: "templates/strongman/strongman-press-focus.md" },
      { name: "Strongman deadlift focus", file: "templates/strongman/strongman-deadlift-focus.md" },
      { name: "Strongman medley block", file: "templates/strongman/strongman-medley-block.md" },
      { name: "Strongman compact four day", file: "templates/strongman/strongman-compact-four-day.md" },
    ],
  },
  {
    title: "Weightlifting rack",
    eyebrow: "Classic lifts and peaks",
    source: `${repoBase}templates/weightlifting/index.md`,
    items: [
      { name: "Weightlifting classic cycle", file: "templates/weightlifting/weightlifting-classic-cycle.md" },
      { name: "Bulgarian inspired", file: "templates/weightlifting/bulgarian-inspired.md" },
      { name: "Russian classic cycle", file: "templates/weightlifting/russian-classic-cycle.md" },
      { name: "Chinese block cycle", file: "templates/weightlifting/chinese-block-cycle.md" },
      { name: "Weightlifting peak block", file: "templates/weightlifting/weightlifting-peak-block.md" },
    ],
  },
  {
    title: "Bodybuilding rack",
    eyebrow: "Hypertrophy and split work",
    source: `${repoBase}templates/bodybuilding/index.md`,
    items: [
      { name: "Bodybuilding hypertrophy split", file: "templates/bodybuilding/bodybuilding-hypertrophy-split.md" },
      { name: "Push Pull Legs", file: "templates/bodybuilding/push-pull-legs.md" },
      { name: "Upper Lower hypertrophy", file: "templates/bodybuilding/upper-lower-hypertrophy.md" },
      { name: "Arnold split", file: "templates/bodybuilding/arnold-split.md" },
      { name: "PHAT", file: "templates/bodybuilding/phat.md" },
    ],
  },
];

const sourceCards = [
  {
    eyebrow: "Core skill",
    title: "SKILL.md",
    body: "The skill's operating contract.",
    href: `${repoBase}SKILL.md`,
  },
  {
    eyebrow: "User-facing summary",
    title: "README.md",
    body: "The short repo overview.",
    href: `${repoBase}README.md`,
  },
  {
    eyebrow: "Reference rules",
    title: "strength-coach-reference.md",
    body: "Intake, patterns, substitutions, output.",
    href: `${repoBase}references/strength-coach-reference.md`,
  },
  {
    eyebrow: "Form check",
    title: "references/form-check/",
    body: "Technique review workflow.",
    href: `${repoBase}references/form-check/index.md`,
  },
  {
    eyebrow: "Template index",
    title: "templates/index.md",
    body: "The template library map.",
    href: `${repoBase}templates/index.md`,
  },
];

const knowledgeShelves = [
  {
    title: "Operating contract",
    eyebrow: "How the skill behaves",
    body: "The skill contract and answer rules.",
    links: [
      { label: "SKILL.md", href: `${repoBase}SKILL.md` },
      { label: "README.md", href: `${repoBase}README.md` },
      { label: "Agent config", href: `${repoBase}agents/openai.yaml` },
    ],
  },
  {
    title: "Reference files",
    eyebrow: "Rules under the floor mats",
    body: "General rules and sport notes.",
    links: [
      { label: "Strength coach reference", href: `${repoBase}references/strength-coach-reference.md` },
      { label: "Strongman", href: `${repoBase}references/strongman.md` },
      { label: "Powerlifting", href: `${repoBase}references/powerlifting.md` },
      { label: "Weightlifting", href: `${repoBase}references/weightlifting.md` },
      { label: "Bodybuilding", href: `${repoBase}references/bodybuilding.md` },
      { label: "General strength", href: `${repoBase}references/general-strength.md` },
    ],
  },
  {
    title: "Template library",
    eyebrow: "Program racks",
    body: "Archetypes and methodology notes.",
    links: [
      { label: "Template index", href: `${repoBase}templates/index.md` },
      { label: "Strongman templates", href: `${repoBase}templates/strongman/index.md` },
      { label: "Powerlifting templates", href: `${repoBase}templates/powerlifting/index.md` },
      { label: "Weightlifting templates", href: `${repoBase}templates/weightlifting/index.md` },
      { label: "Bodybuilding templates", href: `${repoBase}templates/bodybuilding/index.md` },
      { label: "General strength templates", href: `${repoBase}templates/general-strength/index.md` },
    ],
  },
  {
    title: "Add more knowledge",
    eyebrow: "Open a PR",
    body: "Add Markdown, link it, open a PR.",
    links: [
      { label: "Open a pull request", href: "https://github.com/ryanbieber/strength-coach/compare" },
      { label: "Browse references folder", href: "https://github.com/ryanbieber/strength-coach/tree/main/references" },
      { label: "Browse templates folder", href: "https://github.com/ryanbieber/strength-coach/tree/main/templates" },
    ],
  },
];

const generatedPrograms = [
  {
    title: "12-week strongman rebuild",
    eyebrow: "Strongman · 3 days/week",
    summary:
      "Log press, deadlift, front squat, farmers, bench twice weekly, and capped pump work.",
    generated: "2026-06-30",
    constraints: [
      "No heavy singles; heavy triples only",
      "At most four exercise slots per session",
      "Bench twice weekly with rows or pulldowns",
      "Submaximal rebuild volume before heavier triples",
    ],
    split: [
      "Day 1: Log priority, front squat, bench + row, lateral raises + curls",
      "Day 2: Deadlift, farmer carries, posterior chain, optional pump",
      "Day 3: Front squat priority, log volume, bench + pulldown, rear delts + triceps",
    ],
    download: "assets/generated-programs/12_week_strongman_program.xlsx",
  },
];

const presetValues = {
  base: {
    sport: "general-strength",
    objective: "base",
    equipment: "full-gym",
    days: "3",
    session: "60",
  },
  meet: {
    sport: "powerlifting",
    objective: "peak",
    equipment: "full-gym",
    days: "4",
    session: "90",
  },
  contest: {
    sport: "strongman",
    objective: "contest-prep",
    equipment: "implements",
    days: "4",
    session: "90",
  },
  hypertrophy: {
    sport: "bodybuilding",
    objective: "hypertrophy",
    equipment: "machines-cables",
    days: "5",
    session: "75",
  },
};

const laneMeta = {
  "general-strength": {
    pattern: "Squat pattern, hinge pattern, upper push/pull, carry and core.",
    nextQuestion: "What sport are you moving toward, if any?",
    promptLead: "Balanced base work with repeatable exercises.",
    rules: ["Simple and repeatable.", "Submaximal until the target sharpens."],
  },
  powerlifting: {
    pattern: "Squat, bench, deadlift, and weak-point support.",
    nextQuestion: "What is the meet date, and what are your current best lifts or proxy lifts?",
    promptLead: "Competition lifts first; accessories support them.",
    rules: ["Stay close to comp lifts.", "Heavy exposures stay sparse."],
  },
  strongman: {
    pattern: "Events, implements, carries, loading, medleys, and grip.",
    nextQuestion: "Which events or implements matter most, and what can you actually train with?",
    promptLead: "Event first; closest simulation second.",
    rules: ["Match implement, path, grip, duration, fatigue.", "Practice order and pacing."],
  },
  weightlifting: {
    pattern: "Snatch, clean and jerk, pulls, front squats, and overhead receiving.",
    nextQuestion: "What is the target meet or test date, and how often can you practice the classic lifts?",
    promptLead: "Protect positions, timing, speed, and receiving strength.",
    rules: ["Keep lifts fresh.", "Variations must fix positions."],
  },
  bodybuilding: {
    pattern: "Priority muscle groups, exercise order, and repeatable volume landmarks.",
    nextQuestion: "Which body parts need the most attention, and which movements irritate joints or recovery?",
    promptLead: "Load the target muscle and manage fatigue.",
    rules: ["Volume drives the block.", "Bias lagging areas."],
  },
};

const form = document.getElementById("brief-form");
const titleNode = document.getElementById("brief-title");
const summaryNode = document.getElementById("brief-summary");
const copyNode = document.getElementById("brief-copy");
const copyBriefButton = document.getElementById("copy-brief");
const copyLinkButton = document.getElementById("copy-link");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function linkHref(file) {
  return `${repoBase}${file}`;
}

function renderCards(container, items, factory) {
  container.innerHTML = items.map(factory).join("");
}

function laneBySport(sport) {
  return laneCards.find((lane) => lane.id === sport) ?? laneCards[0];
}

function getValues() {
  const data = new FormData(form);
  return {
    sport: String(data.get("sport") ?? "").trim(),
    objective: String(data.get("objective") ?? "").trim(),
    timeline: String(data.get("timeline") ?? "").trim(),
    equipment: String(data.get("equipment") ?? "").trim(),
    days: String(data.get("days") ?? "").trim(),
    session: String(data.get("session") ?? "").trim(),
    bests: String(data.get("bests") ?? "").trim(),
    limits: String(data.get("limits") ?? "").trim(),
    notes: String(data.get("notes") ?? "").trim(),
  };
}

function setValues(values) {
  for (const [key, value] of Object.entries(values)) {
    if (form.elements[key]) {
      form.elements[key].value = value;
    }
  }
}

function missingQuestions(values) {
  const questions = [];
  if (!values.timeline) questions.push("What is the target date or training window?");
  if (!values.equipment) questions.push("What equipment do you actually have?");
  if (!values.days) questions.push("How many days per week can you train?");
  if (!values.session) questions.push("How long is each session?");
  if (!values.limits) questions.push("What injuries, sleep issues, fatigue limits, or eating constraints matter?");
  if (!values.bests) questions.push("What are your best lifts or closest proxy lifts?");
  return questions;
}

function suggestTemplateNames(sport, objective) {
  const catalog = {
    "general-strength": ["Starting Strength-style", "StrongLifts 5x5", "Greyskull LP", "GZCLP", "5/3/1 general strength"],
    powerlifting:
      objective === "peak"
        ? ["Candito 6-week", "Smolov", "Coan / Phillipi", "Mag Ort", "Texas Method"]
        : ["Sheiko", "Juggernaut Method", "Texas Method", "5/3/1", "Madcow 5x5"],
    strongman:
      objective === "contest-prep"
        ? ["Strongman contest prep", "Strongman medley block", "Strongman press focus", "Strongman deadlift focus", "5/3/1 strongman"]
        : ["Strongman off-season base", "Strongman press focus", "Strongman deadlift focus", "Strongman medley block", "5/3/1 strongman"],
    weightlifting:
      objective === "peak"
        ? ["Weightlifting peak block", "Weightlifting classic cycle", "Bulgarian inspired", "Russian classic cycle", "Chinese block cycle"]
        : ["Weightlifting classic cycle", "Chinese block cycle", "Russian classic cycle", "Weightlifting peak block", "Bulgarian inspired"],
    bodybuilding:
      objective === "hypertrophy"
        ? ["Bodybuilding hypertrophy split", "Push Pull Legs", "Upper Lower hypertrophy", "Full body hypertrophy", "PHAT"]
        : ["Push Pull Legs", "Upper Lower hypertrophy", "Bodybuilding hypertrophy split", "Arnold split", "Full body hypertrophy"],
  };

  return catalog[sport] ?? catalog["general-strength"];
}

function generatePrompt(values, lane) {
  const lines = [
    `Build a ${lane.title.toLowerCase()} recommendation with the strength-coach skill.`,
    `Sport: ${lane.title}.`,
    `Objective: ${labelForObjective(values.objective)}.`,
    `Timeline: ${values.timeline || "not provided"}.`,
    `Equipment: ${labelForEquipment(values.equipment)}.`,
    `Days/week: ${values.days || "not provided"}.`,
    `Session length: ${values.session ? `${values.session} minutes` : "not provided"}.`,
    `Best or proxy lifts: ${values.bests || "not provided"}.`,
    `Limits: ${values.limits || "not provided"}.`,
    `Extra notes: ${values.notes || "none"}.`,
    "Use pattern-first programming, sets x reps @ RPE, and mostly RPE 7-9 work.",
    "Ask one next question only if it would materially change the plan.",
  ];

  return lines.join("\n");
}

function labelForObjective(objective) {
  const labels = {
    base: "Base building",
    build: "Build phase",
    peak: "Peak",
    "contest-prep": "Contest prep",
    hypertrophy: "Hypertrophy",
    "weak-point": "Weak point focus",
    general: "General improvement",
  };

  return labels[objective] ?? "General improvement";
}

function labelForEquipment(equipment) {
  const labels = {
    "full-gym": "Full gym",
    "barbell-only": "Barbell only",
    "home-gym": "Home gym",
    implements: "Strongman implements",
    "machines-cables": "Machines and cables",
    mixed: "Mixed or limited",
  };

  return labels[equipment] ?? "Not provided";
}

function renderHow() {
  const container = document.getElementById("how-grid");
  renderCards(container, howCards, (card) => `
    <article class="card">
      <span class="card__number">${escapeHtml(card.number)}</span>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.body)}</p>
    </article>
  `);
}

function renderRules() {
  const container = document.getElementById("rules-grid");
  renderCards(container, ruleCards, (card) => `
    <article class="card">
      <p class="lane-card__eyebrow">${escapeHtml(card.eyebrow)}</p>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.body)}</p>
    </article>
  `);
}

function renderLanes() {
  const container = document.getElementById("lanes-grid");
  renderCards(container, laneCards, (lane) => `
    <article class="lane-card" data-lane="${escapeHtml(lane.id)}">
      <p class="lane-card__eyebrow">${escapeHtml(lane.eyebrow)}</p>
      <h3>${escapeHtml(lane.title)}</h3>
      <p>${escapeHtml(lane.summary)}</p>
      <p>${escapeHtml(lane.lead)}</p>
      <ul class="lane-card__list">
        ${lane.bestFor.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <div class="lane-card__tags">
        ${lane.focus.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="lane-card__actions">
        <button type="button" class="button button--primary" data-set-lane="${escapeHtml(lane.id)}">Use this lane</button>
        <a class="lane-card__source" href="${escapeHtml(lane.source)}" target="_blank" rel="noreferrer">Open index</a>
      </div>
    </article>
  `);

  container.querySelectorAll("[data-set-lane]").forEach((button) => {
    button.addEventListener("click", () => {
      const laneId = button.getAttribute("data-set-lane");
      const lane = laneCards.find((item) => item.id === laneId);
      if (!lane) {
        return;
      }
      form.elements.sport.value = lane.id;
      form.elements.objective.value = lane.defaultObjective;
      renderAll();
      document.getElementById("console").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderTemplates() {
  const container = document.getElementById("templates-grid");
  renderCards(container, templateGroups, (group) => `
    <article class="template-card">
      <p class="template-card__eyebrow">${escapeHtml(group.eyebrow)}</p>
      <h3>${escapeHtml(group.title)}</h3>
      <p>${escapeHtml("Representative archetypes.")}</p>
      <ul class="template-card__list">
        ${group.items.map((item) => `<li><a href="${escapeHtml(linkHref(item.file))}" target="_blank" rel="noreferrer">${escapeHtml(item.name)}</a></li>`).join("")}
      </ul>
      <div class="template-card__actions">
        <a class="button" href="${escapeHtml(group.source)}" target="_blank" rel="noreferrer">Open folder index</a>
      </div>
    </article>
  `);
}

function renderKnowledge() {
  const container = document.getElementById("knowledge-grid");
  renderCards(container, knowledgeShelves, (shelf) => `
    <article class="knowledge-card">
      <p class="knowledge-card__eyebrow">${escapeHtml(shelf.eyebrow)}</p>
      <h3>${escapeHtml(shelf.title)}</h3>
      <p>${escapeHtml(shelf.body)}</p>
      <div class="knowledge-card__links">
        ${shelf.links.map((link) => `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("")}
      </div>
    </article>
  `);
}

function renderGeneratedPrograms() {
  const container = document.getElementById("generated-programs-grid");
  renderCards(container, generatedPrograms, (program) => `
    <article class="generated-card">
      <p class="generated-card__eyebrow">${escapeHtml(program.eyebrow)}</p>
      <div class="generated-card__header">
        <h3>${escapeHtml(program.title)}</h3>
        <span class="pill">${escapeHtml(program.generated)}</span>
      </div>
      <p>${escapeHtml(program.summary)}</p>
      <div class="generated-card__columns">
        <section>
          <strong>Constraints</strong>
          <ul class="generated-card__list">
            ${program.constraints.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
        <section>
          <strong>Weekly split</strong>
          <ul class="generated-card__list">
            ${program.split.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
      </div>
      <div class="generated-card__actions">
        <a class="button button--primary" href="${escapeHtml(program.download)}" download>Download Excel</a>
      </div>
    </article>
  `);
}

function renderSources() {
  const container = document.getElementById("source-grid");
  renderCards(container, sourceCards, (card) => `
    <article class="source-card">
      <p class="source-card__eyebrow">${escapeHtml(card.eyebrow)}</p>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.body)}</p>
      <div class="source-card__actions">
        <a class="button button--primary" href="${escapeHtml(card.href)}" target="_blank" rel="noreferrer">Open file</a>
      </div>
    </article>
  `);
}

function renderBrief() {
  const values = getValues();
  const lane = laneBySport(values.sport);
  const missing = missingQuestions(values);
  const templates = suggestTemplateNames(values.sport, values.objective);
  const prompt = generatePrompt(values, lane);

  titleNode.textContent = `${lane.title} · ${labelForObjective(values.objective)}`;
  copyNode.value = prompt;

  const summaryBits = [
    {
      label: "Lane",
      body: lane.title,
      accent: lane.eyebrow,
    },
    {
      label: "Primary pattern",
      body: laneMeta[lane.id].pattern,
      accent: "What gets trained first",
    },
    {
      label: "Template family",
      body: templates,
      accent: "Likely racks to pull from",
      list: true,
    },
    {
      label: "What the skill asks next",
      body: missing.length ? [missing[0]] : [laneMeta[lane.id].nextQuestion],
      accent: "Single next question",
      list: true,
    },
    {
      label: "Default bias",
      body: laneMeta[lane.id].rules,
      accent: "Always-on rules",
      list: true,
    },
    {
      label: "Why this fits",
      body: laneMeta[lane.id].promptLead,
      accent: "One-line rationale",
    },
  ];

  summaryNode.innerHTML = summaryBits.map((bit) => `
    <section class="brief-summary-card">
      <strong>${escapeHtml(bit.label)}</strong>
      ${bit.accent ? `<div class="pill-row"><span class="pill">${escapeHtml(bit.accent)}</span></div>` : ""}
      ${
        bit.list
          ? `<ul>${bit.body.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
          : `<p>${escapeHtml(bit.body)}</p>`
      }
    </section>
  `).join("");

  updateQuery(values);
}

function updateQuery(values) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value) {
      params.set(key, value);
    }
  }

  const hash = window.location.hash || "";
  const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${hash}`;
  window.history.replaceState({}, "", nextUrl);
}

function readQuery() {
  const params = new URLSearchParams(window.location.search);
  const preset = presetValues.base;
  const values = {
    sport: params.get("sport") || preset.sport,
    objective: params.get("objective") || preset.objective,
    timeline: params.get("timeline") || "",
    equipment: params.get("equipment") || preset.equipment,
    days: params.get("days") || preset.days,
    session: params.get("session") || preset.session,
    bests: params.get("bests") || "",
    limits: params.get("limits") || "",
    notes: params.get("notes") || "",
  };

  setValues(values);
}

function bindPresets() {
  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presetValues[button.dataset.preset];
      if (!preset) {
        return;
      }
      setValues({
        ...preset,
      });
      renderAll();
      form.elements.timeline.focus();
    });
  });
}

async function copyText(text, button) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.setAttribute("readonly", "true");
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
    }

    if (button) {
      const original = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    }
  } catch (error) {
    console.error("Copy failed:", error);
  }
}

function renderAll() {
  renderBrief();
}

function init() {
  renderHow();
  renderRules();
  renderKnowledge();
  renderLanes();
  renderTemplates();
  renderGeneratedPrograms();
  renderSources();
  bindPresets();
  readQuery();
  renderAll();

  form.addEventListener("input", renderAll);
  form.addEventListener("change", renderAll);

  copyBriefButton.addEventListener("click", () => {
    copyText(copyNode.value, copyBriefButton);
  });

  copyLinkButton.addEventListener("click", () => {
    copyText(window.location.href, copyLinkButton);
  });
}

init();

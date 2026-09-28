#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

let artifact;
try {
  artifact = createRequire(import.meta.url)("@oai/artifact-tool");
} catch {
  const dependencies = process.env.CODEX_ARTIFACT_NODE_MODULES || path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules");
  try { artifact = createRequire(path.join(dependencies, "_resolver.cjs"))("@oai/artifact-tool"); }
  catch { throw new Error("@oai/artifact-tool is unavailable. Use the configured Codex workspace dependencies or set CODEX_ARTIFACT_NODE_MODULES."); }
}
const { SpreadsheetFile, Workbook } = artifact;

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/render-workbook.mjs program.json output.xlsx");
  process.exit(2);
}
const program = JSON.parse(await fs.readFile(input, "utf8"));
if (program.schemaVersion !== 1 || !Array.isArray(program.mesocycles)) throw new Error("Expected a valid Strength Coach program JSON file");
const wb = Workbook.create();
const overview = wb.worksheets.add("Overview");
const schedule = wb.worksheets.add("Program");
const log = wb.worksheets.add("Training Log");
for (const sheet of [overview, schedule, log]) sheet.showGridLines = false;
const ink = "#17312E", teal = "#116A59", rust = "#B64F31", cream = "#F6F2E8";
const title = (sheet, range, text) => {
  sheet.getRange(range).merge();
  sheet.getRange(range.split(":")[0]).values = [[text]];
  sheet.getRange(range).format = { fill: ink, font: { name: "Aptos", bold: true, size: 18, color: "#FFFFFF" }, rowHeight: 34 };
};
const header = (sheet, range) => {
  sheet.getRange(range).format = { fill: teal, font: { name: "Aptos", bold: true, color: "#FFFFFF" }, rowHeight: 25 };
};
title(overview, "A1:F1", program.title);
overview.getRange("A3:B7").values = [
  ["Sport", program.sport || "Strength"], ["Objective", program.objective || "Program"],
  ["Summary", program.summary || ""], ["Rationale", program.rationale || ""],
  ["Mesocycles", program.mesocycles.length],
];
overview.getRange("A9:B9").values = [["Phase", "Coaching focus"]];
header(overview, "A9:B9");
const phaseRows = program.mesocycles.map((m) => [m.title, m.rationale || m.focus || ""]);
if (phaseRows.length) overview.getRangeByIndexes(9, 0, phaseRows.length, 2).values = phaseRows;
const assumptionStart = 11 + phaseRows.length;
overview.getRangeByIndexes(assumptionStart - 1, 0, 1, 2).values = [["Assumptions", "Review before starting"]];
header(overview, `A${assumptionStart}:B${assumptionStart}`);
const assumptionRows = (program.assumptions || []).map((item, index) => [`${index + 1}`, item]);
if (assumptionRows.length) overview.getRangeByIndexes(assumptionStart, 0, assumptionRows.length, 2).values = assumptionRows;
overview.getRange("A:A").format.columnWidth = 22;
overview.getRange("B:B").format.columnWidth = 94;
overview.getRange("A3:B30").format.wrapText = true;
overview.getRange("A3:B30").format.rowHeight = 30;
overview.getRange("A1:F1").format.rowHeight = 38;

title(schedule, "A1:I1", `${program.title} · planned work`);
schedule.getRange("A3:I3").values = [["Mesocycle", "Week", "Phase", "Day", "Focus", "Exercise", "Prescription", "Primary muscles", "Coach note"]];
header(schedule, "A3:I3");
const rows = [];
for (const mesocycle of program.mesocycles) {
  for (const week of mesocycle.weeks) {
    for (const day of [...week.days].sort((a, b) => a.weekday - b.weekday)) {
      for (const exercise of day.exercises) rows.push([
        mesocycle.title, week.number, week.phase || "", ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][day.weekday],
        day.title, exercise.name, exercise.prescription, (exercise.primaryMuscles || []).join(", "),
        [exercise.reason, exercise.cue, exercise.note].filter(Boolean).join(" "),
      ]);
    }
  }
}
if (rows.length) schedule.getRangeByIndexes(3, 0, rows.length, 9).values = rows;
for (const [col, width] of Object.entries({ A: 20, B: 9, C: 17, D: 9, E: 27, F: 34, G: 38, H: 27, I: 65 })) schedule.getRange(`${col}:${col}`).format.columnWidth = width;
schedule.getRangeByIndexes(3, 0, Math.max(rows.length, 1), 9).format.wrapText = true;
schedule.freezePanes.freezeRows(3);

title(log, "A1:J1", `${program.title} · training log`);
log.getRange("A3:J3").values = [["Week", "Day", "Exercise", "Planned work", "Load used", "Actual sets × reps", "Actual RPE", "Completed?", "Session notes", "Coach cue"]];
header(log, "A3:J3");
const logRows = rows.map((row) => [row[1], row[3], row[5], row[6], "", "", "", "", "", row[8]]);
if (logRows.length) log.getRangeByIndexes(3, 0, logRows.length, 10).values = logRows;
for (const [col, width] of Object.entries({ A: 9, B: 9, C: 34, D: 40, E: 15, F: 22, G: 15, H: 15, I: 36, J: 60 })) log.getRange(`${col}:${col}`).format.columnWidth = width;
log.getRangeByIndexes(3, 4, Math.max(logRows.length, 1), 5).format.fill = cream;
log.getRangeByIndexes(3, 0, Math.max(logRows.length, 1), 10).format.wrapText = true;
log.freezePanes.freezeRows(3);

wb.recalculate();
await fs.mkdir(path.dirname(path.resolve(output)), { recursive: true });
const file = await SpreadsheetFile.exportXlsx(wb);
await file.save(output);
await fs.rm(`${output}.inspect.ndjson`, { force: true });
console.log(`Wrote ${output} (${rows.length} prescriptions)`);

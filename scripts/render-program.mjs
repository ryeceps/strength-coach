#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { validateProgram } = require("../program-doc/core.js");
const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/render-program.mjs program.json output.html");
  process.exit(2);
}
const program = validateProgram(JSON.parse(fs.readFileSync(input, "utf8")));
const base = path.resolve(import.meta.dirname, "../program-doc");
const css = fs.readFileSync(path.join(base, "report.css"), "utf8");
const core = fs.readFileSync(path.join(base, "core.js"), "utf8");
const runtime = fs.readFileSync(path.join(base, "report.js"), "utf8");
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const data = JSON.stringify(program).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="description" content="Interactive Strength Coach program: ${escapeHtml(program.summary.slice(0, 155))}"><title>${escapeHtml(program.title)} · Strength Coach</title><style>${css}</style></head>
<body><div id="app"><p>Loading your program…</p></div><noscript><p>This document needs JavaScript to show its interactive program. Enable JavaScript or use the companion workbook.</p></noscript><script id="program-data" type="application/json">${data}</script><script>${core}</script><script>${runtime}</script></body></html>`;
fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
fs.writeFileSync(output, html, "utf8");
console.log(`Wrote ${output}`);

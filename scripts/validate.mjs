#!/usr/bin/env node
/**
 * Validates config/mvp.js and config/evidence.js.
 *
 * The config files are browser scripts that assign to `window`, so we run
 * them in a small sandbox with a fake `window` and then check the shape.
 * Exits 1 with a list of problems if anything required is missing.
 *
 *   node scripts/validate.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];

function load(file) {
  const src = readFileSync(join(root, file), "utf8");
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(src, sandbox, { filename: file });
  } catch (err) {
    problems.push(`${file}: does not parse or run: ${err.message}`);
    return {};
  }
  return sandbox.window;
}

function req(obj, path, type, where) {
  const value = path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
  const ok =
    type === "array" ? Array.isArray(value) && value.length > 0
    : type === "string" ? typeof value === "string" && value.trim().length > 0
    : type === "number" ? typeof value === "number" && !Number.isNaN(value)
    : type === "boolean" ? typeof value === "boolean"
    : typeof value === "object" && value !== null;
  if (!ok) problems.push(`${where}: '${path}' must be a non-empty ${type}`);
  return value;
}

/* ---- config/mvp.js ------------------------------------------------- */
const { MVP } = load("config/mvp.js");
if (!MVP) {
  problems.push("config/mvp.js: must assign window.MVP");
} else {
  const w = "config/mvp.js";
  req(MVP, "brand.council", "string", w);
  req(MVP, "brand.service", "string", w);
  req(MVP, "brand.sandboxNotice", "string", w);

  req(MVP, "mvp.targetUser", "string", w);
  req(MVP, "mvp.userNeed", "string", w);
  req(MVP, "mvp.hypothesis", "string", w);
  const process = req(MVP, "mvp.process", "array", w);
  if (Array.isArray(process) && process.length < 2) problems.push(`${w}: 'mvp.process' needs at least 2 steps`);
  req(MVP, "mvp.acceptanceCriteria", "array", w);
  req(MVP, "mvp.successMeasure.name", "string", w);
  req(MVP, "mvp.successMeasure.target", "string", w);

  const facilities = req(MVP, "facilities", "array", w) || [];
  const ids = new Set();
  facilities.forEach((f, i) => {
    const fw = `${w} facilities[${i}]`;
    req(f, "id", "string", fw);
    req(f, "name", "string", fw);
    req(f, "site", "string", fw);
    req(f, "activity", "string", fw);
    req(f, "slotMinutes", "number", fw);
    req(f, "openingHours.start", "string", fw);
    req(f, "openingHours.end", "string", fw);
    if (typeof f.pricePence !== "number") problems.push(`${fw}: 'pricePence' must be a number (0 is fine)`);
    if (f.id && ids.has(f.id)) problems.push(`${fw}: duplicate id '${f.id}'`);
    ids.add(f.id);
    if (f.openingHours && f.openingHours.start >= f.openingHours.end) problems.push(`${fw}: openingHours.start must be before end`);
  });

  const fields = req(MVP, "bookingForm.fields", "array", w) || [];
  const standard = ["name", "email", "phone", "postcode"];
  fields.forEach((f, i) => {
    const id = typeof f === "string" ? f : f && f.id;
    if (!id) problems.push(`${w}: bookingForm.fields[${i}] needs an id`);
    else if (typeof f === "string" && !standard.includes(f)) problems.push(`${w}: bookingForm.fields[${i}] '${f}' is not a standard field; use an object with id and label`);
    else if (typeof f === "object" && !standard.includes(id) && !f.label) problems.push(`${w}: bookingForm.fields[${i}] custom field '${id}' needs a label`);
  });
  if (MVP.bookingForm && MVP.bookingForm.requireBrentPostcode) {
    if (!fields.some((f) => (typeof f === "string" ? f : f.id) === "postcode")) problems.push(`${w}: requireBrentPostcode is true but 'postcode' is not in bookingForm.fields`);
    req(MVP, "bookingForm.brentPostcodePrefixes", "array", w);
  }
}

/* ---- config/evidence.js -------------------------------------------- */
const { EVIDENCE } = load("config/evidence.js");
if (!EVIDENCE) {
  problems.push("config/evidence.js: must assign window.EVIDENCE");
} else {
  const w = "config/evidence.js";
  req(EVIDENCE, "title", "string", w);
  req(EVIDENCE, "period", "string", w);
  req(EVIDENCE, "hypothesisUnderTest", "string", w);
  req(EVIDENCE, "successMeasure.name", "string", w);
  req(EVIDENCE, "successMeasure.target", "string", w);
  req(EVIDENCE, "successMeasure.actual", "string", w);
  const headline = req(EVIDENCE, "headline", "array", w) || [];
  headline.forEach((h, i) => {
    req(h, "label", "string", `${w} headline[${i}]`);
    req(h, "value", "string", `${w} headline[${i}]`);
  });
  const charts = req(EVIDENCE, "charts", "array", w) || [];
  charts.forEach((c, i) => {
    req(c, "title", "string", `${w} charts[${i}]`);
    const items = req(c, "items", "array", `${w} charts[${i}]`) || [];
    items.forEach((it, j) => {
      req(it, "label", "string", `${w} charts[${i}].items[${j}]`);
      req(it, "value", "number", `${w} charts[${i}].items[${j}]`);
    });
  });
  const risks = req(EVIDENCE, "risks", "array", w) || [];
  const riskIds = risks.map((r) => r.id);
  ["value", "usability", "feasibility", "viability"].forEach((id) => {
    if (!riskIds.includes(id)) problems.push(`${w}: risks must include one with id '${id}'`);
  });
  risks.forEach((r, i) => {
    const rw = `${w} risks[${i}]`;
    req(r, "name", "string", rw);
    req(r, "assumption", "string", rw);
    const ev = req(r, "evidence", "array", rw) || [];
    if (!ev.some((e) => e.direction === "against")) problems.push(`${rw}: needs at least one evidence item with direction 'against'`);
    ev.forEach((e, j) => {
      if (!["for", "against", "mixed"].includes(e.direction)) problems.push(`${rw}.evidence[${j}]: direction must be for, against or mixed`);
      req(e, "text", "string", `${rw}.evidence[${j}]`);
    });
  });
  req(EVIDENCE, "decision.prompt", "string", w);
  req(EVIDENCE, "decision.options", "array", w);
}

/* ---- report --------------------------------------------------------- */
if (problems.length) {
  console.error(`Config validation failed with ${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error("  - " + p));
  process.exit(1);
} else {
  console.log("config/mvp.js and config/evidence.js look good.");
  if (MVP) console.log(`  ${MVP.facilities.length} facilities, ${MVP.mvp.process.length} process steps, ${MVP.mvp.acceptanceCriteria.length} acceptance criteria`);
  if (EVIDENCE) console.log(`  ${EVIDENCE.headline.length} headline stats, ${EVIDENCE.charts.length} charts, ${EVIDENCE.risks.length} risks`);
}

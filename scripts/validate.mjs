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
  req(EVIDENCE, "setOutToDo.hypothesis", "string", w);
  req(EVIDENCE, "setOutToDo.measure", "string", w);
  req(EVIDENCE, "setOutToDo.target", "string", w);

  const plan = req(EVIDENCE, "measurementPlan", "array", w) || [];
  plan.forEach((r, i) => {
    const pw = `${w} measurementPlan[${i}]`;
    req(r, "question", "string", pw);
    req(r, "metric", "string", pw);
    req(r, "source", "string", pw);
    req(r, "result", "string", pw);
  });

  const headline = req(EVIDENCE, "whatHappened", "array", w) || [];
  headline.forEach((h, i) => {
    req(h, "label", "string", `${w} whatHappened[${i}]`);
    req(h, "value", "string", `${w} whatHappened[${i}]`);
  });
  const charts = req(EVIDENCE, "userBehaviour", "array", w) || [];
  charts.forEach((c, i) => {
    req(c, "title", "string", `${w} userBehaviour[${i}]`);
    const items = req(c, "items", "array", `${w} userBehaviour[${i}]`) || [];
    items.forEach((it, j) => {
      req(it, "label", "string", `${w} userBehaviour[${i}].items[${j}]`);
      req(it, "value", "number", `${w} userBehaviour[${i}].items[${j}]`);
    });
  });

  req(EVIDENCE, "impact.actual", "string", w);
  req(EVIDENCE, "impact.targetMet", "string", w);
  const caveats = req(EVIDENCE, "impact.caveats", "array", w) || [];
  caveats.forEach((c, i) => {
    req(c, "name", "string", `${w} impact.caveats[${i}]`);
    req(c, "text", "string", `${w} impact.caveats[${i}]`);
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

/* ---- config/discovery.js ------------------------------------------- */
const { DISCOVERY } = load("config/discovery.js");
if (!DISCOVERY) {
  problems.push("config/discovery.js: must assign window.DISCOVERY");
} else {
  const w = "config/discovery.js";
  req(DISCOVERY, "stage.title", "string", w);
  req(DISCOVERY, "stage.question", "string", w);
  req(DISCOVERY, "brief.askedFor", "string", w);
  req(DISCOVERY, "brief.whoAsked", "string", w);
  const sh = req(DISCOVERY, "stakeholders", "array", w) || [];
  if (sh.length < 3) problems.push(`${w}: need at least 3 stakeholders`);
  sh.forEach((s, i) => {
    const sw = `${w} stakeholders[${i}]`;
    req(s, "name", "string", sw);
    if (!["high", "low"].includes(s.power)) problems.push(`${sw}: power must be "high" or "low"`);
    if (!["high", "low"].includes(s.interest)) problems.push(`${sw}: interest must be "high" or "low"`);
    req(s, "wants", "string", sw);
  });
  const sections = req(DISCOVERY, "interviewGuide.sections", "array", w) || [];
  sections.forEach((s, i) => { req(s, "audience", "string", `${w} interviewGuide.sections[${i}]`); req(s, "questions", "array", `${w} interviewGuide.sections[${i}]`); });
  req(DISCOVERY, "dataAnalysis.stats", "array", w);
  const lanes = req(DISCOVERY, "asIsProcess.lanes", "array", w) || [];
  const steps = req(DISCOVERY, "asIsProcess.steps", "array", w) || [];
  steps.forEach((s, i) => {
    req(s, "text", "string", `${w} asIsProcess.steps[${i}]`);
    if (!lanes.includes(s.lane)) problems.push(`${w} asIsProcess.steps[${i}]: lane '${s.lane}' is not in asIsProcess.lanes`);
  });
  req(DISCOVERY, "assumptions", "array", w);
  ["who", "needsTo", "because", "today", "resultsIn"].forEach((k) => req(DISCOVERY, `problemStatement.${k}`, "string", w));
}

/* ---- config/define.js ---------------------------------------------- */
const { DEFINE } = load("config/define.js");
if (!DEFINE) {
  problems.push("config/define.js: must assign window.DEFINE");
} else {
  const w = "config/define.js";
  req(DEFINE, "stage.title", "string", w);
  req(DEFINE, "stage.endsWith", "array", w);
  req(DEFINE, "problemStatement", "string", w);
  const groups = req(DEFINE, "userGroups", "array", w) || [];
  groups.forEach((g, i) => { req(g, "name", "string", `${w} userGroups[${i}]`); req(g, "who", "string", `${w} userGroups[${i}]`); });
  if (groups.length && !groups.some((g) => g.primary)) problems.push(`${w}: one userGroup must have primary: true`);
  req(DEFINE, "userNeeds", "array", w);
  req(DEFINE, "businessNeeds", "array", w);
  ["ifWe", "then", "because", "leadingTo", "measuredBy"].forEach((k) => req(DEFINE, `theoryOfChange.${k}`, "string", w));
  req(DEFINE, "hypothesis", "string", w);
  const tl = req(DEFINE, "toBeProcess.lanes", "array", w) || [];
  const ts = req(DEFINE, "toBeProcess.steps", "array", w) || [];
  ts.forEach((s, i) => {
    req(s, "text", "string", `${w} toBeProcess.steps[${i}]`);
    if (!tl.includes(s.lane)) problems.push(`${w} toBeProcess.steps[${i}]: lane '${s.lane}' is not in toBeProcess.lanes`);
  });
  const acts = req(DEFINE, "storyMap.activities", "array", w) || [];
  const storyIds = new Set();
  let mvpCount = 0;
  acts.forEach((a, i) => {
    const aw = `${w} storyMap.activities[${i}]`;
    req(a, "name", "string", aw);
    const stories = req(a, "stories", "array", aw) || [];
    stories.forEach((s, j) => {
      const sw = `${aw}.stories[${j}]`;
      req(s, "id", "string", sw);
      req(s, "title", "string", sw);
      if (!["mvp", "later"].includes(s.release)) problems.push(`${sw}: release must be "mvp" or "later"`);
      if (s.release === "mvp") mvpCount++;
      if (s.id && storyIds.has(s.id)) problems.push(`${sw}: duplicate story id '${s.id}'`);
      storyIds.add(s.id);
      const acs = req(s, "acceptanceCriteria", "array", sw) || [];
      acs.forEach((ac, k) => ["given", "when", "then"].forEach((f) => req(ac, f, "string", `${sw}.acceptanceCriteria[${k}]`)));
    });
  });
  if (acts.length && !mvpCount) problems.push(`${w}: at least one story must have release "mvp"`);
  const sm = req(DEFINE, "successMeasures", "array", w) || [];
  sm.forEach((m, i) => { req(m, "name", "string", `${w} successMeasures[${i}]`); req(m, "target", "string", `${w} successMeasures[${i}]`); req(m, "source", "string", `${w} successMeasures[${i}]`); });
}

/* ---- report --------------------------------------------------------- */
if (problems.length) {
  console.error(`Config validation failed with ${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error("  - " + p));
  process.exit(1);
} else {
  console.log("All four config files look good.");
  if (MVP) console.log(`  mvp.js: ${MVP.facilities.length} facilities, ${MVP.mvp.process.length} process steps, ${MVP.mvp.acceptanceCriteria.length} acceptance criteria`);
  if (DISCOVERY) console.log(`  discovery.js: ${DISCOVERY.stakeholders.length} stakeholders, ${DISCOVERY.asIsProcess.steps.length} as-is steps, ${DISCOVERY.assumptions.length} assumptions`);
  if (DEFINE) console.log(`  define.js: ${DEFINE.userGroups.length} user groups, ${DEFINE.storyMap.activities.reduce((n, a) => n + a.stories.length, 0)} stories, ${DEFINE.successMeasures.length} measures`);
  if (EVIDENCE) console.log(`  evidence.js: ${EVIDENCE.measurementPlan.length} measurement plan rows, ${EVIDENCE.whatHappened.length} headline stats, ${EVIDENCE.userBehaviour.length} charts, ${EVIDENCE.risks.length} risks`);
}

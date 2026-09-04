#!/usr/bin/env node
/**
 * Builds handout.html: a standalone, single-file revision handout for after
 * the session. Reads the four configs (which are browser scripts assigning to
 * `window`) in a small sandbox, renders everything the group produced, and
 * writes one HTML file with inline CSS, no scripts and no external requests.
 *
 *   node scripts/build-handout.mjs
 *
 * Re-run after a hand-in if the facilitator wants the handout refreshed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://malexander-11.github.io/BookingSystem/";

function load(file) {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(join(root, file), "utf8"), sandbox, { filename: file });
  return sandbox.window;
}
const DISC = load("config/discovery.js").DISCOVERY || {};
const D = load("config/define.js").DEFINE || {};
const MVP = load("config/mvp.js").MVP || {};
const E = load("config/evidence.js").EVIDENCE || {};

/* ---- tiny renderers ---------------------------------------------------- */
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const list = (items, tag = "ul", cls = "") => `<${tag}${cls ? ` class="${cls}"` : ""}>${items.map((i) => `<li>${i}</li>`).join("")}</${tag}>`;
const dl = (pairs) => `<dl class="facts">${pairs.filter((p) => p[1]).map((p) => `<dt>${esc(p[0])}</dt><dd>${esc(p[1])}</dd>`).join("")}</dl>`;
const table = (headers, rows) => `<div class="scroll"><table><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<strong>${esc(c)}</strong>` : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const chain = (t, cls = "") => `<ol class="chain ${cls}">${[["If we", t.ifWe], ["then", t.then], ["because", t.because], ["leading to", t.leadingTo]].map((p) => `<li><span class="chain__label">${esc(p[0])}</span>${esc(p[1] || "")}</li>`).join("")}</ol>`;
const h2 = (n, text) => `<h2 id="s${n}"><span class="num">${n}</span>${esc(text)}</h2>`;
const panel = (title, inner) => `<div class="panel"><h3>${esc(title)}</h3>${inner}</div>`;

function hashStr(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function measureResult(m) {
  const text = (m.name || "").toLowerCase();
  for (const rule of E.measureResults || []) {
    if ((rule.match || []).some((k) => text.includes(k.toLowerCase()))) return rule;
  }
  const d = E.measureResultDefault || { value: "+{n}%", detail: "change over the pilot", tone: "neutral", but: "" };
  return { value: (d.value || "").replace("{n}", 2 + (hashStr(text) % 9)), detail: d.detail, tone: d.tone, but: d.but };
}

/* ---- content ----------------------------------------------------------- */
let body = "";

/* 1. Golden thread */
const STAGES = [
  ["1 Discover", "discover.html", "A problem statement everyone in the room recognised as true."],
  ["2 Define", "define.html", "Who first, which business need first, a theory of change, a to-be process, a story map and success measures."],
  ["3 Build", "index.html", "A booking site built only from what was above the MVP line."],
  ["4 Evaluate", "evaluate.html", "Fake pilot results against your own measures, and the question: so what next?"]
];
body += h2(1, "The golden thread") +
  "<p>Business analysis is the discipline of making sure the right problem gets solved before anyone spends money solving it. The session ran the four stages in order, and each stage produced one thing the next stage needed. That chain, from problem to decision, is the golden thread. If any link is missing you cannot say afterwards whether the work was worth doing.</p>" +
  `<div class="cards">${STAGES.map((s) => `<div class="card"><h3><a href="${SITE}${s[1]}">${esc(s[0])}</a></h3><p>${esc(s[2])}</p></div>`).join("")}</div>`;

/* 2. Discover */
const ps = DISC.problemStatement || {};
const gs = (DISC.interviewGuide || {}).stakeholders || {}, gu = (DISC.interviewGuide || {}).users || {};
body += h2(2, "Discover: understand before you build") +
  "<p>The brief arrived as a solution: a booking platform. Discover is where you refuse to take that at face value and find out what is actually going on. You used five tools, in this order.</p>" +
  list([
    "<strong>Stakeholder map.</strong> Who can stop this, and who cares? Power against interest, so you know whom to keep close and whom to keep informed.",
    "<strong>Interviews.</strong> Stakeholders tell you what outcome they are on the hook for. Users tell you what happened last time. Both are evidence; neither is the whole story.",
    "<strong>Data analysis.</strong> What the numbers can and cannot answer. Incomplete, fuzzy data is normal; the skill is knowing which gaps matter.",
    "<strong>As-is process map.</strong> Where the current process hurts, step by step, and for whom.",
    "<strong>Risky assumptions.</strong> The beliefs the whole idea rests on, ranked by how much damage they do if wrong, with the cheapest way to test each."
  ]) +
  "<h3>Your problem statement</h3>" +
  dl([["Who", ps.who], ["Needs to", ps.needsTo], ["Because", ps.because], ["Today they", ps.today], ["Which results in", ps.resultsIn]]) +
  dl([["Agreement", ps.agreement], ["Size of the prize", ps.sizeOfPrize], ["Watch out for", ps.watchOuts]]) +
  (ps.note ? `<div class="callout"><strong>What this leaves open.</strong> ${esc(ps.note)}</div>` : "") +
  "<h3>Interview tips worth keeping</h3>" +
  `<div class="two">${panel(gs.title || "Stakeholders", list((gs.tips || []).map(esc)))}${panel(gu.title || "Users", list((gu.tips || []).map(esc)))}</div>`;

/* 3. Define */
const groups = D.userGroups || [], needs = D.businessNeeds || [], proc = D.toBeProcess || { lanes: [], steps: [] };
const mvpStories = [], laterStories = [];
for (const a of (D.storyMap && D.storyMap.activities) || []) for (const s of a.stories || []) (s.release === "mvp" ? mvpStories : laterStories).push(`${s.id} ${s.title}`);
body += h2(3, "Define: decide what to build first") +
  "<p>Define turns one agreed problem into one small, testable plan. Every choice here is a trade-off, and the point of writing it down is so you can say later who it was for and who lost out.</p>" +
  "<h3>User groups, in your priority order</h3>" +
  list(groups.map((g) => `<strong>${esc(g.name)}${g.primary ? " (primary: the MVP is designed around them)" : ""}.</strong> ${esc(g.who)}`), "ol") +
  "<h3>Business needs, in your priority order</h3>" +
  list(needs.map((n) => `<strong>${esc(n.need)}.</strong> ${esc(n.why || "")}`), "ol") +
  "<h3>Your theory of change</h3>" +
  "<p>Each link is a claim about the world. Evaluation tests the links one at a time, which is why a vague link cannot be evaluated.</p>" +
  chain(D.theoryOfChange || {}) +
  `<p><strong>In one line:</strong> ${esc(D.hypothesis || "")}</p>` +
  "<h3>The to-be process</h3>" +
  list((proc.steps || []).map((s) => `<span class="lane">${esc(s.lane)}</span>${esc(s.text)}`), "ol", "process") +
  "<h3>The story map</h3>" +
  "<p>Stories above the line are the MVP. Everything else waits until the evidence says it is needed.</p>" +
  `<div class="two">${panel(`In the MVP (${mvpStories.length})`, list(mvpStories.map(esc)))}${panel(`Later (${laterStories.length})`, list(laterStories.map(esc)))}</div>` +
  "<h3>Success measures</h3>" +
  "<p>You named the measure and its source. The target, baseline and guard-rail were added afterwards, and they are the first thing to challenge: a target with no baseline is a guess, and a measure with no guard-rail can be hit by doing harm somewhere else.</p>" +
  table(["Measure", "Source", "Target", "Baseline", "Guard-rail"], (D.successMeasures || []).map((m) => [m.name, m.source || "", m.target || "", m.baseline || "", m.guardRail || ""]));

/* 4. Build */
const m = MVP.mvp || {};
body += h2(4, "Build: the smallest thing that tests the idea") +
  "<p>An MVP is not a small version of the final product. It is the least you can build to find out whether the theory of change is true. The booking site was built from your Define hand-in and nothing else.</p>" +
  dl([["Target user", m.targetUser], ["User need", m.userNeed], ["Hypothesis", m.hypothesis], ["Success measure", m.successMeasure ? `${m.successMeasure.name}. Target: ${m.successMeasure.target}` : ""]]) +
  `<p><strong>The journey:</strong> ${(m.process || []).map(esc).join(" &rarr; ")}</p>` +
  "<h3>Acceptance criteria</h3>" +
  "<p>Plain sentences that say when a story is done. If you cannot test it, it is not an acceptance criterion.</p>" +
  list((m.acceptanceCriteria || []).map(esc)) +
  '<p class="muted">In the sandbox, payment, reminders, reception amendments and block bookings are described rather than built. That is normal for a prototype: the point was to test the journey, not the plumbing.</p>';

/* 5. Evaluate */
const t = D.theoryOfChange || {}, so = E.setOutToDo || {};
const results = (D.successMeasures || []).map((mm) => ({ name: mm.name, ...measureResult(mm) }));
const caveats = (E.impact && E.impact.caveats) || [];
body += h2(5, "Evaluate: did it work, and for whom?") +
  "<p>Evaluation is a set of questions asked in order. Skip one and the numbers will answer a question you never asked.</p>" +
  list(["What did we set out to do?", "What do the numbers say?", "What do the numbers not tell us?", "So what next?"], "ol", "questions") +
  "<h3>One question per link</h3>" +
  table(["Link", "Your claim", "The evaluation question"], [
    ["If we", t.ifWe || "", "Did we actually build and run it? Did people find it?"],
    ["then", t.then || "", "Did the behaviour change? For whom? Compared with what?"],
    ["because", t.because || "", "Was the belief right? What did users say the barrier was?"],
    ["leading to", t.leadingTo || "", "Did the outcome move, or did activity just move channel?"]
  ]) +
  "<h3>The pilot results you were shown</h3>" +
  "<p>Fictional, generated from your measures. Notice that every result comes with a <em>but</em>: that is not pessimism, it is the part of the evaluation that stops a number being mistaken for an answer.</p>" +
  list(results.map((r) => `<strong>${esc(r.name)}:</strong> ${esc(r.value)} ${esc(r.detail)}.<br><span class="but">But: ${esc(r.but)}</span>`), "ul", "results") +
  (caveats.length ? `<h3>Four reasons a good number can mislead</h3><dl class="glossary">${caveats.map((c) => `<dt>${esc(c.name)}</dt><dd>${esc(c.text)}</dd>`).join("")}</dl>` : "") +
  "<h3>So what next?</h3>" +
  `<p>The last question is a decision, and it is only honest if you decided what success meant before the numbers arrived. Your first measure was <em>${esc(so.measure || "")}</em>, target <em>${esc(so.target || "")}</em>, guard-rail <em>${esc(so.guardRail || "")}</em>.</p>` +
  list([
    "<strong>Invest:</strong> it worked well enough to put more money and sites behind it.",
    "<strong>Iterate:</strong> keep the direction, change specific things, run it again.",
    "<strong>Pause:</strong> stop spending until the missing evidence is in.",
    "<strong>Pivot:</strong> keep the goal, change the solution.",
    "<strong>Stop:</strong> switch it off and put the effort somewhere else."
  ]);

/* 6. Takeaways */
body += h2(6, "Ten things to take back to your desk") +
  list([
    "Start with the problem, not the solution you were handed. Ask what outcome the sponsor wants to get at, and by when.",
    "Write down every number a stakeholder mentions. It is usually important for a reason.",
    "A problem statement is done when the CFO and the reception desk both recognise it as true.",
    "Prioritising means someone loses. Name who, and say it out loud before the build, not after.",
    "Every link in a theory of change is a claim you can test. If a link cannot be tested, it is a hope, not a theory.",
    "The MVP is the least you can build to test the riskiest assumption. Features that do not test anything wait.",
    "An acceptance criterion is a sentence someone can check. Given, when, then.",
    "A target without a baseline is a guess. Find out what today's number is before you promise to move it.",
    "Add a guard-rail to every measure. Hitting the target by doing harm elsewhere is not success.",
    "Decide what failure looks like before the numbers arrive. Then, when they arrive, ask what they do not tell you: substitution, counterfactual, novelty, self-report."
  ].map(esc), "ol", "takeaways");

/* 7. Glossary */
const GLOSSARY = [
  ["Problem statement", "One paragraph: who, needs to, because, today they, which results in. Agreed before any solution is discussed."],
  ["Stakeholder map", "A grid of power against interest. Tells you whom to manage closely, keep satisfied, keep informed or simply monitor."],
  ["Risky assumption", "A belief the plan depends on, that would sink it if wrong. Rank by damage, then test the riskiest cheaply."],
  ["Theory of change", "If we do X, then people will do Y, because Z, leading to outcome W. Four links, each testable."],
  ["Hypothesis", "The theory of change in one sentence, written so a pilot can prove it wrong."],
  ["MVP", "Minimum viable product: the smallest thing that lets you learn whether the hypothesis holds."],
  ["User story", "As a (who), I need (what), so that (why). The unit of a story map."],
  ["Acceptance criteria", "Given (a situation), when (an action), then (a checkable result). Says when a story is done."],
  ["Success measure", "A number you will count, and where it comes from. Needs a target, a baseline and a guard-rail to be useful."],
  ["Baseline", "Today's value of a measure, before the change. Without it you cannot say whether a number went up or down."],
  ["Guard-rail", "A measure that must not get worse while you chase the target."],
  ["Failure demand", "Demand caused by a service not working: calls about the website, abandoned journeys, repeat visits."],
  ["Substitution", "Activity that moved channel rather than being new. A phone booking that became an online booking is not new demand."],
  ["Counterfactual", "What would have happened anyway. Two changes launched in the same week cannot be told apart."],
  ["Novelty", "An early lift that fades. Weeks one and two are not the same as weeks five and six."],
  ["Self-report", "Data people give about themselves. Cheap to collect, easy to get wrong, and shaped by how the question is asked."]
];
body += h2(7, "Glossary") + `<dl class="glossary">${GLOSSARY.map((x) => `<dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd>`).join("")}</dl>`;

/* ---- document ---------------------------------------------------------- */
const CSS = `
:root { --blue: #0964b9; --blue-dark: #085093; --green: #1c7a4b; --ink: #0b0c0c; --muted: #505a5f; --rule: #b1b4b6; --surface: #f3f2f1; }
* { box-sizing: border-box; }
html { color-scheme: light; }
body { margin: 0; padding: 0 20px 60px; font: 18px/1.5 -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: var(--ink); background: #fff; }
main { max-width: 760px; margin: 0 auto; }
.eyebrow { margin: 40px 0 5px; font-size: 15px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--blue); }
h1 { margin: 0 0 15px; font-size: 34px; line-height: 1.15; color: var(--blue-dark); }
.lede { font-size: 20px; margin: 0 0 10px; }
.sandbox { margin: 0 0 40px; padding: 10px 15px; background: var(--surface); border-left: 6px solid var(--blue); font-size: 15px; color: var(--muted); }
h2 { margin: 50px 0 15px; padding-top: 25px; border-top: 1px solid var(--rule); font-size: 26px; line-height: 1.2; color: var(--blue-dark); }
h2 .num { display: inline-block; min-width: 36px; height: 36px; margin-right: 10px; border-radius: 50%; background: var(--blue); color: #fff; font-size: 18px; line-height: 36px; text-align: center; }
h3 { margin: 30px 0 10px; font-size: 20px; line-height: 1.25; }
p, ul, ol, dl { margin: 0 0 20px; }
li { margin-bottom: 8px; }
a { color: var(--blue); }
.muted { color: var(--muted); font-size: 16px; }
.cards, .two { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 0 0 20px; }
.card, .panel { padding: 15px 18px; border: 1px solid var(--rule); border-radius: 6px; background: #fff; }
.card h3, .panel h3 { margin: 0 0 8px; font-size: 17px; }
.card p, .panel ul { margin: 0; font-size: 16px; }
.panel ul { padding-left: 20px; }
.panel li { margin-bottom: 6px; }
.facts { display: grid; grid-template-columns: 160px 1fr; gap: 6px 15px; }
.facts dt { font-weight: 700; }
.facts dd { margin: 0; }
.callout { margin: 0 0 20px; padding: 12px 15px; border-left: 6px solid var(--blue); background: var(--surface); }
.chain { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.chain li { padding: 10px 12px; border: 1px solid var(--rule); border-top: 4px solid var(--green); border-radius: 4px; background: #fff; margin: 0; }
.chain__label { display: block; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--green); margin-bottom: 3px; }
.process { padding-left: 24px; }
.process li { margin-bottom: 10px; }
.lane { display: inline-block; min-width: 130px; margin-right: 8px; padding: 0 8px; border-radius: 3px; background: var(--surface); font-size: 14px; font-weight: 700; color: var(--blue-dark); }
.scroll { overflow-x: auto; margin: 0 0 20px; }
table { border-collapse: collapse; width: 100%; font-size: 16px; }
th, td { padding: 8px 12px 8px 0; border-bottom: 1px solid var(--rule); text-align: left; vertical-align: top; }
th { font-weight: 700; }
.questions li, .takeaways li { margin-bottom: 10px; }
.results li { margin-bottom: 14px; }
.but { color: var(--muted); font-size: 16px; }
.glossary { display: grid; grid-template-columns: 180px 1fr; gap: 8px 20px; }
.glossary dt { font-weight: 700; }
.glossary dd { margin: 0; }
footer { max-width: 760px; margin: 50px auto 0; padding-top: 15px; border-top: 1px solid var(--rule); font-size: 15px; color: var(--muted); }
@media (max-width: 640px) {
  body { font-size: 16px; }
  h1 { font-size: 28px; } h2 { font-size: 22px; }
  .cards, .two, .chain { grid-template-columns: 1fr; }
  .facts, .glossary { grid-template-columns: 1fr; gap: 2px 0; }
  .facts dd, .glossary dd { margin-bottom: 10px; }
  .lane { display: block; min-width: 0; width: max-content; margin-bottom: 3px; }
}
@media print {
  body { font-size: 12pt; padding: 0; color: #000; }
  h2 { break-after: avoid; }
  .card, .panel, .chain, table, .callout, .results li { break-inside: avoid; }
  a { color: #000; text-decoration: none; }
}
`;

const generated = new Date().toISOString().slice(0, 10);
const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>After the session: what we did and why</title>
<style>${CSS}</style>
</head>
<body>
<main>
<p class="eyebrow">Introduction to Business Analysis</p>
<h1>After the session: what we did and why</h1>
<p class="lede">A revision handout. Everything below is what your group produced during the workshop, in the order you produced it, with a reminder of why each step matters.</p>
<p class="sandbox">The booking system, the data and the results were a fictional training sandbox, not a Brent Council service.</p>
${body}
</main>
<footer>The workshop pages are still online at <a href="${SITE}">${SITE}</a>. Handout generated ${generated}.</footer>
</body>
</html>
`;

writeFileSync(join(root, "handout.html"), html);
console.log(`handout.html written (${(html.length / 1024).toFixed(0)} KB): ${results.length} measures, ${mvpStories.length} MVP stories, ${laterStories.length} later.`);

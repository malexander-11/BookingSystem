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
 * Group-specific commentary comes from DEFINE.handout and
 * DISCOVERY.problemStatement.pushback.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load(file) {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(join(root, file), "utf8"), sandbox, { filename: file });
  return sandbox.window;
}
const DISC = load("config/discovery.js").DISCOVERY || {};
const D = load("config/define.js").DEFINE || {};
const MVP = load("config/mvp.js").MVP || {};
const E = load("config/evidence.js").EVIDENCE || {};
const H = D.handout || {};

/* ---- tiny renderers ---------------------------------------------------- */
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const list = (items, tag = "ul", cls = "") => `<${tag}${cls ? ` class="${cls}"` : ""}>${items.map((i) => `<li>${i}</li>`).join("")}</${tag}>`;
const dl = (pairs) => `<dl class="facts">${pairs.filter((p) => p[1]).map((p) => `<dt>${esc(p[0])}</dt><dd>${esc(p[1])}</dd>`).join("")}</dl>`;
const table = (headers, rows) => `<div class="scroll"><table><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<strong>${esc(c)}</strong>` : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const chain = (t) => `<ol class="chain">${[["If we", t.ifWe], ["then", t.then], ["because", t.because], ["leading to", t.leadingTo]].map((p) => `<li><span class="chain__label">${esc(p[0])}</span>${esc(p[1] || "")}</li>`).join("")}</ol>`;
const h2 = (n, text) => `<h2 id="s${n}"><span class="num">${n}</span>${esc(text)}</h2>`;
const panel = (title, inner) => `<div class="panel"><h3>${esc(title)}</h3>${inner}</div>`;
const saidList = (items) => list(items.map((f) => `<span class="said">&ldquo;${esc(f.said)}&rdquo;</span><br><span class="comment">${esc(f.comment)}</span>`), "ul", "said-list");

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

/* 1. The purpose of Business Analysis */
const STAGES = [
  ["1 Discover", "A problem statement everyone in the room recognised as true."],
  ["2 Define", "Who first, which business need first, a theory of change, a to-be process, a story map and success measures."],
  ["3 Build", "The booking site, tested by BAs to make sure it corresponds with the defined solution."],
  ["4 Evaluate", "Fake pilot results against our own measures, and the question: so what next?"]
];
body += h2(1, "The purpose of Business Analysis") +
  "<p>Business analysis is the discipline of making sure the right problem gets solved for the organisation. The session ran the four stages in order. That chain, from problem to decision, is the golden thread. If any link is missing you cannot say afterwards whether the work was worth doing.</p>" +
  `<div class="cards">${STAGES.map((s) => `<div class="card"><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join("")}</div>`;

/* 2. Discover */
const ps = DISC.problemStatement || {};
const gs = (DISC.interviewGuide || {}).stakeholders || {}, gu = (DISC.interviewGuide || {}).users || {};
body += h2(2, "Discover: understand before we build") +
  "<p>The brief arrived as a solution: a booking platform. Discover is where we refuse to take that at face value and find out what is actually going on. We used five tools, in this order.</p>" +
  list([
    "<strong>Stakeholder map.</strong> Who can stop this, and who cares? Power against interest, so we know whom to keep close and whom to keep informed.",
    "<strong>Interviews.</strong> Stakeholders tell us what outcomes really matter for them. Users tell us what happened last time. Both are evidence; neither is the whole story.",
    "<strong>Data analysis.</strong> What the numbers can and cannot answer. Incomplete, fuzzy data is normal. The skill is knowing which gaps matter, and being sceptical about broad conclusions from narrow data.",
    "<strong>As-is process map.</strong> Where the current process hurts, step by step, and for whom.",
    "<strong>Risky assumptions.</strong> The beliefs the whole idea rests on, ranked by how much damage they do if wrong, with the cheapest way to test each. Test these cheaply before the expensive build starts."
  ]) +
  "<h3>Our problem statement</h3>" +
  dl([["Who", ps.who], ["Needs to", ps.needsTo], ["Because", ps.because], ["Today they", ps.today], ["Which results in", ps.resultsIn]]) +
  dl([["Agreement", ps.agreement], ["Size of the prize", ps.sizeOfPrize], ["Watch out for", ps.watchOuts]]) +
  (ps.pushback ? `<div class="callout"><strong>Where we might face pushback.</strong> ${esc(ps.pushback)}</div>` : "") +
  "<h3>Interview tips worth keeping</h3>" +
  `<div class="two">${panel(gs.title || "Stakeholders", list((gs.tips || []).map(esc)))}${panel(gu.title || "Users", list((gu.tips || []).map(esc)))}</div>`;

/* 3. Define */
const groups = D.userGroups || [], needs = D.businessNeeds || [], proc = D.toBeProcess || { lanes: [], steps: [] };
const mvpStories = [], laterStories = [];
for (const a of (D.storyMap && D.storyMap.activities) || []) for (const s of a.stories || []) (s.release === "mvp" ? mvpStories : laterStories).push(`${s.id} ${s.title}`);
body += h2(3, "Define: decide what to build first") +
  "<p>Define takes the agreed problem and defines a solution that can solve it. Every choice here is a trade-off, and the point of writing it down is so we can say later who it was for and who lost out.</p>" +
  "<h3>User groups, in our priority order</h3>" +
  list(groups.map((g) => `<strong>${esc(g.name)}${g.primary ? " (primary: the MVP is designed around them)" : ""}.</strong> ${esc(g.who)}`), "ol") +
  (H.userGroupsNote ? `<p>${esc(H.userGroupsNote)}</p>` : "") +
  "<h3>Business needs, in our priority order</h3>" +
  list(needs.map((n) => `<strong>${esc(n.need)}.</strong> ${esc(n.why || "")}`), "ol") +
  "<h3>Our theory of change</h3>" +
  "<p>Each link is a claim about the world. Evaluation tests the links one at a time, which is why a vague link cannot be evaluated.</p>" +
  chain(D.theoryOfChange || {}) +
  `<p><strong>In one line:</strong> ${esc(D.hypothesis || "")}</p>` +
  "<h3>The to-be process</h3>" +
  list((proc.steps || []).map((s) => `<span class="lane">${esc(s.lane)}</span>${esc(s.text)}`), "ol", "process") +
  (H.processFeedback && H.processFeedback.length ? "<h3>What we said about the to-be process</h3><p>Our feedback on the UX colleague's map, with a note on each point.</p>" + saidList(H.processFeedback) : "") +
  "<h3>The story map</h3>" +
  "<p>Stories above the line are the MVP. Everything else waits until the evidence says it is needed.</p>" +
  `<div class="two">${panel(`In the MVP (${mvpStories.length})`, list(mvpStories.map(esc)))}${panel(`Later (${laterStories.length})`, list(laterStories.map(esc)))}</div>` +
  (H.storyMapFeedback && H.storyMapFeedback.length ? "<h3>What we said about the story map</h3>" + saidList(H.storyMapFeedback) + (H.storyMapNote ? `<p>${esc(H.storyMapNote)}</p>` : "") : "") +
  "<h3>Our success measures</h3>" +
  list((D.successMeasures || []).map((m) => `<strong>${esc(m.name)}.</strong> Source: ${esc(m.source || "")}`)) +
  (H.measuresNote ? `<p>${esc(H.measuresNote)}</p>` : "");

/* 4. Build */
const m = MVP.mvp || {};
body += h2(4, "Build: the smallest thing that tests the idea") +
  "<p>The booking site was built from our Define hand-in and nothing else, then tested against the acceptance criteria.</p>" +
  dl([["Target user", m.targetUser], ["User need", m.userNeed], ["Hypothesis", m.hypothesis], ["Success measure", m.successMeasure ? `${m.successMeasure.name}. Target: ${m.successMeasure.target}` : ""]]) +
  `<p><strong>The journey:</strong> ${(m.process || []).map(esc).join(" &rarr; ")}</p>` +
  "<h3>Acceptance criteria</h3>" +
  "<p>Plain sentences that say when a story is done. If we cannot test it, it is not an acceptance criterion.</p>" +
  list((m.acceptanceCriteria || []).map(esc)) +
  (H.buildErrors && H.buildErrors.length ? "<h3>What we caught in testing</h3>" + list(H.buildErrors.map(esc)) + (H.buildLesson ? `<p><strong>${esc(H.buildLesson)}</strong></p>` : "") : "") +
  '<p class="muted">In the sandbox, payment, reminders, reception amendments and block bookings are described rather than built. That is normal for a prototype: the point was to test the journey, not the plumbing.</p>';

/* 5. Evaluate */
const t = D.theoryOfChange || {}, so = E.setOutToDo || {}, EN = H.evaluateNotes || {};
const results = (D.successMeasures || []).map((mm) => ({ name: mm.name, ...measureResult(mm) }));
const caveats = [...((E.impact && E.impact.caveats) || [])];
if (EN.confounders) caveats.push({ name: "Seasonality", text: EN.confounders });
body += h2(5, "Evaluate: did it work, and for whom?") +
  "<p>Evaluation is a set of questions asked in order. Skip one and the numbers will answer a question we never asked.</p>" +
  list(["What did we set out to do?", "What do the numbers say?", "What do the numbers not tell us?", "So what next?"], "ol", "questions") +
  "<h3>One question per link</h3>" +
  table(["Link", "Our claim", "The evaluation question"], [
    ["If we", t.ifWe || "", "Did we actually build and run it? Did people find it?"],
    ["then", t.then || "", "Did the behaviour change? For whom? Compared with what?"],
    ["because", t.because || "", "Was the belief right? What did users say the barrier was?"],
    ["leading to", t.leadingTo || "", "Did the outcome move, or did activity just move channel?"]
  ]) +
  "<h3>The pilot results we were shown</h3>" +
  "<p>Fictional, generated from our measures. Notice that every result comes with a <em>but</em>: that is not pessimism, it is the part of the evaluation that stops a number being mistaken for an answer.</p>" +
  list(results.map((r) => `<strong>${esc(r.name)}:</strong> ${esc(r.value)} ${esc(r.detail)}.<br><span class="but">But: ${esc(r.but)}</span>`), "ul", "results") +
  (caveats.length ? `<h3>${caveats.length === 5 ? "Five" : "Four"} reasons a good number can mislead</h3><dl class="terms">${caveats.map((c) => `<dt>${esc(c.name)}</dt><dd>${esc(c.text)}</dd>`).join("")}</dl>` : "") +
  "<h3>So what next?</h3>" +
  `<p>The last question is a decision, and it is only honest if we decided what success meant before the numbers arrived. Our first measure was <em>${esc(so.measure || "")}</em>, target <em>${esc(so.target || "")}</em>, guard-rail <em>${esc(so.guardRail || "")}</em>.</p>` +
  (EN.deciding ? `<p>${esc(EN.deciding)}</p>` : "") +
  list([
    "<strong>Invest:</strong> it worked well enough to put more money and sites behind it.",
    "<strong>Iterate:</strong> keep the direction, change specific things, run it again.",
    "<strong>Pause:</strong> stop spending until the missing evidence is in.",
    "<strong>Pivot:</strong> keep the goal, change the solution.",
    "<strong>Stop:</strong> switch it off and put the effort somewhere else."
  ]) +
  (EN.decision ? `<div class="callout"><strong>What we decided.</strong> ${esc(EN.decision)}</div>` : "");

/* 6. Takeaways */
body += h2(6, "Things to take back to your desk") +
  list([
    "Start with the problem, not the solution you were handed. Ask what outcome the sponsor wants to get at, and by when.",
    "Users are experts in what they do. They are not experts in what needs to happen, or in what other people do.",
    "A problem statement should aspire to bring the CFO and the reception staff into a common cause.",
    "Prioritising means something loses. Name what, and say it out loud before the build, not after.",
    "Every link in a theory of change is a claim you can test. Think carefully about how change flows from feature, to user behaviour, to business outcome.",
    "An acceptance criterion is a sentence someone can check. Given, when, then.",
    "Decide what failure looks like before the numbers arrive. Then, when they arrive, ask what they do not tell you: substitution, counterfactual, novelty, self-report, seasonality."
  ].map(esc), "ol", "takeaways");

/* ---- document ---------------------------------------------------------- */
const CSS = `
:root { --blue: #0964b9; --blue-dark: #085093; --green: #1c7a4b; --ink: #0b0c0c; --muted: #505a5f; --rule: #b1b4b6; --surface: #f3f2f1; }
* { box-sizing: border-box; }
html { color-scheme: light; }
body { margin: 0; padding: 0 20px 60px; font: 18px/1.5 -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: var(--ink); background: #fff; }
main { max-width: 760px; margin: 0 auto; }
.eyebrow { margin: 40px 0 5px; font-size: 15px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--blue); }
h1 { margin: 0 0 30px; font-size: 34px; line-height: 1.15; color: var(--blue-dark); }
h2 { margin: 50px 0 15px; padding-top: 25px; border-top: 1px solid var(--rule); font-size: 26px; line-height: 1.2; color: var(--blue-dark); }
h2 .num { display: inline-block; min-width: 36px; height: 36px; margin-right: 10px; border-radius: 50%; background: var(--blue); color: #fff; font-size: 18px; line-height: 36px; text-align: center; }
h3 { margin: 30px 0 10px; font-size: 20px; line-height: 1.25; }
p, ul, ol, dl { margin: 0 0 20px; }
li { margin-bottom: 8px; }
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
.said-list { list-style: none; padding: 0; }
.said-list li { margin-bottom: 14px; padding-left: 15px; border-left: 4px solid var(--rule); }
.said { font-style: italic; }
.comment { color: var(--muted); font-size: 16px; }
.scroll { overflow-x: auto; margin: 0 0 20px; }
table { border-collapse: collapse; width: 100%; font-size: 16px; }
th, td { padding: 8px 12px 8px 0; border-bottom: 1px solid var(--rule); text-align: left; vertical-align: top; }
th { font-weight: 700; }
.questions li, .takeaways li { margin-bottom: 10px; }
.results li { margin-bottom: 14px; }
.but { color: var(--muted); font-size: 16px; }
.terms { display: grid; grid-template-columns: 180px 1fr; gap: 8px 20px; }
.terms dt { font-weight: 700; }
.terms dd { margin: 0; }
footer { max-width: 760px; margin: 50px auto 0; padding-top: 15px; border-top: 1px solid var(--rule); font-size: 15px; color: var(--muted); }
@media (max-width: 640px) {
  body { font-size: 16px; }
  h1 { font-size: 28px; } h2 { font-size: 22px; }
  .cards, .two, .chain { grid-template-columns: 1fr; }
  .facts, .terms { grid-template-columns: 1fr; gap: 2px 0; }
  .facts dd, .terms dd { margin-bottom: 10px; }
  .lane { display: block; min-width: 0; width: max-content; margin-bottom: 3px; }
}
@media print {
  body { font-size: 12pt; padding: 0; color: #000; }
  h2 { break-after: avoid; }
  .card, .panel, .chain, table, .callout, .results li, .said-list li { break-inside: avoid; }
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
${body}
</main>
<footer>The booking system, data and results in the session were fictional. Handout generated ${generated}.</footer>
</body>
</html>
`;

writeFileSync(join(root, "handout.html"), html);
console.log(`handout.html written (${(html.length / 1024).toFixed(0)} KB): ${results.length} measures, ${mvpStories.length} MVP stories, ${laterStories.length} later.`);

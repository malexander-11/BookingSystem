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
 * Group-specific commentary comes from DEFINE.handout, the `comment` on each
 * success measure, and DISCOVERY.problemStatement.pushback.
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
const table = (headers, rows) => `<div class="scroll"><table><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<strong>${esc(c)}</strong>` : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const chain = (t) => `<ol class="chain">${[["If we", t.ifWe], ["then", t.then], ["because", t.because], ["leading to", t.leadingTo]].map((p) => `<li><span class="chain__label">${esc(p[0])}</span>${esc(p[1] || "")}</li>`).join("")}</ol>`;
const h2 = (n, text) => `<h2 id="s${n}"><span class="num">${n}</span>${esc(text)}</h2>`;
const panel = (title, inner) => `<div class="panel"><h3>${esc(title)}</h3>${inner}</div>`;
const saidList = (items) => list(items.map((f) => `<span class="said">&ldquo;${esc(f.said)}&rdquo;</span><br><span class="comment">${esc(f.comment)}</span>`), "ul", "said-list");
const p = (text) => (text ? `<p>${esc(text)}</p>` : "");
/* The three kinds of block that give each stage its structure. */
const LABELS = { tools: "Tools we used", exercises: "Exercises we did", reflections: "Reflections" };
const block = (kind, inner, title) => `<section class="block block--${kind}"><h3 class="block__label">${esc(title || LABELS[kind])}</h3>${inner}</section>`;

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
  ["1 Discover", "Understand the problem, the people and the data before anyone commits to a solution."],
  ["2 Define", "Turn the agreed problem into a solution the organisation can build and test, with the trade-offs made explicit."],
  ["3 Build", "Make sure what gets built corresponds with what was defined, down to the detail."],
  ["4 Evaluate", "Reflect rigorously on what was built, judge what happened and decide the best next move."]
];
body += h2(1, "The purpose of Business Analysis") +
  "<p>Business analysis is the discipline of making sure the right problem gets solved for the organisation. The session ran the four stages in order. That chain, from problem to decision, is what matters most. If any link is missing you cannot say afterwards whether the work was worth doing.</p>" +
  "<p>What a BA is there to do at each stage:</p>" +
  `<div class="cards">${STAGES.map((s) => `<div class="card"><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join("")}</div>`;

/* 2. Discover */
const ps = DISC.problemStatement || {};
const gs = (DISC.interviewGuide || {}).stakeholders || {}, gu = (DISC.interviewGuide || {}).users || {};
const statement = `<p class="statement"><strong>Who:</strong> ${esc(ps.who)}. <strong>Needs to:</strong> ${esc(ps.needsTo)}. <strong>Because:</strong> ${esc(ps.because)}. <strong>Today they:</strong> ${esc(ps.today)}. <strong>Which results in:</strong> ${esc(ps.resultsIn)}.</p>`;
body += h2(2, "Discover: understand before we build") +
  "<p>The brief arrived as a solution: a booking platform. Discover is where we refuse to take that at face value and find out what is actually going on.</p>" +
  block("tools", list([
    "<strong>Stakeholder map.</strong> Who can stop this, and who cares? Power against interest, so we know whom to keep close and whom to keep informed.",
    "<strong>Interviews.</strong> Stakeholders tell us what outcomes really matter for them. Users tell us what happened last time. Both are evidence; neither is the whole story.",
    "<strong>Data analysis.</strong> What the numbers can and cannot answer. Incomplete, fuzzy data is normal. The skill is knowing which gaps matter, and being sceptical about broad conclusions from narrow data.",
    "<strong>As-is process map.</strong> Where the current process hurts, step by step, and for whom.",
    "<strong>Risky assumptions.</strong> The beliefs the whole idea rests on, ranked by how much damage they do if wrong, with the cheapest way to test each. Test these cheaply before the expensive build starts."
  ])) +
  block("exercises",
    list([
      "Placed ten stakeholders on the power-against-interest grid.",
      "Interviewed the CFO and the reception desk in role-play, five minutes each, using the tips below.",
      "Read the data pack, noticed what was missing, and took the true/false quiz.",
      "Annotated the as-is process map with a pain point at every step.",
      "Ranked the risky assumptions from riskiest to least risky, with the cheapest test for each.",
      "Wrote the problem statement together."
    ]) +
    "<h4>Interview tips worth keeping</h4>" +
    "<p>People are closest to the detail, so getting accurate information from them is key in discovery.</p>" +
    `<div class="two">${panel(gs.title || "Stakeholders", list((gs.tips || []).map(esc)))}${panel(gu.title || "Users", list((gu.tips || []).map(esc)))}</div>` +
    "<h4>Our problem statement</h4>" +
    "<p>Rallying everyone around a shared problem to solve is the natural endpoint of a discovery.</p>" +
    statement
  ) +
  block("reflections",
    "<p><strong>Stakeholder maps are fluid and ongoing.</strong> Someone may have more power or interest than their title suggests, and both change over time: a new cabinet member, a budget round, a complaint that lands on the wrong desk. Redraw the map as we learn, rather than filing it after week one.</p>" +
    "<p><strong>The as-is map is where we go deeper than anyone else.</strong> Every pain point got a why, and then another why, until we reached something a stakeholder could act on (the 5 Whys). Then the job flips: package it up for the stakeholder. What is the headline? If the map cannot be summarised in one sentence they will remember, it is not finished.</p>" +
    (ps.pushback ? `<p><strong>Where we might face pushback.</strong> ${esc(ps.pushback)}</p>` : "")
  );

/* 3. Define */
const groups = D.userGroups || [], needs = D.businessNeeds || [];
const mvpStories = [], laterStories = [];
for (const a of (D.storyMap && D.storyMap.activities) || []) for (const s of a.stories || []) (s.release === "mvp" ? mvpStories : laterStories).push(`${s.id} ${s.title}`);
body += h2(3, "Define: decide what to build first") +
  "<p>Define takes the agreed problem and defines a solution that can solve it. Every choice here is a trade-off, and the point of writing it down is so we can say later who it was for and who lost out.</p>" +
  block("tools", list([
    "<strong>User groups and user needs.</strong> Who the solution is for, in priority order, and what each group needs from it.",
    "<strong>Business needs.</strong> What the organisation needs from it, in priority order, and who disagrees.",
    "<strong>Theory of change.</strong> If we do this, then people will do that, because of this belief, leading to this outcome.",
    "<strong>To-be process map.</strong> The UX colleague's first draft of how the process works once the solution exists.",
    "<strong>User story map with acceptance criteria.</strong> The PM's stories along the journey, with a line between the MVP and later.",
    "<strong>Success measures.</strong> What we will count, and where the number comes from."
  ])) +
  block("exercises",
    "<h4>Ranked the user groups</h4>" +
    list(groups.map((g) => `<strong>${esc(g.name)}${g.primary ? " (primary: the MVP is designed around them)" : ""}.</strong> ${esc(g.who)}`), "ol") +
    "<h4>Ranked the business needs</h4>" +
    list(needs.map((n) => `<strong>${esc(n.need)}.</strong> ${esc(n.why || "")}`), "ol") +
    "<h4>Wrote our theory of change</h4>" +
    chain(D.theoryOfChange || {}) +
    `<p><strong>In one line:</strong> ${esc(D.hypothesis || "")}</p>` +
    (H.processFeedback && H.processFeedback.length ? "<h4>Critiqued the UX colleague's to-be process map</h4><p>What we said, with a note on each point.</p>" + saidList(H.processFeedback) : "") +
    "<h4>Critiqued the PM's story map</h4>" +
    "<p>Stories above the line are the MVP. Everything else waits until the evidence says it is needed.</p>" +
    `<div class="two">${panel(`In the MVP (${mvpStories.length})`, list(mvpStories.map(esc)))}${panel(`Later (${laterStories.length})`, list(laterStories.map(esc)))}</div>` +
    (H.storyMapFeedback && H.storyMapFeedback.length ? saidList(H.storyMapFeedback) : "") +
    "<h4>Chose our success measures</h4>" +
    table(["Measure", "Source", "Commentary"], (D.successMeasures || []).map((m) => [m.name, m.source || "", m.comment || ""]))
  ) +
  block("reflections", p(H.userGroupsNote) + p(H.storyMapNote) + p(H.measuresNote));

/* 4. Build */
const m = MVP.mvp || {};
body += h2(4, "Build: the smallest thing that tests the idea") +
  "<p>AI built the booking site from the definition we provided and nothing else: our user group order, our theory of change, the stories we put above the MVP line and the measures we chose. Then we tested it against what we had defined.</p>" +
  block("exercises",
    `<p><strong>The journey we tested:</strong> ${(m.process || []).map(esc).join(" &rarr; ")}</p>` +
    (H.buildErrors && H.buildErrors.length ? "<h4>Things we caught in testing</h4>" + list(H.buildErrors.map(esc)) : "")
  ) +
  block("reflections", p(H.buildLesson));

/* 5. Evaluate */
const t = D.theoryOfChange || {}, EN = H.evaluateNotes || {};
const results = (D.successMeasures || []).map((mm) => ({ name: mm.name, ...measureResult(mm) }));
const caveats = [...((E.impact && E.impact.caveats) || [])];
if (EN.confounders) caveats.push({ name: "Seasonality", text: EN.confounders });
body += h2(5, "Evaluate: did it work, and for whom?") +
  "<p>Evaluation is about reflecting rigorously on the build to make judgements and decide the best next move for Brent.</p>" +
  block("tools",
    "<p>Four questions, asked in order. Skip one and the numbers will answer a question we never asked.</p>" +
    list(["What did we set out to do?", "What do the numbers say?", "What do the numbers not tell us?", "So what next?"], "ol", "questions")
  ) +
  block("exercises",
    "<h4>Questioning the causal chain</h4>" +
    table(["Link", "Our claim", "The evaluation question"], [
      ["If we", t.ifWe || "", "Did we actually build and run it? Did people find it?"],
      ["then", t.then || "", "Did the behaviour change? For whom? Compared with what?"],
      ["because", t.because || "", "Was the belief right? What did users say the barrier was?"],
      ["leading to", t.leadingTo || "", "Did the outcome move, or did activity just move channel?"]
    ]) +
    "<h4>The pilot results we were shown</h4>" +
    "<p>Fictional, generated from our measures. Every result comes with a <em>but</em>.</p>" +
    list(results.map((r) => `<strong>${esc(r.name)}:</strong> ${esc(r.value)} ${esc(r.detail)}.<br><span class="but">But: ${esc(r.but)}</span>`), "ul", "results") +
    "<h4>So what next?</h4>" +
    "<p>Invest, iterate, pause, pivot or stop.</p>" +
    (EN.decision ? `<div class="callout"><strong>What we decided.</strong> ${esc(EN.decision)}</div>` : "")
  ) +
  block("reflections",
    "<p><strong>The causal chain.</strong> Understanding and reflecting on the chain from feature, to user behaviour, to organisation outcome is powerful. It is how we make sure we drive outcomes that matter and realise the potential benefits, rather than shipping features and hoping.</p>" +
    "<p><strong>It is easy to draw incorrect conclusions from data.</strong> A number that looks like success can be any of these instead:</p>" +
    (caveats.length ? `<dl class="terms">${caveats.map((c) => `<dt>${esc(c.name)}</dt><dd>${esc(c.text)}</dd>`).join("")}</dl>` : "") +
    (EN.deciding ? `<p><strong>Analysing versus deciding.</strong> ${esc(EN.deciding)}</p>` : "")
  );

/* 6. Things we discussed that weren't included */
if (H.notCovered && H.notCovered.length) {
  body += h2(6, "Things we discussed that weren't included") +
    p(H.notCoveredNote) +
    `<dl class="terms">${H.notCovered.map((x) => `<dt>${esc(x.name)}</dt><dd>${esc(x.text)}</dd>`).join("")}</dl>`;
}

/* 7. Takeaways */
body += h2(7, "Ten key takeaways") +
  list([
    "Start with the problem and desired outcomes, not solutions.",
    "Ask what outcome the sponsor wants to get at, and by when.",
    "Users are experts in what they do. They are not experts in what needs to happen, or in what other people do.",
    "Dealing with patchy data in discovery is expected, so rigorous thinking and a sceptical mind are needed.",
    "A problem statement should aspire to bring the CFO and the reception staff into a common cause.",
    "Prioritising means something loses. Name what, and say it out loud before the build, not after.",
    "Every link in a theory of change is a claim you can test. Think carefully about how change flows from feature, to user behaviour, to business outcome.",
    "Acceptance criteria are only useful if tested rigorously. BAs need to get into the detail of a solution so we catch issues, not users!",
    "Thinking carefully about success measures is vital for evaluation. You can't turn back time to define better ones.",
    "Evaluation is tricky. Balancing being decisive and being rigorous is something your recommendations will need to consider."
  ].map(esc), "ol", "takeaways");

/* ---- document ---------------------------------------------------------- */
const CSS = `
:root { --blue: #0964b9; --blue-dark: #085093; --green: #1c7a4b; --amber: #b06a00; --ink: #0b0c0c; --muted: #505a5f; --rule: #b1b4b6; --surface: #f3f2f1; }
* { box-sizing: border-box; }
html { color-scheme: light; }
body { margin: 0; padding: 0 20px 60px; font: 18px/1.5 -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: var(--ink); background: #fff; }
main { max-width: 760px; margin: 0 auto; }
.eyebrow { margin: 40px 0 5px; font-size: 15px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--blue); }
h1 { margin: 0 0 30px; font-size: 34px; line-height: 1.15; color: var(--blue-dark); }
h2 { margin: 50px 0 15px; padding-top: 25px; border-top: 1px solid var(--rule); font-size: 26px; line-height: 1.2; color: var(--blue-dark); }
h2 .num { display: inline-block; min-width: 36px; height: 36px; margin-right: 10px; border-radius: 50%; background: var(--blue); color: #fff; font-size: 18px; line-height: 36px; text-align: center; }
h3 { margin: 30px 0 10px; font-size: 20px; line-height: 1.25; }
h4 { margin: 25px 0 8px; font-size: 18px; line-height: 1.25; }
p, ul, ol, dl { margin: 0 0 20px; }
li { margin-bottom: 8px; }
.block { margin: 25px 0; padding: 5px 0 5px 20px; border-left: 6px solid var(--rule); }
.block__label { margin: 0 0 12px; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.block--tools { border-color: var(--blue); } .block--tools .block__label { color: var(--blue); }
.block--exercises { border-color: var(--green); } .block--exercises .block__label { color: var(--green); }
.block--reflections { border-color: var(--amber); background: #fffbf2; padding-right: 15px; } .block--reflections .block__label { color: var(--amber); }
.block > :last-child { margin-bottom: 0; }
.block h4:first-of-type { margin-top: 5px; }
.cards, .two { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 0 0 20px; }
.card, .panel { padding: 15px 18px; border: 1px solid var(--rule); border-radius: 6px; background: #fff; }
.card { border-top: 4px solid var(--blue); }
.card h3, .panel h3 { margin: 0 0 8px; font-size: 17px; }
.card p, .panel ul { margin: 0; font-size: 16px; }
.panel ul { padding-left: 20px; }
.panel li { margin-bottom: 6px; }
.statement { padding: 15px 18px; border: 1px solid var(--rule); border-left: 6px solid var(--blue-dark); background: #fff; }
.statement strong { color: var(--blue-dark); }
.callout { margin: 0 0 20px; padding: 12px 15px; border-left: 6px solid var(--blue); background: var(--surface); }
.chain { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.chain li { padding: 10px 12px; border: 1px solid var(--rule); border-top: 4px solid var(--green); border-radius: 4px; background: #fff; margin: 0; }
.chain__label { display: block; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--green); margin-bottom: 3px; }
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
  .block { padding-left: 12px; }
  .cards, .two, .chain { grid-template-columns: 1fr; }
  .terms { grid-template-columns: 1fr; gap: 2px 0; }
  .terms dd { margin-bottom: 10px; }
}
@media print {
  body { font-size: 12pt; padding: 0; color: #000; }
  h2 { break-after: avoid; }
  .card, .panel, .chain, table, .callout, .results li, .said-list li, .statement { break-inside: avoid; }
  .block--reflections { background: none; }
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

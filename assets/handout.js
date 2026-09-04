/* Post-session revision handout. Read-only: renders what the group produced
   from the four configs (window.DISCOVERY, window.DEFINE, window.MVP,
   window.EVIDENCE) using window.R (assets/render.js). No inputs, no
   facilitator view. Printable. */
(function () {
  "use strict";

  var DISC = window.DISCOVERY || {}, D = window.DEFINE || {}, MVP = window.MVP || {}, E = window.EVIDENCE || {}, R = window.R;
  var root = document.getElementById("handout");
  if (!window.DISCOVERY || !window.DEFINE || !window.MVP) { root.innerHTML = '<p class="notice">One of the config files did not load. Check config/ for syntax errors.</p>'; return; }
  var esc = R.esc, h2 = R.h2;

  R.chrome(MVP);
  if (MVP.brand) document.getElementById("sandbox-banner").textContent = MVP.brand.sandboxNotice + " All data on this page is made up.";

  function list(items, cls) { return '<ul class="' + (cls || "") + '">' + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>"; }
  function dl(pairs) {
    return '<dl class="summary-list">' + pairs.filter(function (p) { return p[1]; }).map(function (p) { return "<dt>" + esc(p[0]) + "</dt><dd>" + esc(p[1]) + "</dd>"; }).join("") + "</dl>";
  }
  function chain(t) {
    return '<ol class="chain">' + [["If we", t.ifWe], ["then", t.then], ["because", t.because], ["leading to", t.leadingTo]].map(function (p) {
      return '<li><span class="chain__label">' + esc(p[0]) + "</span>" + esc(p[1] || "") + "</li>";
    }).join("") + "</ol>";
  }

  var html = "";

  /* ---- 1. The golden thread ------------------------------------------- */
  var STAGES = [
    ["1 Discover", "discover.html", "A problem statement everyone in the room recognised as true."],
    ["2 Define", "define.html", "Who first, which business need first, a theory of change, a to-be process, a story map and success measures."],
    ["3 Build", "index.html", "A booking site built only from what was above the MVP line."],
    ["4 Evaluate", "evaluate.html", "Fake pilot results against your own measures, and the question: so what next?"]
  ];
  html += h2(1, "The golden thread", "s1") +
    "<p>Business analysis is the discipline of making sure the right problem gets solved before anyone spends money solving it. The session ran the four stages in order, and each stage produced one thing the next stage needed. That chain, from problem to decision, is the golden thread. If any link is missing you cannot say afterwards whether the work was worth doing.</p>" +
    '<ol class="stage-steps stage-steps--handout" aria-label="The four stages">' + STAGES.map(function (s, i) {
      return '<li><a href="' + s[1] + '"><span class="stage-steps__n">' + (i + 1) + "</span>" + esc(s[0].replace(/^\d /, "")) + "</a></li>";
    }).join("") + "</ol>" +
    '<div class="handout-grid">' + STAGES.map(function (s) {
      return '<div class="panel handout-card"><h3>' + esc(s[0]) + "</h3><p>" + esc(s[2]) + "</p></div>";
    }).join("") + "</div>";

  /* ---- 2. Discover ------------------------------------------------------ */
  var ps = DISC.problemStatement || {};
  var g = DISC.interviewGuide || {}, gs = g.stakeholders || {}, gu = g.users || {};
  html += h2(2, "Discover: understand before you build", "s2") +
    "<p>The brief arrived as a solution: a booking platform. Discover is where you refuse to take that at face value and find out what is actually going on. You used five tools, in this order.</p>" +
    list([
      "<strong>Stakeholder map.</strong> Who can stop this, and who cares? Power against interest, so you know whom to keep close and whom to keep informed.",
      "<strong>Interviews.</strong> Stakeholders tell you what outcome they are on the hook for. Users tell you what happened last time. Both are evidence; neither is the whole story.",
      "<strong>Data analysis.</strong> What the numbers can and cannot answer. Incomplete, fuzzy data is normal; the skill is knowing which gaps matter.",
      "<strong>As-is process map.</strong> Where the current process hurts, step by step, and for whom.",
      "<strong>Risky assumptions.</strong> The beliefs the whole idea rests on, ranked by how much damage they do if wrong, with the cheapest way to test each."
    ], "handout-list") +
    "<h3>Your problem statement</h3>" +
    dl([["Who", ps.who], ["Needs to", ps.needsTo], ["Because", ps.because], ["Today they", ps.today], ["Which results in", ps.resultsIn]]) +
    dl([["Agreement", ps.agreement], ["Size of the prize", ps.sizeOfPrize], ["Watch out for", ps.watchOuts]]) +
    (ps.note ? '<div class="callout"><strong>What this leaves open.</strong> ' + esc(ps.note) + "</div>" : "") +
    "<h3>Interview tips worth keeping</h3>" +
    '<div class="guide guide--two">' +
    '<div class="panel guide-panel guide-panel--stakeholders"><h3>' + esc(gs.title || "Stakeholders") + "</h3>" + list((gs.tips || []).map(esc), "guide-tips") + "</div>" +
    '<div class="panel guide-panel guide-panel--users"><h3>' + esc(gu.title || "Users") + "</h3>" + list((gu.tips || []).map(esc), "guide-tips") + "</div>" +
    "</div>";

  /* ---- 3. Define -------------------------------------------------------- */
  var groups = D.userGroups || [], needs = D.businessNeeds || [], p = D.toBeProcess || { lanes: [], steps: [] };
  var mvpStories = [], laterStories = [];
  (D.storyMap && D.storyMap.activities || []).forEach(function (a) {
    (a.stories || []).forEach(function (s) { (s.release === "mvp" ? mvpStories : laterStories).push(s.id + " " + s.title); });
  });
  html += h2(3, "Define: decide what to build first", "s3") +
    "<p>Define turns one agreed problem into one small, testable plan. Every choice here is a trade-off, and the point of writing it down is so you can say later who it was for and who lost out.</p>" +
    "<h3>User groups, in your priority order</h3>" +
    '<ol class="handout-list">' + groups.map(function (gr) {
      return "<li><strong>" + esc(gr.name) + (gr.primary ? " (primary: the MVP is designed around them)" : "") + ".</strong> " + esc(gr.who) + "</li>";
    }).join("") + "</ol>" +
    "<h3>Business needs, in your priority order</h3>" +
    '<ol class="handout-list">' + needs.map(function (n) {
      return "<li><strong>" + esc(n.need) + ".</strong> " + esc(n.why || "") + "</li>";
    }).join("") + "</ol>" +
    "<h3>Your theory of change</h3>" +
    "<p>Each link is a claim about the world. Evaluation tests the links one at a time, which is why a vague link cannot be evaluated.</p>" +
    chain(D.theoryOfChange || {}) +
    "<p><strong>In one line:</strong> " + esc(D.hypothesis || "") + "</p>" +
    "<h3>The to-be process</h3>" +
    R.flow(p.lanes, p.steps, { hidePain: true }) +
    "<h3>The story map</h3>" +
    "<p>Stories above the line are the MVP. Everything else waits until the evidence says it is needed.</p>" +
    '<div class="guide guide--two handout-stories"><div class="panel"><h3>In the MVP (' + mvpStories.length + ")</h3>" + list(mvpStories.map(esc), "plain-list") + "</div>" +
    '<div class="panel"><h3>Later (' + laterStories.length + ")</h3>" + list(laterStories.map(esc), "plain-list") + "</div></div>" +
    "<h3>Success measures</h3>" +
    "<p>You named the measure and its source. The target, baseline and guard-rail were added afterwards, and they are the first thing to challenge: a target with no baseline is a guess, and a measure with no guard-rail can be hit by doing harm somewhere else.</p>" +
    R.dataTable(["Measure", "Source", "Target", "Baseline", "Guard-rail"], (D.successMeasures || []).map(function (m) {
      return [m.name, m.source || "", m.target || "", m.baseline || "", m.guardRail || ""];
    }), "handout-measures");

  /* ---- 4. Build --------------------------------------------------------- */
  var m = MVP.mvp || {};
  html += h2(4, "Build: the smallest thing that tests the idea", "s4") +
    "<p>An MVP is not a small version of the final product. It is the least you can build to find out whether the theory of change is true. The booking site was built from your Define hand-in and nothing else.</p>" +
    dl([["Target user", m.targetUser], ["User need", m.userNeed], ["Hypothesis", m.hypothesis], ["Success measure", m.successMeasure ? m.successMeasure.name + ". Target: " + m.successMeasure.target : ""]]) +
    "<p><strong>The journey:</strong> " + (m.process || []).map(esc).join(" &rarr; ") + "</p>" +
    "<h3>Acceptance criteria</h3>" +
    "<p>Plain sentences that say when a story is done. If you cannot test it, it is not an acceptance criterion.</p>" +
    list((m.acceptanceCriteria || []).map(esc), "handout-list") +
    '<p class="muted-line">In the sandbox, payment, reminders, reception amendments and block bookings are described rather than built. That is normal for a prototype: the point was to test the journey, not the plumbing.</p>';

  /* ---- 5. Evaluate ------------------------------------------------------ */
  var t = D.theoryOfChange || {}, so = E.setOutToDo || {};
  var results = (D.successMeasures || []).map(function (mm) { var r = R.measureResult(E, mm); return { name: mm.name, value: r.value, detail: r.detail, but: r.but }; });
  var caveats = (E.impact && E.impact.caveats) || [];
  html += h2(5, "Evaluate: did it work, and for whom?", "s5") +
    "<p>Evaluation is a set of questions asked in order. Skip one and the numbers will answer a question you never asked.</p>" +
    '<ol class="chain chain--questions">' +
    '<li><span class="chain__label">1</span>What did we set out to do?</li>' +
    '<li><span class="chain__label">2</span>What do the numbers say?</li>' +
    '<li><span class="chain__label">3</span>What do the numbers not tell us?</li>' +
    '<li><span class="chain__label">4</span>So what next?</li>' +
    "</ol>" +
    "<h3>One question per link</h3>" +
    R.dataTable(["Link", "Your claim", "The evaluation question"], [
      ["If we", t.ifWe || "", "Did we actually build and run it? Did people find it?"],
      ["then", t.then || "", "Did the behaviour change? For whom? Compared with what?"],
      ["because", t.because || "", "Was the belief right? What did users say the barrier was?"],
      ["leading to", t.leadingTo || "", "Did the outcome move, or did activity just move channel?"]
    ], "links-table") +
    "<h3>The pilot results you were shown</h3>" +
    "<p>Fictional, generated from your measures. Notice that every result comes with a <em>but</em>: that is not pessimism, it is the part of the evaluation that stops a number being mistaken for an answer.</p>" +
    '<ul class="result-list">' + results.map(function (r) {
      return '<li><span class="result-line"><strong>' + esc(r.name) + ":</strong> " + esc(r.value) + " " + esc(r.detail) + '.</span><span class="result-but">But: ' + esc(r.but) + "</span></li>";
    }).join("") + "</ul>" +
    (caveats.length ? "<h3>Four reasons a good number can mislead</h3>" +
      '<dl class="glossary">' + caveats.map(function (c) { return "<dt>" + esc(c.name) + "</dt><dd>" + esc(c.text) + "</dd>"; }).join("") + "</dl>" : "") +
    "<h3>So what next?</h3>" +
    "<p>The last question is a decision, and it is only honest if you decided what success meant before the numbers arrived. Your first measure was <em>" + esc(so.measure || "") + "</em>, target <em>" + esc(so.target || "") + "</em>, guard-rail <em>" + esc(so.guardRail || "") + "</em>.</p>" +
    '<ul class="verdict__options">' +
    "<li><strong>Invest:</strong> it worked well enough to put more money and sites behind it.</li>" +
    "<li><strong>Iterate:</strong> keep the direction, change specific things, run it again.</li>" +
    "<li><strong>Pause:</strong> stop spending until the missing evidence is in.</li>" +
    "<li><strong>Pivot:</strong> keep the goal, change the solution.</li>" +
    "<li><strong>Stop:</strong> switch it off and put the effort somewhere else.</li></ul>";

  /* ---- 6. Takeaways ----------------------------------------------------- */
  html += h2(6, "Ten things to take back to your desk", "s6") +
    '<ol class="takeaways">' + [
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
    ].map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>";

  /* ---- 7. Glossary ------------------------------------------------------ */
  var GLOSSARY = [
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
  html += h2(7, "Glossary", "s7") +
    '<dl class="glossary">' + GLOSSARY.map(function (x) { return "<dt>" + esc(x[0]) + "</dt><dd>" + esc(x[1]) + "</dd>"; }).join("") + "</dl>" +
    '<p class="muted-line">The workshop pages are still live: <a href="discover.html">Discover</a>, <a href="define.html">Define</a>, <a href="index.html">Build</a> and <a href="evaluate.html">Evaluate</a>. This is a fictional training sandbox, not a Brent Council service.</p>';

  root.innerHTML = html;
})();

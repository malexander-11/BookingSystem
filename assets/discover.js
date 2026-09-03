/* Discover page. Rendered from window.DISCOVERY (config/discovery.js). */
(function () {
  "use strict";

  var D = window.DISCOVERY, R = window.R;
  var root = document.getElementById("stage");
  if (!D) { root.innerHTML = '<p class="notice">config/discovery.js did not load. Check the file for syntax errors.</p>'; return; }
  var esc = R.esc, h2 = R.h2;

  R.chrome(window.MVP);
  document.getElementById("stage-eyebrow").textContent = D.stage.eyebrow || "Before build";
  document.getElementById("stage-title").textContent = D.stage.title || "Discover";
  document.getElementById("stage-question").textContent = D.stage.question || "";
  document.title = "1 Discover | " + ((window.MVP && window.MVP.brand && window.MVP.brand.council) || "Brent Council") + " (training sandbox)";

  var html = '<div class="notice"><strong>This stage ends with:</strong> ' + esc(D.stage.endsWith) + "</div>";

  /* 1. The brief */
  var b = D.brief || {};
  html += h2(1, "The brief") + '<div class="panel"><dl class="summary-list">' +
    "<dt>What was asked for</dt><dd>" + esc(b.askedFor) + "</dd>" +
    "<dt>Who asked</dt><dd>" + esc(b.whoAsked) + "</dd>" +
    "<dt>Why now</dt><dd>" + esc(b.whyNow) + "</dd>" +
    "<dt>Hoped-for outcome</dt><dd>" + esc(b.hopedOutcome) + "</dd></dl>" +
    (b.note ? '<p class="callout">' + esc(b.note) + "</p>" : "") + "</div>";

  /* 2. Stakeholder map */
  html += h2(2, "Stakeholder map") +
    "<p>Who is affected, who decides, who does the work today. Power says whether they can stop or change the work; interest says how much they care about the outcome.</p>";
  var quads = { "high-high": [], "high-low": [], "low-high": [], "low-low": [] };
  (D.stakeholders || []).forEach(function (s) { (quads[s.power + "-" + s.interest] || quads["low-low"]).push(s.name); });
  function chips(list) { return list.length ? list.map(function (n) { return '<span class="chip">' + esc(n) + "</span>"; }).join("") : '<span class="empty">None</span>'; }
  html += '<div class="quadrant-grid" role="table" aria-label="Power and interest grid">' +
    '<div class="quadrant-grid__axis quadrant-grid__axis--y"><span>High power</span><span>Low power</span></div>' +
    '<div class="quadrant quadrant--satisfy"><h3>Keep satisfied</h3><p class="quadrant__hint">High power, low interest</p>' + chips(quads["high-low"]) + "</div>" +
    '<div class="quadrant quadrant--manage"><h3>Manage closely</h3><p class="quadrant__hint">High power, high interest</p>' + chips(quads["high-high"]) + "</div>" +
    '<div class="quadrant quadrant--monitor"><h3>Monitor</h3><p class="quadrant__hint">Low power, low interest</p>' + chips(quads["low-low"]) + "</div>" +
    '<div class="quadrant quadrant--inform"><h3>Keep informed</h3><p class="quadrant__hint">Low power, high interest</p>' + chips(quads["low-high"]) + "</div>" +
    '<div class="quadrant-grid__axis quadrant-grid__axis--x"><span>Low interest</span><span>High interest</span></div>' +
    "</div>";
  html += "<h3>What each of them wants, fears and says</h3>" +
    '<p class="muted">Facilitator: the last line of each card is your script when the group interviews that stakeholder.</p>' +
    '<div class="stakeholder-grid">';
  (D.stakeholders || []).forEach(function (s) {
    html += '<div class="stakeholder-card"><h4>' + esc(s.name) + '</h4><p class="stakeholder-card__meta">' + esc(s.power) + " power · " + esc(s.interest) + " interest</p>" +
      "<dl><dt>Wants</dt><dd>" + esc(s.wants) + "</dd><dt>Fears</dt><dd>" + esc(s.fears) + "</dd><dt>Involved today</dt><dd>" + esc(s.involvedToday) + "</dd></dl>" +
      (s.willSay ? '<blockquote class="stakeholder-card__quote">“' + esc(s.willSay) + "”</blockquote>" : "") + "</div>";
  });
  html += "</div>";

  /* 3. Interview guide */
  var g = D.interviewGuide || {};
  html += h2(3, "Interview guide") + '<div class="guide">' +
    '<div class="panel"><p class="eyebrow">Opening</p><p>' + esc(g.opening) + "</p>";
  (g.sections || []).forEach(function (sec) {
    html += "<h3>" + esc(sec.audience) + '</h3><ol class="guide-list">';
    (sec.questions || []).forEach(function (q) { html += "<li>" + esc(q) + "</li>"; });
    html += "</ol>";
  });
  html += '<p class="eyebrow">Closing</p><p>' + esc(g.closing) + "</p></div>";
  if (g.tips && g.tips.length) {
    html += '<aside class="panel panel--tips"><h3>How to get honest answers</h3><ul>';
    g.tips.forEach(function (t) { html += "<li>" + esc(t) + "</li>"; });
    html += "</ul></aside>";
  }
  html += "</div>";

  /* 4. Data analysis output */
  var da = D.dataAnalysis || {};
  html += h2(4, "Data analysis output") + (da.summary ? "<p>" + esc(da.summary) + "</p>" : "") + R.statTiles(da.stats);
  if (da.charts && da.charts.length) {
    html += '<div class="chart-grid">';
    da.charts.forEach(function (c, i) { html += R.barChart(c, "d" + i); });
    html += "</div>";
  }
  if (da.known && da.known.length) {
    html += "<h3>What we know</h3>" + R.dataTable(["We know that", "Source", "Confidence"], da.known.map(function (k) { return [k.text, k.source, k.confidence]; }));
  }
  if (da.unknown && da.unknown.length) {
    html += "<h3>What we do not know yet</h3>" + R.dataTable(["We do not know", "How we could find out", "Effort"], da.unknown.map(function (u) { return [u.text, u.howToFindOut, u.effort]; }));
  }

  /* 5. As-is process */
  var p = D.asIsProcess || { lanes: [], steps: [] };
  html += h2(5, "How it works today (as-is process)") +
    "<p>The current process end to end, from the resident's first action to the last thing the council does. Hover a pain point to read it.</p>" +
    R.flow(p.lanes, p.steps);

  /* 6. Key assumptions */
  if (D.assumptions && D.assumptions.length) {
    html += h2(6, "Key assumptions") +
      "<p>Every proposal rests on assumptions. Writing them down lets them be tested rather than discovered the hard way.</p>" +
      R.dataTable(["Assumption", "If it is wrong", "How we would test it", "Status"], D.assumptions.map(function (a) { return [a.assumption, a.ifWrong, a.howToTest, a.status]; }));
  }

  /* 7. Problem statement */
  var ps = D.problemStatement || {};
  html += h2(7, "Output: the problem statement") +
    "<p>One paragraph, five parts. If any part is blank, discovery is not finished. If it names a solution, it is not a problem statement.</p>" +
    '<div class="problem-statement">' +
    '<p><span class="ps-label">Who</span> <strong>' + esc(ps.who) + "</strong> " +
    '<span class="ps-label">needs to</span> <strong>' + esc(ps.needsTo) + "</strong> " +
    '<span class="ps-label">because</span> ' + esc(ps.because) + ".</p>" +
    '<p><span class="ps-label">Today they</span> ' + esc(ps.today) + ", " +
    '<span class="ps-label">which results in</span> ' + esc(ps.resultsIn) + ".</p></div>" +
    (ps.note ? '<p class="callout">' + esc(ps.note) + "</p>" : "");

  root.innerHTML = html;

  R.handIn(document.getElementById("hand-in-panel"), "brent-sandbox-handin-discover",
    "Hand this in",
    "Write your group's problem statement here. Keep the five labels. The facilitator copies it to Claude, and it appears on the Define page and in the build.",
    "PROBLEM STATEMENT\nWho: \nNeeds to: \nBecause: \nToday they: \nWhich results in: \n");
})();

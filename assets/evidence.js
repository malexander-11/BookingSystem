/* "After build" evidence page. Rendered from window.EVIDENCE (config/evidence.js)
   under the same numbered headings as the Evaluate page. Uses window.R (assets/render.js). */
(function () {
  "use strict";

  var E = window.EVIDENCE, MVP = window.MVP || {}, R = window.R;
  var root = document.getElementById("evidence");
  if (!E) { root.innerHTML = '<p class="notice">config/evidence.js did not load. Check the file for syntax errors.</p>'; return; }
  var esc = R.esc, h2 = R.h2;

  /* ---- static chrome --------------------------------------------------- */
  R.chrome(MVP);
  if (MVP.brand) document.getElementById("sandbox-banner").textContent = MVP.brand.sandboxNotice + " All data on this page is made up.";
  document.getElementById("evidence-title").textContent = E.title;
  document.getElementById("evidence-period").textContent = E.period;
  document.getElementById("evidence-intro").textContent = E.intro || "";
  document.title = E.title + " | " + ((MVP.brand && MVP.brand.council) || "Brent Council") + " (training sandbox)";

  var html = "";

  /* ---- 1. What we set out to do --------------------------------------- */
  var s = E.setOutToDo || {};
  html += h2(1, "What we set out to do") +
    '<div class="hypothesis-box"><p class="eyebrow">Hypothesis</p><p>' + esc(s.hypothesis) + "</p>" +
    '<dl class="summary-list">' +
    "<dt>Measure of success</dt><dd>" + esc(s.measure) + "</dd>" +
    "<dt>Target</dt><dd>" + esc(s.target) + "</dd>" +
    (s.baseline ? "<dt>Baseline</dt><dd>" + esc(s.baseline) + "</dd>" : "") +
    (s.guardRail ? "<dt>Guard-rail</dt><dd>" + esc(s.guardRail) + "</dd>" : "") +
    "</dl></div>";

  /* ---- 2. Measurement plan --------------------------------------------- */
  if (E.measurementPlan && E.measurementPlan.length) {
    html += h2(2, "Measurement plan") +
      "<p>What we said we needed to know, where the number would come from, and what came back.</p>" +
      R.dataTable(["Question", "Metric", "Source", "Result"], E.measurementPlan.map(function (r) { return [r.question, r.metric, r.source, r.result]; }), "plan-table");
  }

  /* ---- 3. What happened ------------------------------------------------ */
  html += h2(3, "What happened") + R.statTiles(E.whatHappened);

  /* ---- 4. What users did ----------------------------------------------- */
  if (E.userBehaviour && E.userBehaviour.length) {
    html += h2(4, "What users did") + '<div class="chart-grid">';
    E.userBehaviour.forEach(function (c, ci) { html += R.barChart(c, ci); });
    html += "</div>";
  }

  /* ---- 5. Did it change our impact? ------------------------------------ */
  var im = E.impact || {};
  html += h2(5, "Did it change our impact?") + '<div class="panel">' +
    '<dl class="summary-list">' +
    "<dt>Measure of success: actual</dt><dd><strong>" + esc(im.actual) + "</strong></dd>" +
    "<dt>Target met?</dt><dd>" + esc(im.targetMet) + "</dd>" +
    (im.guardRailHeld ? "<dt>Guard-rail held?</dt><dd>" + esc(im.guardRailHeld) + "</dd>" : "") +
    "</dl>" + (im.verdict ? "<p><em>" + esc(im.verdict) + "</em></p>" : "");
  if (im.caveats && im.caveats.length) {
    html += '<h3>Before we read too much into it</h3><ul class="caveat-list">';
    im.caveats.forEach(function (c) { html += "<li><strong>" + esc(c.name) + ":</strong> " + esc(c.text) + "</li>"; });
    html += "</ul>";
  }
  html += "</div>";

  /* ---- 6. The four product risks -------------------------------------- */
  html += h2(6, "The four product risks") +
    "<p>For each risk, compare what we assumed with what the evidence now says.</p><div class=\"risk-grid\">";
  (E.risks || []).forEach(function (r) {
    html += '<section class="risk-card" aria-labelledby="risk-' + esc(r.id) + '"><h3 id="risk-' + esc(r.id) + '">' + esc(r.name) + "</h3>" +
      (r.question ? '<p class="risk-card__question">' + esc(r.question) + "</p>" : "") +
      '<div class="risk-card__assumption"><strong>We assumed:</strong> ' + esc(r.assumption) + "</div>" +
      '<ul class="evidence-list">';
    (r.evidence || []).forEach(function (ev) {
      var dir = ev.direction === "for" ? "for" : ev.direction === "mixed" ? "mixed" : "against";
      html += '<li><span class="tag tag--' + dir + '">' + dir + "</span><span>" + esc(ev.text) +
        (ev.source ? '<span class="evidence-source">Source: ' + esc(ev.source) + "</span>" : "") + "</span></li>";
    });
    html += "</ul></section>";
  });
  html += "</div>";

  /* ---- 7. What surprised us ------------------------------------------- */
  if ((E.surprises && E.surprises.length) || (E.quotes && E.quotes.length)) {
    html += h2(7, "What surprised us");
    if (E.surprises && E.surprises.length) {
      html += '<ul class="surprise-list">';
      E.surprises.forEach(function (t) { html += "<li>" + esc(t) + "</li>"; });
      html += "</ul>";
    }
    if (E.quotes && E.quotes.length) {
      html += '<h3>What people said</h3><div class="quote-grid">';
      E.quotes.forEach(function (q) {
        html += '<blockquote class="quote"><p>“' + esc(q.text) + "”</p><footer>" + esc(q.who) + "</footer></blockquote>";
      });
      html += "</div>";
    }
  }

  /* ---- 8. Decision ------------------------------------------------------ */
  if (E.decision) {
    html += h2(8, "Decision") + '<div class="panel"><p><strong>' + esc(E.decision.prompt) + '</strong></p><ul class="decision-list">';
    (E.decision.options || []).forEach(function (o) {
      html += "<li><strong>" + esc(o.name) + "</strong><span>" + esc(o.meaning) + "</span></li>";
    });
    html += "</ul></div>";
  }

  root.innerHTML = html;
})();

/* "After build" evidence page. Rendered from window.EVIDENCE (config/evidence.js). */
(function () {
  "use strict";

  var E = window.EVIDENCE, MVP = window.MVP || {};
  var root = document.getElementById("evidence");
  if (!E) { root.innerHTML = '<p class="notice">config/evidence.js did not load. Check the file for syntax errors.</p>'; return; }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtNum(n, unit) {
    var s = typeof n === "number" ? n.toLocaleString("en-GB") : String(n);
    return unit === "%" ? s + "%" : s;
  }

  /* ---- static chrome --------------------------------------------------- */
  if (MVP.brand) {
    document.getElementById("service-name").textContent = MVP.brand.service;
    document.getElementById("footer-note").textContent = "© " + new Date().getFullYear() + " " + MVP.brand.council + " (fictional training sandbox)";
    document.getElementById("sandbox-banner").textContent = MVP.brand.sandboxNotice + " All data on this page is made up.";
  }
  document.getElementById("evidence-title").textContent = E.title;
  document.getElementById("evidence-period").textContent = E.period;
  document.getElementById("evidence-intro").textContent = E.intro || "";
  document.title = E.title + " | " + ((MVP.brand && MVP.brand.council) || "Brent Council") + " (training sandbox)";

  var html = "";

  /* ---- hypothesis + success measure ------------------------------------ */
  html += '<div class="hypothesis-box"><p class="eyebrow">The hypothesis we tested</p><p>' + esc(E.hypothesisUnderTest) + "</p>" +
    '<p class="eyebrow" style="margin-top:1rem">Measure of success</p>' +
    "<p><strong>" + esc(E.successMeasure.name) + "</strong><br>Target: " + esc(E.successMeasure.target) +
    "<br>Actual: <strong>" + esc(E.successMeasure.actual) + "</strong></p>" +
    (E.successMeasure.verdict ? "<p><em>" + esc(E.successMeasure.verdict) + "</em></p>" : "") + "</div>";

  /* ---- headline stats -------------------------------------------------- */
  html += '<h2 class="section-title">Headline numbers</h2><div class="stat-grid">';
  (E.headline || []).forEach(function (h) {
    var tone = h.tone === "good" || h.tone === "bad" ? h.tone : "neutral";
    var icon = tone === "good" ? "▲ " : tone === "bad" ? "▼ " : "";
    html += '<div class="stat-tile stat-tile--' + tone + '"><p class="stat-value">' + esc(h.value) + "</p>" +
      '<p class="stat-label">' + esc(h.label) + "</p>" + (h.note ? '<p class="stat-note">' + icon + esc(h.note) + "</p>" : "") + "</div>";
  });
  html += "</div>";

  /* ---- charts (single-hue horizontal bars, direct-labelled) ------------ */
  if (E.charts && E.charts.length) {
    html += '<h2 class="section-title">The data</h2><div class="chart-grid">';
    E.charts.forEach(function (c, ci) {
      var max = Math.max.apply(null, c.items.map(function (i) { return i.value; })) || 1;
      html += '<figure class="chart" aria-labelledby="chart-' + ci + '"><h3 id="chart-' + ci + '">' + esc(c.title) + "</h3>" +
        (c.subtitle ? '<p class="chart__subtitle">' + esc(c.subtitle) + "</p>" : "") + '<div class="bars" role="list">';
      c.items.forEach(function (it, i) {
        var pct = Math.max(1, Math.round((it.value / max) * 100));
        var hl = c.highlightLast && i === c.items.length - 1;
        html += '<span class="bar-label" role="listitem">' + esc(it.label) + "</span>" +
          '<div class="bar-track" title="' + esc(it.label + ": " + fmtNum(it.value, c.unit)) + '"><div class="bar-fill' + (hl ? " bar-fill--highlight" : "") + '" style="width:' + pct + '%"></div></div>' +
          '<span class="bar-value">' + esc(fmtNum(it.value, c.unit)) + "</span>";
      });
      html += "</div>";
      if (c.note) html += '<figcaption class="chart__note">' + esc(c.note) + "</figcaption>";
      html += "<details><summary>View as table</summary><table><thead><tr><th>Item</th><th>" + esc(c.unit === "%" ? "Share" : "Count") + "</th></tr></thead><tbody>";
      c.items.forEach(function (it) { html += "<tr><td>" + esc(it.label) + "</td><td>" + esc(fmtNum(it.value, c.unit)) + "</td></tr>"; });
      html += "</tbody></table></details></figure>";
    });
    html += "</div>";
  }

  /* ---- the four product risks ------------------------------------------ */
  html += '<h2 class="section-title">The four product risks</h2>' +
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

  /* ---- quotes ----------------------------------------------------------- */
  if (E.quotes && E.quotes.length) {
    html += '<h2 class="section-title">What people said</h2><div class="quote-grid">';
    E.quotes.forEach(function (q) {
      html += '<blockquote class="quote"><p>“' + esc(q.text) + "”</p><footer>" + esc(q.who) + "</footer></blockquote>";
    });
    html += "</div>";
  }

  /* ---- decision ---------------------------------------------------------- */
  if (E.decision) {
    html += '<h2 class="section-title">What next?</h2><div class="panel"><p><strong>' + esc(E.decision.prompt) + '</strong></p><ul class="decision-list">';
    (E.decision.options || []).forEach(function (o) {
      html += "<li><strong>" + esc(o.name) + "</strong><span>" + esc(o.meaning) + "</span></li>";
    });
    html += "</ul></div>";
  }

  root.innerHTML = html;
})();

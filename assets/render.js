/* Shared renderers for the workshop pages. Plain script, assigns window.R. */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtNum(n, unit) {
    var s = typeof n === "number" ? n.toLocaleString("en-GB") : String(n);
    return unit === "%" ? s + "%" : s;
  }
  function h2(n, text, id) {
    return '<h2 class="section-title"' + (id ? ' id="' + esc(id) + '"' : "") + ">" + (n ? n + ". " : "") + esc(text) + "</h2>";
  }

  /* Stat tiles: [{label, value, note, tone}] */
  function statTiles(list) {
    var html = '<div class="stat-grid">';
    (list || []).forEach(function (h) {
      var tone = h.tone === "good" || h.tone === "bad" ? h.tone : "neutral";
      var icon = tone === "good" ? "▲ " : tone === "bad" ? "▼ " : "";
      html += '<div class="stat-tile stat-tile--' + tone + '"><p class="stat-value">' + esc(h.value) + "</p>" +
        '<p class="stat-label">' + esc(h.label) + "</p>" + (h.note ? '<p class="stat-note">' + icon + esc(h.note) + "</p>" : "") + "</div>";
    });
    return html + "</div>";
  }

  /* Single-hue horizontal bar chart with direct labels and a table view. */
  function barChart(c, idx) {
    var max = Math.max.apply(null, c.items.map(function (i) { return i.value; })) || 1;
    var id = "chart-" + (idx == null ? Math.random().toString(36).slice(2, 7) : idx);
    var html = '<figure class="chart" aria-labelledby="' + id + '"><h3 id="' + id + '">' + esc(c.title) + "</h3>" +
      (c.subtitle || c.source ? '<p class="chart__subtitle">' + esc(c.subtitle || "") + (c.source ? (c.subtitle ? " · " : "") + "Source: " + esc(c.source) : "") + "</p>" : "") +
      '<div class="bars" role="list">';
    c.items.forEach(function (it, i) {
      var pct = Math.max(1, Math.round((it.value / max) * 100));
      var hl = c.highlightLast && i === c.items.length - 1;
      html += '<span class="bar-label" role="listitem">' + esc(it.label) + "</span>" +
        '<div class="bar-track" title="' + esc(it.label + ": " + fmtNum(it.value, c.unit)) + '"><div class="bar-fill' + (hl ? " bar-fill--highlight" : "") + '" style="width:' + pct + '%"></div></div>' +
        '<span class="bar-value">' + esc(fmtNum(it.value, c.unit)) + "</span>";
    });
    html += "</div>";
    if (c.note) html += '<figcaption class="chart__note">' + esc(c.note) + "</figcaption>";
    html += '<details><summary>View as table</summary><table class="data-table"><thead><tr><th>Item</th><th>' + esc(c.unit === "%" ? "Share" : "Count") + "</th></tr></thead><tbody>";
    c.items.forEach(function (it) { html += "<tr><td>" + esc(it.label) + "</td><td>" + esc(fmtNum(it.value, c.unit)) + "</td></tr>"; });
    return html + "</tbody></table></details></figure>";
  }

  /* Data table: headers [string], rows [[cell, ...]]. Cells are escaped. */
  function dataTable(headers, rows, cls) {
    var html = '<div class="table-wrap"><table class="data-table ' + (cls || "") + '"><thead><tr>';
    headers.forEach(function (h) { html += "<th>" + esc(h) + "</th>"; });
    html += "</tr></thead><tbody>";
    rows.forEach(function (r) {
      html += "<tr>";
      r.forEach(function (c, i) { html += "<td>" + (i === 0 ? "<strong>" + esc(c) + "</strong>" : esc(c)) + "</td>"; });
      html += "</tr>";
    });
    return html + "</tbody></table></div>";
  }

  /* Process flow: lanes [string], steps [{lane, text, painPoint}] */
  function flow(lanes, steps) {
    var html = '<div class="flow-legend">';
    lanes.forEach(function (l, i) { html += '<span class="flow-legend__item"><span class="flow-swatch flow-lane-' + i + '"></span>' + esc(l) + "</span>"; });
    html += '</div><ol class="flow">';
    steps.forEach(function (s, i) {
      var li = Math.max(0, lanes.indexOf(s.lane));
      html += '<li class="flow-step flow-lane-' + li + (s.painPoint ? " has-pain" : "") + '">' +
        '<span class="flow-step__lane">' + esc(s.lane) + "</span>" +
        '<span class="flow-step__text">' + esc(s.text) + "</span>" +
        (s.painPoint ? '<span class="flow-step__pain" title="' + esc(s.painPoint) + '">Pain point</span>' : "") +
        "</li>";
    });
    html += "</ol>";
    var pains = steps.filter(function (s) { return s.painPoint; });
    if (pains.length) {
      html += '<ul class="pain-list">';
      pains.forEach(function (s) { html += "<li><strong>" + esc(s.text) + ":</strong> " + esc(s.painPoint) + "</li>"; });
      html += "</ul>";
    }
    return html;
  }

  /* Hand-in panel: an editable template saved per page, with copy and reset. */
  function handIn(el, key, title, intro, template) {
    var saved = "";
    try { saved = localStorage.getItem(key) || ""; } catch (e) { /* ignore */ }
    el.innerHTML = '<h2 class="section-title" id="hand-in">' + esc(title) + "</h2>" +
      '<div class="panel hand-in"><p>' + esc(intro) + "</p>" +
      '<label class="form-label" for="hand-in-text">Type here, then copy and paste it to Claude</label>' +
      '<textarea class="hand-in__text" id="hand-in-text" rows="14" spellcheck="false"></textarea>' +
      '<div class="btn-row"><button class="btn" type="button" data-copy>Copy</button>' +
      '<button class="btn btn--secondary" type="button" data-reset>Reset to template</button>' +
      '<span class="hand-in__status" aria-live="polite"></span></div></div>';
    var ta = el.querySelector("textarea"), status = el.querySelector(".hand-in__status");
    ta.value = saved || template;
    ta.addEventListener("input", function () { try { localStorage.setItem(key, ta.value); } catch (e) { /* ignore */ } });
    el.querySelector("[data-copy]").addEventListener("click", function () {
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { /* ignore */ }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(function () { status.textContent = "Copied."; }, function () { status.textContent = ok ? "Copied." : "Select the text and copy it manually."; });
      else status.textContent = ok ? "Copied." : "Select the text and copy it manually.";
    });
    el.querySelector("[data-reset]").addEventListener("click", function () {
      if (ta.value !== template && !window.confirm("Replace what is typed here with the blank template?")) return;
      ta.value = template;
      try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
      status.textContent = "Reset.";
    });
  }

  /* Static chrome shared by workshop pages. */
  function chrome(MVP) {
    if (!MVP || !MVP.brand) return;
    var s = document.getElementById("service-name"); if (s) s.textContent = MVP.brand.service;
    var f = document.getElementById("footer-note"); if (f) f.textContent = "© " + new Date().getFullYear() + " " + MVP.brand.council + " (fictional training sandbox)";
    var b = document.getElementById("sandbox-banner"); if (b && !b.dataset.keep) b.textContent = MVP.brand.sandboxNotice;
  }

  window.R = { esc: esc, fmtNum: fmtNum, h2: h2, statTiles: statTiles, barChart: barChart, dataTable: dataTable, flow: flow, handIn: handIn, chrome: chrome };
})();

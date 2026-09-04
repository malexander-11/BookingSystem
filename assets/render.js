/* Shared renderers and helpers for the workshop pages. Plain script, assigns window.R. */
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

  /* ---- Per-page state in localStorage ---------------------------------- */
  function store(key) {
    var api = { key: key, state: {} };
    try { api.state = JSON.parse(localStorage.getItem(key) || "{}") || {}; } catch (e) { api.state = {}; }
    api.save = function () { try { localStorage.setItem(key, JSON.stringify(api.state)); } catch (e) { /* private mode */ } };
    api.get = function (k, d) { return api.state[k] == null ? d : api.state[k]; };
    api.set = function (k, v) { api.state[k] = v; api.save(); };
    api.clear = function () { api.state = {}; try { localStorage.removeItem(key); } catch (e) { /* ignore */ } };
    return api;
  }

  /* Two-way binding for every [data-key] input/textarea/select under root. */
  function bind(root, st, onChange) {
    root.querySelectorAll("[data-key]").forEach(function (el) {
      var k = el.getAttribute("data-key");
      if (el.dataset.bound) return;
      el.dataset.bound = "1";
      var v = st.get(k, "");
      if (el.type === "checkbox") el.checked = !!v; else el.value = v;
      el.addEventListener("input", function () {
        st.set(k, el.type === "checkbox" ? el.checked : el.value);
        if (onChange) onChange(k, el);
      });
    });
  }

  /* ---- Facilitator view ------------------------------------------------- */
  var FKEY = "brent-sandbox-facilitator";
  function isFacilitator() {
    try {
      var q = new URLSearchParams(location.search).get("facilitator");
      if (q === "1") localStorage.setItem(FKEY, "1");
      if (q === "0") localStorage.removeItem(FKEY);
      return localStorage.getItem(FKEY) === "1";
    } catch (e) { return false; }
  }
  /* Returns "" for participants; an amber details panel for the facilitator. */
  function facilitatorBlock(title, inner, open) {
    if (!isFacilitator()) return "";
    return '<details class="facilitator-only"' + (open ? " open" : "") + "><summary>Facilitator only: " + esc(title) + "</summary><div>" + inner + "</div></details>";
  }

  /* Page tools bar: reset button and facilitator pill. */
  function pageTools(el, stores) {
    var fac = isFacilitator();
    el.innerHTML = '<div class="page-tools"><span class="page-tools__note">What you type on this page is saved in this browser.</span>' +
      '<button class="btn btn--link" type="button" data-reset-page>Reset this page</button>' +
      (fac ? '<span class="facilitator-pill">Facilitator view on · <a href="?facilitator=0">turn off</a></span>' : "") + "</div>";
    el.querySelector("[data-reset-page]").addEventListener("click", function () {
      if (!window.confirm("Clear everything typed on this page?")) return;
      stores.forEach(function (s) { s.clear(); });
      location.reload();
    });
  }

  /* ---- Stat tiles, bar chart, table ------------------------------------- */
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

  /* ---- Process flow ------------------------------------------------------ */
  /* opts.editable = { st, prefix }: each step gets a pain-point textarea bound to prefix.i
     opts.hidePain: do not show the config's painPoint fields. */
  function flow(lanes, steps, opts) {
    opts = opts || {};
    var html = '<div class="flow-legend">';
    lanes.forEach(function (l, i) { html += '<span class="flow-legend__item"><span class="flow-swatch flow-lane-' + i + '"></span>' + esc(l) + "</span>"; });
    html += '</div><ol class="flow' + (opts.editable ? " flow--editable" : "") + '">';
    steps.forEach(function (s, i) {
      var li = Math.max(0, lanes.indexOf(s.lane));
      var pain = opts.hidePain ? "" : s.painPoint;
      var typed = opts.editable ? opts.editable.st.get(opts.editable.prefix + "." + i, "") : "";
      html += '<li class="flow-step flow-lane-' + li + (pain || typed || (opts.editable && s.prefilled) ? " has-pain" : "") + '" data-step="' + i + '">' +
        '<span class="flow-step__lane">' + esc(s.lane) + "</span>" +
        '<span class="flow-step__text">' + esc(s.text) + "</span>" +
        (pain ? '<span class="flow-step__pain" title="' + esc(pain) + '">Pain point</span>' : "") +
        (opts.editable && s.prefilled ? '<p class="flow-step__given">' + esc(s.painPoint) + '</p><span class="flow-step__pain">Pain point</span>' :
         opts.editable ? '<label class="visually-hidden" for="pain-' + i + '">Pain point for step ' + (i + 1) + '</label>' +
          '<textarea class="flow-step__input" id="pain-' + i + '" rows="2" placeholder="Where does this step hurt?" data-key="' + esc(opts.editable.prefix + "." + i) + '"></textarea>' +
          '<span class="flow-step__pain flow-step__pain--typed"' + (typed ? "" : " hidden") + ">Pain point</span>" : "") +
        "</li>";
    });
    html += "</ol>";
    if (!opts.hidePain) {
      var pains = steps.filter(function (s) { return s.painPoint; });
      if (pains.length) {
        html += '<ul class="pain-list">';
        pains.forEach(function (s) { html += "<li><strong>" + esc(s.text) + ":</strong> " + esc(s.painPoint) + "</li>"; });
        html += "</ul>";
      }
    }
    if (opts.editable) html += '<ul class="pain-list" data-pain-list></ul>';
    return html;
  }
  /* After bind(): keep the typed badges and list in sync. */
  function flowSync(root, steps, st, prefix) {
    var list = root.querySelector("[data-pain-list]");
    function update() {
      var items = "";
      steps.forEach(function (s, i) {
        if (s.prefilled) { items += "<li><strong>" + esc(s.text) + ":</strong> " + esc(s.painPoint) + " <em>(given)</em></li>"; return; }
        var v = (st.get(prefix + "." + i, "") || "").trim();
        var step = root.querySelector('.flow-step[data-step="' + i + '"]');
        if (step) { step.classList.toggle("has-pain", !!v); var b = step.querySelector(".flow-step__pain--typed"); if (b) b.hidden = !v; }
        if (v) items += "<li><strong>" + esc(s.text) + ":</strong> " + esc(v) + "</li>";
      });
      if (list) list.innerHTML = items;
    }
    root.querySelectorAll(".flow-step__input").forEach(function (t) { t.addEventListener("input", update); });
    update();
  }

  /* ---- Editable row list -------------------------------------------------- */
  /* fields: [{id, label, placeholder}] ; rows stored as an array under st[key]. */
  function editableRows(el, st, key, fields, opts) {
    opts = opts || {};
    var min = opts.min == null ? 1 : opts.min;
    function rows() { var r = st.get(key, null); if (!Array.isArray(r)) { r = []; } while (r.length < min) r.push({}); return r; }
    function render() {
      var r = rows(), html = "";
      r.forEach(function (row, i) {
        html += '<fieldset class="edit-row"><legend>' + esc(opts.legend || "Row") + " " + (i + 1) + "</legend>";
        fields.forEach(function (f) {
          html += '<div class="form-group"><label class="form-label" for="' + key + "-" + f.id + "-" + i + '">' + esc(f.label) + "</label>" +
            (f.multiline ? '<textarea class="form-input" rows="2"' : '<input class="form-input"') + ' id="' + key + "-" + f.id + "-" + i + '" data-row="' + i + '" data-field="' + f.id + '" placeholder="' + esc(f.placeholder || "") + '"' +
            (f.multiline ? ">" + esc(row[f.id] || "") + "</textarea>" : ' value="' + esc(row[f.id] || "") + '">') + "</div>";
        });
        html += '<button class="btn btn--link" type="button" data-remove-row="' + i + '">Remove</button></fieldset>';
      });
      html += '<button class="btn btn--secondary" type="button" data-add-row>' + esc(opts.addLabel || "Add another") + "</button>";
      el.innerHTML = html;
      el.querySelectorAll("[data-row]").forEach(function (inp) {
        inp.addEventListener("input", function () { var r = rows(); r[+inp.dataset.row][inp.dataset.field] = inp.value; st.set(key, r); if (opts.onChange) opts.onChange(); });
      });
      el.querySelectorAll("[data-remove-row]").forEach(function (b) {
        b.addEventListener("click", function () { var r = rows(); r.splice(+b.getAttribute("data-remove-row"), 1); st.set(key, r); render(); if (opts.onChange) opts.onChange(); });
      });
      el.querySelector("[data-add-row]").addEventListener("click", function () { var r = rows(); r.push({}); st.set(key, r); render(); });
    }
    render();
    return { rows: rows, render: render };
  }

  /* ---- Copy box ------------------------------------------------------------ */
  function copyBox(el, opts) {
    el.innerHTML = '<label class="form-label" for="' + esc(opts.id) + '">' + esc(opts.label) + "</label>" +
      '<textarea class="hand-in__text" id="' + esc(opts.id) + '" rows="' + (opts.rows || 12) + '" readonly></textarea>' +
      '<div class="btn-row"><button class="btn" type="button" data-copy>' + esc(opts.button || "Copy") + '</button><span class="hand-in__status" aria-live="polite"></span></div>';
    var ta = el.querySelector("textarea"), status = el.querySelector(".hand-in__status");
    function update() { ta.value = opts.text(); }
    el.querySelector("[data-copy]").addEventListener("click", function () {
      update(); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { /* ignore */ }
      var done = function () { status.textContent = "Copied. Paste it to Claude."; };
      var fail = function () { status.textContent = ok ? "Copied. Paste it to Claude." : "Select the text and copy it manually."; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, fail); else fail();
    });
    update();
    return { update: update };
  }

  /* ---- Static chrome shared by workshop pages --------------------------- */
  function chrome(MVP) {
    if (!MVP || !MVP.brand) return;
    var s = document.getElementById("service-name"); if (s) s.textContent = MVP.brand.service;
    var f = document.getElementById("footer-note"); if (f) f.textContent = "© " + new Date().getFullYear() + " " + MVP.brand.council + " (fictional training sandbox)";
    var b = document.getElementById("sandbox-banner"); if (b && !b.dataset.keep) b.textContent = MVP.brand.sandboxNotice;
  }

  window.R = {
    esc: esc, fmtNum: fmtNum, h2: h2,
    store: store, bind: bind, isFacilitator: isFacilitator, facilitatorBlock: facilitatorBlock, pageTools: pageTools,
    statTiles: statTiles, barChart: barChart, dataTable: dataTable,
    flow: flow, flowSync: flowSync, editableRows: editableRows, copyBox: copyBox, chrome: chrome
  };
})();

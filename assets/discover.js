/* Discover page: interactive. Rendered from window.DISCOVERY (config/discovery.js).
   Participant input is saved in localStorage under brent-sandbox-discover. */
(function () {
  "use strict";

  var D = window.DISCOVERY, R = window.R;
  var root = document.getElementById("stage");
  if (!D) { root.innerHTML = '<p class="notice">config/discovery.js did not load. Check the file for syntax errors.</p>'; return; }
  var esc = R.esc, h2 = R.h2, fac = R.facilitatorBlock;
  var st = R.store("brent-sandbox-discover");

  R.chrome(window.MVP);
  document.getElementById("stage-eyebrow").textContent = D.stage.eyebrow || "Before build";
  document.getElementById("stage-title").textContent = D.stage.title || "Discover";
  document.getElementById("stage-question").textContent = D.stage.question || "";
  document.title = "1 Discover | " + ((window.MVP && window.MVP.brand && window.MVP.brand.council) || "Brent Council") + " (training sandbox)";
  R.pageTools(document.getElementById("page-tools"), [st]);

  function ta(key, label, hint, rows, placeholder) {
    return '<div class="input-block form-group"><label class="form-label" for="' + key + '">' + esc(label) + "</label>" +
      (hint ? '<span class="form-hint">' + esc(hint) + "</span>" : "") +
      '<textarea class="form-input" id="' + key + '" data-key="' + key + '" rows="' + (rows || 2) + '" placeholder="' + esc(placeholder || "") + '"></textarea></div>';
  }

  var html = '<div class="notice"><strong>This stage ends with:</strong> ' + esc(D.stage.endsWith) + "</div>";

  /* ---- 1. The brief ------------------------------------------------------- */
  var b = D.brief || {};
  html += h2(1, "The brief") + '<div class="panel"><p class="eyebrow">What was asked for</p><p class="brief-quote">' + esc(b.askedFor) + "</p>" +
    "<p>" + esc(b.why || "Before anything is built we need to understand why this should happen and what people want to achieve.") + "</p></div>";

  /* ---- 2. Stakeholder map (drag and drop) -------------------------------- */
  html += h2(2, "Stakeholder map") +
    "<p>Drag each stakeholder into the box where they belong. Power: can they stop or change this work? Interest: how much do they care about the outcome? On a phone, tap a chip, then tap a box.</p>" +
    '<div id="stakeholder-map"></div>';
  var cards = "";
  (D.stakeholders || []).forEach(function (s) {
    cards += '<div class="stakeholder-card"><h4>' + esc(s.name) + '</h4><p class="stakeholder-card__meta">Intended: ' + esc(s.power) + " power · " + esc(s.interest) + " interest</p>" +
      "<dl><dt>Wants</dt><dd>" + esc(s.wants) + "</dd><dt>Fears</dt><dd>" + esc(s.fears) + "</dd><dt>Involved today</dt><dd>" + esc(s.involvedToday) + "</dd></dl>" +
      (s.willSay ? '<blockquote class="stakeholder-card__quote">“' + esc(s.willSay) + "”</blockquote>" : "") + "</div>";
  });
  html += fac("intended placement and what each stakeholder will say", '<div class="stakeholder-grid">' + cards + "</div>");

  /* ---- 3. Interview guide: two side-by-side sets of tips ------------------ */
  var g = D.interviewGuide || {};
  function guidePanel(gp, cls) {
    if (!gp) return "";
    var out = '<div class="panel guide-panel ' + cls + '"><h3>' + esc(gp.title) + "</h3>" + (gp.intro ? '<p class="muted">' + esc(gp.intro) + "</p>" : "") +
      '<p class="eyebrow">Tips</p><ul class="guide-tips">';
    (gp.tips || []).forEach(function (t) { out += "<li>" + esc(t) + "</li>"; });
    out += "</ul>";
    if (gp.questions && gp.questions.length) {
      out += '<p class="eyebrow">Example questions</p><ol class="guide-list">';
      gp.questions.forEach(function (q) { out += "<li>" + esc(q) + "</li>"; });
      out += "</ol>";
    }
    return out + "</div>";
  }
  html += h2(3, "Interview guide") + "<p>Read this before the interviews. Stakeholders and users need different questions.</p>" +
    '<div class="guide guide--two">' + guidePanel(g.stakeholders, "guide-panel--stakeholders") + guidePanel(g.users, "guide-panel--users") + "</div>";

  /* ---- 4. What colleagues have already heard ---------------------------- */
  html += h2(4, "What colleagues have already heard") +
    "<p>Your PM and UX colleagues have already spoken to some of the stakeholders. Read what they learnt before your own interviews. Notice where what people want does not line up.</p>" +
    '<div class="colleague-grid">';
  (D.colleagueInterviews || []).forEach(function (c) {
    html += '<div class="panel colleague-card"><span class="tag tag--by">Interviewed by ' + esc(c.by) + '</span><h3>' + esc(c.who) + '</h3><p class="interview-card__role">' + esc(c.role) + "</p>" +
      '<p class="eyebrow">What they learnt</p><p>' + esc(c.learnt) + "</p></div>";
  });
  html += "</div>" +
    '<div class="panel">' + ta("colleagues.challenge", "What challenge is emerging from these interviews?", "One or two sentences. Where do the things people want pull against each other?", 3) + "</div>" +
    (D.colleagueTension ? fac("the competing demands", "<p>" + esc(D.colleagueTension) + "</p>") : "");

  /* ---- 5. Your interviews --------------------------------------------------- */
  html += h2(5, "Your interviews") +
    "<p>This is practice. Two interviews, five minutes each, with your facilitator playing the interviewee. Take it in turns to ask the questions, and remember the tips above. Afterwards, write down what you learned. Listen for what each person wants that the others do not.</p>" +
    '<div class="interview-grid">';
  (D.interviews || []).forEach(function (iv) {
    var sc = iv.script || {};
    var script = "<p><strong>Stance:</strong> " + esc(sc.stance) + '</p><ul class="script-list">';
    (sc.answers || []).forEach(function (a) { script += "<li><em>If asked: " + esc(a.ifAsked) + "</em><br>" + esc(a.say) + "</li>"; });
    script += "</ul>" + (sc.pushBack ? "<p><strong>Push back:</strong> " + esc(sc.pushBack) + "</p>" : "") + (sc.tension ? '<p class="callout">' + esc(sc.tension) + "</p>" : "");
    html += '<div class="panel interview-card"><h3>' + esc(iv.who) + '</h3><p class="interview-card__role">' + esc(iv.role) + "</p>" +
      "<p><strong>Before you walk in:</strong> " + esc(iv.brief) + "</p>" +
      ta("interview." + iv.id + ".learned", "What we learned", "One or two sentences. What does this person want, and what do they fear?", 4) +
      fac("script for " + iv.who, script) + "</div>";
  });
  html += "</div>";

  /* ---- 6. Data, then quiz --------------------------------------------------- */
  var da = D.dataAnalysis || {};
  html += h2(6, "Data analysis output") + (da.summary ? "<p>" + esc(da.summary) + "</p>" : "") + R.statTiles(da.stats);
  if (da.charts && da.charts.length) {
    html += '<div class="chart-grid">';
    da.charts.forEach(function (c, i) { html += R.barChart(c, "d" + i); });
    html += "</div>";
  }
  html += "<h3>True or false?</h3><p>Answer from the data above, not from what you expect to be true.</p><div id=\"quiz\"></div>";

  /* ---- 7. As-is process, annotate ------------------------------------------ */
  var p = D.asIsProcess || { lanes: [], steps: [] };
  html += h2(7, "How it works today (as-is process)") +
    "<p>The current process end to end. Under each step, write where it hurts and for whom. Use what the interviews and the data told you.</p>" +
    '<div id="flow">' + R.flow(p.lanes, p.steps, { editable: { st: st, prefix: "pain" }, hidePain: true }) + "</div>" +
    fac("pain points staff reported", '<ul class="pain-list">' + p.steps.filter(function (s) { return s.painPoint; }).map(function (s) { return "<li><strong>" + esc(s.text) + ":</strong> " + esc(s.painPoint) + "</li>"; }).join("") + "</ul>");

  /* ---- 8. Assumptions --------------------------------------------------------- */
  html += h2(8, "Key assumptions") +
    "<p>Every proposal rests on assumptions. Writing them down lets them be tested rather than discovered the hard way. Add at least one of your own.</p>" +
    R.dataTable(["Assumption", "If it is wrong", "How we would test it", "Status"], (D.assumptions || []).map(function (a) { return [a.assumption, a.ifWrong, a.howToTest, a.status]; })) +
    '<div id="assumption-rows"></div>';

  /* ---- 9. Problem statement composer ------------------------------------ */
  var hints = D.problemStatementHints || {};
  html += h2(9, "Output: the problem statement") +
    "<p>This is what you hand in. Four parts: the shared problem in one paragraph, then whether there is agreement, the size of the prize, and the accidental impacts to watch. If any part is blank, discovery is not finished. If it names a solution, it is not a problem statement.</p>" +
    '<div class="compose">' +
    '<div class="compose__part compose__part--wide"><h3>The shared problem</h3><span class="form-hint">' + esc(hints.shared) + '</span><div class="ps-inline">' +
    '<span class="ps-label">Who</span><input class="form-input" data-key="ps.who" placeholder="which residents, staff or organisations" aria-label="Who">' +
    '<span class="ps-label">needs to</span><input class="form-input" data-key="ps.needsTo" placeholder="do what" aria-label="Needs to">' +
    '<span class="ps-label">because</span><input class="form-input" data-key="ps.because" placeholder="why it matters to them" aria-label="Because">' +
    '<span class="ps-label">today they</span><input class="form-input" data-key="ps.today" placeholder="what happens now" aria-label="Today they">' +
    '<span class="ps-label">which results in</span><input class="form-input" data-key="ps.resultsIn" placeholder="the cost, harm or missed outcome, for them and for us" aria-label="Which results in">' +
    "</div></div>" +
    '<div class="compose__part"><h3>Do we have agreement?</h3><span class="form-hint">' + esc(hints.agreement) + '</span><textarea class="form-input" data-key="ps.agreement" rows="5" aria-label="Agreement"></textarea></div>' +
    '<div class="compose__part"><h3>Size of the prize</h3><span class="form-hint">' + esc(hints.sizeOfPrize) + '</span><textarea class="form-input" data-key="ps.prize" rows="5" aria-label="Size of the prize"></textarea></div>' +
    '<div class="compose__part"><h3>Accidental impacts to be careful about</h3><span class="form-hint">' + esc(hints.watchOuts) + '</span><textarea class="form-input" data-key="ps.watchOuts" rows="5" aria-label="Watch outs"></textarea></div>' +
    "</div>" +
    '<div class="panel hand-in" id="ps-copy"></div>';
  var ps = D.problemStatement || {};
  html += fac("example problem statement", '<div class="problem-statement"><p><strong>' + esc(ps.who) + "</strong> need to <strong>" + esc(ps.needsTo) + "</strong> because " + esc(ps.because) + ". Today they " + esc(ps.today) + ", which results in " + esc(ps.resultsIn) + ".</p></div>" +
    '<dl class="summary-list"><dt>Agreement</dt><dd>' + esc(ps.agreement) + "</dd><dt>Size of the prize</dt><dd>" + esc(ps.sizeOfPrize) + "</dd><dt>Watch out for</dt><dd>" + esc(ps.watchOuts) + "</dd></dl>" + (ps.note ? '<p class="callout">' + esc(ps.note) + "</p>" : ""));

  root.innerHTML = html;
  R.bind(root, st);
  R.flowSync(document.getElementById("flow"), p.steps, st, "pain");

  /* ---- stakeholder map behaviour --------------------------------------- */
  var ZONES = [
    { id: "high-low", title: "Keep satisfied", hint: "High power, low interest", cls: "quadrant--satisfy" },
    { id: "high-high", title: "Manage closely", hint: "High power, high interest", cls: "quadrant--manage" },
    { id: "low-low", title: "Monitor", hint: "Low power, low interest", cls: "quadrant--monitor" },
    { id: "low-high", title: "Keep informed", hint: "Low power, high interest", cls: "quadrant--inform" }
  ];
  var selected = null;
  function chip(s) {
    return '<span class="chip chip--draggable" draggable="true" tabindex="0" role="button" data-chip="' + esc(s.name) + '" aria-label="' + esc(s.name) + '. Drag or press Enter to select, then choose a box.">' + esc(s.name) + "<small>" + esc(s.role || "") + "</small></span>";
  }
  function renderMap() {
    var placed = st.get("placements", {}), el = document.getElementById("stakeholder-map");
    var byZone = {}; ZONES.forEach(function (z) { byZone[z.id] = []; });
    var tray = [];
    (D.stakeholders || []).forEach(function (s) { if (byZone[placed[s.name]]) byZone[placed[s.name]].push(s); else tray.push(s); });
    var out = '<div class="chip-tray drop-zone" data-zone="tray"><h3>Not placed yet (' + tray.length + ")</h3>" + (tray.length ? tray.map(chip).join("") : '<span class="empty">Everyone is on the grid. Drag a chip back here to unplace it.</span>') + "</div>" +
      '<div class="quadrant-grid" role="group" aria-label="Power and interest grid">' +
      '<div class="quadrant-grid__axis quadrant-grid__axis--y"><span>High power</span><span>Low power</span></div>';
    ZONES.forEach(function (z) {
      out += '<div class="quadrant drop-zone ' + z.cls + '" data-zone="' + z.id + '" tabindex="0" role="button" aria-label="' + z.title + ", " + z.hint + '"><h3>' + z.title + '</h3><p class="quadrant__hint">' + z.hint + "</p>" +
        (byZone[z.id].length ? byZone[z.id].map(chip).join("") : '<p class="map-hint">Drop stakeholders here</p>') + "</div>";
    });
    out += '<div class="quadrant-grid__axis quadrant-grid__axis--x"><span>Low interest</span><span>High interest</span></div></div>';
    el.innerHTML = out;

    el.querySelectorAll("[data-chip]").forEach(function (c) {
      c.addEventListener("dragstart", function (e) { e.dataTransfer.setData("text/plain", c.getAttribute("data-chip")); e.dataTransfer.effectAllowed = "move"; });
      c.addEventListener("click", function (e) { e.stopPropagation(); select(c.getAttribute("data-chip")); });
      c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(c.getAttribute("data-chip")); } });
    });
    el.querySelectorAll("[data-zone]").forEach(function (z) {
      z.addEventListener("dragover", function (e) { e.preventDefault(); z.classList.add("is-over"); });
      z.addEventListener("dragleave", function () { z.classList.remove("is-over"); });
      z.addEventListener("drop", function (e) { e.preventDefault(); z.classList.remove("is-over"); place(e.dataTransfer.getData("text/plain"), z.getAttribute("data-zone")); });
      z.addEventListener("click", function () { if (selected) place(selected, z.getAttribute("data-zone")); });
      z.addEventListener("keydown", function (e) { if (selected && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); place(selected, z.getAttribute("data-zone")); } });
    });
    if (selected) {
      var c = el.querySelector('[data-chip="' + selected.replace(/"/g, '\\"') + '"]');
      if (c) c.classList.add("is-selected");
      el.querySelectorAll("[data-zone]").forEach(function (z) { z.classList.add("is-target"); });
    }
  }
  function select(name) { selected = selected === name ? null : name; renderMap(); }
  function place(name, zone) {
    if (!name) return;
    var placed = st.get("placements", {});
    if (zone === "tray") delete placed[name]; else placed[name] = zone;
    st.set("placements", placed); selected = null; renderMap();
  }
  renderMap();

  /* ---- quiz behaviour ------------------------------------------------------- */
  function renderQuiz() {
    var answers = st.get("quiz", {}), el = document.getElementById("quiz"), out = '<ol class="quiz">', right = 0, done = 0;
    (D.quiz || []).forEach(function (q, i) {
      var a = answers[i], answered = a === true || a === false, correct = answered && a === q.answer;
      if (answered) { done++; if (correct) right++; }
      out += '<li class="' + (answered ? (correct ? "is-right" : "is-wrong") : "") + '"><p class="quiz__statement">' + esc(q.statement) + '</p><div class="quiz__buttons">' +
        '<button class="btn' + (a === true ? "" : " btn--secondary") + '" type="button" data-q="' + i + '" data-a="true">True</button>' +
        '<button class="btn' + (a === false ? "" : " btn--secondary") + '" type="button" data-q="' + i + '" data-a="false">False</button>' +
        (answered ? '<span class="quiz__result quiz__result--' + (correct ? "right" : "wrong") + '">' + (correct ? "Correct" : "Not quite") + ": it is " + (q.answer ? "true" : "false") + "</span>" : "") + "</div>" +
        (answered ? '<p class="quiz__why">' + esc(q.why) + "</p>" : "") + "</li>";
    });
    out += "</ol>" + (done ? '<p class="quiz-score">Score so far: ' + right + " of " + done + " answered (" + (D.quiz || []).length + " statements).</p>" : "");
    el.innerHTML = out;
    el.querySelectorAll("[data-q]").forEach(function (btn) {
      btn.addEventListener("click", function () { var an = st.get("quiz", {}); an[btn.dataset.q] = btn.dataset.a === "true"; st.set("quiz", an); renderQuiz(); });
    });
  }
  renderQuiz();

  /* ---- extra assumption rows ---------------------------------------------- */
  R.editableRows(document.getElementById("assumption-rows"), st, "assumptions", [
    { id: "assumption", label: "Assumption", placeholder: "What are we taking for granted?" },
    { id: "ifWrong", label: "If it is wrong", placeholder: "What happens?" },
    { id: "howToTest", label: "How we would test it", placeholder: "Cheapest way to find out" }
  ], { min: 1, legend: "Your assumption", addLabel: "Add another assumption" });

  /* ---- problem statement copy box ---------------------------------------- */
  function v(k) { return (st.get(k, "") || "").trim(); }
  var copy = R.copyBox(document.getElementById("ps-copy"), {
    id: "ps-output", label: "Hand this in: your problem statement as text", button: "Copy problem statement", rows: 12,
    text: function () {
      return "PROBLEM STATEMENT\nWho: " + v("ps.who") + "\nNeeds to: " + v("ps.needsTo") + "\nBecause: " + v("ps.because") + "\nToday they: " + v("ps.today") + "\nWhich results in: " + v("ps.resultsIn") +
        "\n\nAGREEMENT\n" + v("ps.agreement") + "\n\nSIZE OF THE PRIZE\n" + v("ps.prize") + "\n\nWATCH OUT FOR\n" + v("ps.watchOuts") + "\n";
    }
  });
  root.querySelectorAll('[data-key^="ps."]').forEach(function (el) { el.addEventListener("input", copy.update); });
})();

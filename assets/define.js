/* Define page: interactive. Rendered from window.DEFINE (config/define.js).
   Participant input is saved in localStorage under brent-sandbox-define. */
(function () {
  "use strict";

  var D = window.DEFINE, R = window.R, DISC = window.DISCOVERY || {};
  var root = document.getElementById("stage");
  if (!D) { root.innerHTML = '<p class="notice">config/define.js did not load. Check the file for syntax errors.</p>'; return; }
  var esc = R.esc, h2 = R.h2, fac = R.facilitatorBlock;
  var st = R.store("brent-sandbox-define");
  var disc = R.store("brent-sandbox-discover");

  R.chrome(window.MVP);
  document.getElementById("stage-eyebrow").textContent = D.stage.eyebrow || "During build";
  document.getElementById("stage-title").textContent = D.stage.title || "Define";
  document.getElementById("stage-question").textContent = D.stage.question || "";
  document.title = "2 Define | " + ((window.MVP && window.MVP.brand && window.MVP.brand.council) || "Brent Council") + " (training sandbox)";
  R.pageTools(document.getElementById("page-tools"), [st]);

  function ta(key, label, hint, rows, placeholder) {
    return '<div class="input-block form-group"><label class="form-label" for="' + key + '">' + esc(label) + "</label>" +
      (hint ? '<span class="form-hint">' + esc(hint) + "</span>" : "") +
      '<textarea class="form-input" id="' + key + '" data-key="' + key + '" rows="' + (rows || 2) + '" placeholder="' + esc(placeholder || "") + '"></textarea></div>';
  }
  function dv(k) { return (disc.get(k, "") || "").trim(); }
  function v(k) { return (st.get(k, "") || "").trim(); }

  var html = '<div class="notice"><strong>This stage ends with:</strong><ul class="inline-list">';
  (D.stage.endsWith || []).forEach(function (e) { html += "<li>" + esc(e) + "</li>"; });
  html += "</ul></div>";
  var STAGES = ["Agreeing the problem", "Prioritising user groups", "Prioritising business needs", "Writing the theory of change", "Reviewing the to-be process", "Reviewing the user story map", "Defining success measures", "Handing it in"];
  html += '<ol class="stage-steps" aria-label="Steps in Define">' + STAGES.map(function (t, i) { return '<li><a href="#s' + (i + 1) + '"><span class="stage-steps__n">' + (i + 1) + "</span>" + esc(t) + "</a></li>"; }).join("") + "</ol>";

  /* ---- 1. Problem statement --------------------------------------------- */
  var own = dv("ps.who") && dv("ps.needsTo");
  html += h2(1, "Agreeing the problem", "s1") + "<p>" + (own ? "This is the statement your group wrote on the Discover page. If it no longer fits, go back and change it there." : "Carried over from Discover, unchanged. If it no longer fits, go back to Discover.") + "</p>";
  if (own) {
    html += '<div class="problem-statement"><p><strong>' + esc(dv("ps.who")) + "</strong> need to <strong>" + esc(dv("ps.needsTo")) + "</strong> because " + esc(dv("ps.because")) + ". Today they " + esc(dv("ps.today")) + ", which results in " + esc(dv("ps.resultsIn")) + ".</p></div>" +
      '<dl class="summary-list">' + (dv("ps.agreement") ? "<dt>Agreement</dt><dd>" + esc(dv("ps.agreement")) + "</dd>" : "") + (dv("ps.prize") ? "<dt>Size of the prize</dt><dd>" + esc(dv("ps.prize")) + "</dd>" : "") + (dv("ps.watchOuts") ? "<dt>Watch out for</dt><dd>" + esc(dv("ps.watchOuts")) + "</dd>" : "") + "</dl>";
  } else {
    var dps = DISC.problemStatement || {};
    html += '<div class="problem-statement"><p>' + esc(D.problemStatement) + "</p></div>" +
      '<dl class="summary-list">' + (dps.agreement ? "<dt>Agreement</dt><dd>" + esc(dps.agreement) + "</dd>" : "") + (dps.sizeOfPrize ? "<dt>Size of the prize</dt><dd>" + esc(dps.sizeOfPrize) + "</dd>" : "") + (dps.watchOuts ? "<dt>Watch out for</dt><dd>" + esc(dps.watchOuts) + "</dd>" : "") + "</dl>";
  }

  /* ---- 2. User groups: prioritise, and add one need to each -------------- */
  html += h2(2, "Prioritising user groups", "s2") +
    "<p>Your UX colleague has defined three user groups. Put them in priority order: the MVP is designed around whoever is first. Then add one need to each that the UX colleague missed.</p>" +
    '<div id="group-rank"></div>';

  /* ---- 3. Business needs, prioritise ------------------------------------ */
  html += h2(3, "Prioritising business needs", "s3") +
    "<p>The council needs several things from this, and they pull against each other. Rank them. Then say who will disagree with your order.</p>" +
    '<div id="rank"></div>' +
    ta("priority.why", "Why this order, and who will disagree?", "Name the stakeholder who loses. If nobody loses, look again.", 3) +
    fac("the tension in these five", "<p>" + esc(D.businessTension) + "</p>");

  /* ---- 4. Theory of change -------------------------------------------------- */
  var th = D.theoryOfChangeHints || {}, t = D.theoryOfChange || {};
  function chainBox(key, label, hint) {
    return '<li><span class="chain__label">' + esc(label) + '</span><label class="visually-hidden" for="toc.' + key + '">' + esc(label) + '</label><textarea id="toc.' + key + '" data-key="toc.' + key + '" rows="4" placeholder="' + esc(hint || "") + '"></textarea></li>';
  }
  html += h2(4, "Writing the theory of change", "s4") + "<p>The chain of beliefs between what we build and the outcome we want. Every link is something evaluation can test. Fill in all five.</p>" +
    '<ol class="chain chain--editable">' + chainBox("ifWe", "If we", th.ifWe) + chainBox("then", "then", th.then) + chainBox("because", "because", th.because) + chainBox("leadingTo", "leading to", th.leadingTo) + chainBox("measuredBy", "measured by", th.measuredBy) + "</ol>" +
    fac("example theory of change", '<ol class="chain"><li><span class="chain__label">If we</span>' + esc(t.ifWe) + '</li><li><span class="chain__label">then</span>' + esc(t.then) + '</li><li><span class="chain__label">because</span>' + esc(t.because) + '</li><li><span class="chain__label">leading to</span>' + esc(t.leadingTo) + '</li><li><span class="chain__label">measured by</span>' + esc(t.measuredBy) + "</li></ol><p><strong>In one line:</strong> " + esc(D.hypothesis) + "</p>");

  /* ---- 5. To-be process (from UX) ------------------------------------------ */
  var p = D.toBeProcess || { lanes: [], steps: [] };
  html += h2(5, "Reviewing the to-be process", "s5") + "<p>Your UX colleague's first draft of the process once the MVP exists. The resident's steps become the booking site's progress bar.</p>" + R.flow(p.lanes, p.steps) +
    '<div class="feedback-box">' + ta("feedback.process", "Your feedback on your UX colleague's to-be map", "What would you change, add or remove? Which step would the primary user struggle with? Which step does reception need?", 4) + "</div>";

  /* ---- 6. Story map (from PM) ----------------------------------------------- */
  var acts = (D.storyMap && D.storyMap.activities) || [];
  html += h2(6, "Reviewing the user story map", "s6") + "<p>Your PM's story map. Activities along the top follow the new process. Stories underneath, in priority order. Everything above the line is the MVP. Open a story to see its acceptance criteria.</p>";
  function storyCard(s) {
    var c = '<details class="story-card"><summary><span class="story-card__id">' + esc(s.id) + "</span> " + esc(s.title) + "</summary>" +
      '<p class="story-card__story">As a <strong>' + esc(s.as) + "</strong>, I need " + esc(s.need) + ", so that " + esc(s.soThat) + ".</p>" +
      '<p class="eyebrow">Acceptance criteria</p><ul class="ac-list">';
    (s.acceptanceCriteria || []).forEach(function (a) {
      c += '<li><span class="ac-kw">Given</span> ' + esc(a.given) + ' <span class="ac-kw">when</span> ' + esc(a.when) + ' <span class="ac-kw">then</span> ' + esc(a.then) + "</li>";
    });
    return c + "</ul></details>";
  }
  html += '<div class="table-wrap"><div class="story-map" style="--cols:' + acts.length + '">';
  acts.forEach(function (a) { html += '<div class="story-map__activity">' + esc(a.name) + "</div>"; });
  acts.forEach(function (a) { html += '<div class="story-map__cell">' + (a.stories || []).filter(function (s) { return s.release === "mvp"; }).map(storyCard).join("") + "</div>"; });
  html += '<div class="story-map__line"><span>MVP line: everything above is release 1</span></div>';
  acts.forEach(function (a) { html += '<div class="story-map__cell story-map__cell--later">' + (a.stories || []).filter(function (s) { return s.release !== "mvp"; }).map(storyCard).join("") + "</div>"; });
  html += "</div></div>" +
    '<div class="feedback-box">' + ta("feedback.stories", "Your feedback on the PM's user story map", "Which stories are wrong, missing, or on the wrong side of the MVP line? Which acceptance criteria could not be tested?", 4) + "</div>";

  /* ---- 7. Success measures ---------------------------------------------------- */
  html += h2(7, "Defining success measures", "s7") + "<p>What will we count, and where will the number come from? Write at least three. Targets, baselines and guard-rails are added later, once we know what the numbers look like today.</p>" +
    '<div id="measure-rows"></div>';

  /* ---- 8. Compile the hand-in ------------------------------------------------ */
  html += h2(8, "Handing it in", "s8") +
    "<p>Everything typed on this page, compiled into the hand-in. Give it to the facilitator: the booking site is built from it.</p>" +
    '<div class="panel hand-in" id="define-copy"></div>';

  root.innerHTML = html;
  R.bind(root, st);

  /* ---- rank list ---------------------------------------------------------------- */
  var items = D.businessPriorities || [];
  function order() {
    var o = st.get("priority", null);
    if (!Array.isArray(o) || o.length !== items.length) o = items.map(function (_, i) { return i; });
    return o;
  }
  function renderRank() {
    var o = order(), el = document.getElementById("rank"), out = '<ol class="rank-list">';
    o.forEach(function (idx, pos) {
      var it = items[idx];
      out += '<li><span class="rank-list__n">' + (pos + 1) + '</span><span class="rank-list__text">' + esc(it.need) + '<span class="muted-line">' + esc(it.owner || "") + "</span></span>" +
        '<button type="button" data-up="' + pos + '" aria-label="Move ' + esc(it.need) + ' up"' + (pos === 0 ? " disabled" : "") + ">▲</button>" +
        '<button type="button" data-down="' + pos + '" aria-label="Move ' + esc(it.need) + ' down"' + (pos === o.length - 1 ? " disabled" : "") + ">▼</button></li>";
    });
    el.innerHTML = out + "</ol>";
    el.querySelectorAll("[data-up]").forEach(function (b) { b.addEventListener("click", function () { move(+b.dataset.up, -1); }); });
    el.querySelectorAll("[data-down]").forEach(function (b) { b.addEventListener("click", function () { move(+b.dataset.down, 1); }); });
  }
  function move(pos, d) {
    var o = order(), j = pos + d; if (j < 0 || j >= o.length) return;
    var tmp = o[pos]; o[pos] = o[j]; o[j] = tmp; st.set("priority", o); renderRank(); copy.update();
  }
  renderRank();

  /* ---- measure rows ------------------------------------------------------------ */
  var measures = R.editableRows(document.getElementById("measure-rows"), st, "measures", [
    { id: "name", label: "Measure (what we count)", placeholder: "e.g. bookings by people who have not booked before" },
    { id: "source", label: "Source (where the number comes from)", placeholder: "e.g. checkout question plus SQL on the bookings table" }
  ], { min: 3, legend: "Measure", addLabel: "Add a measure", onChange: function () { copy.update(); } });

  /* ---- user group priority ------------------------------------------------------ */
  var groups = D.userGroups || [];
  function gorder() {
    var o = st.get("groupPriority", null);
    if (!Array.isArray(o) || o.length !== groups.length) {
      o = groups.map(function (_, i) { return i; }).sort(function (a, b) { return (groups[b].primary ? 1 : 0) - (groups[a].primary ? 1 : 0); });
    }
    return o;
  }
  function renderGroups() {
    var o = gorder(), el = document.getElementById("group-rank"), out = '<ol class="rank-cards">';
    o.forEach(function (idx, pos) {
      var g = groups[idx];
      out += '<li class="group-card' + (pos === 0 ? " is-primary" : "") + '"><div class="rank-cards__head"><span class="rank-list__n">' + (pos + 1) + "</span>" +
        (pos === 0 ? '<span class="tag tag--primary">Primary user</span>' : '<span class="tag tag--secondary">Secondary</span>') +
        '<span class="rank-cards__btns"><button type="button" data-gup="' + pos + '" aria-label="Move ' + esc(g.name) + ' up"' + (pos === 0 ? " disabled" : "") + ">▲</button>" +
        '<button type="button" data-gdown="' + pos + '" aria-label="Move ' + esc(g.name) + ' down"' + (pos === o.length - 1 ? " disabled" : "") + ">▼</button></span></div>" +
        "<h3>" + esc(g.name) + "</h3><dl><dt>Who</dt><dd>" + esc(g.who) + "</dd><dt>Today</dt><dd>" + esc(g.today) + "</dd><dt>Needs</dt><dd><ul>" + (g.needs || []).map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></dd></dl>" +
        '<div class="form-group"><label class="form-label" for="groupNeed.' + idx + '">Did your UX colleague miss anything?</label><input class="form-input" id="groupNeed.' + idx + '" data-key="groupNeed.' + idx + '" placeholder="What did the UX colleague miss?"></div></li>';
    });
    el.innerHTML = out + "</ol>";
    R.bind(el, st, function () { if (copy) copy.update(); });
    el.querySelectorAll("[data-gup]").forEach(function (b) { b.addEventListener("click", function () { gmove(+b.dataset.gup, -1); }); });
    el.querySelectorAll("[data-gdown]").forEach(function (b) { b.addEventListener("click", function () { gmove(+b.dataset.gdown, 1); }); });
  }
  function gmove(pos, d) {
    var o = gorder(), j = pos + d; if (j < 0 || j >= o.length) return;
    var tmp = o[pos]; o[pos] = o[j]; o[j] = tmp; st.set("groupPriority", o); renderGroups(); copy.update();
  }

  /* ---- compile ------------------------------------------------------------------- */
  var copy = R.copyBox(document.getElementById("define-copy"), {
    id: "define-output", label: "Hand this in: your Define outputs as text", button: "Copy Define hand-in", rows: 18,
    text: function () {
      var o = order(), go = gorder();
      var out = "USER GROUP PRIORITY\n" + go.map(function (idx, i) { return (i + 1) + ". " + groups[idx].name + " | Added need: " + (v("groupNeed." + idx) || "(none)"); }).join("\n") + "\n\n";
      out += "BUSINESS NEED PRIORITY\n" + o.map(function (idx, i) { return (i + 1) + ". " + items[idx].need; }).join("\n") + "\nWhy, and who disagrees: " + v("priority.why") + "\n\n";
      out += "THEORY OF CHANGE\nIf we: " + v("toc.ifWe") + "\nThen: " + v("toc.then") + "\nBecause: " + v("toc.because") + "\nLeading to: " + v("toc.leadingTo") + "\nMeasured by: " + v("toc.measuredBy") + "\n\n";
      out += "PROCESS FEEDBACK\n" + (v("feedback.process") || "(none)") + "\n\n";
      out += "STORY MAP FEEDBACK\n" + (v("feedback.stories") || "(none)") + "\n\n";
      var ms = measures.rows().filter(function (m) { return (m.name || "").trim(); });
      out += "SUCCESS MEASURES\n" + (ms.length ? ms.map(function (m) { return "- Name: " + (m.name || "") + " | Source: " + (m.source || ""); }).join("\n") : "(none added; use the examples)") + "\n";
      return out;
    }
  });
  root.querySelectorAll("[data-key]").forEach(function (el) { el.addEventListener("input", copy.update); });
  renderGroups();
})();

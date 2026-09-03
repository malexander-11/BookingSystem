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

  /* ---- 1. Problem statement --------------------------------------------- */
  var own = dv("ps.who") && dv("ps.needsTo");
  html += h2(1, "The problem statement") + "<p>" + (own ? "This is the statement your group wrote on the Discover page. If it no longer fits, go back and change it there." : "Carried over from Discover, unchanged. If it no longer fits, go back to Discover.") + "</p>";
  if (own) {
    html += '<div class="problem-statement"><p><strong>' + esc(dv("ps.who")) + "</strong> need to <strong>" + esc(dv("ps.needsTo")) + "</strong> because " + esc(dv("ps.because")) + ". Today they " + esc(dv("ps.today")) + ", which results in " + esc(dv("ps.resultsIn")) + ".</p></div>" +
      '<dl class="summary-list">' + (dv("ps.agreement") ? "<dt>Agreement</dt><dd>" + esc(dv("ps.agreement")) + "</dd>" : "") + (dv("ps.prize") ? "<dt>Size of the prize</dt><dd>" + esc(dv("ps.prize")) + "</dd>" : "") + (dv("ps.watchOuts") ? "<dt>Watch out for</dt><dd>" + esc(dv("ps.watchOuts")) + "</dd>" : "") + "</dl>";
  } else {
    var dps = DISC.problemStatement || {};
    html += '<div class="problem-statement"><p>' + esc(D.problemStatement) + "</p></div>" +
      '<dl class="summary-list">' + (dps.agreement ? "<dt>Agreement</dt><dd>" + esc(dps.agreement) + "</dd>" : "") + (dps.sizeOfPrize ? "<dt>Size of the prize</dt><dd>" + esc(dps.sizeOfPrize) + "</dd>" : "") + (dps.watchOuts ? "<dt>Watch out for</dt><dd>" + esc(dps.watchOuts) + "</dd>" : "") + "</dl>";
  }

  /* ---- 2. User groups ---------------------------------------------------- */
  var sn = D.starterNeeds || {};
  function groupCard(id, label, given) {
    return '<div class="group-card' + (id === "primary" ? " is-primary" : "") + '"><span class="tag tag--' + id + '">' + esc(label) + "</span>" +
      '<div class="form-group"><label class="form-label" for="users.' + id + '.name">Name this group</label><input class="form-input" id="users.' + id + '.name" data-key="users.' + id + '.name" placeholder="e.g. casual players who have never booked"></div>' +
      ta("users." + id + ".who", "Who they are", "Age, situation, how they play sport now. Specific enough to find ten of them tomorrow.", 2) +
      ta("users." + id + ".today", "What they do today", "Instead of using this, what do they do?", 2) +
      '<p class="form-label">Their needs</p><div class="given-need"><strong>Given:</strong> ' + esc(given) + "</div>" +
      '<div class="form-group"><label class="visually-hidden" for="users.' + id + '.need1">Second need</label><input class="form-input" id="users.' + id + '.need1" data-key="users.' + id + '.need1" placeholder="Add a need"></div>' +
      '<div class="form-group"><label class="visually-hidden" for="users.' + id + '.need2">Third need</label><input class="form-input" id="users.' + id + '.need2" data-key="users.' + id + '.need2" placeholder="Add another need"></div></div>';
  }
  html += h2(2, "User groups") + "<p>Who is this for, and who else is affected? Name the primary user first: the MVP is designed around them. One need is given for each; add two more.</p>" +
    '<div class="group-grid">' + groupCard("primary", "Primary user", sn.primary) + groupCard("secondary", "Secondary user", sn.secondary) + "</div>";
  var gcards = "";
  (D.userGroups || []).forEach(function (g) {
    gcards += '<div class="group-card' + (g.primary ? " is-primary" : "") + '">' + (g.primary ? '<span class="tag tag--primary">Primary user</span>' : '<span class="tag tag--secondary">Secondary</span>') +
      "<h3>" + esc(g.name) + "</h3><dl><dt>Who</dt><dd>" + esc(g.who) + "</dd><dt>Today</dt><dd>" + esc(g.today) + "</dd><dt>Needs</dt><dd><ul>" + (g.needs || []).map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></dd></dl></div>";
  });
  html += fac("example user groups", '<div class="group-grid">' + gcards + "</div>");

  /* ---- 3. Business needs, prioritise ------------------------------------ */
  html += h2(3, "Business needs: put them in order") +
    "<p>The council needs several things from this, and they pull against each other. Rank them. Then say who will disagree with your order.</p>" +
    '<div id="rank"></div>' +
    ta("priority.why", "Why this order, and who will disagree?", "Name the stakeholder who loses. If nobody loses, look again.", 3) +
    fac("the tension in these five", "<p>" + esc(D.businessTension) + "</p>");

  /* ---- 4. Theory of change -------------------------------------------------- */
  var th = D.theoryOfChangeHints || {}, t = D.theoryOfChange || {};
  function chainBox(key, label, hint) {
    return '<li><span class="chain__label">' + esc(label) + '</span><label class="visually-hidden" for="toc.' + key + '">' + esc(label) + '</label><textarea id="toc.' + key + '" data-key="toc.' + key + '" rows="4" placeholder="' + esc(hint || "") + '"></textarea></li>';
  }
  html += h2(4, "Theory of change") + "<p>The chain of beliefs between what we build and the outcome we want. Every link is something evaluation can test. Fill in all five.</p>" +
    '<ol class="chain chain--editable">' + chainBox("ifWe", "If we", th.ifWe) + chainBox("then", "then", th.then) + chainBox("because", "because", th.because) + chainBox("leadingTo", "leading to", th.leadingTo) + chainBox("measuredBy", "measured by", th.measuredBy) + "</ol>" +
    fac("example theory of change", '<ol class="chain"><li><span class="chain__label">If we</span>' + esc(t.ifWe) + '</li><li><span class="chain__label">then</span>' + esc(t.then) + '</li><li><span class="chain__label">because</span>' + esc(t.because) + '</li><li><span class="chain__label">leading to</span>' + esc(t.leadingTo) + '</li><li><span class="chain__label">measured by</span>' + esc(t.measuredBy) + "</li></ol><p><strong>In one line:</strong> " + esc(D.hypothesis) + "</p>");

  /* ---- 5. To-be process ------------------------------------------------------ */
  var p = D.toBeProcess || { lanes: [], steps: [] };
  html += h2(5, "The new process (to-be)") + "<p>A first draft of the process once the MVP exists. The resident's steps become the booking site's progress bar.</p>" + R.flow(p.lanes, p.steps) +
    '<div class="feedback-box">' + ta("feedback.process", "Your feedback on this process", "What would you change, add or remove? Which step would your primary user struggle with? Which step does reception need?", 4) + "</div>";

  /* ---- 6. Story map ----------------------------------------------------------- */
  var acts = (D.storyMap && D.storyMap.activities) || [];
  html += h2(6, "User story map") + "<p>Activities along the top follow the new process. Stories underneath, in priority order. Everything above the line is the MVP. Open a story to see its acceptance criteria.</p>";
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
    '<div class="feedback-box">' + ta("feedback.stories", "Your feedback on the story map", "Which stories are wrong, missing, or on the wrong side of the MVP line? Which acceptance criteria could not be tested?", 4) + "</div>";

  /* ---- 7. Success measures ---------------------------------------------------- */
  html += h2(7, "Success measures") + "<p>Examples first. Then add your own: one number each, with a target, a baseline and a source. A guard-rail is a number that must not get worse.</p>" +
    R.dataTable(["Measure", "Target", "Baseline", "Source", "Guard-rail"], (D.successMeasures || []).map(function (m) { return [m.name, m.target, m.baseline, m.source, m.guardRail || "—"]; })) +
    '<div id="measure-rows"></div>';

  /* ---- 8. Compile the hand-in ------------------------------------------------ */
  html += h2(8, "Copy what we've written") +
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
    { id: "target", label: "Target (number and time window)", placeholder: "e.g. 30% of bookings in six weeks" },
    { id: "baseline", label: "Baseline (the number today)", placeholder: "e.g. unknown, estimated 10 to 15%" },
    { id: "source", label: "Source (where the number comes from)", placeholder: "e.g. checkout question plus SQL" },
    { id: "guardRail", label: "Guard-rail (must not get worse)", placeholder: "e.g. no-shows must not rise above 15%" }
  ], { min: 1, legend: "Your measure", addLabel: "Add a measure", onChange: function () { copy.update(); } });

  /* ---- compile ------------------------------------------------------------------- */
  function groupText(id, label, given) {
    var needs = [given, v("users." + id + ".need1"), v("users." + id + ".need2")].filter(Boolean);
    return "- " + label + ": " + (v("users." + id + ".name") || "(not named)") + " | Who: " + v("users." + id + ".who") + " | Today: " + v("users." + id + ".today") + "\n  Needs: " + needs.join("; ");
  }
  var copy = R.copyBox(document.getElementById("define-copy"), {
    id: "define-output", label: "Hand this in: your Define outputs as text", button: "Copy Define hand-in", rows: 18,
    text: function () {
      var o = order();
      var out = "USERS\n" + groupText("primary", "Primary", sn.primary) + "\n" + groupText("secondary", "Secondary", sn.secondary) + "\n\n";
      out += "BUSINESS NEED PRIORITY\n" + o.map(function (idx, i) { return (i + 1) + ". " + items[idx].need; }).join("\n") + "\nWhy, and who disagrees: " + v("priority.why") + "\n\n";
      out += "THEORY OF CHANGE\nIf we: " + v("toc.ifWe") + "\nThen: " + v("toc.then") + "\nBecause: " + v("toc.because") + "\nLeading to: " + v("toc.leadingTo") + "\nMeasured by: " + v("toc.measuredBy") + "\n\n";
      out += "PROCESS FEEDBACK\n" + (v("feedback.process") || "(none)") + "\n\n";
      out += "STORY MAP FEEDBACK\n" + (v("feedback.stories") || "(none)") + "\n\n";
      var ms = measures.rows().filter(function (m) { return (m.name || "").trim(); });
      out += "SUCCESS MEASURES\n" + (ms.length ? ms.map(function (m) { return "- Name: " + (m.name || "") + " | Target: " + (m.target || "") + " | Baseline: " + (m.baseline || "") + " | Source: " + (m.source || "") + " | Guard-rail: " + (m.guardRail || ""); }).join("\n") : "(none added; use the examples)") + "\n";
      return out;
    }
  });
  root.querySelectorAll("[data-key]").forEach(function (el) { el.addEventListener("input", copy.update); });
})();

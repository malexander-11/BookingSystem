/* Define page. Rendered from window.DEFINE (config/define.js). */
(function () {
  "use strict";

  var D = window.DEFINE, R = window.R;
  var root = document.getElementById("stage");
  if (!D) { root.innerHTML = '<p class="notice">config/define.js did not load. Check the file for syntax errors.</p>'; return; }
  var esc = R.esc, h2 = R.h2;

  R.chrome(window.MVP);
  document.getElementById("stage-eyebrow").textContent = D.stage.eyebrow || "During build";
  document.getElementById("stage-title").textContent = D.stage.title || "Define";
  document.getElementById("stage-question").textContent = D.stage.question || "";
  document.title = "2 Define | " + ((window.MVP && window.MVP.brand && window.MVP.brand.council) || "Brent Council") + " (training sandbox)";

  var html = '<div class="notice"><strong>This stage ends with:</strong><ul class="inline-list">';
  (D.stage.endsWith || []).forEach(function (e) { html += "<li>" + esc(e) + "</li>"; });
  html += "</ul></div>";

  /* 1. Problem statement */
  html += h2(1, "The problem statement") + "<p>Carried over from Discover, unchanged. If it no longer fits, go back to Discover.</p>" +
    '<div class="problem-statement"><p>' + esc(D.problemStatement) + "</p></div>";

  /* 2. User groups */
  html += h2(2, "User groups") + "<p>Who this is for, who it is not for yet, and what each group does today instead.</p><div class=\"group-grid\">";
  (D.userGroups || []).forEach(function (g) {
    html += '<div class="group-card' + (g.primary ? " is-primary" : "") + '">' + (g.primary ? '<span class="tag tag--primary">Primary user</span>' : '<span class="tag tag--secondary">Secondary</span>') +
      "<h3>" + esc(g.name) + "</h3><dl><dt>Who</dt><dd>" + esc(g.who) + "</dd><dt>Today</dt><dd>" + esc(g.today) + "</dd><dt>Needs</dt><dd><ul>";
    (g.needs || []).forEach(function (n) { html += "<li>" + esc(n) + "</li>"; });
    html += "</ul></dd></dl></div>";
  });
  html += "</div>";

  /* 3. User needs and business needs */
  html += h2(3, "User needs and business needs") + '<div class="two-col">' +
    '<div class="panel"><h3>User needs</h3><p class="muted">As a … I need … so that …</p><ul class="need-list">';
  (D.userNeeds || []).forEach(function (n) {
    html += "<li>As a <strong>" + esc(n.as) + "</strong>, I need <strong>" + esc(n.need) + "</strong>, so that " + esc(n.soThat) + ".</li>";
  });
  html += '</ul></div><div class="panel"><h3>Business needs</h3><p class="muted">What the organisation needs from this, and who owns it.</p><ul class="need-list">';
  (D.businessNeeds || []).forEach(function (n) {
    html += "<li><strong>" + esc(n.need) + '</strong><span class="muted-line">' + esc(n.owner) + ": " + esc(n.why) + "</span></li>";
  });
  html += "</ul></div></div>";

  /* 4. Theory of change */
  var t = D.theoryOfChange || {};
  html += h2(4, "Theory of change") + "<p>The chain of beliefs between what we build and the outcome we want. Every link is something evaluation can test.</p>" +
    '<ol class="chain">' +
    '<li><span class="chain__label">If we</span>' + esc(t.ifWe) + "</li>" +
    '<li><span class="chain__label">then</span>' + esc(t.then) + "</li>" +
    '<li><span class="chain__label">because</span>' + esc(t.because) + "</li>" +
    '<li><span class="chain__label">leading to</span>' + esc(t.leadingTo) + "</li>" +
    '<li><span class="chain__label">measured by</span>' + esc(t.measuredBy) + "</li></ol>" +
    '<div class="hypothesis-box"><p class="eyebrow">Hypothesis for change, in one line</p><p>' + esc(D.hypothesis) + "</p></div>";

  /* 5. To-be process */
  var p = D.toBeProcess || { lanes: [], steps: [] };
  html += h2(5, "The new process (to-be)") + "<p>What the process looks like once the MVP exists. The resident's steps become the booking site's progress bar.</p>" + R.flow(p.lanes, p.steps);

  /* 6. User story map */
  var acts = (D.storyMap && D.storyMap.activities) || [];
  html += h2(6, "User story map") + "<p>Activities along the top follow the new process. Stories underneath, in priority order. Everything above the line is the MVP.</p>";
  function storyCard(s) {
    var c = '<details class="story-card"><summary><span class="story-card__id">' + esc(s.id) + "</span> " + esc(s.title) + "</summary>" +
      '<p class="story-card__story">As a <strong>' + esc(s.as) + "</strong>, I need " + esc(s.need) + ", so that " + esc(s.soThat) + ".</p>" +
      '<p class="eyebrow">Acceptance criteria</p><ul class="ac-list">';
    (s.acceptanceCriteria || []).forEach(function (a) {
      c += "<li><span class=\"ac-kw\">Given</span> " + esc(a.given) + " <span class=\"ac-kw\">when</span> " + esc(a.when) + " <span class=\"ac-kw\">then</span> " + esc(a.then) + "</li>";
    });
    return c + "</ul></details>";
  }
  html += '<div class="table-wrap"><div class="story-map" style="--cols:' + acts.length + '">';
  acts.forEach(function (a) { html += '<div class="story-map__activity">' + esc(a.name) + "</div>"; });
  acts.forEach(function (a) {
    html += '<div class="story-map__cell">';
    (a.stories || []).filter(function (s) { return s.release === "mvp"; }).forEach(function (s) { html += storyCard(s); });
    html += "</div>";
  });
  html += '<div class="story-map__line"><span>MVP line: everything above is release 1</span></div>';
  acts.forEach(function (a) {
    html += '<div class="story-map__cell story-map__cell--later">';
    (a.stories || []).filter(function (s) { return s.release !== "mvp"; }).forEach(function (s) { html += storyCard(s); });
    html += "</div>";
  });
  html += "</div></div>";

  /* 7. Acceptance criteria as plain statements */
  var mvpStories = [];
  acts.forEach(function (a) { (a.stories || []).forEach(function (s) { if (s.release === "mvp") mvpStories.push(s); }); });
  html += h2(7, "Acceptance criteria for the MVP") +
    "<p>Every MVP story, expanded. Someone who was not in the room must be able to say pass or fail against each line. These are what the group tests the build against.</p>";
  html += R.dataTable(["Story", "Given", "When", "Then"], [].concat.apply([], mvpStories.map(function (s) {
    return (s.acceptanceCriteria || []).map(function (a) { return [s.id + " " + s.title, a.given, a.when, a.then]; });
  })), "ac-table");

  /* 8. Success measures */
  html += h2(8, "Success measures") + "<p>One number each, with a target, a baseline and a source. The guard-rail is the number that must not get worse.</p>" +
    R.dataTable(["Measure", "Target", "Baseline", "Source", "Guard-rail"], (D.successMeasures || []).map(function (m) { return [m.name, m.target, m.baseline, m.source, m.guardRail || "—"]; }));

  /* Build choices */
  if (D.buildChoices) {
    var bc = D.buildChoices;
    html += '<div class="panel"><h3>Choices that shape the build</h3><dl class="summary-list">' +
      "<dt>Facilities</dt><dd>" + esc(bc.facilities) + "</dd><dt>Details collected</dt><dd>" + esc(bc.detailsCollected) + "</dd>" +
      "<dt>Residents only</dt><dd>" + esc(bc.residentsOnly) + "</dd><dt>Ask if first visit</dt><dd>" + esc(bc.askFirstVisit) + "</dd></dl>" +
      '<p class="muted">These, with the process steps and acceptance criteria, are what the <a href="index.html">booking site</a> is built from.</p></div>';
  }

  root.innerHTML = html;

  R.handIn(document.getElementById("hand-in-panel"), "brent-sandbox-handin-define",
    "Hand this in",
    "Fill in your group's users, stories with acceptance criteria, new process, hypothesis and measures. Keep the labels. The facilitator copies it to Claude, and the booking site is built from it.",
    "USERS\n- Primary: <who they are> | Today: <what they do now>\n- Secondary: <who they are> | Today: <what they do now>\n\n" +
    "USER STORIES (one block per story)\nStory 1: As a <user>, I need <...>, so that <...>. Release: MVP\n  AC: Given <...> When <...> Then <...>\n  AC: Given <...> When <...> Then <...>\nStory 2: As a <user>, I need <...>, so that <...>. Release: later\n  AC: Given <...> When <...> Then <...>\n\n" +
    "NEW PROCESS FLOW\n1. <step> (who does it)\n2. <step> (who does it)\n3. <step> (who does it)\n4. <step> (who does it)\n\n" +
    "HYPOTHESIS FOR CHANGE\nIf we: \nThen: \nBecause: \nLeading to: \nMeasured by: \n\n" +
    "SUCCESS MEASURES\n- Name: <what we count> | Target: <number and time window> | Baseline: <the number today> | Source: <where the number comes from> | Guard-rail: <what must not get worse>\n\n" +
    "BUILD CHOICES (optional)\nFacilities: \nDetails we collect: \nResidents only: yes / no\nAsk if first visit: yes / no\n");
})();

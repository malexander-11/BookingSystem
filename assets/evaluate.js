/* Evaluate page: the question chain, the theory-of-change links, and a
   measurement plan builder whose output is pasted to Claude. */
(function () {
  "use strict";

  var D = window.DEFINE || {}, E = window.EVIDENCE || {}, R = window.R;
  var root = document.getElementById("stage");
  var esc = R.esc, h2 = R.h2;
  var KEY = "brent-sandbox-plan";

  R.chrome(window.MVP);
  document.title = "4 Evaluate | " + ((window.MVP && window.MVP.brand && window.MVP.brand.council) || "Brent Council") + " (training sandbox)";

  var SOURCES = [
    { name: "Web analytics", goodFor: "How many people arrived, where they dropped out, what device they used", watchOut: "Counts sessions, not people. Says nothing about why. Consent banners hide some users." },
    { name: "Service data (SQL on the bookings table, diary, till)", goodFor: "Bookings, cancellations, no-shows, new vs returning, by site and time", watchOut: "Only as good as the data captured. 'New user' needs a definition." },
    { name: "Checkout or exit survey", goodFor: "Self-reported facts: first visit, how they heard, why they left", watchOut: "Self-report is biased. Keep it to one question people will answer." },
    { name: "User observation", goodFor: "Why people struggle, what they expected, what they did instead", watchOut: "Small numbers. Do it early and repeat." },
    { name: "Interviews (users and non-users)", goodFor: "Motivations, barriers, whether the problem statement was right", watchOut: "Recruit the people who did not use it, not just the ones who did." },
    { name: "Operational logs (incidents, complaints, call reasons)", goodFor: "Feasibility and viability: what broke, what it cost, what moved", watchOut: "Often kept informally. Ask for a baseline before launch." },
    { name: "Finance", goodFor: "Whether the change pays for itself", watchOut: "Attribution. Income up may be seasonal." }
  ];

  var html = "";

  /* 1. The question chain */
  html += h2(1, "Four questions, in order") +
    '<ol class="chain chain--questions">' +
    '<li><span class="chain__label">1</span>What did we set out to do? <span class="muted-line">The hypothesis and the measures from Define.</span></li>' +
    '<li><span class="chain__label">2</span>What do we need to know to say whether it worked? <span class="muted-line">One question per link in the theory of change.</span></li>' +
    '<li><span class="chain__label">3</span>Where would each number come from? <span class="muted-line">A source you can actually get, with a baseline.</span></li>' +
    '<li><span class="chain__label">4</span>What would change our mind? <span class="muted-line">Decide before you see the data, or the data will decide for you.</span></li>' +
    "</ol>";

  /* 2. Theory-of-change links */
  var t = D.theoryOfChange || {};
  html += h2(2, "Test every link in the theory of change") +
    "<p>Each link is a claim. Each claim needs its own question.</p>" +
    R.dataTable(["Link", "The claim", "The evaluation question"], [
      ["If we", t.ifWe, "Did we actually build and run it? Did people find it?"],
      ["then", t.then, "Did the behaviour change? For whom? Compared with what?"],
      ["because", t.because, "Was the belief right? What did users say the barrier was?"],
      ["leading to", t.leadingTo, "Did the outcome move, or did activity just move channel?"],
      ["measured by", t.measuredBy, "Is the number reliable enough to decide on?"]
    ], "links-table");

  /* 3. Plan builder */
  html += h2(3, "Build your measurement plan") +
    '<p>Three to six rows. Be greedy about questions and honest about sources. When you are done, press <strong>Copy plan</strong> and hand the text to the facilitator: the evidence page is generated from it.</p>' +
    '<div class="panel plan-builder" id="plan-builder"><div id="plan-rows"></div>' +
    '<div class="btn-row"><button class="btn btn--secondary" type="button" data-add>Add a row</button>' +
    '<button class="btn btn--secondary" type="button" data-example>Load the example plan</button>' +
    '<button class="btn btn--link" type="button" data-clear>Clear</button></div>' +
    '<div class="btn-row"><button class="btn btn--success" type="button" data-copy>Copy plan</button><span class="hand-in__status" id="plan-status" aria-live="polite"></span></div>' +
    '<label class="form-label" for="plan-output" style="margin-top:1rem">Plan as text (this is what gets pasted to Claude)</label>' +
    '<textarea class="hand-in__text" id="plan-output" rows="8" readonly></textarea></div>';

  /* 4. Source guide */
  html += h2(4, "Where numbers come from") +
    "<p>Different questions need different tools. Mixing them is the point: numbers say what happened, observation says why.</p>" +
    R.dataTable(["Source", "Good for", "Watch out for"], SOURCES.map(function (s) { return [s.name, s.goodFor, s.watchOut]; }));

  /* 5. What comes back */
  html += h2(5, "What comes back") +
    '<div class="panel"><p>Once the plan is handed in, the fictional pilot results for each row appear on the <a href="evidence.html">evidence page</a>, under the same headings: what we set out to do, the measurement plan with results, what happened, what users did, whether impact changed, the four product risks, what surprised us, and the decision.</p>' +
    "<p>Then the discussion: for each of the four product risks (value, usability, feasibility, viability), what does the evidence say for and against what you assumed? And what should the council do next: continue, iterate, expand, pivot or stop?</p></div>";

  root.innerHTML = html;

  /* ---- plan builder behaviour ---------------------------------------- */
  var rows = [];
  try { rows = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { rows = []; }
  if (!Array.isArray(rows)) rows = [];
  if (!rows.length) rows = [blank(), blank(), blank()];

  function blank() { return { question: "", metric: "", source: "", changeMind: "" }; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(rows)); } catch (e) { /* ignore */ } }

  function renderRows() {
    var el = document.getElementById("plan-rows"), out = "";
    rows.forEach(function (r, i) {
      out += '<fieldset class="plan-row"><legend>Row ' + (i + 1) + "</legend>" +
        '<div class="form-group"><label class="form-label" for="q' + i + '">Question we need answered</label><input class="form-input" id="q' + i + '" data-i="' + i + '" data-f="question" value="' + esc(r.question) + '" placeholder="Are new people booking?"></div>' +
        '<div class="form-group"><label class="form-label" for="m' + i + '">Metric</label><input class="form-input" id="m' + i + '" data-i="' + i + '" data-f="metric" value="' + esc(r.metric) + '" placeholder="Share of bookings from first-time users"></div>' +
        '<div class="form-group"><label class="form-label" for="s' + i + '">Source</label><select class="form-input" id="s' + i + '" data-i="' + i + '" data-f="source"><option value="">Choose a source</option>';
      SOURCES.forEach(function (s) { out += '<option value="' + esc(s.name) + '"' + (r.source === s.name ? " selected" : "") + ">" + esc(s.name) + "</option>"; });
      out += '<option value="Other"' + (r.source && !SOURCES.some(function (s) { return s.name === r.source; }) && r.source !== "" ? " selected" : "") + ">Other (say what in the metric)</option></select></div>" +
        '<div class="form-group"><label class="form-label" for="c' + i + '">What would change our mind</label><input class="form-input" id="c' + i + '" data-i="' + i + '" data-f="changeMind" value="' + esc(r.changeMind) + '" placeholder="Below 15% means the barrier was not booking"></div>' +
        '<button class="btn btn--link" type="button" data-remove="' + i + '">Remove row</button></fieldset>';
    });
    el.innerHTML = out;
    el.querySelectorAll("input, select").forEach(function (inp) {
      inp.addEventListener("input", function () { rows[+inp.dataset.i][inp.dataset.f] = inp.value; save(); updateOutput(); });
    });
    el.querySelectorAll("[data-remove]").forEach(function (b) {
      b.addEventListener("click", function () { rows.splice(+b.getAttribute("data-remove"), 1); if (!rows.length) rows.push(blank()); save(); renderRows(); updateOutput(); });
    });
    updateOutput();
  }

  function planText() {
    var lines = ["MEASUREMENT PLAN"], n = 0;
    rows.forEach(function (r) {
      if (!r.question && !r.metric) return;
      n++;
      lines.push(n + ". Question: " + r.question + " | Metric: " + r.metric + " | Source: " + (r.source || "not decided") + " | Would change our mind: " + (r.changeMind || "not decided"));
    });
    if (!n) lines.push("(no rows yet)");
    return lines.join("\n");
  }
  function updateOutput() { document.getElementById("plan-output").value = planText(); }

  document.querySelector("[data-add]").addEventListener("click", function () { rows.push(blank()); save(); renderRows(); });
  document.querySelector("[data-clear]").addEventListener("click", function () {
    if (!window.confirm("Clear every row?")) return;
    rows = [blank(), blank(), blank()]; save(); renderRows();
  });
  document.querySelector("[data-example]").addEventListener("click", function () {
    var ex = (E.measurementPlan || []).map(function (r) {
      return { question: r.question || "", metric: r.metric || "", source: matchSource(r.source), changeMind: r.changeMind || "" };
    });
    if (!ex.length) return;
    rows = ex; save(); renderRows();
    document.getElementById("plan-status").textContent = "Example loaded. Edit it or clear it and write your own.";
  });
  function matchSource(s) {
    s = (s || "").toLowerCase();
    if (/analytic/.test(s)) return SOURCES[0].name;
    if (/sql|diary|bookings table|service data/.test(s)) return SOURCES[1].name;
    if (/survey|checkout/.test(s)) return SOURCES[2].name;
    if (/observ/.test(s)) return SOURCES[3].name;
    if (/interview/.test(s)) return SOURCES[4].name;
    if (/incident|log|contact centre|call/.test(s)) return SOURCES[5].name;
    if (/finance/.test(s)) return SOURCES[6].name;
    return "Other";
  }
  document.querySelector("[data-copy]").addEventListener("click", function () {
    var ta = document.getElementById("plan-output"), status = document.getElementById("plan-status");
    updateOutput(); ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { /* ignore */ }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(function () { status.textContent = "Copied. Paste it to Claude."; }, function () { status.textContent = ok ? "Copied. Paste it to Claude." : "Select the text below and copy it."; });
    else status.textContent = ok ? "Copied. Paste it to Claude." : "Select the text below and copy it.";
  });

  renderRows();
})();

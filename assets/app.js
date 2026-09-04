/* Booking flow. Everything rendered here comes from window.MVP (config/mvp.js). */
(function () {
  "use strict";

  var MVP = window.MVP;
  if (!MVP) {
    document.getElementById("app").innerHTML =
      '<p class="notice">config/mvp.js did not load. Check the file for syntax errors.</p>';
    return;
  }

  var STORAGE_KEY = "brent-sandbox-bookings";
  var STANDARD_FIELDS = {
    name: { label: "Full name", type: "text", autocomplete: "name", required: true },
    email: { label: "Email address", hint: "We will send your confirmation here.", type: "email", autocomplete: "email", required: true },
    phone: { label: "Mobile number", hint: "Optional. We will only use this if the booking has to change.", type: "tel", autocomplete: "tel", required: false },
    postcode: { label: "Postcode", type: "text", autocomplete: "postal-code", required: true, short: true }
  };

  var state = {
    step: 0,
    facilityId: null,
    date: null,
    time: null,
    details: {},
    errors: {},
    lastBooking: null
  };

  /* ---- helpers -------------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function toISO(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function fromISO(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDate(iso, opts) {
    return fromISO(iso).toLocaleDateString("en-GB", opts || { weekday: "long", day: "numeric", month: "long" });
  }
  function fmtPrice(pence) {
    if (!pence) return "Free";
    return "£" + (pence / 100).toFixed(2).replace(/\.00$/, "");
  }
  function minutes(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function hhmm(m) { return pad(Math.floor(m / 60)) + ":" + pad(m % 60); }
  function facility(id) {
    for (var i = 0; i < MVP.facilities.length; i++) if (MVP.facilities[i].id === id) return MVP.facilities[i];
    return null;
  }
  /* Deterministic hash so "pre-booked" slots are stable across reloads. */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) % 100;
  }

  /* ---- bookings in localStorage -------------------------------------- */
  function loadBookings() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (e) { return []; }
  }
  function saveBookings(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) { /* private mode */ }
  }
  function makeRef() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", out = "";
    for (var i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return "BRT-" + out;
  }

  /* ---- availability ---------------------------------------------------- */
  function slotsFor(f, iso) {
    var out = [], start = minutes(f.openingHours.start), end = minutes(f.openingHours.end);
    var now = new Date(), todayISO = toISO(now), nowMin = now.getHours() * 60 + now.getMinutes();
    var mine = loadBookings();
    for (var m = start; m + f.slotMinutes <= end; m += f.slotMinutes) {
      var t = hhmm(m), taken = false, reason = "";
      if (iso === todayISO && m <= nowMin) { taken = true; reason = "past"; }
      else if (hash(f.id + "|" + iso + "|" + t) < (f.busyPercent == null ? 40 : f.busyPercent)) { taken = true; reason = "booked"; }
      for (var i = 0; i < mine.length; i++) {
        if (mine[i].facilityId === f.id && mine[i].date === iso && mine[i].time === t) { taken = true; reason = "yours"; }
      }
      out.push({ time: t, taken: taken, reason: reason });
    }
    return out;
  }
  function dates(f) {
    var out = [], d = new Date(); d.setHours(0, 0, 0, 0);
    var n = f.daysBookableAhead || 14;
    for (var i = 0; i < n; i++) { out.push(toISO(d)); d.setDate(d.getDate() + 1); }
    return out;
  }

  /* ---- process labels ------------------------------------------------- */
  var DEFAULT_STEPS = ["Choose a facility", "Pick a date and time", "Enter your details", "Get confirmation"];
  function stepLabels() {
    var p = MVP.mvp.process || [];
    var out = [];
    for (var i = 0; i < 4; i++) out.push(p[i] || DEFAULT_STEPS[i]);
    return out;
  }
  function renderSteps() {
    var labels = stepLabels(), html = '<ol class="steps" aria-label="Progress">';
    labels.forEach(function (l, i) {
      var cls = i < state.step ? "is-done" : i === state.step ? "is-current" : "";
      html += '<li class="step ' + cls + '"' + (i === state.step ? ' aria-current="step"' : "") + "><span>" + esc(l) + "</span></li>";
    });
    return html + "</ol>";
  }

  /* ---- form fields ---------------------------------------------------- */
  function fieldDefs() {
    var defs = [];
    (MVP.bookingForm.fields || []).forEach(function (f) {
      var id = typeof f === "string" ? f : f.id;
      var base = STANDARD_FIELDS[id] || { label: id, type: "text", required: true };
      var def = {};
      for (var k in base) def[k] = base[k];
      if (typeof f === "object") for (var k2 in f) def[k2] = f[k2];
      def.id = id;
      defs.push(def);
    });
    if (MVP.bookingForm.askFirstTimeUser) {
      defs.push({
        id: "firstTime", type: "radio", required: true,
        label: (MVP.copy && MVP.copy.firstTimeQuestion) || "Have you used a Brent Council sports facility in the last 12 months?",
        options: [{ value: "no", label: "No, this is my first time" }, { value: "yes", label: "Yes" }]
      });
    }
    return defs;
  }
  function validate(defs, values) {
    var errors = {};
    defs.forEach(function (d) {
      var v = (values[d.id] || "").trim();
      if (d.required && !v) { errors[d.id] = d.type === "radio" ? "Select an answer" : "Enter your " + d.label.toLowerCase(); return; }
      if (!v) return;
      if (d.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors[d.id] = "Enter an email address in the correct format, like name@example.com";
      if (d.id === "phone" && !/^[0-9+()\s-]{7,20}$/.test(v)) errors[d.id] = "Enter a phone number, like 07700 900 982";
      if (d.id === "postcode") {
        var pc = v.toUpperCase().replace(/\s+/g, "");
        if (!/^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/.test(pc)) errors[d.id] = "Enter a full UK postcode, like NW10 8AB";
        else if (MVP.bookingForm.requireBrentPostcode) {
          var outward = pc.slice(0, -3), prefixes = MVP.bookingForm.brentPostcodePrefixes || [];
          var ok = prefixes.some(function (p) { return outward === p.toUpperCase(); });
          if (!ok) errors[d.id] = "This service is only available to Brent residents. Enter a Brent postcode.";
        }
      }
      if (d.type === "number" && !/^\d+$/.test(v)) errors[d.id] = "Enter a whole number";
    });
    return errors;
  }

  /* ---- rendering ------------------------------------------------------ */
  function render() {
    var app = $("#app"), html = renderSteps();
    if (state.step === 0) html += renderFacilities();
    else if (state.step === 1) html += renderSlots();
    else if (state.step === 2) html += renderDetails();
    else html += renderConfirmation();
    app.innerHTML = html;
    bind();
    renderBookings();
    var h = $("h2, h1", app);
    if (h && state.rendered) { h.setAttribute("tabindex", "-1"); h.focus(); }
    state.rendered = true;
  }

  function renderFacilities() {
    var html = '<h2>' + esc(stepLabels()[0]) + "</h2>";
    if (MVP.copy && MVP.copy.intro) html += "<p>" + esc(MVP.copy.intro) + "</p>";
    html += '<ul class="card-grid">';
    MVP.facilities.forEach(function (f) {
      html += '<li class="facility-card"><div class="facility-card__band"></div><div class="facility-card__body">' +
        '<span class="facility-card__activity">' + esc(f.activity) + "</span>" +
        "<h3>" + esc(f.name) + "</h3>" +
        '<span class="facility-card__site">' + esc(f.site) + "</span>" +
        '<p class="facility-card__desc">' + esc(f.description || "") + "</p>" +
        '<span class="facility-card__meta">' + esc(fmtPrice(f.pricePence)) + " per " + f.slotMinutes + " minutes · " +
        esc(f.openingHours.start) + " to " + esc(f.openingHours.end) + "</span>" +
        '<button class="btn" type="button" data-choose="' + esc(f.id) + '">Check availability</button>' +
        "</div></li>";
    });
    return html + "</ul>";
  }

  function renderSlots() {
    var f = facility(state.facilityId), ds = dates(f);
    if (!state.date) state.date = ds[0];
    var html = '<button class="btn btn--link" type="button" data-back="0">&larr; Change facility</button>' +
      "<h2>" + esc(stepLabels()[1]) + "</h2>" +
      "<p><strong>" + esc(f.name) + "</strong>, " + esc(f.site) + ". " + esc(fmtPrice(f.pricePence)) + " per slot.</p>" +
      '<h3 class="visually-hidden">Choose a date</h3><ul class="date-pills" role="list">';
    ds.forEach(function (iso) {
      var d = fromISO(iso), sel = iso === state.date;
      html += '<li><button type="button" class="pill' + (sel ? " is-selected" : "") + '" data-date="' + iso + '"' + (sel ? ' aria-pressed="true"' : ' aria-pressed="false"') + ">" +
        esc(d.toLocaleDateString("en-GB", { weekday: "short" })) + "<small>" + esc(d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })) + "</small></button></li>";
    });
    html += "</ul><h3>Slots on " + esc(fmtDate(state.date)) + '</h3><ul class="slot-grid" role="list">';
    var slots = slotsFor(f, state.date), free = 0;
    slots.forEach(function (s) {
      if (!s.taken) free++;
      var sel = s.time === state.time;
      var title = s.reason === "yours" ? "You have booked this" : s.reason === "past" ? "In the past" : s.taken ? "Already booked" : "Available";
      html += '<li><button type="button" class="slot' + (s.taken ? " is-taken" : "") + (sel ? " is-selected" : "") + '"' +
        (s.taken ? " disabled" : "") + ' data-time="' + s.time + '" aria-pressed="' + (sel ? "true" : "false") + '" title="' + title + '">' +
        s.time + "</button></li>";
    });
    html += "</ul>";
    if (!free) html += '<p class="empty">No slots left on this day. Try another date.</p>';
    html += '<p class="slot-legend">Crossed-out slots are already booked.</p>';
    html += '<div class="btn-row"><button class="btn" type="button" data-continue' + (state.time ? "" : " disabled") + ">Continue</button>";
    if (state.time) html += "<span>Selected: " + esc(fmtDate(state.date, { weekday: "short", day: "numeric", month: "short" })) + " at " + state.time + "</span>";
    return html + "</div>";
  }

  function renderDetails() {
    var f = facility(state.facilityId), defs = fieldDefs(), errs = state.errors, keys = Object.keys(errs);
    var html = '<button class="btn btn--link" type="button" data-back="1">&larr; Change date or time</button>' +
      "<h2>" + esc(stepLabels()[2]) + "</h2>";
    if (keys.length) {
      html += '<div class="error-summary" role="alert" tabindex="-1" id="error-summary"><h2>There is a problem</h2><ul>';
      keys.forEach(function (k) { html += '<li><a href="#field-' + k + '">' + esc(errs[k]) + "</a></li>"; });
      html += "</ul></div>";
    }
    html += '<div class="notice"><strong>' + esc(f.name) + "</strong>, " + esc(f.site) + "<br>" +
      esc(fmtDate(state.date)) + " at " + state.time + " for " + f.slotMinutes + " minutes · " + esc(fmtPrice(f.pricePence)) + "</div>";
    html += '<form id="details-form" novalidate>';
    defs.forEach(function (d) {
      var err = errs[d.id], val = state.details[d.id] || "";
      html += '<div class="form-group' + (err ? " form-group--error" : "") + '">';
      if (d.type === "radio") {
        html += '<fieldset style="border:0;padding:0;margin:0"><legend class="form-label">' + esc(d.label) + "</legend>";
        if (d.hint) html += '<span class="form-hint">' + esc(d.hint) + "</span>";
        if (err) html += '<span class="error-message" id="err-' + d.id + '">' + esc(err) + "</span>";
        d.options.forEach(function (o, i) {
          html += '<label class="checkbox" style="margin-bottom:0.4rem"><input type="radio" name="' + d.id + '" value="' + esc(o.value) + '"' +
            (i === 0 ? ' id="field-' + d.id + '"' : "") + (val === o.value ? " checked" : "") + "> " + esc(o.label) + "</label>";
        });
        html += "</fieldset>";
      } else {
        html += '<label class="form-label" for="field-' + d.id + '">' + esc(d.label) + (d.required ? "" : " (optional)") + "</label>";
        if (d.hint) html += '<span class="form-hint" id="hint-' + d.id + '">' + esc(d.hint) + "</span>";
        if (err) html += '<span class="error-message" id="err-' + d.id + '">' + esc(err) + "</span>";
        html += '<input class="form-input' + (d.short ? " form-input--short" : "") + '" id="field-' + d.id + '" name="' + d.id + '" type="' + esc(d.type || "text") + '"' +
          (d.autocomplete ? ' autocomplete="' + d.autocomplete + '"' : "") + ' value="' + esc(val) + '"' +
          (d.hint || err ? ' aria-describedby="' + (d.hint ? "hint-" + d.id + " " : "") + (err ? "err-" + d.id : "") + '"' : "") +
          (err ? ' aria-invalid="true"' : "") + ">";
      }
      html += "</div>";
    });
    html += '<div class="btn-row"><button class="btn btn--success" type="submit">Confirm booking</button></div></form>';
    return html;
  }

  function renderConfirmation() {
    var b = state.lastBooking;
    var html = '<div class="panel panel--confirmation"><h2>Booking confirmed</h2><p class="reference">' + esc(b.ref) + "</p>" +
      "<p>" + esc((MVP.copy && MVP.copy.confirmation) || "Your booking is confirmed.") + "</p>" +
      '<dl class="summary-list"><dt>Facility</dt><dd>' + esc(b.facilityName) + "</dd><dt>Where</dt><dd>" + esc(b.site) + "</dd>" +
      "<dt>When</dt><dd>" + esc(fmtDate(b.date)) + " at " + b.time + "</dd><dt>Cost</dt><dd>" + esc(fmtPrice(b.pricePence)) + "</dd>";
    if (b.details.name) html += "<dt>Name</dt><dd>" + esc(b.details.name) + "</dd>";
    if (b.details.email) html += "<dt>Email</dt><dd>" + esc(b.details.email) + "</dd>";
    html += "</dl></div>";
    if (MVP.mvp.repeatBooking) {
      html += '<div class="panel repeat-panel"><h3>Make it a habit</h3>';
      if (state.repeatResult) {
        html += state.repeatResult.ok
          ? '<p class="repeat-ok">Booked again for <strong>' + esc(fmtDate(state.repeatResult.date)) + " at " + state.repeatResult.time + "</strong>. Reference <strong>" + esc(state.repeatResult.ref) + "</strong>.</p>"
          : '<p class="repeat-taken">That slot is already taken next week. <button class="btn btn--link" type="button" data-repeat-pick>Pick a different time</button></p>';
      } else {
        html += "<p>Same time next week? One tap books the same slot seven days later.</p>" +
          '<button class="btn" type="button" data-repeat>' + esc((MVP.copy && MVP.copy.repeatButton) || "Book this slot again next week") + "</button>";
      }
      html += "</div>";
    }
    html += '<div class="btn-row"><button class="btn" type="button" data-restart>Book another slot</button>' + "</div>";
    return html;
  }

  function repeatBooking() {
    var b = state.lastBooking, f = facility(b.facilityId);
    var d = fromISO(b.date); d.setDate(d.getDate() + 7);
    var iso = toISO(d);
    var free = slotsFor(f, iso).some(function (s) { return s.time === b.time && !s.taken; });
    if (!free) { state.repeatResult = { ok: false }; render(); return; }
    var nb = { ref: makeRef(), facilityId: f.id, facilityName: f.name, site: f.site, pricePence: f.pricePence, date: iso, time: b.time, details: b.details, createdAt: new Date().toISOString(), repeatOf: b.ref };
    var all = loadBookings(); all.push(nb); saveBookings(all);
    state.repeatResult = { ok: true, ref: nb.ref, date: iso, time: b.time };
    render();
  }

  function renderBookings() {
    var list = $("#bookings-list"), items = loadBookings();
    if (!items.length) { list.innerHTML = '<li class="empty">No bookings yet.</li>'; return; }
    items.sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
    list.innerHTML = items.map(function (b) {
      return "<li><div><strong>" + esc(b.facilityName) + '</strong><span class="muted">' +
        esc(fmtDate(b.date, { weekday: "short", day: "numeric", month: "short" })) + " at " + b.time + " · " + esc(b.ref) + "</span></div>" +
        '<button class="btn btn--danger" type="button" data-cancel="' + esc(b.ref) + '" aria-label="Cancel booking ' + esc(b.ref) + '">Cancel</button></li>';
    }).join("");
  }

  function renderStatic() {
    document.title = MVP.brand.service + " | " + MVP.brand.council + " (training sandbox)";
    $("#service-name").textContent = MVP.brand.service;
    $("#hero-title").textContent = MVP.brand.service;
    $("#hero-strapline").textContent = MVP.brand.strapline || "";
    $("#sandbox-banner").textContent = MVP.brand.sandboxNotice;
    $("#footer-note").textContent = "© " + new Date().getFullYear() + " " + MVP.brand.council + " (fictional training sandbox)";

    var m = MVP.mvp, html = "";
    html += "<dt>Target user</dt><dd>" + esc(m.targetUser) + "</dd>";
    html += "<dt>User need</dt><dd>" + esc(m.userNeed) + "</dd>";
    html += "<dt>Hypothesis</dt><dd>" + esc(m.hypothesis) + "</dd>";
    html += "<dt>Process</dt><dd><ol>" + (m.process || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></dd>";
    html += "<dt>Acceptance criteria</dt><dd><ul>" + (m.acceptanceCriteria || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></dd>";
    html += "<dt>Measure of success</dt><dd>" + esc(m.successMeasure.name) + "<br><strong>Target:</strong> " + esc(m.successMeasure.target) + "</dd>";
    $("#mvp-panel-body").innerHTML = html;
  }

  /* ---- events --------------------------------------------------------- */
  function bind() {
    var app = $("#app");
    app.querySelectorAll("[data-choose]").forEach(function (b) {
      b.addEventListener("click", function () { state.facilityId = b.getAttribute("data-choose"); state.date = null; state.time = null; state.step = 1; render(); });
    });
    app.querySelectorAll("[data-back]").forEach(function (b) {
      b.addEventListener("click", function () { state.step = +b.getAttribute("data-back"); state.errors = {}; render(); });
    });
    app.querySelectorAll("[data-date]").forEach(function (b) {
      b.addEventListener("click", function () { state.date = b.getAttribute("data-date"); state.time = null; render(); });
    });
    app.querySelectorAll("[data-time]").forEach(function (b) {
      b.addEventListener("click", function () { state.time = b.getAttribute("data-time"); render(); });
    });
    var cont = $("[data-continue]", app);
    if (cont) cont.addEventListener("click", function () { if (state.time) { state.step = 2; state.errors = {}; render(); } });
    var form = $("#details-form", app);
    if (form) form.addEventListener("submit", onSubmit);
    var restart = $("[data-restart]", app);
    if (restart) restart.addEventListener("click", function () {
      state.step = 0; state.facilityId = null; state.date = null; state.time = null; state.details = {}; state.errors = {}; state.repeatResult = null; render();
    });
    var rep = $("[data-repeat]", app);
    if (rep) rep.addEventListener("click", repeatBooking);
    var pick = $("[data-repeat-pick]", app);
    if (pick) pick.addEventListener("click", function () {
      var b = state.lastBooking, d = fromISO(b.date); d.setDate(d.getDate() + 7);
      state.facilityId = b.facilityId; state.date = toISO(d); state.time = null; state.step = 1; state.repeatResult = null; render();
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    var defs = fieldDefs(), values = {}, fd = new FormData(e.target);
    defs.forEach(function (d) { values[d.id] = fd.get(d.id) || ""; });
    state.details = values;
    state.errors = validate(defs, values);
    if (Object.keys(state.errors).length) {
      render();
      var s = $("#error-summary"); if (s) s.focus();
      return;
    }
    var f = facility(state.facilityId);
    /* Guard against the slot having been taken since it was chosen. */
    var stillFree = slotsFor(f, state.date).some(function (s) { return s.time === state.time && !s.taken; });
    if (!stillFree) { state.time = null; state.step = 1; render(); return; }
    var booking = {
      ref: makeRef(), facilityId: f.id, facilityName: f.name, site: f.site, pricePence: f.pricePence,
      date: state.date, time: state.time, details: values, createdAt: new Date().toISOString()
    };
    var all = loadBookings(); all.push(booking); saveBookings(all);
    state.lastBooking = booking; state.repeatResult = null; state.step = 3; render();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-cancel]");
    if (!btn) return;
    var ref = btn.getAttribute("data-cancel");
    if (!window.confirm("Cancel booking " + ref + "?")) return;
    saveBookings(loadBookings().filter(function (b) { return b.ref !== ref; }));
    render();
  });

  renderStatic();
  render();
})();

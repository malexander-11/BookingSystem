/* ==================================================================
   "AFTER BUILD" EVIDENCE PACK
   ------------------------------------------------------------------
   Fictional evaluation evidence from a six-week pilot of the MVP.
   The evidence page (evidence.html) renders this file under the same
   headings as docs/3-evaluation-template.md.

   In the workshop the group writes a MEASUREMENT PLAN (what they need
   to know, which metric, which source). This file is then regenerated
   so that every row of their plan gets a plausible, fictional result,
   and the rest of the page (headline numbers, charts, risks) is built
   from those results.

   Rules of thumb when regenerating:
   - One entry in `measurementPlan` per row the group wrote, with a
     `result` for each. Do not invent metrics they did not ask for
     unless a risk card would otherwise be empty.
   - Present each result in the form its source implies:
       analytics        -> a funnel or drop-off chart
       SQL / service    -> new vs returning, splits by group or site
       survey           -> self-reported shares
       observation      -> findings and quotes
       incident / ops   -> feasibility items
       finance          -> viability items
   - Make the measure of success ambiguous: near the target, not a
     clear win or loss. Break at least one guard-rail.
   - Keep at least one "against" item under every product risk.
   - Numbers should be plausible for a borough of ~340,000 people.
   ================================================================== */

window.EVIDENCE = {
  title: "What happened after launch",
  period: "Six-week pilot, 11 May to 21 June",
  intro:
    "The booking service went live at four sites. This page follows the evaluation template: what we set out to do, what we measured, what happened, what users did, whether our impact changed, and what the four product risks now look like.",

  /* Rules the Evaluate page uses to show a fake pilot result for each measure
     the group defined. The first rule whose keywords match the measure wins.
     Keep every result ambiguous: near a plausible target, never a clean win. */
  measureResults: [
    { match: ["no-show", "no show", "turn up", "attend"], value: "22%", detail: "no-show rate on online bookings, against 9% for phone bookings last year", tone: "bad", but: "Nobody pays at booking, so a click costs nothing to abandon." },
    { match: ["first-time", "first time", "new user", "new people", "never used", "not used", "new resident", "new booker"], value: "19%", detail: "of bookings were from people who said they had not used a facility in the last 12 months", tone: "neutral", but: "Self-reported at checkout. Some regulars may have said 'no' to get through faster." },
    { match: ["call", "phone", "reception", "staff time", "staff hours", "workload"], value: "-31%", detail: "reception phone calls compared with the same six weeks last year", tone: "good", but: "60% of the remaining calls are about the website, and they take longer." },
    { match: ["complaint"], value: "24", detail: "complaints in six weeks, down from 31 in the same period last year", tone: "neutral", but: "Nine of the 24 are about the website or a double booking." },
    { match: ["time to book", "minutes", "under three", "quick", "speed"], value: "2m 40s", detail: "median time from opening the service to a confirmed booking", tone: "good", but: "A quarter of people who picked a slot never finished." },
    { match: ["revenue", "income", "takings"], value: "+£6,200", detail: "income from casual bookings over six weeks compared with last year", tone: "neutral", but: "Most of it is bookings that used to come in by phone. Net new income is closer to £900." },
    { match: ["cost", "saving", "cheaper", "efficien"], value: "£3,100", detail: "of reception time freed over six weeks, at cost", tone: "neutral", but: "About £2,400 of floodlit-pitch hours went unused because of no-shows in the same period." },
    { match: ["child", "young", "under 18", "kids", "school"], value: "6%", detail: "of bookings were for under-18s, made by a parent", tone: "bad", but: "There is no way to know whether these children were already playing somewhere else." },
    { match: ["over-50", "over 50", "older", "elderly", "retired", "senior"], value: "19%", detail: "of bookings were by people over 50", tone: "neutral", but: "Almost all of them still booked by phone. Online bookings by the over-50s were 4%." },
    { match: ["inclusion", "inclusive", "deprived", "postcode", "ward", "diverse", "community", "reach"], value: "11%", detail: "of bookings came from the three most deprived wards, down from 14% by phone last year", tone: "bad", but: "The wards with the most bookings are the ones with the most cars." },
    { match: ["occupancy", "utilisation", "empty", "daytime", "off-peak"], value: "+3 pts", detail: "weekday daytime occupancy, from 30% to 33%", tone: "neutral", but: "Evening occupancy is unchanged at 92%. The platform cannot create evening capacity." },
    { match: ["booking", "hours booked", "use", "usage", "visits", "attendance", "active", "participation"], value: "1,284", detail: "online bookings in six weeks; total hours booked up 4% on last year", tone: "good", but: "81% of those bookings came from people who were already booking by phone or at the desk." }
  ],
  measureResultDefault: { value: "+{n}%", detail: "change over the six-week pilot compared with the same period last year", tone: "neutral", but: "The source you named cannot yet separate the platform from the season, the weather or the school holidays." },

  /* 1. What we set out to do (copied from the requirements doc) */
  setOutToDo: {
    hypothesis:
      "If residents can see availability and book online in under three minutes, more people who have never used our facilities will book, and overall facility use will go up.",
    measure: "Bookings made by people who have not used a Brent sports facility in the last 12 months",
    target: "30% of all bookings in the first six weeks",
    baseline: "Unknown; estimated 10 to 15% of phone bookings",
    guardRail: "No-show rate must not rise above 15%"
  },

  /* 2. Measurement plan: the group's questions, with generated results */
  measurementPlan: [
    { question: "Are new people booking?", metric: "Share of bookings from first-time users (last 12 months)", source: "Checkout question + SQL on bookings table", owner: "BA", cadence: "Weekly", result: "19% (target 30%)" },
    { question: "Is overall use going up?", metric: "Hours booked vs same six weeks last year", source: "Diary and bookings table", owner: "Ops manager", cadence: "End of pilot", result: "+4%" },
    { question: "Where do people give up?", metric: "Drop-off at each step", source: "Web analytics events", owner: "BA", cadence: "Weekly", result: "Biggest loss between choosing a facility and picking a slot (39%)" },
    { question: "Who is booking?", metric: "Bookings by prior channel and age group", source: "Checkout question + SQL", owner: "BA", cadence: "End of pilot", result: "81% existing users; 18 to 35s are 31% of bookings" },
    { question: "Are people turning up?", metric: "No-show rate, online vs phone", source: "Duty manager logs", owner: "Duty managers", cadence: "Weekly", result: "22% online vs 9% phone (guard-rail 15%)" },
    { question: "Has staff workload changed?", metric: "Reception call volume and reasons", source: "Contact centre report + call log sample", owner: "Reception lead", cadence: "Before and after", result: "Calls down 31%; 60% of remaining calls are about the website" },
    { question: "Is it breaking anything?", metric: "Double bookings and diary sync incidents", source: "Incident log", owner: "Ops manager", cadence: "Weekly", result: "14 incidents at two sites" },
    { question: "Why do non-users still not book?", metric: "Themes from interviews", source: "12 interviews", owner: "BA", cadence: "Once", result: "Cost, company and 'not for people like me'. Booking effort rarely mentioned." }
  ],

  /* 3. What happened: headline numbers */
  whatHappened: [
    { label: "Online bookings made", value: "1,284", note: "vs 940 phone/walk-in bookings in the same six weeks last year", tone: "good" },
    { label: "Bookings by first-time users", value: "19%", note: "Target was 30%", tone: "bad" },
    { label: "No-show rate (online)", value: "22%", note: "Phone bookings last year: 9%. Guard-rail: 15%", tone: "bad" },
    { label: "Median time to book", value: "2m 40s", note: "Target under 3 minutes", tone: "good" },
    { label: "Overall facility use", value: "+4%", note: "Hours booked vs same period last year", tone: "neutral" },
    { label: "Reception phone calls", value: "-31%", note: "But 60% of remaining calls are about the website", tone: "neutral" }
  ],

  /* 4. What users did: charts */
  userBehaviour: [
    {
      title: "Where people dropped out",
      subtitle: "Of 4,900 people who opened the service",
      unit: "people",
      source: "Web analytics",
      highlightLast: false,
      items: [
        { label: "Opened the service", value: 4900 },
        { label: "Chose a facility", value: 3630 },
        { label: "Picked a slot", value: 2210 },
        { label: "Started details form", value: 1710 },
        { label: "Completed booking", value: 1284 }
      ],
      note: "The biggest drop is between choosing a facility and picking a slot. Interviews suggest people could not find a free evening slot at their nearest site."
    },
    {
      title: "Who made the bookings",
      subtitle: "Share of the 1,284 completed bookings",
      unit: "%",
      source: "Checkout question, SQL",
      highlightLast: true,
      items: [
        { label: "Existing users, already booking by phone", value: 58 },
        { label: "Existing users, previously walk-in", value: 23 },
        { label: "First-time users", value: 19 }
      ],
      note: "Most bookings moved from the phone to the website rather than being new demand."
    },
    {
      title: "Bookings by age group",
      subtitle: "Share of completed bookings, self-reported",
      unit: "%",
      source: "Checkout question",
      highlightLast: false,
      items: [
        { label: "Under 18 (via parent)", value: 6 },
        { label: "18 to 35", value: 31 },
        { label: "36 to 55", value: 44 },
        { label: "Over 55", value: 19 }
      ],
      note: "The target group (18 to 35) is not the largest group of users."
    }
  ],

  /* 5. Did it change our impact? */
  impact: {
    actual: "19% of bookings from first-time users (self-reported at checkout)",
    targetMet: "No. But 19% is above the estimated baseline of 10 to 15%.",
    guardRailHeld: "No. No-shows rose to 22%, above the 15% limit.",
    verdict: "Target not met, but the number is not zero. Is 19% a failure or a promising start?",
    caveats: [
      { name: "Substitution", text: "Most of the 1,284 bookings replaced phone and walk-in bookings. Net new activity is closer to +4% hours than +37% bookings." },
      { name: "Counterfactual", text: "The pilot ran May to June, when outdoor use rises anyway. Last year's same-period figure controls for some of that, not all." },
      { name: "Novelty", text: "Weeks 1 and 2 were the highest. Weeks 5 and 6 were flat. Unknown whether it holds." },
      { name: "Self-report", text: "'First time in 12 months' is self-reported at checkout. Some regulars may have said 'no' to get through faster." }
    ]
  },

  /* 6. The four product risks */
  risks: [
    {
      id: "value",
      name: "Value risk",
      question: "Do people actually want this, and does it solve the problem we set out to solve?",
      assumption: "Residents were not using facilities because booking was hard.",
      evidence: [
        { direction: "for", text: "1,284 bookings in six weeks with almost no marketing. Demand for online booking clearly exists.", source: "Service analytics" },
        { direction: "against", text: "Most bookings came from people who were already using the facilities. New demand was small.", source: "Checkout survey, 1,190 responses" },
        { direction: "against", text: "In interviews, non-users said the main barriers were cost, not knowing anyone to play with, and not feeling the centres were 'for people like me'. Booking difficulty was rarely mentioned.", source: "12 interviews with non-users" }
      ]
    },
    {
      id: "usability",
      name: "Usability risk",
      question: "Can people figure out how to use it?",
      assumption: "A simple four-step flow on a phone would be easy for anyone.",
      evidence: [
        { direction: "for", text: "Median time to book was under three minutes. 82% of bookings were made on a phone.", source: "Service analytics" },
        { direction: "against", text: "A quarter of people who picked a slot did not finish. Users said they were surprised by the price and the postcode question.", source: "Funnel data and exit survey" },
        { direction: "against", text: "Reception staff report older residents phoning to ask them to 'do the website for me'.", source: "Reception team feedback" }
      ]
    },
    {
      id: "feasibility",
      name: "Feasibility risk",
      question: "Can we build and run it with the time, skills and technology we have?",
      assumption: "Site staff could manage online and phone bookings side by side.",
      evidence: [
        { direction: "for", text: "The MVP was built and launched in four weeks with no new suppliers.", source: "Delivery team" },
        { direction: "against", text: "Online bookings and the paper diary at two sites got out of sync 14 times, resulting in double bookings and complaints.", source: "Incident log" },
        { direction: "against", text: "There is no way to take payment online, so unpaid bookings are held for 24 hours. This is where most no-shows come from.", source: "Finance and operations" }
      ]
    },
    {
      id: "viability",
      name: "Viability risk",
      question: "Does it work for the council as an organisation, financially and politically?",
      assumption: "More bookings means more income and better use of assets.",
      evidence: [
        { direction: "for", text: "Reception call volume fell by 31%, freeing roughly 11 staff hours a week.", source: "Contact centre data" },
        { direction: "against", text: "No-shows more than doubled. Each empty floodlit hour costs the council roughly £40 and blocks another user.", source: "Finance" },
        { direction: "mixed", text: "The Cabinet Member who proposed the platform wants to expand it to all 11 sites next quarter and has asked for a press release about '1,284 bookings'.", source: "Portfolio holder briefing" }
      ]
    }
  ],

  /* 7. What surprised us */
  surprises: [
    "The biggest drop-off was not in the form. It was people looking at availability, finding evenings full, and leaving. The tool made the capacity problem visible; it did not solve it.",
    "A third of first-time users booked the free tennis court. Price may matter more than convenience.",
    "Reception calls fell, but the calls that remained were harder and longer."
  ],

  quotes: [
    { text: "It was easy enough to book. I was booking anyway, I just used to ring up.", who: "Resident, 44, regular badminton player" },
    { text: "I looked, but every evening slot at Vale Farm was gone. I gave up.", who: "Resident, 27, tried to book football" },
    { text: "Half the people who book online do not turn up. We used to have a chat on the phone and they took it more seriously.", who: "Duty manager, Willesden Sports Centre" },
    { text: "Honestly? I did not know the council even had sports centres.", who: "Resident, 22, non-user interview" }
  ],

  /* 8. Decision */
  decision: {
    prompt: "Given this evidence, what should the council do next with the booking platform, and what would you need to find out before you could be confident?",
    options: [
      { name: "Continue", meaning: "Keep running the MVP as it is and gather more evidence." },
      { name: "Iterate", meaning: "Keep the direction but change specific features, for example add payment or a waiting list." },
      { name: "Expand", meaning: "Roll it out to more sites or more user groups." },
      { name: "Pivot", meaning: "Keep the goal (more residents using facilities) but change the solution." },
      { name: "Stop", meaning: "Switch it off and put the effort somewhere else." }
    ]
  }
};

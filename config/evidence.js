/* ==================================================================
   "AFTER BUILD" EVIDENCE PACK
   ------------------------------------------------------------------
   Fictional evaluation evidence from a six-week pilot of the MVP.
   The evidence page (evidence.html) renders this file under the same
   headings as the Evaluate page.

   In the workshop the group sees fake results for its own measures on
   the Evaluate page (generated from `measureResults` below), then hands
   in the ADDITIONAL DATA NEEDED. This file is then regenerated so that
   the results shown are kept exactly, every additional-data row gets a
   plausible, fictional result, and the rest of the page (charts, risks,
   surprises, decision) is built from those.

   Rules of thumb when regenerating:
   - Keep the `measureResults` rules and this header.
   - One entry in `measurementPlan` per additional-data row the group
     wrote, with a `result` for each. Do not invent metrics they did not
     ask for unless a risk card would otherwise be empty.
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
    "The booking service went live at four sites, with the midday over-50s sessions at Willesden and the one-tap repeat booking. This page follows the evaluation headings: what we set out to do, what we measured, what happened, what users did, whether our impact changed, and what the four product risks now look like.",

  /* Rules the Evaluate page uses to show a fake pilot result for each measure
     the group defined. The first rule whose keywords match the measure wins.
     Keep every result ambiguous: near a plausible target, never a clean win. */
  measureResults: [
    { match: ["satisfaction", "happy", "morale"], value: "3.8 / 5", detail: "reception satisfaction after six weeks, from 3.3 in the before-survey", tone: "neutral", but: "Only 6 of the 11 receptions answered the after-survey, and the two busiest sites are missing." },
    { match: ["online vs", "vs walk-in", "vs phone", "channel", "online booking vs"], value: "54%", detail: "of bookings were made online by week six; 31% by phone, 15% walk-in", tone: "good", but: "Most of the online bookings are regulars who used to phone. Walk-ins barely moved, and the over-50s still phone 84% of the time." },
    { match: ["time spent", "staff time", "reception time", "hours on"], value: "-9 hrs", detail: "a week spent on bookings across the borough, from about 40 to 31, as reported by reception", tone: "neutral", but: "Self-reported. Reception says most of the time freed went on helping people with the website instead." },
    { match: ["failure demand", "abandon", "drop-off", "gave up"], value: "27%", detail: "of started bookings were abandoned before confirmation; one in six of those left at the payment step", tone: "neutral", but: "Analytics cannot tell someone who gave up from someone who only came to check availability and left happy." },
    { match: ["over 50 and under 18", "under 18 and over 50", "over-50 and under-18", "over 50s and under 18s"], value: "23%", detail: "of participants were over 50 or under 18: 19% over 50 (almost all booked by phone) and 4% under 18 (booked by a parent)", tone: "neutral", but: "The paper diary never recorded age, so there is no baseline to say whether 23% is up, down or the same." },
    { match: ["total cost", "total costs", "running cost", "costs"], value: "-£700", detail: "total running cost over six weeks compared with last year, after £3,100 of reception time freed and £2,400 of floodlit hours lost to no-shows", tone: "neutral", but: "The platform's licence and support cost of about £1,500 a quarter is not yet in the finance spreadsheet." },
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

  /* 1. What we set out to do (from the Define hand-in) */
  setOutToDo: {
    hypothesis:
      "If we implement an online booking platform, more people will book pitches and fewer will phone in, because it is more seamless, leading to lower costs and higher revenue.",
    measure: "Reception satisfaction",
    target: "Up by 1 point on a 5-point scale by the end of the pilot",
    baseline: "Unknown; the before-survey runs in week 1. Staff estimate about 3 out of 5 today",
    guardRail: "No site loses staffed reception hours during the pilot"
  },

  /* 2. Measurement plan: the group's additional-data rows, with generated results.
     The three measures they set out with are in whatHappened below, unchanged. */
  measurementPlan: [
    { question: "Are new people booking?", metric: "Share of bookings from first-time users (last 12 months)", source: "Service data (SQL on the bookings table, diary, till)", owner: "BA", cadence: "Weekly", changeMind: "Not decided before the data came in",
      result: "19% of bookings were from people who said they had not used a facility in the last 12 months. Two thirds of those were at the £3 midday sessions." },
    { question: "Is overall use going up?", metric: "Hours booked vs same six weeks last year", source: "Service data (SQL on the bookings table, diary, till)", owner: "Ops manager", cadence: "End of pilot", changeMind: "Not decided before the data came in",
      result: "+4% hours booked. The midday over-50s sessions added 310 hours; evening hours are unchanged at 92% occupancy." },
    { question: "Where do people give up?", metric: "Drop-off at each step", source: "Web analytics", owner: "BA", cadence: "Weekly", changeMind: "Not decided before the data came in",
      result: "Of 4,900 who opened the service, 1,284 completed. The biggest drop is between choosing a session and picking a slot. One in six who abandoned the details form left at the age-group question." },
    { question: "Who is booking?", metric: "Bookings by prior channel and age group", source: "Service data (SQL on the bookings table, diary, till)", owner: "BA", cadence: "End of pilot", changeMind: "Not decided before the data came in",
      result: "81% existing users who used to phone or walk in, 19% first-time. By age: 4% under 18, 77% aged 18 to 49, 19% over 50. The over-50s booked by phone 84% of the time." }
  ],

  /* 3. What happened: headline numbers. The first three are exactly what the
     Evaluate page showed the group. */
  whatHappened: [
    { label: "Participants over 50 and under 18", value: "23%", note: "Target 25%. 19% over 50, 4% under 18. No baseline: the diary never recorded age", tone: "neutral" },
    { label: "Total revenue", value: "+£6,200", note: "vs same six weeks last year. Net new income closer to £900", tone: "neutral" },
    { label: "Total costs", value: "-£700", note: "Before the £1,500-a-quarter platform licence is counted", tone: "neutral" },
    { label: "Online bookings made", value: "1,284", note: "vs 940 phone/walk-in bookings in the same six weeks last year", tone: "good" },
    { label: "Hours booked", value: "+4%", note: "310 of the extra hours are the new midday sessions", tone: "neutral" },
    { label: "Bookings repeated with one tap", value: "38%", note: "Of online bookings. 9 in 10 repeats were by existing regulars", tone: "neutral" }
  ],

  /* 4. What users did: charts, one per SQL or analytics row */
  userBehaviour: [
    {
      title: "Where people dropped out",
      subtitle: "Of 4,900 people who opened the service",
      unit: "people",
      source: "Web analytics",
      highlightLast: false,
      items: [
        { label: "Opened the service", value: 4900 },
        { label: "Chose a session", value: 3630 },
        { label: "Picked a slot", value: 2210 },
        { label: "Started details form", value: 1710 },
        { label: "Completed booking", value: 1284 }
      ],
      note: "The biggest drop is between choosing a session and picking a slot: evenings were full. Of the 426 who abandoned the form, 71 left at the age-group question."
    },
    {
      title: "Who made the bookings",
      subtitle: "Share of the 1,284 completed bookings, by what they did before",
      unit: "%",
      source: "SQL on the bookings table, matched to the diary",
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
      subtitle: "Share of all bookings, from the age-group question",
      unit: "%",
      source: "SQL on the bookings table",
      highlightLast: false,
      items: [
        { label: "Under 18 (booked by a parent)", value: 4 },
        { label: "18 to 49", value: 77 },
        { label: "50 and over", value: 19 }
      ],
      note: "The 19% over 50 is almost entirely the midday sessions. Children barely appear: nothing in the MVP was aimed at them."
    },
    {
      title: "How the over-50s booked",
      subtitle: "Share of bookings by people aged 50 and over, by channel",
      unit: "%",
      source: "SQL on the bookings table and the phone diary",
      highlightLast: false,
      items: [
        { label: "Phoned reception", value: 84 },
        { label: "Booked online", value: 16 }
      ],
      note: "The sessions reached the over-50s. The website mostly did not."
    }
  ],

  /* 5. Did it change our impact? */
  impact: {
    actual: "23% of participants were over 50 or under 18 (target 25%)",
    targetMet: "Not quite, and nobody can say whether 23% is a rise. The diary never recorded age, so the baseline is a guess.",
    guardRailHeld: "Yes on the spreadsheet: costs down £700. No once the platform licence of about £1,500 a quarter is added: costs up by roughly £800.",
    verdict: "The group did not decide in advance what would change its mind. Decide now, before reading on: is 23% with no baseline a success, a failure, or not yet knowable?",
    caveats: [
      { name: "Substitution", text: "Four in five online bookings replaced phone and walk-in bookings. Of the revenue rise, most is money that would have arrived by phone. The over-50s who came to the new sessions mostly booked by phone too, so the website's share of the inclusion result is small." },
      { name: "Counterfactual", text: "The midday over-50s sessions and the £3 price started the same week as the platform. The data cannot separate the session, the price and the booking tool. A pilot with the sessions but no website would have told us more." },
      { name: "Novelty", text: "Weeks 1 and 2 were the busiest for the midday sessions after a leaflet drop at two GP surgeries. Weeks 5 and 6 were flat. Whether the over-50s keep coming is unknown." },
      { name: "Self-report", text: "Age group is self-declared at checkout and parents book for children, so the under-18 figure counts bookings, not children. First-time status is self-reported too." }
    ]
  },

  /* 6. The four product risks */
  risks: [
    {
      id: "value",
      name: "Value risk",
      question: "Do people actually want this, and does it solve the problem we set out to solve?",
      assumption: "An inclusive, helpful service would bring in the over-50s and children because booking became easier.",
      evidence: [
        { direction: "for", text: "The midday over-50s sessions filled to 40% within four weeks with almost no marketing beyond two GP surgeries. 19% of all participants were over 50.", source: "SQL on the bookings table" },
        { direction: "against", text: "The over-50s booked by phone 84% of the time. What reached them was a £3 session at a quiet time and a person on the phone, not the website.", source: "SQL on the bookings table and the phone diary" },
        { direction: "against", text: "Children were 4% of bookings and nothing in the MVP was designed for them. 'Healthier children' was the group's second priority.", source: "SQL on the bookings table" },
        { direction: "against", text: "Bookings from the three most deprived wards fell from 14% to 11%. The website's users skew towards the wards with the most cars.", source: "SQL on postcodes" }
      ]
    },
    {
      id: "usability",
      name: "Usability risk",
      question: "Can people figure out how to use it?",
      assumption: "A four-step flow with an age question and a repeat button would be easy for anyone.",
      evidence: [
        { direction: "for", text: "Median time to book was 2 minutes 40 seconds. The repeat button was used on 38% of online bookings.", source: "Web analytics" },
        { direction: "against", text: "One in six people who abandoned the details form left at the age-group question. Some said they did not see why the council needed it.", source: "Web analytics and exit survey" },
        { direction: "against", text: "Reception report older residents phoning to ask them to 'do the website for me', and the calls that remain take longer than before.", source: "Reception team feedback and call log sample" }
      ]
    },
    {
      id: "feasibility",
      name: "Feasibility risk",
      question: "Can we build and run it with the time, skills and technology we have?",
      assumption: "Site staff could run online, phone and repeat bookings side by side.",
      evidence: [
        { direction: "for", text: "The MVP, the midday sessions and the repeat button were live in four weeks with no new suppliers.", source: "Delivery team" },
        { direction: "against", text: "Repeat bookings created 60 duplicate holds where a phone booking had already taken the slot the following week. The paper diary cannot see a repeat until reception copies it in.", source: "Incident log" },
        { direction: "against", text: "Online bookings and the paper diary got out of sync 14 times at two sites, resulting in double bookings and complaints.", source: "Incident log" }
      ]
    },
    {
      id: "viability",
      name: "Viability risk",
      question: "Does it work for the council as an organisation, financially and politically?",
      assumption: "Putting inclusion above revenue and cost would still be affordable, and the CFO and CDIO would accept it.",
      evidence: [
        { direction: "for", text: "Revenue is up £6,200 and running costs down £700 on the spreadsheet, so the group's order has not cost the council money yet.", source: "Finance table and spreadsheet" },
        { direction: "against", text: "The platform licence and support, about £1,500 a quarter, are not in the spreadsheet. Once counted, costs are up by roughly £800, which breaks the group's guard-rail.", source: "Finance" },
        { direction: "against", text: "The £3 midday sessions cost about £28 an hour to staff and take £9 an hour at 40% occupancy. Inclusion is being paid for by the evening pitches.", source: "Finance" },
        { direction: "mixed", text: "The CDIO's showcase slide already says '31% fewer calls'. Reception hours have not been cut and the reception lead says they should not be. The CFO has asked when the saving will be realised.", source: "Portfolio holder briefing" }
      ]
    }
  ],

  /* 7. What surprised us */
  surprises: [
    "The thing that reached the over-50s was the £3 price and a quiet midday slot, not the booking website. They rang.",
    "The repeat button worked, but for the wrong people: nine in ten repeats were by regulars who already had a habit.",
    "The age-group question, added so the measure could be counted, is itself a reason some people gave up.",
    "Nobody had decided in advance what result would change their mind, so every number is being read as support for whatever each stakeholder already believed."
  ],

  quotes: [
    { text: "Walking football on a Tuesday, three quid, and Sandra on the desk knows my name. I don't need a website for that.", who: "Resident, 67, midday session, booked by phone" },
    { text: "The repeat button is brilliant. We've had Thursday 7pm for years anyway, now I don't have to ring.", who: "Resident, 44, regular badminton player" },
    { text: "Why does the council want to know how old I am to book a tennis court?", who: "Exit survey, resident who abandoned the form" },
    { text: "Every repeat booking that clashes with a phone booking is me on the phone apologising to someone.", who: "Duty manager, Bridge Park" },
    { text: "Show me the slide that says fewer calls, then show me the reception rota. They're the same rota.", who: "Chief Finance Officer, briefing" }
  ],

  /* 8. Decision */
  decision: {
    prompt: "Given this evidence, what should the council do next with the booking platform and the midday sessions, and what would you need to find out before you could be confident? Remember which business need you put first.",
    options: [
      { name: "Continue", meaning: "Keep running the MVP and the sessions as they are and gather more evidence, starting with a baseline for age." },
      { name: "Iterate", meaning: "Keep the direction but change specific features, for example make the age question optional, sync repeats with the diary, or take payment." },
      { name: "Expand", meaning: "Roll the midday sessions, the platform, or both, out to more sites or more groups (children next?)." },
      { name: "Pivot", meaning: "Keep the goal (a healthier, more inclusive borough) but change the solution: price, sessions and a person on the phone rather than a booking tool." },
      { name: "Stop", meaning: "Switch the platform off, keep what worked, and put the effort somewhere else." }
    ]
  }
};

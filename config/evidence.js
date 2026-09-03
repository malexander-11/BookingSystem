/* ==================================================================
   "AFTER BUILD" EVIDENCE PACK
   ------------------------------------------------------------------
   Fictional evaluation evidence from a six-week pilot of the MVP.
   It is written to CHALLENGE the hypothesis in config/mvp.js, so when
   the group's MVP changes, rewrite this so the evidence tests *their*
   hypothesis and *their* measure of success.

   Rules of thumb when editing:
   - Keep at least one "against" item under every product risk.
   - Make the success measure come out ambiguous, not a clear win.
   - Numbers should be plausible for a borough of ~340,000 people.
   ================================================================== */

window.EVIDENCE = {
  title: "What happened after launch",
  period: "Six-week pilot, 11 May to 21 June",
  intro:
    "The booking service went live at four sites. Here is what the data, user research and operations teams found. Use it to assess the MVP against the four product risks and decide what should happen next.",

  hypothesisUnderTest:
    "If residents can see availability and book online in under three minutes, more people who have never used our facilities will book, and overall facility use will go up.",

  successMeasure: {
    name: "Bookings made by people who have not used a Brent sports facility in the last 12 months",
    target: "30% of all bookings in the first six weeks",
    actual: "19% of bookings (self-reported at checkout)",
    verdict: "Target not met, but the number is not zero. Is 19% a failure or a promising start?"
  },

  headline: [
    { label: "Online bookings made", value: "1,284", note: "vs 940 phone/walk-in bookings in the same six weeks last year", tone: "good" },
    { label: "Bookings by first-time users", value: "19%", note: "Target was 30%", tone: "bad" },
    { label: "No-show rate", value: "22%", note: "Phone bookings last year: 9%", tone: "bad" },
    { label: "Median time to book", value: "2m 40s", note: "Target under 3 minutes", tone: "good" },
    { label: "Overall facility use", value: "+4%", note: "Hours booked vs same period last year", tone: "neutral" },
    { label: "Reception phone calls", value: "-31%", note: "But 60% of remaining calls are about the website", tone: "neutral" }
  ],

  charts: [
    {
      title: "Where people dropped out",
      subtitle: "Of 4,900 people who opened the service",
      unit: "people",
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

  quotes: [
    { text: "It was easy enough to book. I was booking anyway, I just used to ring up.", who: "Resident, 44, regular badminton player" },
    { text: "I looked, but every evening slot at Vale Farm was gone. I gave up.", who: "Resident, 27, tried to book football" },
    { text: "Half the people who book online do not turn up. We used to have a chat on the phone and they took it more seriously.", who: "Duty manager, Willesden Sports Centre" },
    { text: "Honestly? I did not know the council even had sports centres.", who: "Resident, 22, non-user interview" }
  ],

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

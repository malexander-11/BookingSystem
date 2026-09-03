/* ==================================================================
   DISCOVER (before build): worked example for the workshop
   ------------------------------------------------------------------
   Rendered by discover.html. Everything here is fictional.

   During the workshop the group hands in ONE thing from this stage:
   a problem statement. When the facilitator pastes it, update
   `problemStatement` below (and `problemStatement` in config/define.js).
   The rest of this file is example content and normally stays as is,
   unless the facilitator pastes more findings (stakeholders, pain
   points, assumptions) and asks for them to replace the example.
   ================================================================== */

window.DISCOVERY = {
  stage: {
    title: "Discover",
    eyebrow: "1 · Before build",
    question: "Are we solving the right problem, for whom, and is it worth it?",
    endsWith: "A problem statement that everyone involved recognises as true."
  },

  brief: {
    askedFor: "\"A new digital booking platform for our sports facilities.\"",
    whoAsked: "The Cabinet Member for Leisure, after visiting a neighbouring borough that launched a booking app.",
    whyNow: "Facility use has been flat for three years. A budget review has asked every service to show income growth or savings.",
    hopedOutcome: "More residents using the facilities. Secondary: more income, less staff time on the phone.",
    note: "The request arrived as a solution. Nobody has yet written down the problem it solves. Discovery starts by finding that out."
  },

  /* power and interest are "high" or "low". willSay is the facilitator's
     script when playing this stakeholder in the "different hats" exercise. */
  stakeholders: [
    { name: "Cabinet Member for Leisure", power: "high", interest: "high",
      wants: "A visible win before the next election. \"More residents active.\"",
      fears: "Being seen to waste money on IT.",
      involvedToday: "Proposed the platform. Will announce it.",
      willSay: "Everyone books everything on their phone now. Why can't we? The borough next door did it in six months." },
    { name: "Leisure Operations Manager", power: "high", interest: "high",
      wants: "Higher occupancy in daytime slots, fewer double bookings.",
      fears: "Losing control of the diary. Online and paper getting out of sync.",
      involvedToday: "Owns the 11 sites and their staff.",
      willSay: "Evenings are full. Daytime is empty. Booking is not the problem, the problem is nobody wants to play at 2pm on a Tuesday." },
    { name: "Finance", power: "high", interest: "low",
      wants: "Income up, or costs down, with evidence.",
      fears: "Another system with a licence fee and no benefit.",
      involvedToday: "Sign off any spend.",
      willSay: "Show me the numbers. What is a booking worth, and what does a no-show cost?" },
    { name: "Director of Communities", power: "high", interest: "low",
      wants: "No surprises. Something to report upwards.",
      fears: "A complaint in the local paper.",
      involvedToday: "Line manages the Ops Manager.",
      willSay: "If the Cabinet Member wants it, make it work. Just don't let it fall over on launch day." },
    { name: "Reception staff", power: "low", interest: "high",
      wants: "Less time on the phone repeating the same answers.",
      fears: "Being replaced. Having to help people who cannot use the website.",
      involvedToday: "Take every booking, by phone or at the desk, into a paper diary.",
      willSay: "About half the calls are 'is there anything free tonight'. The answer is usually no. Then they get cross with us." },
    { name: "Duty managers", power: "low", interest: "high",
      wants: "People turning up when they said they would.",
      fears: "No-shows on floodlit pitches that cost money whether used or not.",
      involvedToday: "Chase unpaid provisional bookings. Reconcile the diary with the till.",
      willSay: "If they've spoken to a person, they turn up. If it's just a click, will they?" },
    { name: "Residents who book regularly", power: "low", interest: "high",
      wants: "Certainty. To secure their usual slot without ringing.",
      fears: "Losing their slot to online strangers.",
      involvedToday: "Phone or walk in. Often know the staff by name.",
      willSay: "I ring on Monday for Thursday. It works. I'd use a website if it was quicker." },
    { name: "Sports clubs and coaches", power: "low", interest: "high",
      wants: "Block bookings for the season.",
      fears: "Being squeezed out by one-off online bookings.",
      involvedToday: "Email the Ops Manager once a year.",
      willSay: "Don't let the website give away our Tuesday hall." },
    { name: "Residents who do not use facilities", power: "low", interest: "low",
      wants: "Depends. Some want to play but do not know how. Many have other barriers.",
      fears: "Cost. Not knowing anyone. Not feeling it is for them.",
      involvedToday: "Not involved at all. Nobody has asked them.",
      willSay: "I didn't know the council had sports centres. And £40 for a pitch? Not on my own." },
    { name: "Public Health", power: "low", interest: "low",
      wants: "More inactive residents, especially 18 to 35, becoming active.",
      fears: "Money going to people who already play sport.",
      involvedToday: "Fund some outreach programmes. Not consulted on this.",
      willSay: "The people who need this most are not the ones phoning reception. They are the ones who have never been in the building." }
  ],

  interviewGuide: {
    opening: "Thanks for giving me twenty minutes. I am trying to understand how people find and book sport in Brent today. There are no right answers and I am not here to sell anything. I will mostly ask you to tell me about specific times things happened.",
    sections: [
      { audience: "Residents who book today", questions: [
        "Tell me about the last time you booked a court or pitch. Walk me through it from the moment you decided to play.",
        "What happened the last time it went wrong?",
        "How do you decide where and when to play?",
        "If you could change one thing about booking, what would it be, and why that?"
      ] },
      { audience: "Residents who do not use council facilities", questions: [
        "When did you last do any sport or exercise? Where was that, and how did you arrange it?",
        "Have you ever thought about using a council sports centre? What happened?",
        "If a friend asked you to play five-a-side next Tuesday, what would you need to know before saying yes?",
        "What would make it feel like somewhere for you?"
      ] },
      { audience: "Reception and duty staff", questions: [
        "Walk me through what happens when the phone rings with a booking.",
        "What do people ask most often? What do you have to say no to?",
        "What goes wrong in a typical week?",
        "What would make your shift easier?"
      ] },
      { audience: "Decision makers", questions: [
        "What outcome are you hoping to see, and by when?",
        "How will you know it has worked? What number would you look at?",
        "What would make you stop and try something else?",
        "Who else needs to be happy with this?"
      ] }
    ],
    closing: "Is there anything I should have asked and did not? Who else should I talk to?",
    tips: [
      "Ask about the last time, not what they usually do. Memories of specific events are more honest than generalisations.",
      "Do not pitch the solution. If they ask what you are building, say you are not sure yet.",
      "Leave silences. The second answer is usually the real one.",
      "Write down exact words. A quote in the problem statement carries more weight than a summary.",
      "Five people per group is enough to hear the main themes. Then go and check the numbers."
    ]
  },

  dataAnalysis: {
    summary: "Four weeks of paper diaries from four sites were typed up and counted. The picture is a capacity problem at peak times and an information problem the rest of the time.",
    stats: [
      { label: "Average occupancy of bookable hours", value: "58%", note: "Four-site diary sample, four weeks", tone: "neutral" },
      { label: "Weekday evening occupancy", value: "92%", note: "Most 'no' answers on the phone are for these slots", tone: "bad" },
      { label: "Weekday daytime occupancy", value: "30%", note: "Two thirds of the estate sits empty in the day", tone: "bad" },
      { label: "Booking calls per week", value: "~350", note: "Across 11 sites, office hours only", tone: "neutral" },
      { label: "Provisional bookings never used", value: "12%", note: "No payment taken at booking", tone: "bad" },
      { label: "Complaints in 12 months", value: "31", note: "'Turned away', 'could not get through', 'double booked'", tone: "neutral" }
    ],
    charts: [
      { title: "Occupancy by time of week", subtitle: "Share of bookable hours that were booked", unit: "%", source: "Diary sample",
        items: [
          { label: "Weekday daytime", value: 30 },
          { label: "Weekday evening", value: 92 },
          { label: "Weekend daytime", value: 65 },
          { label: "Weekend evening", value: 70 }
        ],
        note: "The problem is not one problem. Evenings need capacity or demand management. Daytime needs demand." },
      { title: "How bookings are made today", subtitle: "Share of bookings by channel", unit: "%", source: "Diary sample",
        items: [
          { label: "Phone", value: 60 },
          { label: "Walk in", value: 40 },
          { label: "Online", value: 0 }
        ],
        note: "Every booking passes through a person and a paper diary." }
    ],
    known: [
      { text: "Roughly 40% of regular bookers account for 75% of bookings.", source: "Diary sample (hand-written names, hard to match)", confidence: "Low" },
      { text: "Adults aged 18 to 35 in Brent are less active than the London average.", source: "Public Health annual report (fictional)", confidence: "High" },
      { text: "Double bookings happen about twice a month per site.", source: "Duty manager logs", confidence: "Medium" }
    ],
    unknown: [
      { text: "Why residents who do not use facilities do not use them.", howToFindOut: "10 to 15 interviews on the high street and at community centres.", effort: "2 days" },
      { text: "Whether people who are turned away go elsewhere or give up.", howToFindOut: "Ask reception to log the outcome of every 'no' for two weeks.", effort: "Small" },
      { text: "What a no-show actually costs.", howToFindOut: "Finance to cost a floodlit hour and a staffed hall hour.", effort: "Half a day" },
      { text: "Whether the neighbouring borough's app increased use or just moved bookings online.", howToFindOut: "Ask them for their evaluation.", effort: "An email" }
    ]
  },

  asIsProcess: {
    lanes: ["Resident", "Reception", "Duty manager"],
    steps: [
      { lane: "Resident", text: "Wants to play; phones in office hours or walks in", painPoint: "Cannot see availability without asking. Evening callers usually hear 'no'." },
      { lane: "Reception", text: "Checks the paper diary for that site", painPoint: "Each site has its own diary. Cannot see other sites." },
      { lane: "Reception", text: "Slot free? If not, offers another time or turns them away", painPoint: "Nobody records what happens to the people turned away." },
      { lane: "Reception", text: "Writes name and phone number in the diary as a provisional hold", painPoint: "No payment taken, so about 12% of holds are never used." },
      { lane: "Resident", text: "Turns up and pays at the desk", painPoint: "Queues at 6pm. Card machine at only 7 of 11 sites." },
      { lane: "Duty manager", text: "Reconciles diary and till at close", painPoint: "Errors found weekly. Double bookings about twice a month per site." }
    ]
  },

  assumptions: [
    { assumption: "People are not using facilities because booking is hard.", ifWrong: "We build a booking tool and use does not change.", howToTest: "Interviews with non-users; check whether the neighbouring borough's use actually rose.", status: "Untested" },
    { assumption: "Residents aged 18 to 35 would book online if they could.", ifWrong: "Wrong target group; existing users benefit instead.", howToTest: "Ask that group directly.", status: "Untested" },
    { assumption: "Online booking reduces reception workload.", ifWrong: "Staff time moves to helping people with the website.", howToTest: "Measure call reasons before and after.", status: "Untested" },
    { assumption: "Online booking will not increase no-shows.", ifWrong: "Empty floodlit pitches cost money and block other users.", howToTest: "Compare no-show rates by channel in a pilot.", status: "Untested" },
    { assumption: "Daytime slots are empty because people cannot find them.", ifWrong: "They are empty because people are at work. A booking tool cannot fix that.", howToTest: "Look at who books daytime now.", status: "Partly tested: daytime bookers are mostly retired or shift workers" }
  ],

  /* The hand-in. Keep the five parts; the page shows them labelled. */
  problemStatement: {
    who: "Brent residents who want to play sport casually",
    needsTo: "find a free slot and secure it with confidence",
    because: "they will only play if it is easy and predictable",
    today: "phone during office hours or turn up and hope",
    resultsIn: "residents being turned away from full evening slots while daytime slots sit at 30% occupancy, flat facility use, lost income from no-shows, and around 40 staff hours a week spent on the phone and the diary",
    note: "Notice what this does not say. It does not say 'residents need an app'. It also does not yet explain why people who never book are not booking. That gap matters for the Cabinet Member's outcome, and it is the first thing Define has to face."
  }
};

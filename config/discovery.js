/* ==================================================================
   DISCOVER (before build): content for the interactive Discover page
   ------------------------------------------------------------------
   Rendered by discover.html. Everything here is fictional.

   Participants see: the brief (with blanks), stakeholder chips to place
   on the power/interest grid, the interview guide, two interviews to
   run (CFO and reception staff) with note boxes, the data and a
   true/false quiz, the as-is process to annotate with pain points, the
   assumptions (plus a blank row), and a guided problem statement.

   Facilitator view (open any page with ?facilitator=1) also shows the
   example answers, the intended stakeholder placement, the full
   stakeholder cards and the interview scripts.

   The group hands in ONE thing from this stage: the problem statement
   (with agreement, size of the prize and watch-outs). When the
   facilitator pastes it, update `problemStatement` below and
   `problemStatement` in config/define.js.
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
    /* Example answers, shown to the facilitator only. Participants fill these in. */
    whoAsked: "The Cabinet Member for Leisure, after visiting a neighbouring borough that launched a booking app.",
    whyNow: "Facility use has been flat for three years. A budget review has asked every service to show income growth or savings.",
    hopedOutcome: "More residents using the facilities. Secondary: more income, less staff time on the phone.",
    note: "The request arrived as a solution. Nobody has yet written down the problem it solves. Discovery starts by finding that out.",
    hints: {
      whoAsked: "Who wants this, and what is their position? Who else is behind them?",
      whyNow: "What has changed? A budget, a complaint, an election, a neighbour's app?",
      hopedOutcome: "If this works, what will be different in a year? Say it as an outcome, not a feature."
    }
  },

  /* power and interest are the intended placement ("high" or "low"), shown to the
     facilitator only. role is the one line participants see on the chip. willSay is
     the facilitator's script when playing this stakeholder. */
  stakeholders: [
    { name: "Cabinet Member for Leisure", role: "Elected politician who proposed the platform", power: "high", interest: "high",
      wants: "A visible win before the next election. \"More residents active.\"",
      fears: "Being seen to waste money on IT.",
      involvedToday: "Proposed the platform. Will announce it.",
      willSay: "Everyone books everything on their phone now. Why can't we? The borough next door did it in six months." },
    { name: "Leisure Operations Manager", role: "Runs the 11 sites and their staff", power: "high", interest: "high",
      wants: "Higher occupancy in daytime slots, fewer double bookings.",
      fears: "Losing control of the diary. Online and paper getting out of sync.",
      involvedToday: "Owns the 11 sites and their staff.",
      willSay: "Evenings are full. Daytime is empty. Booking is not the problem, the problem is nobody wants to play at 2pm on a Tuesday." },
    { name: "Chief Finance Officer (CFO)", role: "Signs off any spend; owns the savings target", power: "high", interest: "low",
      wants: "Leisure costs down. Income up if possible, but savings first.",
      fears: "Another system with a licence fee and no benefit. Missing the savings target.",
      involvedToday: "Signs off any spend. Has asked every service for savings.",
      willSay: "Show me the numbers. What is a booking worth, what does a no-show cost, and how many staff hours does this remove?" },
    { name: "Director of Communities", role: "Senior officer the Ops Manager reports to", power: "high", interest: "low",
      wants: "No surprises. Something to report upwards.",
      fears: "A complaint in the local paper.",
      involvedToday: "Line manages the Ops Manager.",
      willSay: "If the Cabinet Member wants it, make it work. Just don't let it fall over on launch day." },
    { name: "Reception staff", role: "Take every booking, by phone or at the desk", power: "low", interest: "high",
      wants: "Less time on the phone repeating the same answers. To keep helping the people who need help.",
      fears: "Being replaced. Older residents being left behind by a website.",
      involvedToday: "Take every booking, by phone or at the desk, into a paper diary.",
      willSay: "About half the calls are 'is there anything free tonight'. The answer is usually no. Then they get cross with us." },
    { name: "Duty managers", role: "Run the buildings shift by shift", power: "low", interest: "high",
      wants: "People turning up when they said they would.",
      fears: "No-shows on floodlit pitches that cost money whether used or not.",
      involvedToday: "Chase unpaid provisional bookings. Reconcile the diary with the till.",
      willSay: "If they've spoken to a person, they turn up. If it's just a click, will they?" },
    { name: "Residents who book regularly", role: "Already book weekly, mostly by phone", power: "low", interest: "high",
      wants: "Certainty. To secure their usual slot without ringing.",
      fears: "Losing their slot to online strangers.",
      involvedToday: "Phone or walk in. Often know the staff by name.",
      willSay: "I ring on Monday for Thursday. It works. I'd use a website if it was quicker." },
    { name: "Sports clubs and coaches", role: "Block-book halls and pitches for the season", power: "low", interest: "high",
      wants: "Block bookings for the season.",
      fears: "Being squeezed out by one-off online bookings.",
      involvedToday: "Email the Ops Manager once a year.",
      willSay: "Don't let the website give away our Tuesday hall." },
    { name: "Residents who do not use facilities", role: "Most of the borough; nobody has asked them", power: "low", interest: "low",
      wants: "Depends. Some want to play but do not know how. Many have other barriers.",
      fears: "Cost. Not knowing anyone. Not feeling it is for them.",
      involvedToday: "Not involved at all. Nobody has asked them.",
      willSay: "I didn't know the council had sports centres. And £40 for a pitch? Not on my own." },
    { name: "Public Health", role: "Funds outreach; worried about inactive residents", power: "low", interest: "low",
      wants: "More inactive residents, especially the over-50s, becoming active.",
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
      { audience: "Decision makers and budget holders", questions: [
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

  /* The two interviews the group runs. The facilitator plays each role.
     `script` is facilitator-only. */
  interviews: [
    {
      id: "cfo",
      who: "Chief Finance Officer",
      role: "Signs off any spend. Owns the council's savings target.",
      brief: "You have ten minutes with the CFO. You know that every service has been asked to find savings this year, that leisure runs at a loss, and that the CFO has not yet been asked to fund the booking platform. You do not yet know what the CFO thinks the platform is for.",
      script: {
        stance: "Leisure costs down. The CFO is polite, numerate and impatient. Every answer comes back to cost per hour, staff hours and the savings target. The CFO will support the platform only if it removes cost, and will hint at consolidating sites and cutting staffed hours.",
        answers: [
          { ifAsked: "What outcome do you want?", say: "Leisure costs the council about £3 million a year net. I need that number down. If a website means fewer people on reception desks, good. If it means more bookings at £11 a court, that barely moves it." },
          { ifAsked: "How will you know it worked?", say: "Staff hours on bookings, down. Cost per booked hour, down. If occupancy goes up in the daytime without adding staff, that's a result. I don't care about clicks." },
          { ifAsked: "What about no-shows?", say: "A no-show on a floodlit pitch costs about £40 and we don't collect a penny. Take payment at booking and the problem goes away. Better still, charge more at peak." },
          { ifAsked: "What about people who don't use a website?", say: "They can still ring. But I am not paying for eleven reception desks so that a few people can phone in. Three hubs and self-service everywhere else would be my starting point." },
          { ifAsked: "What would make you stop?", say: "A licence fee with no savings line against it. Or a launch that generates complaints and costs me a press officer's week." },
          { ifAsked: "Who else needs to be happy?", say: "The Cabinet Member wants a headline. I want a saving. Those aren't the same thing, and you'll have to square them." }
        ],
        pushBack: "If the group talks about inclusion or reaching non-users, the CFO says: \"That's Public Health's budget, not mine. Show me how it pays for itself.\"",
        tension: "Note for the wash-up: the CFO's two needs (revenue up, costs down) pull against the three inclusion needs the group will hear from reception, Public Health (over-50s) and the Cabinet Member (active children). The problem statement has to hold both or admit there is no agreement yet."
      }
    },
    {
      id: "reception",
      who: "Reception staff",
      role: "Take every booking, by phone or at the desk, into a paper diary.",
      brief: "You have ten minutes with two receptionists from Willesden Sports Centre. You know they take around 350 booking calls a week across the borough and that complaints mention 'could not get through'. You do not yet know who those calls come from or what the staff think a website would change.",
      script: {
        stance: "More inclusion. The staff are warm, practical and a little defensive. They know the regulars by name, they spend real time helping older residents and people whose first language is not English, and they suspect a website is a way of cutting their jobs. They want the phones to be quieter, not gone.",
        answers: [
          { ifAsked: "Walk me through a booking call.", say: "Phone rings, usually between five and seven. 'Anything free tonight?' I check the book, usually say no, offer Thursday daytime, they say no thanks. Two minutes each, forty times a shift. The ones who do book, I write name and number in the diary and they pay when they come in." },
          { ifAsked: "Who calls?", say: "Half are regulars who could book a month ahead if we let them. The rest are people trying their luck. And then there's Mrs Okafor and the Tuesday walking football lot, who ring because they like to, and honestly they need us to. They're not going on a website." },
          { ifAsked: "What goes wrong?", say: "Double bookings when the night staff don't write it up. People turning up for a pitch that's already taken. Card machine's broken at Bridge Park again, so it's cash and arguments." },
          { ifAsked: "What would make your shift easier?", say: "If people could see the book themselves, they'd stop ringing to hear no. But I'd want to keep the phone for the ones who need it. And if we charge more at peak, the kids' teams from the estate stop coming. We've seen that before." },
          { ifAsked: "What do you think the website is for?", say: "Honestly? Fewer of us. That's what everyone on the desk thinks." },
          { ifAsked: "Who isn't coming in at all?", say: "Anyone who's never been in the building. The over-50s who aren't in a club. Young lads who play in the park because it's free. A website doesn't fix that, a person at the door does." }
        ],
        pushBack: "If the group suggests self-service kiosks or fewer staffed hours, the staff say: \"Then who helps Mrs Okafor?\" and go quiet.",
        tension: "Note for the wash-up: reception wants inclusion and job security; the CFO wants cost out. Public Health (over-50s) and the Cabinet Member (active children) are on reception's side of the inclusion argument but for different reasons. Does the group's problem statement name this, or paper over it?"
      }
    }
  ],

  dataAnalysis: {
    summary: "Four weeks of paper diaries from four sites were typed up and counted. Read the data first, then take the quiz.",
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
        note: "Every booking passes through a person and a paper diary." },
      { title: "Who books daytime slots", subtitle: "Share of weekday daytime bookings", unit: "%", source: "Diary sample, names matched by hand",
        items: [
          { label: "Retired residents and clubs", value: 61 },
          { label: "Shift workers", value: 22 },
          { label: "Parents with pre-school children", value: 11 },
          { label: "Other", value: 6 }
        ],
        note: "Daytime demand comes from people who are not at work in the day." }
    ],
    known: [
      { text: "Roughly 40% of regular bookers account for 75% of bookings.", source: "Diary sample (hand-written names, hard to match)", confidence: "Low" },
      { text: "Adults aged 18 to 35 in Brent are less active than the London average. So are the over-50s.", source: "Public Health annual report (fictional)", confidence: "High" },
      { text: "Double bookings happen about twice a month per site.", source: "Duty manager logs", confidence: "Medium" },
      { text: "Reception spends about 40 hours a week across the borough on booking calls.", source: "Estimate from call counts", confidence: "Medium" }
    ],
    unknown: [
      { text: "Why residents who do not use facilities do not use them.", howToFindOut: "10 to 15 interviews on the high street and at community centres.", effort: "2 days" },
      { text: "Whether people who are turned away go elsewhere or give up.", howToFindOut: "Ask reception to log the outcome of every 'no' for two weeks.", effort: "Small" },
      { text: "What a no-show actually costs.", howToFindOut: "Finance to cost a floodlit hour and a staffed hall hour.", effort: "Half a day" },
      { text: "Whether the neighbouring borough's app increased use or just moved bookings online.", howToFindOut: "Ask them for their evaluation.", effort: "An email" }
    ]
  },

  /* True or false, answered after reading the data above. */
  quiz: [
    { statement: "Most bookings are already made online.", answer: false, why: "None are. Every booking goes through the phone or the desk into a paper diary." },
    { statement: "Weekday evenings are nearly full.", answer: true, why: "92% occupancy. Most of the 'no' answers on the phone are for these slots." },
    { statement: "About one in eight provisional bookings is never used.", answer: true, why: "12% of holds are never used, because nothing is paid at booking." },
    { statement: "Daytime slots are empty because people cannot find out about them.", answer: false, why: "The data does not say why they are empty. Who books daytime now suggests it is people who are not at work. A booking tool does not change that." },
    { statement: "We know why residents who do not use the facilities stay away.", answer: false, why: "Nobody has asked them. It is the biggest gap in the evidence." },
    { statement: "Making booking easier will increase overall facility use.", answer: false, why: "That is the Cabinet Member's assumption, not a finding. The data shows a capacity problem at peak and a demand problem off-peak. It cannot tell us what easier booking would do." },
    { statement: "Reception time on booking calls is roughly one full-time post.", answer: true, why: "About 40 hours a week across the borough. Two minutes a call, 350 calls, plus the diary." }
  ],

  /* Participants annotate this with pain points. The painPoint fields here are
     what staff reported, shown to the facilitator only. */
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

  /* Hint text under each part of the guided problem statement. */
  problemStatementHints: {
    shared: "One paragraph everyone in the room would sign. Say who, what they need, why it matters to them, what happens today, and what that costs. No solutions.",
    agreement: "Who agrees this is the problem? Who does not? The CFO and reception want different things: is that in your statement, or hidden? What is still contested?",
    sizeOfPrize: "What do the numbers say it is worth? Use occupancy, no-shows, staff hours, income and complaints. Be honest about what is an estimate.",
    watchOuts: "Who could lose out if we solve this the obvious way? Think about non-digital users, clubs, staff, no-shows, and the non-users the data cannot see."
  },

  /* The hand-in. Example values are shown to the facilitator only until the
     group's own statement replaces them. */
  problemStatement: {
    who: "Brent residents who want to play sport casually",
    needsTo: "find a free slot and secure it with confidence",
    because: "they will only play if it is easy and predictable",
    today: "phone during office hours or turn up and hope",
    resultsIn: "residents being turned away from full evening slots while daytime slots sit at 30% occupancy, flat facility use, lost income from no-shows, and around 40 staff hours a week spent on the phone and the diary",
    agreement: "The Ops Manager and reception agree the phone-and-diary process wastes time. The CFO agrees only if the fix removes cost; reception and Public Health want the fix to reach people who never come in. There is no agreement yet on whether the goal is savings or inclusion, and the Cabinet Member wants both.",
    sizeOfPrize: "Roughly 40 staff hours a week on booking calls; 12% of holds never used, at about £40 per empty floodlit hour; daytime occupancy at 30% across 11 sites; 31 complaints a year. Income from casual bookings is small, so the prize is mostly staff time, wasted capacity and reputation.",
    watchOuts: "Older and non-English-speaking residents who rely on the phone; clubs losing block bookings to one-off online users; no-shows rising if nobody pays at booking; staff morale if the platform is seen as job cuts; and the risk that the platform serves existing users while the non-users it was meant to reach never hear of it.",
    note: "Notice what this does not say. It does not say 'residents need an app'. It also does not yet explain why people who never book are not booking. That gap matters for the Cabinet Member's outcome, and it is the first thing Define has to face."
  }
};

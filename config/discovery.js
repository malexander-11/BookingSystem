/* ==================================================================
   DISCOVER (before build): content for the interactive Discover page
   ------------------------------------------------------------------
   Rendered by discover.html. Everything here is fictional.

   Participants see: the brief, stakeholder chips to place on the
   power/interest grid, the interview guide, what PM and UX colleagues
   have already heard, two interviews to run (CFO and reception staff)
   with note boxes, the data and a true/false quiz, the as-is process to
   annotate with pain points, the assumptions (plus a blank row), and a
   guided problem statement.

   Facilitator view (open any page with ?facilitator=1) also shows the
   intended stakeholder placement, the full stakeholder cards, the
   competing-demands note, the interview scripts, the staff-reported
   pain points and the example problem statement.

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
    why: "Before anything is built we need to understand why this should happen and what people want to achieve."
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

  /* Two side-by-side guides, shown before the interviews. */
  interviewGuide: {
    stakeholders: {
      title: "Tips for interviewing stakeholders",
      intro: "Senior people, budget holders and service managers. They may arrive with a solution and an outcome they are accountable for. Try to uncover their problems and what they want solving, rather than starting with any solution.",
      tips: [
        "Start with what they want solved, not what they want built. \"What outcome do you want to get at, and by when?\"",
        "Ask what would make them stop or change course. It reveals the real constraint faster than asking what they want.",
        "Ask who else needs to be happy, and who will object. Tension between stakeholders is a finding, not a problem to smooth over.",
        "Separate any solution they arrive with from the problem underneath it: \"If the platform did not exist, what would still be true?\"",
        "Play back what you heard in their words and check it. Senior people correct you quickly, and the correction is the useful bit.",
        "Write down any number they mention. They are usually important for a reason."
      ],
      questions: [
        "What outcome do you want to get at, and by when?",
        "How will you know it has worked? What number would you look at?",
        "What would make you stop and try something else?",
        "Who else needs to be happy with this, and who will push back?"
      ]
    },
    users: {
      title: "Tips for interviewing users",
      intro: "Residents who book, residents who never come in, and the staff who run the process every day. They tend not to think in outcomes. They are more likely to remember what happened last time.",
      tips: [
        "Try asking about the last time rather than what they usually do. Memories of specific events tend to be more honest than generalisations.",
        "Walk through it step by step where you can. \"What happened next?\" often gets further than \"why?\"",
        "Try not to pitch a solution. If they ask what you are building, it is fine to say you are not sure yet.",
        "Leave a silence where it feels natural. The second answer is often the real one.",
        "Where you can, write down exact words. A quote in the problem statement tends to carry more weight than a summary.",
        "If possible, talk to people who do not use the service as well as those who do. Around five per group is usually enough to hear the main themes."
      ],
      questions: [
        "Tell me about the last time you booked a court or pitch. Walk me through it from the moment you decided to play.",
        "What happened the last time it went wrong?",
        "If a friend asked you to play five-a-side next Tuesday, what would you need to know before saying yes?",
        "Walk me through what happens when the phone rings with a booking. What goes wrong in a typical week?"
      ]
    }
  },
  /* Interviews already done by the PM and UX colleagues. Shown before the
     group's own interviews so the competing demands are visible early. */
  colleagueInterviews: [
    { who: "Chief Digital and Information Officer (CDIO)", role: "Runs digital and IT for the council", by: "PM",
      notes: "\"This is the perfect showcase. Self-service is how we take cost out of every service, and leisure is the easiest place to prove it. If residents book themselves, we need fewer people answering phones. I want it live in a quarter and I want the numbers on a slide.\"",
      learnt: "The CDIO sees the platform as a cost-reduction showcase for the whole council, not a leisure project. Success for the CDIO is fewer staff hours and a story to tell." },
    { who: "Cabinet Member for Leisure", role: "Elected politician who proposed the platform", by: "PM",
      notes: "\"The borough next door did it in six months. I want more residents active, especially kids who are sat at home. And I want something I can announce.\"",
      learnt: "Wants a visible headline and more active residents, especially children. Has not said how a booking tool reaches children who are not already playing." },
    { who: "Public Health lead", role: "Funds outreach; worried about inactive residents", by: "UX",
      notes: "\"Our inactive residents are mostly over 50 and mostly not online for this kind of thing. The people who need this most have never been in the building. A booking website helps the people who already come.\"",
      learnt: "Wants inclusion for the over-50s and non-users. Doubts a digital channel reaches them at all. This pulls against the CDIO's self-service goal." },
    { who: "Leisure Operations Manager", role: "Runs the 11 sites", by: "UX",
      notes: "\"Evenings are full, daytime is empty. Booking is not what stops people. Make it easy to see what's free and you'll get fewer angry phone calls, but you won't fill Tuesday at 2pm.\"",
      learnt: "Sees a capacity problem at peak and a demand problem off-peak. Expects a booking tool to reduce friction, not increase use." },
    { who: "Resident who does not use council facilities", role: "Aged 24, works shifts, plays football in the park", by: "UX",
      notes: "\"I didn't know the council had pitches. Where are they? Forty quid for an hour? I'd need five mates and a car. We just go to the park.\"",
      learnt: "Awareness, price and company are the barriers, not booking. Nothing in the brief addresses any of them." },
    { who: "Sports club secretary", role: "Runs a Tuesday-night league at Bridge Park", by: "PM",
      notes: "\"We've had the hall on Tuesdays for nine years. If a website lets anyone grab it, we lose the league and forty people stop playing. Don't break what works.\"",
      learnt: "Existing organised users fear losing block bookings. An inclusive-sounding change could exclude the people already active." }
  ],
  colleagueTension: "The CDIO and the CFO want cost out and see self-service as the proof. The Cabinet Member wants a headline and active children. Public Health and reception want inclusion for people who are not online. The Ops Manager thinks booking is not the problem at all. The club wants nothing to change. A problem statement that only one of these would sign is not shared.",

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
    summary: "Four weeks of paper diaries from four of the 11 sites, typed up and counted by an apprentice in a week. Two weeks of the Bridge Park diary are missing, walk-ins were not always written down, and no-shows were only logged at two sites. Treat every number here as an estimate.",
    gaps: [
      "Four sites out of 11. The other seven have never been counted. Nobody knows whether they look the same.",
      "Two of the four weeks are missing for Bridge Park: the diary was in the duty manager's car.",
      "Walk-in bookings are written up when reception has time. On busy evenings they often are not, so the walk-in share is a guess.",
      "No-shows were logged at Willesden and Vale Farm only, and only when someone remembered.",
      "Names are hand-written, so 'regular booker' was worked out by matching handwriting. The apprentice reckons it is right to within about ten points either way.",
      "The complaints register only counts people who filled in the form. Reception say most people just shout."
    ],
    stats: [
      { label: "Average occupancy of bookable hours", value: "55 to 62%", note: "Four-site sample, four weeks, one diary incomplete", tone: "neutral" },
      { label: "Weekday evening occupancy", value: "About 90%", note: "5pm to 10pm; walk-ins under-recorded so possibly higher", tone: "neutral" },
      { label: "Weekday daytime occupancy", value: "25 to 35%", note: "9am to 5pm, same sample", tone: "neutral" },
      { label: "Booking calls per week", value: "300 to 400", note: "Reception's estimate; nobody counts calls", tone: "neutral" },
      { label: "Provisional bookings never used", value: "Roughly 1 in 8", note: "Logged at two sites only, when someone remembered", tone: "neutral" },
      { label: "Complaints in 12 months", value: "31 on the register", note: "Plus an unknown number made in person or by phone", tone: "neutral" }
    ],
    charts: [
      { title: "Occupancy by time of week", subtitle: "Share of bookable hours that were booked, four of 11 sites", unit: "%", source: "Diary sample; Bridge Park two weeks missing",
        items: [
          { label: "Weekday daytime", value: 30 },
          { label: "Weekday evening", value: 92 },
          { label: "Weekend daytime", value: 65 },
          { label: "Weekend evening", value: 70 }
        ] },
      { title: "How bookings are made today", subtitle: "Share of recorded bookings by channel", unit: "%", source: "Diary sample; walk-ins under-recorded",
        items: [
          { label: "Phone", value: 60 },
          { label: "Walk in (recorded)", value: 40 },
          { label: "Online", value: 0 }
        ] },
      { title: "Who books daytime slots", subtitle: "Share of weekday daytime bookings, best guess", unit: "%", source: "Handwriting matched by hand; about ten points either way",
        items: [
          { label: "Retired residents and clubs", value: 61 },
          { label: "Shift workers", value: 22 },
          { label: "Parents with pre-school children", value: 11 },
          { label: "Other or unreadable", value: 6 }
        ] },
      { title: "Who makes the bookings", subtitle: "Share of recorded bookings in the sample", unit: "%", source: "Handwriting matched by hand",
        items: [
          { label: "Regular bookers (about 40% of people)", value: 75 },
          { label: "Everyone else", value: 25 }
        ] }
    ]
  },

  /* True or false, answered after reading the data above. */
  quiz: [
    { statement: "Evenings are busier than daytime at every one of Brent's 11 sites.", answer: false, why: "Only four sites were counted, and one of those has two weeks missing. The pattern holds in the sample. Nobody has looked at the other seven." },
    { statement: "Weekday evenings are nearly full at the sites that were counted, and may be fuller than the diary shows.", answer: true, why: "About 90% in the sample, and walk-ins are under-recorded on busy evenings, so the true figure is probably higher, not lower." },
    { statement: "Because 60% of recorded bookings are made by phone, most residents prefer to phone.", answer: false, why: "The diary only contains people who booked. Walk-ins are under-recorded, and the people who rang, heard 'no' and gave up are not in the data at all. It cannot tell us what residents prefer." },
    { statement: "Regular bookers make three quarters of the bookings, so the booking process works well for them.", answer: false, why: "Frequency is not satisfaction. They may simply have learnt to ring on Monday for Thursday. The complaints register and the interviews say otherwise." },
    { statement: "This data cannot tell us whether easier online booking would increase overall use.", answer: true, why: "It describes capacity and demand as they are today. There is no before-and-after, and nobody who does not book has been asked why. That is the Cabinet Member's assumption, not a finding." }
  ],

  /* Participants annotate this with pain points. The painPoint fields here are
     what staff reported, shown to the facilitator only. */
  asIsProcess: {
    lanes: ["Resident", "Reception", "Duty manager"],
    steps: [
      { lane: "Resident", text: "Wants to play; phones in office hours or walks in", painPoint: "Cannot see availability without asking. Evening callers usually hear 'no'." },
      { lane: "Reception", text: "Checks the paper diary for that site", prefilled: true, painPoint: "Each site has its own diary. Cannot see other sites." },
      { lane: "Reception", text: "Slot free? If not, offers another time or turns them away", prefilled: true, painPoint: "Nobody records what happens to the people turned away." },
      { lane: "Reception", text: "Writes name and phone number in the diary as a provisional hold", painPoint: "No payment taken, so about 12% of holds are never used." },
      { lane: "Resident", text: "Turns up and pays at the desk", prefilled: true, painPoint: "Queues at 6pm. Card machine at only 7 of 11 sites." },
      { lane: "Duty manager", text: "Reconciles diary and till at close", painPoint: "Errors found weekly. Double bookings about twice a month per site." }
    ]
  },

  /* Risky assumptions: the plan only works if these are true, nobody has checked
     them, and being wrong would hurt. The group ranks them riskiest first. */
  assumptions: [
    { assumption: "People are not using facilities because booking is hard.", ifWrong: "We build a booking tool and use does not change.", cheapestTest: "Ask ten non-users on the high street why they do not come. Half a day, no budget." },
    { assumption: "Residents aged 18 to 35 would book online if they could.", ifWrong: "Wrong target group; existing users benefit instead.", cheapestTest: "Put a 'register your interest' link on the council website for two weeks and count who clicks." },
    { assumption: "Online booking reduces reception workload.", ifWrong: "Staff time moves to helping people with the website instead of disappearing.", cheapestTest: "Tally call reasons at one reception desk for a week, before anything is built." },
    { assumption: "Online booking will not increase no-shows.", ifWrong: "Empty floodlit pitches cost money and block other users.", cheapestTest: "Take bookings by email at one site for two weeks and compare no-shows with phone bookings." },
    { assumption: "Daytime slots are empty because people cannot find them.", ifWrong: "They are empty because people are at work. A booking tool cannot fix that.", cheapestTest: "Look at who books daytime now. The diary sample already half answers this." }
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
  /* The group's problem statement (Discover hand-in). */
  problemStatement: {
    who: "All residents who want to play sport",
    needsTo: "be able to easily access and book sports pitches",
    because: "they need to stay healthy, fit and included, while ensuring Brent Council is sustainable",
    today: "often don't book and stay unfit",
    resultsIn: "public health costs and unbooked pitches leading to revenue shortfalls",
    agreement: "The CFO has a more laser-focused view. Reception would worry about her job; perhaps we make it clear that residents can still ring up.",
    sizeOfPrize: "Reduced cost, increased revenue.",
    watchOuts: "Reception may also do other tasks, like unlocking gates or being the first-aider on hand.",
    note: "What this leaves open: it names all residents, so it does not yet say who the MVP is for first. It says residents often don't book without saying why, and the data cannot answer that. The size of the prize has no numbers against it, although occupancy, no-shows and staff hours are known. And 'included' is in the because line, but neither the prize nor the watch-outs mention the people who never come in."
  }
};

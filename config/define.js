/* ==================================================================
   DEFINE (during build): content for the interactive Define page
   ------------------------------------------------------------------
   Rendered by define.html. Everything here is fictional and matches
   the seed booking site in config/mvp.js.

   Participants see: the problem statement, the three user groups (as
   defined by the UX colleague), five business needs to prioritise, a
   blank theory of change, the UX colleague's to-be process and the
   PM's story map (each with a feedback box), the example success
   measures (with space to add their own, name and source only), and a
   "copy what we've written" box that compiles the hand-in.

   Facilitator view (?facilitator=1) also shows the tension note and
   the example theory of change.

   When the facilitator pastes the Define hand-in, replace the matching
   sections here AND update config/mvp.js (the booking site) and
   `setOutToDo` in config/evidence.js. See CLAUDE.md for the mapping.
   ================================================================== */

window.DEFINE = {
  stage: {
    title: "Define",
    eyebrow: "2 · During build",
    question: "What are we building, for whom, and how will we know it works?",
    endsWith: [
      "A set of users",
      "User stories, each with acceptance criteria",
      "A new (to-be) process flow",
      "A hypothesis for change",
      "Success measures"
    ]
  },

  /* The group's problem statement, carried over from Discover. */
  problemStatement:
    "Residents need to book seamlessly and easily, because they need to play more sport. Today they don't play sport, which results in lack of inclusion, lack of health, and lower revenues for the council.",

  /* The user groups, as defined by the UX colleague. The group ranks them on
     the Define page; the order here is only the starting order. */
  userGroups: [
    { name: "Regular bookers", primary: true,
      who: "Residents who already book by phone or at the desk, often weekly. Many are in clubs or informal groups. Skew older.",
      today: "Ring on Monday for Thursday, or walk in. Know the staff by name.",
      needs: ["Keep their usual slot", "Not be forced online", "A quicker way to book if one exists"] },
    { name: "Reception staff", primary: false,
      who: "The people who take bookings, answer the phone and run the buildings, alongside unlocking gates and first aid.",
      today: "Paper diary per site, reconciled with the till nightly. About 350 booking calls a week across the borough.",
      needs: ["One record of bookings", "Fewer 'is anything free tonight' calls", "People who booked actually turning up", "To keep helping the residents who need to phone"] },
    { name: "Other residents", primary: false,
      who: "Residents who do not currently use council sports facilities: casual players, families with children, the over-50s, people who have never been in the building.",
      today: "Play in the park, use a commercial venue, or do not play at all. Have never phoned a leisure centre.",
      needs: ["Find out what exists, where it is and what it costs", "See what is free without having to ask anyone", "Feel that the facilities are for people like them"] }
  ],

  userNeeds: [
    { as: "resident who wants to play sport casually", need: "to see what is free and book it quickly", soThat: "I do not have to phone the centre or turn up and be turned away" },
    { as: "resident", need: "a booking reference straight away", soThat: "I know it worked and can show it at reception" },
    { as: "resident", need: "to cancel my own booking", soThat: "I do not block a slot I cannot use" },
    { as: "regular booker", need: "the phone line to keep working", soThat: "I am not forced to change how I book" },
    { as: "reception staff member", need: "to book and amend phone and walk-in bookings in the same system", soThat: "every booking is in one place" }
  ],

  /* The five business needs the group ranks. Order here is the group's order (Define hand-in). */
  businessPriorities: [
    { need: "Decreased costs", owner: "CFO" },
    { need: "Increased revenue", owner: "CFO, Cabinet Member" },
    { need: "More inclusion for the community", owner: "Reception staff, Public Health" },
    { need: "Healthier children", owner: "Cabinet Member, Public Health" },
    { need: "Support public health for the over-50s", owner: "Public Health" }
  ],
  businessTension:
    "Two of these are the CFO's (revenue up, costs down) and three are inclusion needs from reception, Public Health and the Cabinet Member. Whatever order the group picks, someone in the room loses. The point is to make the trade-off explicit and say who will disagree, not to find an order everyone likes. A booking platform on its own mainly serves cost reduction; inclusion needs pricing, outreach or staffed help, which cost money.",

  /* The group's priority order, with their reasoning and who disagrees. */
  businessNeeds: [
    { need: "Decreased costs", owner: "CFO, CDIO", why: "Ranked first by the group: the platform is funded as a cost-reduction showcase, and the theory of change leads with costs." },
    { need: "Increased revenue", owner: "CFO, Cabinet Member", why: "Ranked second: fewer empty slots and online payment both put money back into the budget." },
    { need: "More inclusion for the community", owner: "Reception staff, Public Health", why: "Ranked third: wanted, but the group expects it to follow from an easier service rather than drive the build." },
    { need: "Healthier children", owner: "Cabinet Member, Public Health", why: "Ranked fourth. The group's words: if Public Health funded this, they would have their priorities top. This is where Public Health will disagree." },
    { need: "Support public health for the over-50s", owner: "Public Health", why: "Ranked fifth. Same reasoning: whoever pays sets the order, and Public Health is not paying. Public Health and the Cabinet Member will push back on this order hardest." }
  ],

  /* The group's theory of change (Define hand-in). */
  theoryOfChange: {
    ifWe: "Implement a booking platform online.",
    then: "More people book pitches and fewer people phone in. Some of these people will be children or older people.",
    because: "It is more seamless and they don't need to phone up anymore.",
    leadingTo: "Costs will decrease and revenues will increase."
  },
  hypothesis:
    "If we implement an online booking platform, more people will book pitches and fewer will phone in, because it is more seamless, leading to lower costs and higher revenue.",
  theoryOfChangeHints: {
    ifWe: "What will we build or change? Be concrete.",
    then: "What will people do differently? Who?",
    because: "Why do we believe that? This is the assumption evaluation will test.",
    leadingTo: "What outcome does the council actually want from that behaviour?"
  },

  toBeProcess: {
    lanes: ["Resident", "Booking service", "Reception"],
    steps: [
      { lane: "Resident", text: "Checks what is free before travelling, instead of walking in on the off-chance" },
      { lane: "Resident", text: "Chooses a facility, date and time" },
      { lane: "Resident", text: "Enters name, email, postcode and age group" },
      { lane: "Booking service", text: "Takes card payment and confirms with a reference; details stored securely" },
      { lane: "Booking service", text: "Offers to repeat the slot weekly, fortnightly or monthly until an end date" },
      { lane: "Booking service", text: "Asks the resident to confirm 24 hours before; releases unconfirmed slots" },
      { lane: "Reception", text: "Books and amends phone and walk-in bookings in the same system; payment logged against the booking" },
      { lane: "Booking service", text: "Reports bookings, no-shows and income to a dashboard; flags repeat no-shows" }
    ]
  },

  /* Story map: activities along the top (the to-be process), stories
     beneath. release is "mvp" (above the line) or "later". */
  storyMap: {
    activities: [
      { name: "Choose a facility", stories: [
        { id: "S1", title: "See the facilities I can book", release: "mvp",
          as: "resident", need: "to see which facilities are bookable, where they are and what they cost", soThat: "I can pick one that suits me",
          acceptanceCriteria: [
            { given: "a resident who has not logged in", when: "they open the service", then: "they see every bookable facility with its site, activity and price" }
          ] },
        { id: "S2", title: "Filter by activity near me", release: "later",
          as: "resident", need: "to filter facilities by activity and distance", soThat: "I only see what is relevant",
          acceptanceCriteria: [
            { given: "a resident on the facility list", when: "they choose an activity", then: "only facilities for that activity are shown" }
          ] }
      ] },
      { name: "Pick a date and time", stories: [
        { id: "S3", title: "See free slots for the next 14 days", release: "mvp",
          as: "resident", need: "to see which slots are free for the next two weeks without an account", soThat: "I can check on the bus without committing to anything",
          acceptanceCriteria: [
            { given: "a resident has chosen a facility", when: "they view a day", then: "free and booked slots are shown differently and booked slots cannot be selected" },
            { given: "a slot has already been booked", when: "another resident views that day", then: "the slot is shown as unavailable" }
          ] },
        { id: "S13", title: "Book a midday over-50s session", release: "mvp",
          as: "resident over 50", need: "to see and book low-cost midday sessions run for people my age", soThat: "I can try a facility at a quiet time with people like me",
          acceptanceCriteria: [
            { given: "a resident viewing a weekday", when: "they look at slots between 10am and 2pm", then: "over-50s sessions are shown with their low price and can be booked like any other slot" },
            { given: "a resident who prefers to phone", when: "they ring reception", then: "the same midday sessions can be booked over the phone" }
          ] },
        { id: "S4", title: "Join a waiting list for a full slot", release: "later",
          as: "resident", need: "to be told if a full slot becomes free", soThat: "I do not have to keep checking",
          acceptanceCriteria: [
            { given: "a full slot", when: "a resident joins the waiting list and the slot is cancelled", then: "they are told within five minutes" }
          ] }
      ] },
      { name: "Enter your details", stories: [
        { id: "S5", title: "Book with name, email, postcode and age group", release: "mvp",
          as: "resident", need: "to book by giving only my name, email, postcode and age group", soThat: "it takes less than three minutes",
          acceptanceCriteria: [
            { given: "a resident has chosen a free slot", when: "they enter valid details and confirm", then: "the slot is theirs and no longer available to others" },
            { given: "a completed booking", when: "it is stored", then: "name and contact details are encrypted and visible only to reception and the duty manager" },
            { given: "a resident leaves a required field empty", when: "they confirm", then: "they see a specific error message next to the field and at the top of the page" },
            { given: "a resident with a typical phone", when: "they start from the facility list", then: "they complete a booking in under three minutes without help" }
          ] },
        { id: "S6", title: "Pay online", release: "mvp",
          as: "resident", need: "to pay by card when I book", soThat: "I do not queue at 6pm and I turn up because I have paid",
          acceptanceCriteria: [
            { given: "a resident confirming a paid slot", when: "they pay by card", then: "the booking is marked paid, the payment is logged against the booking and reception sees it" },
            { given: "a card payment fails", when: "the resident does not retry within ten minutes", then: "the slot is released for others" },
            { given: "a free facility such as a park tennis court", when: "the resident confirms", then: "no payment step is shown" }
          ] }
      ] },
      { name: "Get confirmation", stories: [
        { id: "S7", title: "Get a reference on screen", release: "mvp",
          as: "resident", need: "a booking reference straight away", soThat: "I know it worked and can show it at reception",
          acceptanceCriteria: [
            { given: "a completed booking", when: "the confirmation page loads", then: "a unique reference, the facility, date, time and cost are shown" }
          ] },
        { id: "S8", title: "Confirm or cancel 24 hours before", release: "mvp",
          as: "resident", need: "a text or email the day before asking me to confirm", soThat: "I do not forget, and the slot goes to someone else if I cannot make it",
          acceptanceCriteria: [
            { given: "a booking with a mobile number or email", when: "it is 24 hours before the slot", then: "a message is sent with one-tap confirm and cancel links" },
            { given: "a resident taps cancel", when: "the slot is released", then: "it shows as free on the site within a minute" },
            { given: "a resident has not confirmed", when: "it is two hours before the slot", then: "reception can see it as unconfirmed and offer it to a walk-in" }
          ] }
      ] },
      { name: "Manage my booking", stories: [
        { id: "S9", title: "Cancel my booking", release: "mvp",
          as: "resident", need: "to cancel my own booking", soThat: "I do not block a slot I cannot use",
          acceptanceCriteria: [
            { given: "a resident with a booking", when: "they cancel it", then: "the slot is available again and the booking is gone from their list" }
          ] },
        { id: "S14", title: "Repeat my booking until an end date", release: "mvp",
          as: "resident", need: "to book the same slot again weekly, fortnightly or monthly with one tap", soThat: "playing becomes a habit rather than a one-off",
          acceptanceCriteria: [
            { given: "a resident on the confirmation page", when: "they choose to repeat the booking", then: "the same facility and time seven days later is booked and a second reference is shown" },
            { given: "a resident choosing to repeat", when: "they pick weekly, fortnightly or monthly and an end date", then: "every free slot in that series is booked and listed with its own reference" },
            { given: "the same slot next week is already taken", when: "they choose to repeat", then: "they are told it is taken and offered the slot picker instead" }
          ] },
        { id: "S10", title: "Change my booking", release: "later",
          as: "resident", need: "to move my booking to another slot", soThat: "I do not have to cancel and rebook",
          acceptanceCriteria: [
            { given: "a resident with a booking", when: "they choose a different free slot", then: "the old slot is released and the new one held" }
          ] }
      ] },
      { name: "Run the service", stories: [
        { id: "S11", title: "Reception sees online bookings", release: "mvp",
          as: "duty manager", need: "online bookings to appear alongside phone bookings", soThat: "nothing is double booked",
          acceptanceCriteria: [
            { given: "an online booking is made", when: "reception opens the diary", then: "the booking is there with the resident's name and reference" }
          ] },
        { id: "S12", title: "Block bookings for clubs", release: "mvp",
          as: "club secretary", need: "to book a hall for a whole season", soThat: "my club has a home",
          acceptanceCriteria: [
            { given: "an approved club", when: "they request a weekly slot for 12 weeks", then: "all 12 are held and shown as unavailable to others" }
          ] },
        { id: "S15", title: "Reception books and amends phone and walk-in bookings", release: "mvp",
          as: "reception staff member", need: "to book, change and cancel phone and walk-in bookings in the same system as online ones", soThat: "every booking is in one place and payment is logged against it",
          acceptanceCriteria: [
            { given: "a resident phones or walks in", when: "reception books a slot for them", then: "it appears in the same list as online bookings with a reference and a payment status" },
            { given: "a resident pays at the desk", when: "reception marks the booking paid", then: "the payment is logged against that booking and the till" }
          ] },
        { id: "S16", title: "Flag residents who repeatedly no-show", release: "later",
          as: "duty manager", need: "to see and block accounts with three no-shows in a month", soThat: "slots are not held by people who do not turn up",
          acceptanceCriteria: [
            { given: "a resident with three no-shows in 30 days", when: "they try to book", then: "they are asked to pay in full and are told why" }
          ] },
        { id: "S17", title: "See a bookings and income dashboard", release: "later",
          as: "operations manager", need: "a dashboard joining bookings, no-shows, income and costs by site", soThat: "we can show the CFO what changed",
          acceptanceCriteria: [
            { given: "the end of a week", when: "the operations manager opens the dashboard", then: "bookings by channel, no-shows, income and reception hours are shown per site against last year" }
          ] }
      ] }
    ]
  },

  /* The group's measures first (name and source from the hand-in; target,
     baseline and guard-rail added), then the examples. */
  successMeasures: [
    { name: "Reception satisfaction", target: "Up by 1 point on a 5-point scale by the end of the pilot", baseline: "Unknown; the before-survey runs in week 1. Staff estimate about 3 out of 5 today", source: "Survey before-and-after.", guardRail: "No site loses staffed reception hours during the pilot",
      comment: "Puts the people most disrupted by the change at the centre, which is rare and right. Self-reported and small-sample (eleven receptions), so it can support a story but not settle one." },
    { name: "Increase in over-50s bookings", target: "Over-50s make 20% of bookings in the first six weeks", baseline: "Unknown; the diary never recorded age. Estimated 15% by matching names by hand", source: "Data provided at checkout.", guardRail: "",
      comment: "The inclusion measure, and it drove a field on the form. There is no baseline, because the paper diary never recorded age, so the first six weeks only give us a starting point." },
    { name: "% of people using online booking vs walk-in vs phone calls", target: "Half of bookings made online by week six", baseline: "0% online today; about 70% phone, 30% walk-in", source: "Online system records this.", guardRail: "Phone bookings must still be possible at every site",
      comment: "The cleanest measure of whether behaviour moved, straight from the system. It says nothing about whether demand grew: a phone booking that becomes an online booking is not a new booking." },
    { name: "Decrease in time spent on bookings", target: "Down by a quarter", baseline: "About 40 hours a week across the borough, staff estimate", source: "Survey from reception staff", guardRail: "",
      comment: "A proxy for the cost saving the CFO wants, but staff time freed is not the same as staff cost saved, and it is self-reported." },
    { name: "Decrease in costs", target: "Running costs down 5% on the same quarter last year", baseline: "About £62,000 over six weeks last year (fictional)", source: "From their recorded quarterly cost sheets", guardRail: "",
      comment: "What the CFO will actually look at. Quarterly, so a six-week pilot cannot show it moving; either the pilot runs longer or a proxy such as reception hours stands in." },
    { name: "Increase in revenue", target: "Up 5% on the same six weeks last year", baseline: "About £48,000 over six weeks last year (fictional)", source: "From their revenue sheets", guardRail: "",
      comment: "The other CFO measure, with the same timing problem. Also the easiest to misread, because most early online income is money that would have come in by phone." },
    { name: "Failure demand on the online booking", target: "Fewer than 30% of started bookings abandoned", baseline: "None; there is no online journey today", source: "Abandoned journeys in Google Analytics", guardRail: "Calls about the website must stay under 10% of all calls",
      comment: "Measures the health of the service itself, and it is the one measure we can read every week. Analytics cannot tell a give-up from someone who only came to check availability, so pair it with a few calls to the desk." }
  ],

  /* Commentary for the post-session handout (scripts/build-handout.mjs).
     The group's own points, each with a short response. Optional. */
  handout: {
    userGroupsNote:
      "Ranking the groups is a decision, and a contentious one. Putting regular bookers first protects the people who use the service today and keeps the CFO's revenue safe. A different room might have put other residents first to chase inclusion, or reception staff first so that the change does not disrupt the desk. Each order serves a different business need, which is why the two rankings have to be made together.",
    processFeedback: [
      { said: "Include cancellations and a 24-hour confirm-your-booking. This will stop the no-shows.", comment: "Attacks the no-show pain point directly, and it is cheap. Worth checking whether 'stop' is realistic: a reminder usually reduces no-shows rather than ending them." },
      { said: "The repeat feature needs different recurring options, and perhaps an end date.", comment: "A real need from regular bookers, and a scope risk: every option is a screen to design, test and explain at the desk." },
      { said: "Introduce paying online to drive up revenue. It should stop no-shows too.", comment: "Two claims in one. Payment may raise revenue and it may cut no-shows, but they are separate beliefs and the pilot should test them separately." },
      { said: "Block no-show accounts.", comment: "A policy, not a feature. Who decides, after how many, and what about people who book by phone and never had an account?" },
      { said: "Get more information: an indication of age.", comment: "Needed for the over-50s measure. The site already asked for it, which shows how a measure drives a form field." },
      { said: "It is not clear about the storing of the name. Is it secure?", comment: "The right instinct, and a question the to-be map did not answer. Data protection is part of the process, not something added afterwards." },
      { said: "When they turn up and pay, how is it logged against the booking? What is the pay system?", comment: "A gap in the UX colleague's map. Reception needs a step that ties a desk payment to a booking, or the till and the diary drift apart again." },
      { said: "What is the process for walk-ins? Let's have a check-availability-before-you-come feature.", comment: "Turns a wasted journey into an informed one, and it is the same screen as the slot picker, so it costs almost nothing extra." },
      { said: "We need a reporting mechanism and a dashboard, joining up the data to show the end.", comment: "Without it there is nothing to evaluate against. It is also the piece most teams leave until last, then regret." },
      { said: "A reception view to book in sessions from phones and walk-ins, and amend them too.", comment: "The step that makes 'one record of bookings' true. Without it, the platform is a second diary." }
    ],
    storyMapFeedback: [
      { said: "Pay online should be MVP.", comment: "Adds a payment provider, refunds and reconciliation to the first build. It tests the belief that paying up front changes behaviour." },
      { said: "Reminders should be MVP.", comment: "Cheap, and it tests the belief that people forget rather than choose not to come." },
      { said: "Block bookings should be MVP.", comment: "Serves clubs and regular bookers, the group we put first. It tests whether regulars will move online if their season is protected." }
    ],
    storyMapNote:
      "Three stories, three different beliefs, three different build costs. Moving them all above the line makes the MVP bigger and the first pilot slower. That is the trade-off we accepted in order to chase costs and revenue first; a room that had put inclusion first would have made a different call.",
    measuresNote:
      "A good spread across staff, users, money and the health of the service itself. None of the seven has a target or a baseline yet, and that is the next conversation to have with the CFO and with reception, because measures cannot be defined after the fact: you cannot turn back time to collect a baseline you did not ask for.",
    notCovered: [
      { name: "Non-functional requirements", text: "Performance, accessibility, security, resilience. The story map says what the service does; NFRs say how well it has to do it, and they are usually where the cost hides." },
      { name: "Getting through the Technical Design Authority", text: "Any real build at Brent goes through architecture and security review. The BA's job is to have the requirements and the trade-offs written down clearly enough that the review is quick." },
      { name: "Getting a business case signed off", text: "The size of the prize, the costs and the risks, in the format finance expects. The problem statement and the measures are the raw material; the case is a separate document with a separate audience." },
      { name: "Reporting", text: "Who needs to know what, how often, and in what form, from the first week of the pilot. We touched on the dashboard in the process feedback; the reporting rhythm around it is its own piece of work." }
    ],
    notCoveredNote: "All very much needed. They add to what we did; they do not replace it.",
    buildErrors: [
      "Under-18s could book the over-50s midday session. The age question was on the form, but nothing used the answer.",
      "Payment did not work as the acceptance criteria said. The confirmation said 'paid', but no payment was taken."
    ],
    buildLesson:
      "This is why BAs get into the detail of the implementation as well as the definition: so that we catch these, not users. An acceptance criterion is only useful if somebody checks it against the real thing.",
    evaluateNotes: {
      confounders: "The pilot ran in weeks when pitch demand changes anyway: lighter evenings, school terms, weather. A rise or fall against the same weeks last year may be the season, not the platform, so the comparison has to be with a like-for-like period and, ideally, with sites that did not get the platform.",
      deciding: "There is a trade-off between analysing and deciding. More data is always available and it is hard to know when enough is enough. Waiting has a cost, in staff time and in a pilot that drifts. Deciding too early has a cost too. The job is to name in advance what evidence would be enough to commit, then commit when it arrives.",
      decision: "We agreed to wait for more data, in particular a like-for-like comparison and the first quarterly cost and revenue figures, and then look to iterate rather than invest or stop."
    }
  },

  /* Optional build choices the group may hand in. These mirror config/mvp.js. */
  buildChoices: {
    facilities: "Vale Farm 3G pitch, Willesden badminton court, Bridge Park sports hall, King Edward VII Park tennis court, plus the midday over-50s session at Willesden (kept from the PM's story map)",
    detailsCollected: "Name, email, phone (optional), postcode, age group (the group asked for an indication of age)",
    residentsOnly: "No",
    askFirstVisit: "No",
    payOnline: "Yes, by card at booking (simulated in the sandbox: the confirmation says the booking is paid)",
    repeatBooking: "Yes: one tap on the confirmation page books the same slot next week; weekly, fortnightly or monthly until an end date is in the story map",
    reminders: "Confirm-or-cancel message 24 hours before; unconfirmed slots released",
    blockBookings: "Yes, for approved clubs"
  }
};

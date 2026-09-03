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

  /* Carried over from Discover. Replaced by the group's own statement when handed in. */
  problemStatement:
    "Brent residents who want to play sport casually need to find a free slot and secure it with confidence, because they will only play if it is easy and predictable. Today they phone during office hours or turn up and hope, which results in residents being turned away from full evening slots while daytime slots sit at 30% occupancy, flat facility use, lost income from no-shows, and around 40 staff hours a week spent on the phone and the diary.",

  /* The user groups, as defined by the UX colleague. Shown as fixed content. */
  userGroups: [
    { name: "Casual players who do not use council facilities", primary: true,
      who: "Brent residents aged 18 to 35 who play, or would like to play, sport casually with friends. Comfortable on a phone. Not in a club.",
      today: "Use a commercial five-a-side venue, play in a park, or do not play at all. Have never phoned a council leisure centre.",
      needs: ["See what is free tonight or this week without asking anyone", "Book without creating an account", "Know it is definitely theirs"] },
    { name: "Regular bookers", primary: false,
      who: "Residents who already book by phone or at the desk, often weekly. Skew older.",
      today: "Ring on Monday for Thursday. Know the staff by name.",
      needs: ["Keep their usual slot", "Not be forced online", "A quicker way if it exists"] },
    { name: "Reception and duty staff", primary: false,
      who: "The people who take bookings and run the buildings.",
      today: "Paper diary per site, reconciled with the till nightly.",
      needs: ["One record of bookings", "Fewer 'is anything free' calls", "People who booked actually turning up"] }
  ],

  userNeeds: [
    { as: "resident who wants to play sport casually", need: "to see what is free and book it quickly", soThat: "I do not have to phone the centre or turn up and be turned away" },
    { as: "resident", need: "a booking reference straight away", soThat: "I know it worked and can show it at reception" },
    { as: "resident", need: "to cancel my own booking", soThat: "I do not block a slot I cannot use" },
    { as: "regular booker", need: "the phone line to keep working", soThat: "I am not forced to change how I book" }
  ],

  /* The five business needs the group ranks. Order here is the starting order. */
  businessPriorities: [
    { need: "Increased revenue", owner: "CFO, Cabinet Member" },
    { need: "Decreased costs", owner: "CFO" },
    { need: "Healthier children", owner: "Cabinet Member, Public Health" },
    { need: "More inclusion for the community", owner: "Reception staff, Public Health" },
    { need: "Support public health for the over-50s", owner: "Public Health" }
  ],
  businessTension:
    "Two of these are the CFO's (revenue up, costs down) and three are inclusion needs from reception, Public Health and the Cabinet Member. Whatever order the group picks, someone in the room loses. The point is to make the trade-off explicit and say who will disagree, not to find an order everyone likes. A booking platform on its own mainly serves cost reduction; inclusion needs pricing, outreach or staffed help, which cost money.",

  /* Kept for the config-driven rebuild; not shown on the page as a list. */
  businessNeeds: [
    { need: "One record of bookings across online and phone", owner: "Leisure Operations Manager", why: "Double bookings are the biggest source of complaints" },
    { need: "No rise in no-shows", owner: "CFO", why: "An empty floodlit hour costs about £40 and blocks a paying user" },
    { need: "Evidence of new users, not just moved bookings", owner: "Cabinet Member, Public Health", why: "The stated outcome is more residents active, not more clicks" },
    { need: "Reception time freed for people who need help", owner: "Reception lead", why: "About 40 hours a week currently go on booking calls" }
  ],

  /* Example theory of change, facilitator-only until the group's own replaces it. */
  theoryOfChange: {
    ifWe: "let residents see availability and book online in under three minutes, without an account",
    then: "casual players, including people who have never used a council facility, will book a slot instead of giving up",
    because: "we believe the effort of phoning in office hours, and the uncertainty of turning up, is what stops them",
    leadingTo: "more residents, and more new residents, using the facilities; better daytime occupancy; less reception time on the phone",
    measuredBy: "share of bookings from first-time users (target 30% in six weeks), hours booked against last year, and the no-show rate as a guard-rail"
  },
  hypothesis:
    "If residents can see availability and book online in under three minutes, more people who have never used our facilities will book, and overall facility use will go up.",
  theoryOfChangeHints: {
    ifWe: "What will we build or change? Be concrete.",
    then: "What will people do differently? Who?",
    because: "Why do we believe that? This is the assumption evaluation will test.",
    leadingTo: "What outcome does the council actually want from that behaviour?",
    measuredBy: "Which number, from where, by when?"
  },

  toBeProcess: {
    lanes: ["Resident", "Booking service", "Reception"],
    steps: [
      { lane: "Resident", text: "Chooses a facility" },
      { lane: "Booking service", text: "Shows free slots for the next 14 days" },
      { lane: "Resident", text: "Picks a date and time" },
      { lane: "Resident", text: "Enters name, email and postcode" },
      { lane: "Booking service", text: "Confirms on screen with a reference; holds the slot" },
      { lane: "Reception", text: "Sees the booking in the same diary as phone bookings" },
      { lane: "Resident", text: "Turns up, shows the reference, pays at the desk" }
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
        { id: "S4", title: "Join a waiting list for a full slot", release: "later",
          as: "resident", need: "to be told if a full slot becomes free", soThat: "I do not have to keep checking",
          acceptanceCriteria: [
            { given: "a full slot", when: "a resident joins the waiting list and the slot is cancelled", then: "they are told within five minutes" }
          ] }
      ] },
      { name: "Enter your details", stories: [
        { id: "S5", title: "Book with name, email and postcode", release: "mvp",
          as: "resident", need: "to book by giving only my name, email and postcode", soThat: "it takes less than three minutes",
          acceptanceCriteria: [
            { given: "a resident has chosen a free slot", when: "they enter valid details and confirm", then: "the slot is theirs and no longer available to others" },
            { given: "a resident leaves a required field empty", when: "they confirm", then: "they see a specific error message next to the field and at the top of the page" },
            { given: "a resident with a typical phone", when: "they start from the facility list", then: "they complete a booking in under three minutes without help" }
          ] },
        { id: "S6", title: "Pay online", release: "later",
          as: "resident", need: "to pay when I book", soThat: "I do not queue at 6pm",
          acceptanceCriteria: [
            { given: "a resident confirming a paid slot", when: "they pay by card", then: "the booking is marked paid and reception sees it" }
          ] }
      ] },
      { name: "Get confirmation", stories: [
        { id: "S7", title: "Get a reference on screen", release: "mvp",
          as: "resident", need: "a booking reference straight away", soThat: "I know it worked and can show it at reception",
          acceptanceCriteria: [
            { given: "a completed booking", when: "the confirmation page loads", then: "a unique reference, the facility, date, time and cost are shown" }
          ] },
        { id: "S8", title: "Get a reminder", release: "later",
          as: "resident", need: "a text the day before", soThat: "I do not forget and become a no-show",
          acceptanceCriteria: [
            { given: "a booking with a mobile number", when: "it is 24 hours before the slot", then: "a reminder text is sent" }
          ] }
      ] },
      { name: "Manage my booking", stories: [
        { id: "S9", title: "Cancel my booking", release: "mvp",
          as: "resident", need: "to cancel my own booking", soThat: "I do not block a slot I cannot use",
          acceptanceCriteria: [
            { given: "a resident with a booking", when: "they cancel it", then: "the slot is available again and the booking is gone from their list" }
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
        { id: "S12", title: "Block bookings for clubs", release: "later",
          as: "club secretary", need: "to book a hall for a whole season", soThat: "my club has a home",
          acceptanceCriteria: [
            { given: "an approved club", when: "they request a weekly slot for 12 weeks", then: "all 12 are held and shown as unavailable to others" }
          ] }
      ] }
    ]
  },

  successMeasures: [
    { name: "Bookings made by people who have not used a Brent sports facility in the last 12 months", target: "30% of all bookings in the first six weeks", baseline: "Unknown; estimated 10 to 15% of phone bookings", source: "Checkout question plus SQL on the bookings table", guardRail: "" },
    { name: "Hours booked", target: "Up 10% on the same six weeks last year", baseline: "Diary sample", source: "Bookings table and diaries", guardRail: "" },
    { name: "Reception time on booking calls", target: "Down by a quarter", baseline: "About 40 hours a week", source: "Contact centre report plus a two-week call reason sample", guardRail: "" },
    { name: "No-show rate", target: "Guard-rail", baseline: "About 12% of provisional holds", source: "Duty manager logs", guardRail: "Must not rise above 15%" }
  ],

  /* Optional build choices the group may hand in. These mirror config/mvp.js. */
  buildChoices: {
    facilities: "Vale Farm 3G pitch, Willesden badminton court, Bridge Park sports hall, King Edward VII Park tennis court",
    detailsCollected: "Name, email, phone (optional), postcode",
    residentsOnly: "No",
    askFirstVisit: "Yes, because the measure of success depends on it"
  }
};

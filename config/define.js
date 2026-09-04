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
    { name: "Other residents", primary: false,
      who: "Residents who do not currently use council sports facilities: casual players, families with children, the over-50s, people who have never been in the building.",
      today: "Play in the park, use a commercial venue, or do not play at all. Have never phoned a leisure centre.",
      needs: ["Find out what exists, where it is and what it costs", "See what is free without having to ask anyone", "Feel that the facilities are for people like them"] },
    { name: "Reception staff", primary: false,
      who: "The people who take bookings, answer the phone and run the buildings, alongside unlocking gates and first aid.",
      today: "Paper diary per site, reconciled with the till nightly. About 350 booking calls a week across the borough.",
      needs: ["One record of bookings", "Fewer 'is anything free tonight' calls", "People who booked actually turning up", "To keep helping the residents who need to phone"] }
  ],

  userNeeds: [
    { as: "resident who wants to play sport casually", need: "to see what is free and book it quickly", soThat: "I do not have to phone the centre or turn up and be turned away" },
    { as: "resident", need: "a booking reference straight away", soThat: "I know it worked and can show it at reception" },
    { as: "resident", need: "to cancel my own booking", soThat: "I do not block a slot I cannot use" },
    { as: "regular booker", need: "the phone line to keep working", soThat: "I am not forced to change how I book" }
  ],

  /* The five business needs the group ranks. Order here is the group's order (Define hand-in). */
  businessPriorities: [
    { need: "More inclusion for the community", owner: "Reception staff, Public Health" },
    { need: "Healthier children", owner: "Cabinet Member, Public Health" },
    { need: "Support public health for the over-50s", owner: "Public Health" },
    { need: "Increased revenue", owner: "CFO, Cabinet Member" },
    { need: "Decreased costs", owner: "CFO" }
  ],
  businessTension:
    "Two of these are the CFO's (revenue up, costs down) and three are inclusion needs from reception, Public Health and the Cabinet Member. Whatever order the group picks, someone in the room loses. The point is to make the trade-off explicit and say who will disagree, not to find an order everyone likes. A booking platform on its own mainly serves cost reduction; inclusion needs pricing, outreach or staffed help, which cost money.",

  /* The group's priority order, with their reasoning and who disagrees. */
  businessNeeds: [
    { need: "More inclusion for the community", owner: "Reception staff, Public Health", why: "Ranked first by the group: this is the main bulk of the issue and the core mission." },
    { need: "Healthier children", owner: "Cabinet Member, Public Health", why: "Ranked second: part of the core mission the group will not veer from." },
    { need: "Support public health for the over-50s", owner: "Public Health", why: "Ranked third: the theory of change leads to healthier older people." },
    { need: "Increased revenue", owner: "CFO, Cabinet Member", why: "Ranked fourth. The group's words: helpful, but we can't veer from our core mission. The CFO and the CDIO, who put cost first, will disagree." },
    { need: "Decreased costs", owner: "CFO, CDIO", why: "Ranked fifth. Same reasoning. This is the order the CFO and CDIO will push back on hardest: the platform was sold to them as a cost-reduction showcase." }
  ],

  /* The group's theory of change (Define hand-in). */
  theoryOfChange: {
    ifWe: "build an inclusive, helpful service",
    then: "people will be more likely to use sports pitches",
    because: "it is easier to do so",
    leadingTo: "healthier older people and a more inclusive borough"
  },
  hypothesis:
    "If we build an inclusive, helpful booking service, more residents, especially the over-50s and children, will use our sports pitches because it is easier to do so, leading to healthier older people and a more inclusive borough.",
  theoryOfChangeHints: {
    ifWe: "What will we build or change? Be concrete.",
    then: "What will people do differently? Who?",
    because: "Why do we believe that? This is the assumption evaluation will test.",
    leadingTo: "What outcome does the council actually want from that behaviour?"
  },

  toBeProcess: {
    lanes: ["Resident", "Booking service", "Reception"],
    steps: [
      { lane: "Resident", text: "Chooses a facility" },
      { lane: "Booking service", text: "Shows free slots for the next 14 days" },
      { lane: "Resident", text: "Picks a date and time" },
      { lane: "Resident", text: "Enters name, email and postcode" },
      { lane: "Booking service", text: "Confirms on screen with a reference; holds the slot" },
      { lane: "Booking service", text: "Offers to repeat the same slot every week, to build the habit" },
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
        { id: "S14", title: "Repeat my booking every week", release: "mvp",
          as: "resident", need: "to book the same slot again next week with one tap", soThat: "playing becomes a habit rather than a one-off",
          acceptanceCriteria: [
            { given: "a resident on the confirmation page", when: "they choose to repeat the booking", then: "the same facility and time seven days later is booked and a second reference is shown" },
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
        { id: "S12", title: "Block bookings for clubs", release: "later",
          as: "club secretary", need: "to book a hall for a whole season", soThat: "my club has a home",
          acceptanceCriteria: [
            { given: "an approved club", when: "they request a weekly slot for 12 weeks", then: "all 12 are held and shown as unavailable to others" }
          ] }
      ] }
    ]
  },

  /* The group's measures first (name and source from the hand-in; target,
     baseline and guard-rail added), then the examples. */
  successMeasures: [
    { name: "Participants over 50 and under 18", target: "25% of all participants in the first six weeks", baseline: "Unknown; the paper diary never recorded age. Estimated 15 to 20% from names matched by hand", source: "SQL on the age band captured at booking", guardRail: "" },
    { name: "Total revenue", target: "Up 5% on the same six weeks last year", baseline: "About £48,000 over six weeks last year (fictional)", source: "SQL on the finance table", guardRail: "" },
    { name: "Total costs", target: "No increase", baseline: "About £62,000 over six weeks last year (fictional)", source: "Finance spreadsheet", guardRail: "Costs must not rise above last year's for the same period" },
    { name: "Bookings made by people who have not used a Brent sports facility in the last 12 months", target: "30% of all bookings in the first six weeks", baseline: "Unknown; estimated 10 to 15% of phone bookings", source: "Checkout question plus SQL on the bookings table", guardRail: "" },
    { name: "Hours booked", target: "Up 10% on the same six weeks last year", baseline: "Diary sample", source: "Bookings table and diaries", guardRail: "" },
    { name: "Reception time on booking calls", target: "Down by a quarter", baseline: "About 40 hours a week", source: "Contact centre report plus a two-week call reason sample", guardRail: "" },
    { name: "No-show rate", target: "Guard-rail", baseline: "About 12% of provisional holds", source: "Duty manager logs", guardRail: "Must not rise above 15%" }
  ],

  /* Optional build choices the group may hand in. These mirror config/mvp.js. */
  buildChoices: {
    facilities: "Vale Farm 3G pitch, Willesden badminton court, Bridge Park sports hall, King Edward VII Park tennis court, plus a midday over-50s session at Willesden (from the story map feedback)",
    detailsCollected: "Name, email, phone (optional), postcode, age group (so participants over 50 and under 18 can be counted)",
    residentsOnly: "No",
    askFirstVisit: "No; the age group question replaces it",
    repeatBooking: "Yes: one tap on the confirmation page books the same slot next week (from the process feedback)"
  }
};

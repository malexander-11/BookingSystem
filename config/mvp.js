/* ==================================================================
   THE GROUP'S MVP DEFINITION
   ------------------------------------------------------------------
   This is the single file that changes during the workshop.
   Everything on the booking site is rendered from it.

   It is plain JavaScript (not JSON) so index.html works when opened
   straight from disk as well as on GitHub Pages.

   Fields under `mvp` map 1:1 to the six-part MVP template the group
   completes in the "During build" stage (see docs/mvp-template.md).
   ================================================================== */

window.MVP = {
  brand: {
    council: "Brent Council",
    service: "Book a sports facility",
    strapline: "Find and book courts, pitches and halls across Brent in a few minutes.",
    sandboxNotice: "Training sandbox for a Business Analysis workshop. This is a fictional service, not brent.gov.uk."
  },

  mvp: {
    targetUser:
      "Brent residents who do not currently use council sports facilities, especially the over-50s and families with children.",
    userNeed:
      "As a resident who has never used the council's facilities, I need booking to be easy and welcoming, so that trying a session feels possible rather than daunting.",
    hypothesis:
      "If we build an inclusive, helpful booking service, more residents, especially the over-50s and children, will use our sports pitches because it is easier to do so, leading to healthier older people and a more inclusive borough.",
    process: [
      "Choose a session",
      "Pick a date and time",
      "Enter your details",
      "Confirm and repeat"
    ],
    acceptanceCriteria: [
      "A resident can see every bookable facility with its site, activity and price without logging in.",
      "A resident can see which slots are free for the next 14 days, and booked slots cannot be selected.",
      "A resident can book by giving only their name, email, postcode and age group, in under three minutes on a phone.",
      "A resident who leaves a required field empty sees a specific error next to the field and at the top of the page.",
      "The resident receives a unique booking reference on screen immediately.",
      "A resident can see and book low-cost midday over-50s sessions like any other slot, and can also book them by phone.",
      "A resident can book the same slot again next week with one tap from the confirmation page, and is told if it is taken.",
      "The resident can cancel their own booking and the slot becomes available again.",
      "Reception sees online bookings in the same diary as phone bookings."
    ],
    successMeasure: {
      name: "Participants over 50 and under 18",
      target: "25% of all participants in the first six weeks"
    },
    repeatBooking: true
  },

  /* Fictional facilities. Names are loosely inspired by real Brent
     venues but nothing here reflects real availability or pricing. */
  facilities: [
    {
      id: "vale-farm-3g",
      name: "3G football pitch (half)",
      site: "Vale Farm Sports Centre, Sudbury",
      activity: "Football",
      description: "Floodlit half-pitch suitable for 5-a-side and 7-a-side. Bibs and balls available at reception.",
      pricePence: 4200,
      slotMinutes: 60,
      openingHours: { start: "17:00", end: "22:00" },
      daysBookableAhead: 14,
      busyPercent: 55
    },
    {
      id: "willesden-badminton",
      name: "Badminton court",
      site: "Willesden Sports Centre, Donnington Road",
      activity: "Badminton",
      description: "Indoor court in the main sports hall. Racket hire available.",
      pricePence: 1150,
      slotMinutes: 60,
      openingHours: { start: "07:00", end: "22:00" },
      daysBookableAhead: 14,
      busyPercent: 35
    },
    {
      id: "bridge-park-hall",
      name: "Sports hall (full)",
      site: "Bridge Park Community Leisure Centre, Stonebridge",
      activity: "Basketball, netball, indoor football",
      description: "Full-size hall with markings for basketball and netball. Ideal for club sessions.",
      pricePence: 6800,
      slotMinutes: 60,
      openingHours: { start: "09:00", end: "21:00" },
      daysBookableAhead: 14,
      busyPercent: 45
    },
    {
      id: "willesden-over-50s",
      name: "Over-50s midday session",
      site: "Willesden Sports Centre, Donnington Road",
      activity: "Walking football and badminton, over-50s",
      description: "A relaxed midday session for the over-50s. No experience needed, equipment provided, tea afterwards. Also bookable by phone.",
      pricePence: 300,
      slotMinutes: 60,
      openingHours: { start: "10:00", end: "14:00" },
      daysBookableAhead: 14,
      busyPercent: 15
    },
    {
      id: "king-edward-tennis",
      name: "Tennis court",
      site: "King Edward VII Park, Wembley",
      activity: "Tennis",
      description: "Outdoor hard court. Free to book, just bring your own rackets and balls.",
      pricePence: 0,
      slotMinutes: 60,
      openingHours: { start: "08:00", end: "20:00" },
      daysBookableAhead: 14,
      busyPercent: 25
    }
  ],

  /* Which details to ask for. Use a string for a standard field
     (name, email, phone, postcode) or an object to define a custom one:
       { id: "players", label: "Number of players", hint: "...", required: true, type: "number" }
     Standard fields can also be objects to override their label or hint. */
  bookingForm: {
    fields: [
      "name", "email", "phone", "postcode",
      { id: "ageBand", type: "radio", required: true, label: "Which age group are you in?",
        hint: "We use this to check the service is reaching everyone in Brent.",
        options: [{ value: "under18", label: "Under 18" }, { value: "18to49", label: "18 to 49" }, { value: "50plus", label: "50 and over" }] }
    ],
    requireBrentPostcode: false,
    brentPostcodePrefixes: ["NW2", "NW6", "NW9", "NW10", "HA0", "HA3", "HA9", "W3", "W10", "NW3"],
    askFirstTimeUser: false
  },

  copy: {
    intro: "Choose a session to see what is free over the next two weeks. You do not need an account. Look out for the low-cost midday over-50s sessions, and once you have booked you can repeat the same slot every week.",
    confirmation: "Your booking is confirmed. Show this reference at reception when you arrive.",
    repeatButton: "Book this slot again next week",
    firstTimeQuestion: "Have you used a Brent Council sports facility in the last 12 months?"
  }
};

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
      "Brent residents aged 18 to 35 who do not currently use council sports facilities.",
    userNeed:
      "As a resident who wants to play sport casually, I need to see what is free and book it quickly, so that I do not have to phone the centre or turn up and be turned away.",
    hypothesis:
      "If residents can see availability and book online in under three minutes, more people who have never used our facilities will book, and overall facility use will go up.",
    process: [
      "Choose a facility",
      "Pick a date and time",
      "Enter your details",
      "Get confirmation"
    ],
    acceptanceCriteria: [
      "A resident can see which slots are free for the next 14 days without logging in.",
      "A booking can be completed on a mobile phone in under three minutes.",
      "The resident receives a booking reference on screen immediately.",
      "A slot cannot be booked twice.",
      "The resident can cancel their own booking."
    ],
    successMeasure: {
      name: "Bookings made by people who have not used a Brent sports facility in the last 12 months",
      target: "30% of all bookings in the first six weeks"
    }
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
    fields: ["name", "email", "phone", "postcode"],
    requireBrentPostcode: false,
    brentPostcodePrefixes: ["NW2", "NW6", "NW9", "NW10", "HA0", "HA3", "HA9", "W3", "W10", "NW3"],
    askFirstTimeUser: true
  },

  copy: {
    intro: "Choose a facility to see what is free over the next two weeks. You do not need an account.",
    confirmation: "Your booking is confirmed. Show this reference at reception when you arrive.",
    firstTimeQuestion: "Have you used a Brent Council sports facility in the last 12 months?"
  }
};

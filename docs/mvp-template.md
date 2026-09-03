# MVP definition template

Fill this in during the **During build** stage. Each field maps directly to a
setting in `config/mvp.js`, so whatever you write here can be turned into the
booking site within a few minutes.

| Field | What to write | Where it goes |
|---|---|---|
| **Target user** | One sentence describing who this is for. Be specific: age, situation, what they do today. | `mvp.targetUser` |
| **User need** | "As a ..., I need ..., so that ..." | `mvp.userNeed` |
| **Hypothesis** | "If we ..., then ... will happen, because ..." | `mvp.hypothesis` |
| **Simple process** | The steps the user goes through, in order. Three to five steps is ideal. | `mvp.process` (also the progress bar labels) |
| **Acceptance criteria** | Testable statements. "A resident can ... without ..." | `mvp.acceptanceCriteria` |
| **Measure of success** | What you will count, and the target number. | `mvp.successMeasure.name` and `.target` |

## Optional design choices

These also shape the build. Decide them if you have time:

- **Which facilities?** One site or several? One activity or many? (`facilities`)
- **Which details do we collect?** Name and email only, or phone and postcode too? (`bookingForm.fields`)
- **Residents only?** Should non-Brent postcodes be turned away? (`bookingForm.requireBrentPostcode`)
- **How far ahead can people book?** (`facilities[].daysBookableAhead`)
- **Do we ask if this is their first visit?** Needed if the success measure depends on it. (`bookingForm.askFirstTimeUser`)

## Example

- **Target user:** Brent residents aged 18 to 35 who do not currently use council sports facilities.
- **User need:** As a resident who wants to play sport casually, I need to see what is free and book it quickly, so that I do not have to phone the centre or turn up and be turned away.
- **Hypothesis:** If residents can see availability and book online in under three minutes, more people who have never used our facilities will book, and overall facility use will go up.
- **Process:** Choose a facility, pick a date and time, enter details, get confirmation.
- **Acceptance criteria:** See `config/mvp.js`.
- **Measure of success:** 30% of bookings in the first six weeks come from people who have not used a Brent facility in the last 12 months.

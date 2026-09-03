# Booking System sandbox: instructions for Claude

This repo is a static, faux-Brent-Council sports-facility booking site used in a
Business Analysis training workshop. During the session the facilitator will
paste the group's MVP definition into chat and expect the live site to reflect
it within a few minutes. There is no build step and no server.

## What lives where

| File | Purpose | Edit during the workshop? |
|---|---|---|
| `config/mvp.js` | The group's MVP definition, facilities, form fields and copy. Assigns `window.MVP`. | **Yes, this is the main one** |
| `config/evidence.js` | Fictional post-launch evidence for the "after build" stage. Assigns `window.EVIDENCE`. | **Yes, re-target it to the group's hypothesis** |
| `index.html`, `assets/app.js` | Booking flow, rendered entirely from `window.MVP`. | Only if the group asks for a feature the config cannot express |
| `evidence.html`, `assets/evidence.js` | Evidence page, rendered from `window.EVIDENCE`. | Rarely |
| `assets/brent.css`, `assets/logo.svg` | Faux-Brent branding. | Rarely |
| `scripts/validate.mjs` | Checks both configs have every required field. | No |
| `docs/mvp-template.md` | The six-field template the group fills in. | No |
| `.github/workflows/pages.yml` | Deploys the repo root to GitHub Pages on every push to any branch. | No |

## When the facilitator gives you an MVP definition

1. Map the six fields into `config/mvp.js`:
   - target user → `mvp.targetUser`
   - user need → `mvp.userNeed`
   - hypothesis → `mvp.hypothesis`
   - simple process → `mvp.process` (these become the progress-bar labels; keep 3 to 5 short steps, the flow itself is always facility → slot → details → confirmation)
   - acceptance criteria → `mvp.acceptanceCriteria`
   - measure of success → `mvp.successMeasure.name` and `.target`
2. Adjust the rest of `config/mvp.js` so the build honours their choices:
   - facilities: add, remove or rename to match the sites and activities they chose
   - `bookingForm.fields`: only ask for what their process needs; add custom fields as objects
   - `bookingForm.requireBrentPostcode`: `true` if they said residents only
   - `bookingForm.askFirstTimeUser`: `true` if their success measure depends on new vs existing users
   - `brand.service` and `copy.*`: match their wording
3. Rewrite `config/evidence.js` so the evidence tests **their** hypothesis and **their** measure of success. Keep it plausible and make the outcome ambiguous rather than a clear win or loss. Keep at least one `against` item under each of the four risks (value, usability, feasibility, viability). Keep the shape of the file identical.
4. Run `node scripts/validate.mjs`. Fix anything it reports.
5. Optionally preview: `python3 -m http.server 8080` then open `http://localhost:8080/`.
6. Commit with a clear message and `git push -u origin <current branch>`. GitHub Pages redeploys in one to two minutes at https://malexander-11.github.io/BookingSystem/.

## Rules

- Keep the sandbox banner and the "fictional service" wording. Never present this as a real Brent Council service.
- Do not fetch or embed the council's real logo or assets. The roundel in `assets/logo.svg` is an original drawing.
- Keep the site working from `file://` (no `fetch()` of local files, no ES modules, relative paths only).
- Do not add a build step, framework or dependency. Plain HTML, CSS and JavaScript only.
- Small, targeted edits. The facilitator is waiting.

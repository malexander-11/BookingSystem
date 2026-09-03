# Brent sports-facility booking sandbox

A small, faux-Brent-Council booking website used in an *Introduction to
Business Analysis* workshop. Participants define an MVP for a sports-facility
booking platform, this site is reshaped to match their definition, and an
"after build" evidence page gives them fictional pilot results to assess
against the four product risks.

**This is a training sandbox. It is not a Brent Council service, and every
number on the evidence page is made up.**

## Pages

| Page | What it is |
|---|---|
| `index.html` | Citizen-facing booking flow: choose a facility, pick a slot, enter details, get a reference. Bookings are stored in the browser's localStorage. Includes a collapsible "About this MVP" panel showing the group's definition. |
| `evidence.html` | "What happened after launch": headline numbers, charts, evidence for and against under each product risk, quotes, and the continue / iterate / expand / pivot / stop prompt. |

## Changing it

Everything the workshop changes lives in two files:

- `config/mvp.js` holds the MVP definition (target user, user need, hypothesis, process, acceptance criteria, measure of success), the facilities, the booking-form fields and the copy.
- `config/evidence.js` holds the fictional evaluation evidence.

Edit them, run `node scripts/validate.mjs`, and push. See `CLAUDE.md` for the
step-by-step playbook and `docs/mvp-template.md` for the template the group
fills in.

## Running locally

No build step and no dependencies. Either open `index.html` directly in a
browser, or serve the folder:

```sh
python3 -m http.server 8080
# then open http://localhost:8080/
```

## Deployment

`.github/workflows/pages.yml` deploys the repository root to GitHub Pages on
every push to any branch, so the latest push is what participants see at
https://malexander-11.github.io/BookingSystem/.

**One-time setup (needs the repository owner):** GitHub will not let a
workflow create the Pages site itself, so before the first deploy go to
*Settings → Pages → Build and deployment* and set **Source** to
**GitHub Actions**. Then re-run the failed "Deploy to GitHub Pages" workflow
from the Actions tab (or push any commit). If the deploy is rejected with a
"branch is not allowed to deploy to github-pages" message, open
*Settings → Environments → github-pages* and allow all branches under
"Deployment branches and tags".

## Branding

Colours and fonts (Poppins, Noto Sans) are taken from the public
brent.gov.uk stylesheet so the site reads as Brent. The roundel logo is an
original drawing; no council assets are used.

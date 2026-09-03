# Brent sports-facility booking sandbox

A small, faux-Brent-Council website used in an *Introduction to Business
Analysis* workshop. It walks a group through the BA lifecycle on a fictional
scenario: Brent wants more residents using its sports facilities, and a senior
stakeholder has proposed a digital booking platform.

**This is a training sandbox. It is not a Brent Council service, and every
number on it is made up.**

## Pages

| Stage | Page | What it shows | The group hands in |
|---|---|---|---|
| 1 Discover | `discover.html` | Stakeholder map, interview guide, data analysis output, as-is process map with pain points, key assumptions, problem statement | A problem statement |
| 2 Define | `define.html` | User groups, user and business needs, theory of change, to-be process map, user story map with acceptance criteria, success measures | Users, stories with acceptance criteria, new process, hypothesis, success measures |
| 3 Build | `index.html` | The booking site, built from the Define hand-in: choose a facility, pick a slot, enter details, get a reference. Bookings live in the browser. | Nothing; they test it against their acceptance criteria |
| 4 Evaluate | `evaluate.html` | The question chain, the theory-of-change links to test, a measurement plan builder, a guide to data sources | A measurement plan |
| Evidence | `evidence.html` | Fictional pilot results generated from the measurement plan: what we set out to do, what happened, what users did, impact, the four product risks, surprises, decision | A decision: continue, iterate, expand, pivot or stop |

Each page renders from a config file in `config/`. When the facilitator pastes
a hand-in into Claude, Claude updates the config and pushes; the site
redeploys in a minute or two. `CLAUDE.md` has the exact mapping and
`docs/hand-in-templates.md` the plain-text templates.

## Running locally

No build step and no dependencies. Either open any `.html` file directly in a
browser, or serve the folder:

```sh
python3 -m http.server 8080
# then open http://localhost:8080/discover.html
```

`node scripts/validate.mjs` checks all four config files.

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

# Booking System sandbox: instructions for Claude

This repo is a static, faux-Brent-Council site used in a Business Analysis
training workshop. It has four workshop stage pages (Discover, Define, Build,
Evaluate) plus an evidence page. During the session the facilitator pastes the
group's hand-ins into chat and expects the live site to reflect them within a
few minutes. There is no build step and no server.

## What lives where

| File | Purpose | Edit during the workshop? |
|---|---|---|
| `config/discovery.js` | Discover page content: brief, stakeholders, interview guide, data, as-is process, assumptions, **problem statement**. Assigns `window.DISCOVERY`. | **Yes**: `problemStatement` after Discover |
| `config/define.js` | Define page content: problem statement, user groups, needs, theory of change, to-be process, story map with acceptance criteria, success measures. Assigns `window.DEFINE`. | **Yes**: after Define |
| `config/mvp.js` | The booking site: the six MVP fields, facilities, form fields, copy. Assigns `window.MVP`. | **Yes**: after Define |
| `config/evidence.js` | Fictional post-launch evidence, generated from the group's measurement plan. Assigns `window.EVIDENCE`. | **Yes**: after Evaluate |
| `discover.html`, `define.html`, `evaluate.html`, `evidence.html`, `index.html` | The pages. Each renders entirely from its config. | Only if the group asks for something the config cannot express |
| `assets/render.js` | Shared renderers (stat tiles, bar charts, tables, process flow, hand-in panel). | Rarely |
| `assets/discover.js`, `assets/define.js`, `assets/evaluate.js`, `assets/evidence.js`, `assets/app.js` | Page logic. | Rarely |
| `assets/brent.css`, `assets/logo.svg` | Faux-Brent branding. | Rarely |
| `scripts/validate.mjs` | Checks all four configs have every required field. | No |
| `docs/README.md`, `docs/hand-in-templates.md` | How the pages connect; the plain-text hand-in templates. | No |
| `.github/workflows/pages.yml` | Deploys the repo root to GitHub Pages on every push to any branch. | No |

## The three hand-ins

The group hands in three things during the session. Each arrives as pasted text using the labels in `docs/hand-in-templates.md` (the same text is in the "Hand this in" panel on the Discover and Define pages, and the plan builder on the Evaluate page).

### Hand-in 1: problem statement (end of Discover)

```
PROBLEM STATEMENT
Who: ... / Needs to: ... / Because: ... / Today they: ... / Which results in: ...
```

1. `config/discovery.js` → `problemStatement.who`, `.needsTo`, `.because`, `.today`, `.resultsIn`. Rewrite `.note` to point at what their statement leaves open (one or two sentences, no praise).
2. `config/define.js` → `problemStatement`: the same five parts joined into one paragraph.
3. Leave the rest of the Discover example as it is unless they pasted more findings and asked for them to replace the example.

### Hand-in 2: the MVP definition (end of Define)

`USERS`, `USER STORIES` (with `AC:` lines), `NEW PROCESS FLOW`, `HYPOTHESIS FOR CHANGE`, `SUCCESS MEASURES`, optional `BUILD CHOICES`.

Update three files:

**`config/define.js`**
- `userGroups`: one per USERS line; the "Primary" one gets `primary: true`. Fill `who` and `today` from the line; `needs` from the stories for that user.
- `userNeeds`: one per story, as / need / soThat.
- `businessNeeds`: keep the example unless they gave business needs.
- `theoryOfChange`: the five HYPOTHESIS FOR CHANGE lines. `hypothesis`: one sentence combining If we / then.
- `toBeProcess`: lanes from the "(who does it)" parts; one step per line.
- `storyMap.activities`: one activity per process step (name it after the step), plus "Manage my booking" and "Run the service" only if they have stories for them. Put each story under the activity it belongs to. `release` is "mvp" or "later" from the story line. Each `AC:` line becomes `{given, when, then}`. Ids S1, S2, … in the order given.
- `successMeasures`: one per SUCCESS MEASURES line; a Guard-rail value goes in `guardRail`.
- `buildChoices`: from BUILD CHOICES if given, otherwise leave.

**`config/mvp.js`** (the booking site)
- `mvp.targetUser` ← the Primary user's "who".
- `mvp.userNeed` ← the first MVP story as one sentence "As a …, I need …, so that …".
- `mvp.hypothesis` ← `hypothesis` above.
- `mvp.process` ← the NEW PROCESS FLOW step names, shortened to 2 to 4 words each; keep 3 to 5 steps. The site's flow is always facility → slot → details → confirmation; the labels are what change.
- `mvp.acceptanceCriteria` ← every MVP story's ACs as plain sentences ("A resident can …").
- `mvp.successMeasure.name` and `.target` ← the first success measure.
- `facilities`, `bookingForm.fields`, `bookingForm.requireBrentPostcode`, `bookingForm.askFirstTimeUser`, `brand.service`, `copy.*` ← from BUILD CHOICES if given, otherwise from what the stories imply (a story about paying online is still "later", so no payment; a measure about first-time users means `askFirstTimeUser: true`).

**`config/evidence.js`** → `setOutToDo`: `hypothesis`, `measure`, `target`, `baseline`, `guardRail` from the Define hand-in, so the evidence page shows their words before the Evaluate stage.

### Hand-in 3: measurement plan (end of Evaluate)

```
MEASUREMENT PLAN
1. Question: ... | Metric: ... | Source: ... | Would change our mind: ...
```

Regenerate `config/evidence.js`:
1. `measurementPlan`: one row per line, in their order, with `question`, `metric`, `source`, `changeMind` and a short fictional `result`. Do not add metrics they did not ask for, unless a risk card would otherwise have no evidence.
2. Present each result in the form its source implies: analytics → funnel or drop-off chart in `userBehaviour`; service data / SQL → splits (new vs returning, by group, by site) in `userBehaviour` and a tile in `whatHappened`; survey → self-reported shares; observation / interviews → `risks[].evidence`, `surprises`, `quotes`; incident or ops logs → feasibility evidence; finance → viability evidence.
3. `whatHappened`: four to six headline tiles from the results, `tone` good / bad / neutral.
4. `impact`: compare their measure of success with their target and baseline. Make it **ambiguous**: near the target, not a clear win or loss. Break at least one guard-rail if they set one. Fill all four caveats (substitution, counterfactual, novelty, self-report) with something specific to their metrics. Use their "would change our mind" lines: at least one of them should be hit.
5. `risks`: keep the four ids (`value`, `usability`, `feasibility`, `viability`). At least one `against` item under every risk.
6. `surprises`, `quotes`, `decision`: rewrite to fit their scenario. Keep the five decision options.
7. Keep numbers plausible for a borough of about 340,000 people and a pilot of a few sites over a few weeks. Keep the file's shape and header comment.

If a hand-in is partial, fill what they gave and leave the example for the rest, re-worded to match their problem statement.

## After every hand-in

1. `node scripts/validate.mjs`. Fix anything it reports.
2. Commit with a clear message and `git push -u origin <current branch>`. GitHub Pages redeploys in one to two minutes at https://malexander-11.github.io/BookingSystem/.
3. Tell the facilitator which pages changed.

## Rules

- Keep the sandbox banner and the "fictional service" wording. Never present this as a real Brent Council service.
- Do not fetch or embed the council's real logo or assets. The roundel in `assets/logo.svg` is an original drawing.
- Keep the site working from `file://` (no `fetch()` of local files, no ES modules, relative paths only).
- Do not add a build step, framework or dependency. Plain HTML, CSS and JavaScript only.
- Small, targeted edits. The facilitator is waiting.

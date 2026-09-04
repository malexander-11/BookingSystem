# Booking System sandbox: instructions for Claude

This repo is a static, faux-Brent-Council site used in a Business Analysis
training workshop. It has four workshop stage pages (Discover, Define, Build,
Evaluate) plus an evidence page that is not linked from the menu (reached by URL only). During the session the facilitator pastes the
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
| `handout.html`, `scripts/build-handout.mjs` | Standalone post-session revision handout (one file, inline CSS, no scripts), generated from the four configs. Not in the menu (URL only). Run `node scripts/build-handout.mjs` after a hand-in if the facilitator wants it refreshed. | Regenerate, do not hand-edit |
| `assets/render.js` | Shared renderers (stat tiles, bar charts, tables, process flow, hand-in panel). | Rarely |
| `assets/discover.js`, `assets/define.js`, `assets/evaluate.js`, `assets/evidence.js`, `assets/app.js` | Page logic. | Rarely |
| `assets/brent.css`, `assets/logo.svg` | Faux-Brent branding. | Rarely |
| `scripts/validate.mjs` | Checks all four configs have every required field. | No |
| `docs/README.md`, `docs/hand-in-templates.md` | How the pages connect; the plain-text hand-in templates. | No |
| `.github/workflows/pages.yml` | Deploys the repo root to GitHub Pages on every push to any branch. | No |

## The three hand-ins

The group hands in three things during the session. Each arrives as pasted text using the labels in `docs/hand-in-templates.md` (the same text is in the "Hand this in" panel on the Discover and Define pages, and the plan builder on the Evaluate page).

The Discover and Define pages are interactive: participants type on the page (saved in their browser) and press a Copy button that compiles the hand-in. Model answers and interview scripts appear only in facilitator view (open any page with `?facilitator=1`; `?facilitator=0` turns it off).

### Hand-in 1: problem statement (end of Discover)

```
PROBLEM STATEMENT
Who: ... / Needs to: ... / Because: ... / Today they: ... / Which results in: ...
AGREEMENT ...  SIZE OF THE PRIZE ...  WATCH OUT FOR ...
```

1. `config/discovery.js` → `problemStatement.who`, `.needsTo`, `.because`, `.today`, `.resultsIn`, and `.agreement`, `.sizeOfPrize`, `.watchOuts` from the three extra blocks. Rewrite `.note` to point at what their statement leaves open (one or two sentences, no praise).
2. `config/define.js` → `problemStatement`: the same five parts joined into one paragraph. (The Define page shows agreement, prize and watch-outs from `DISCOVERY.problemStatement` automatically.)
3. Leave the rest of the Discover content as it is unless they pasted more findings and asked for them to replace the example.

### Hand-in 2: the MVP definition (end of Define)

`USER GROUP PRIORITY`, `BUSINESS NEED PRIORITY`, `THEORY OF CHANGE`, `PROCESS FEEDBACK`, `STORY MAP FEEDBACK`, `SUCCESS MEASURES` (name and source only), optional `BUILD CHOICES`. The user groups themselves are fixed content from the UX colleague; the group ranks them and adds one need to each.

Update three files:

**`config/define.js`**
- `userGroups`: reorder to match USER GROUP PRIORITY, set `primary: true` on the first only, and append each "Added need" to that group's `needs`.
- `userNeeds`: add one entry per added need (as = the group name).
- `businessNeeds`: reorder to match BUSINESS NEED PRIORITY (top three first), and put the "who disagrees" answer into the `why` of the need that loses.
- `theoryOfChange`: the four THEORY OF CHANGE lines (If we / then / because / leading to). `hypothesis`: one sentence combining If we / then.
- `toBeProcess`: apply PROCESS FEEDBACK (add, remove, rename or re-lane steps). Keep 5 to 8 steps.
- `storyMap.activities`: apply STORY MAP FEEDBACK (move stories across the MVP line, add missing stories with at least one Given/When/Then each, drop stories they called wrong). Keep ids unique; new ones continue the S-numbering.
- `successMeasures`: the group's SUCCESS MEASURES lines first, then the examples. They give only `name` and `source`; **you add** a plausible `target` (number and time window), `baseline` (today's number or "unknown, estimated …") and, for at least one measure, a `guardRail`.
- `buildChoices`: from BUILD CHOICES if given, otherwise leave.

**`config/mvp.js`** (the booking site)
- `mvp.targetUser` ← the first group's `who`. `mvp.userNeed` ← "As a <first group>, I need <its added need, or its first need>, so that <outcome from the problem statement>".
- `mvp.hypothesis` ← `hypothesis` above.
- `mvp.process` ← the resident's steps in the updated `toBeProcess`, shortened to 2 to 4 words each; keep 3 to 5 steps. The site's flow is always facility → slot → details → confirmation; the labels are what change.
- `mvp.acceptanceCriteria` ← every MVP story's ACs as plain sentences ("A resident can …"), after the story-map feedback is applied.
- `mvp.successMeasure.name` and `.target` ← the group's first success measure with the target you added (or the first example if they added none).
- `facilities`, `bookingForm.fields`, `bookingForm.requireBrentPostcode`, `bookingForm.askFirstTimeUser`, `brand.service`, `copy.*` ← from BUILD CHOICES if given, otherwise from what the feedback and measures imply (a story about paying online is still "later", so no payment; a measure about first-time users means `askFirstTimeUser: true`).

**`config/define.js` → `handout`** and **`config/discovery.js` → `problemStatement.pushback`** (only if the facilitator wants the handout refreshed): the group's PROCESS FEEDBACK and STORY MAP FEEDBACK points each with a one-sentence response, a note on their user-group order, a holistic comment on their measures, the errors they caught when testing the site, and the evaluation notes (confounders, analysing versus deciding, what they decided). Then `node scripts/build-handout.mjs`.

**`config/evidence.js`** → `setOutToDo`: `hypothesis`, `measure`, `target`, `baseline`, `guardRail` from the Define hand-in, so the evidence page shows their words before the Evaluate stage.

### Hand-in 3: pilot results and additional data needed (end of Evaluate, optional)

The session normally ends at the Evaluate page's section 4, "So what next?" (invest, iterate, pause, pivot or stop), which is a discussion with no hand-in. The additional-data builder sits under "If there is time" on that page; this hand-in only arrives if the facilitator uses it.

```
MEASURES AND PILOT RESULTS
- Name: ... | Source: ... | Result: ... | But: ...
ADDITIONAL DATA NEEDED
1. Question: ... | Metric: ... | Source: ... | Would change our mind: ...
```

The Evaluate page has already shown the group a fake result for each of their measures (generated from `measureResults` in `config/evidence.js`). The evidence you write must be consistent with those numbers.

Regenerate `config/evidence.js`:
1. `setOutToDo`: their hypothesis and first measure, with the target and baseline you added at hand-in 2.
2. `whatHappened`: one tile per MEASURES AND PILOT RESULTS line, using the exact `Result` value shown, plus one or two more if needed for the story. `tone` good / bad / neutral.
3. `measurementPlan`: one row per ADDITIONAL DATA NEEDED line, in their order, with `question`, `metric`, `source`, `changeMind` and a short fictional `result`. Do not add rows they did not ask for, unless a risk card would otherwise have no evidence.
4. Present each additional-data result in the form its source implies: analytics → funnel or drop-off chart in `userBehaviour`; service data / SQL → splits (new vs returning, by group, by site) in `userBehaviour`; survey → self-reported shares; observation / interviews → `risks[].evidence`, `surprises`, `quotes`; incident or ops logs → feasibility evidence; finance → viability evidence.
5. `impact`: compare their first measure with its target and baseline. Keep it **ambiguous**: near the target, not a clear win or loss. Break at least one guard-rail. Fill all four caveats (substitution, counterfactual, novelty, self-report) with something specific to their metrics. Use their "would change our mind" lines: at least one of them should be hit.
6. `risks`: keep the four ids (`value`, `usability`, `feasibility`, `viability`). At least one `against` item under every risk.
7. `surprises`, `quotes`, `decision`: rewrite to fit their scenario. Keep the five decision options.
8. Keep numbers plausible for a borough of about 340,000 people and a pilot of a few sites over a few weeks. Keep the file's shape, the `measureResults` rules and the header comment.

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

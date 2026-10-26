# Independent Learning Path — LoveLab → Helium 👩🏻‍💻🔬

> **Owner writes the code. AI teaches, asks questions, reviews, and gives graduated hints.**
> This document defines how all future learning-focused tasks are assigned. No fixed deadlines or pressure to finish quickly.

## Our permanent lesson contract

Before **every** new learning task, use this sequence, in order:

1. **Goal and prerequisites (2–3 sentences):** explain why the skill matters and which existing LoveLab file uses it. Check readiness before introducing advanced material.
2. **Learning first:** offer 1 primary, trustworthy resource (prefer official documentation) and optionally 1 alternative with exact sections to read, not a huge unfiltered playlist. Introduce essential vocabulary.
3. **Two or three analogous exercises:** small independent tasks on separate toy examples; do **not** give the completed LoveLab implementation as the examples. At least one should require transferring the concept rather than copying syntax.
4. **Main LoveLab assignment:** a precise and bounded change, likely files, expected behaviour, acceptance criteria, and a simple test plan. Do not dump complete solution code first.
5. **Self-attempt:** the learner attempts it, reads docs and browser errors, records what was tried, and asks for help when needed.
6. **Hint ladder:** (a) diagnostic question, (b) concept / relevant documentation, (c) pseudocode or pinpointed line, (d) minimal code example **only if requested or still genuinely blocked**. Full implementation only on explicit request. Do not edit the repository on the learner's behalf for a lesson unless explicitly asked.
7. **Review and reflection:** inspect the learner's own diff, ask them to explain key decisions in their words, test edge cases, and suggest one improvement. Correctness includes security/accessibility, not just appearance.
8. **Commit + checkpoint:** learner commits to `develop` (or a feature branch); document what became independent, what still needed hints, and which skill to revisit.

**Dependency-reduction test:** Can the learner reproduce a similar feature from documentation without step-by-step AI instructions? If not, revisit practice before increasing scope. AI-assisted work is *not automatically* evidence of independent mastery.

**Flexible pacing:** short sessions when busy; no daily quotas. During exams or tired periods, reading or one mini-exercise is enough. Confident knowledge may be tested and skipped rather than relearned.

## Learning checkpoints and actual LoveLab work

| Stage | Learn first | Similar practice before LoveLab | Real LoveLab task | Proof of progress |
| --- | --- | --- | --- | --- |
| 1. CSS ownership (next) | selectors, cascade, box model, colours, gradients, custom properties, `:hover`, `:focus-visible` | simple button + card themes with a few variables | independently redesign **studio** button/palette styles in `assets/editor.css` | explain selector and variable, check desktop/mobile/keyboard, commit |
| 2. HTML & responsive UI | semantic form elements, labels, accessible menus, Flexbox/Grid | mini contact form; responsive settings card | refine profile/settings UI and layout | keyboard usability, valid forms and 2 widths |
| 3. JavaScript foundations | values/functions, conditions, arrays/objects, DOM, events, state | counter; toggle panel; small form validator | implement a small UI behaviour without pasted full code | explain event → state → render and debug it |
| 4. Tooling + testing | Git diff/branch, browser debugger, simple automated tests, modules | isolate a bug in tiny script; write assertions | improve LoveLab tests/refactor manageable modules | failing-before / passing-after, readable diff |
| 5. Supabase & SQL | authentication vs authorization, async/await, SQL constraints, RLS | local mock record; hypothetical access-rule cases | strengthen profiles, pairing and private messages safely | tests with A, B, unrelated C, signed-out user |
| 6. Independent milestone | research unfamiliar docs; planning/testing | 1 unfamiliar variant task | build **one complete, scoped LoveLab feature** with AI limited to review/hints | explain implementation and trade-offs unaided |

**Status at 2026-10-26:** LoveLab V2 exists; authentication, guest mode, password recovery, private profiles and settings are under development on `develop`. Working features are not the same as independently mastered skills or a V3 release.

### Next lesson: Studio palette, not a ready-made theme

**First read (one topic at a time):**
- [MDN — Getting started with CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started): how rules, declarations and selectors work.
- [MDN — Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties): `:root`, `--name`, `var()` and why centralising repeated colours helps.
- Optional practice bank: [The Odin Project — CSS exercises](https://github.com/TheOdinProject/css-exercises).

**Before touching LoveLab, do 3 small exercises (use a disposable HTML/CSS sandbox):**

1. Make a neutral greeting card with a border, background, text colour and rounded corners. Change its palette without changing the HTML.
2. Style two buttons as primary and secondary. Add distinct hover and keyboard focus styles. Explain which selector affects each.
3. Define `--surface`, `--ink` and `--action` in `:root`. Apply each in two places; then change **only the variables** and predict which elements update.

**Then the LoveLab task (learner chooses colours):**
- In `assets/editor.css`, identify where studio `--primary` is used and where button colours are still hard-coded.
- Refactor **one** primary button style to use variables rather than duplicating colours, while keeping legible text and visible focus feedback.
- Test normal / hover / keyboard focus, wide and mobile layouts; verify other buttons still work.
- Explain why modifying `assets/editor.css` changes the **studio**, while the exported mini-site is controlled by `src/story.css`.
- Show a small diff and commit it on `develop`.

**Acceptance:** no layout breakage, accessible focus indication, text remains readable, learner can describe each rule and adjust the palette without AI writing the CSS.

## Curated resources for later stages (do not study them all now)

- [MDN — Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development): HTML, CSS, JavaScript foundations and challenges.
- [The Odin Project — Foundations](https://www.theodinproject.com/paths/foundations/courses/foundations): hands-on sequence with standalone practice projects.
- [The Odin Project — DOM manipulation and events](https://www.theodinproject.com/lessons/foundations-dom-manipulation-and-events): JavaScript event and DOM exercises.
- [Supabase — Auth](https://supabase.com/docs/guides/auth) and [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security): learn and **test** authentication vs authorisation before pairing or messaging.

## Next major project: scientific helium modelling (separate track)

This is **not** a quick JavaScript feature. Keep its own research roadmap when work starts. The intended progression discussed earlier is:

1. **Scientific computing foundation:** Python, NumPy/SciPy, numerical integration, solving ODE/PDEs, reproducible notebooks, tests, uncertainty and validation. Practise small known physics problems first.
2. **Helium thermophysical core:** collect vetted literature/property models and define regimes covering **He I, the lambda transition (near 2.17 K at saturated vapour pressure), and He II**. State each model's valid temperature/pressure range, units and assumptions. Compare against reference data.
3. **Physics-based experiments:** progressively test Monte Carlo and physics-informed neural network (PINN) approaches against simpler baselines and known analytical/reference behaviour. Do not assume either technique automatically improves accuracy.
4. **CFD interface:** learn OpenFOAM from canonical benchmark cases, then couple only validated thermophysical/transport outputs with an appropriate solver/model. He II two-fluid/superfluid effects may require custom modelling rather than default solvers.
5. **Research-grade outcome:** convergence and sensitivity studies, uncertainty/error plots, versioned inputs, reproducibility, and clear separation of validated results from speculative extensions.

Entry resources (for later): [NumPy Learn](https://numpy.org/learn/), [OpenFOAM documentation](https://www.openfoam.com/documentation/), primary helium thermodynamics and superfluid literature selected at project start. **No automatic transfer:** web app skills help with software habits; helium physics/numerics require their own independent study and validation.

## Learning log template

After each lesson, record:

- **Topic & docs read:**
- **Analogous exercises solved without AI:**
- **LoveLab change / commit:**
- **What I could explain without help:**
- **Hints used (none / question / concept / pseudocode / code):**
- **Tests, unexpected results, follow-up question:**

**Graduation rule for each skill:** solve one analogous exercise and one variation without copying the model answer, explain why they work, and verify the behaviour. Progress is mastery-based, not calendar-based.

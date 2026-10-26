# LoveLab — Developer Learning Guide 👩🏻‍💻


> **Learning contract (26 October 2026):** Before any LoveLab learning task, provide one or two focused sources and 2–3 analogous practice exercises, then let the owner implement the actual feature. Give hints in stages; provide full code only by request. See [Independent Learning Path](INDEPENDENT_LEARNING_PATH.md) for the complete method, CSS starter and helium progression.

This is an intentionally beginner-friendly tour of the project's architecture. Read one file, change one thing, test it, and commit the change.

## Map of responsibilities

| File | Responsibility | Your first experiment |
|---|---|---|
| `index.html` | Semantic editor UI | Add a subtitle under the logo |
| `assets/editor.css` | Editor look and responsive layout | Adjust the button radius |
| `js/templates.js` | Preset story data | Change a line in the Bubu template |
| `js/i18n.js` | Translation keys and UI labels | Translate one new label in all 3 languages |
| `js/app.js` | Editor state, DOM events, preview, local storage and exporting | Add a character counter to a text input |
| `src/story.html` | Exported mini-site markup | Add a note below the card |
| `src/story.css` | Exported themes | Modify Alien palette |
| `src/story.js` | Runtime for answer choices | Change a success animation icon |
| `tools/build.mjs` | Creates the single-file export template | Trace each replacement in the build process |

## 🔍 How a button works

1. Editor fields update a `project` object in `js/app.js`.
2. `preview()` calls `makeStandalone(project)`.
3. The standalone story template is filled with the project data.
4. `src/story.js` runs the choices inside the iframe.
5. Clicking a button updates the story `state` and re-renders it.

**Vocabulary:** DOM, event listener, `localStorage`, state, serialization, bundling, lexical scope, escaping.

## Three exercises (do not just copy the answer)

### Exercise 1: Add a palette

- Add a palette ID in `window.LL_THEMES` in `js/templates.js`.
- Add its CSS variables in `src/story.css`.
- Add the translation key in `js/i18n.js` in all three languages.
- Update `safeProject()` indirectly: it already obtains permitted palette IDs from `LL_THEMES`.
- Build the story template and test theme selection.

### Exercise 2: Add a fourth language

- Add a new `<option>` to `index.html`.
- Add translated UI keys in `js/i18n.js`.
- Add complete story presets for that language in `js/templates.js`.
- Add language metadata and translations in `src/story.js`.
- Update supported language IDs in `js/app.js`.
- Run `node tools/build.mjs` and test previews and downloads.

### Exercise 3: Debug a branching issue

- Change one choice to `next` on the last scene.
- Predict what will happen by reading `choose()` in `src/story.js`.
- Test your prediction in browser DevTools.
- Save the result and make a Git commit explaining the behavior.

## Git workflow

```bash
git status
git add index.html assets/editor.css js/app.js
git commit -m "Explain the feature I added"
git push
```

Choose exact files instead of `git add .` when you want tighter control over staged changes. Run `git diff --staged` before committing. Never commit passwords or API keys.

## Rebuild notes

The editor loads `js/story-template.js` directly for compatibility with opening `index.html` as a local file. Whenever you modify `src/story.js`, `src/story.css`, or `src/story.html`:

```bash
node tools/build.mjs
```

After rebuilding, commit both your source change **and** the generated `js/story-template.js`. No npm packages are needed.

## Quick QA checklist

- [ ] Try all 6 story templates.
- [ ] Switch Turkish → English → German and reload a template.
- [ ] Test at least one happy and one respectful-decline ending.
- [ ] Verify the runaway button yields a real decline after two dodges.
- [ ] Download HTML and open the exported file.
- [ ] Backup a JSON project and restore it.
- [ ] Test phone-width layout via Firefox Responsive Design Mode.

**Goal:** learn why each change works. The project is yours to develop further. 💗

To regenerate the three sample surprise sites after editing story code: `node tools/create-examples.mjs`.

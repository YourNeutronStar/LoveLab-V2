# LoveLab — Product Roadmap 💌

> **Create a tiny moment worth sharing.**
>
> **Status:** Planning for V3. The V2 editor is already live. Dates and implementation choices are provisional.

## Product vision

LoveLab is a private, creative space for two people to **create, send, experience, and respond to interactive moments**—invitations, letters, mini-stories, and surprises—without switching to another messaging platform just to reply.

**Core principle:** LoveLab must remain useful as an independent product. Integrations with other apps are optional enhancements, not dependencies.

## What already exists — V2 ✅

- Six story templates and six visual themes.
- Turkish, English, and German interface.
- Interactive story editor with branching choices.
- Live preview, standalone HTML export, and local project backups.
- Static GitHub Pages deployment.

> V2 is a client-side editor, **not** yet a multi-user service. Do not present planned account, pairing, or private-message features as already available.

## V3 — Private Universe (MVP) 🎯

**Goal:** Two people can register, explicitly connect, exchange private messages, and send/respond to a LoveLab invitation **inside the app**.

### P0 · Must ship

- [ ] **Authentication:** secure sign-up/sign-in, email verification or equivalent, session management, password/account recovery.
- [ ] **Pseudonymous profiles:** unique handle/avatar; no public real name requirement. Keep login email private.
- [ ] **Pairing:** invitation + affirmative consent from both accounts; **at most one active pair per user**.
- [ ] **Pair-only access:** a shared space appears only after mutual approval; pending accounts cannot read private pair data.
- [ ] **Private messaging:** send, receive, and view messages within a pair; reliable delivery states and basic error handling.
- [ ] **Experience delivery:** create an interactive LoveLab invitation using the existing editor; send it to the paired person and receive a reply inside LoveLab.
- [ ] **Saved drafts:** prevent accidental loss of an unfinished invitation.
- [ ] **User controls:** mute, archive, block/report, sign out, end a connection, delete account, and request data deletion.
- [ ] **Accessibility and mobile usability:** keyboard support, readable layouts, responsive pages, and basic accessibility checks.
- [ ] **Support contact:** a dedicated project contact channel for feedback, support, and privacy requests.

### V3 acceptance test

1. Account A and account B register with pseudonyms.
2. A invites B; B deliberately approves. Neither account can join a second active pair.
3. A and B can message privately and respond to an interactive invitation.
4. A third authenticated account C cannot discover or read their private messages, drafts, or pair data, including by calling an API directly.
5. Either participant can block contact or leave without needing the other's permission.
6. The existing public V2 editor and GitHub Pages deployment keep working during development.

## V3.1 — Connection & Repair Lab

- [ ] Personal archive and mute preferences.
- [ ] Optional immediate or scheduled connection-ending requests.
- [ ] A scheduled request stays private until sent; it can be cancelled before delivery.
- [ ] Explicit mutual decisions, without disclosing hidden scheduling history to the other person.
- [ ] Optional conversation prompts, apology/clarification letters, and interactive repair templates.
- [ ] Clearly separate **ending the connection** from **deleting stored messages**; specify retention and export policies.
- [ ] Safeguard: blocking and stopping contact work immediately; a repair request must never force someone to remain connected.

> Detailed request-state rules, concurrency handling, notification privacy, and retention timelines need a separate design review before implementation.

## V3.2 — Personalization & PWA

- [ ] Optional roles and playful ranks/badges (never rewards for apologies or relationship conflicts).
- [ ] More themes and reusable experience components.
- [ ] Optional shared memories with clear visibility/consent controls.
- [ ] Installable PWA; evaluate notifications only after consent and privacy review.

## V4 — Optional Partner-App Integration

- [ ] Document an opt-in integration contract/API with the external app's developer.
- [ ] Verify external membership through an authorized mechanism, not a self-declared checkbox.
- [ ] Import permitted theme definitions/assets into LoveLab.
- [ ] Offer opt-in experiences based on explicitly shared data.
- [ ] **One-way separation of relationship state:** LoveLab unlinking must not change the external app's pair, messages, or relationship state.
- [ ] Consider deployment on a subdomain after domain-owner approval and DNS setup.
- [ ] Preserve independent hosting, ownership, data controls, and a graceful fallback if integration is disabled.

**No external-app code, theme assets, identity data, or private content should be copied without authorization and appropriate rights.**

## Security, privacy, and legal baseline 🔒

These are *release prerequisites*, not optional polish.

- **Server-side authorization:** never rely on hidden buttons or client-side state for privacy.
- **Database access rules:** row-level security (if using Supabase/PostgreSQL), least privilege, explicit access tests for strangers and ex-pairs.
- **Atomic pairing:** transactional enforcement of one active pair per user and exactly two members per active pair.
- **Secret management:** never commit server secrets or privileged service keys; client may use only intended public keys.
- **Abuse protection:** rate limits, anti-spam controls, input validation, safe rendering, reporting/blocking, and account recovery protections.
- **Data lifecycle:** private-by-default data, retention rules, export/deletion flows, backup-retention review, and clear consent for external integrations.
- **Documentation:** privacy notice, terms of use, software license decision, attribution and rights review for all illustrations/themes, contact channel.
- **Jurisdiction review:** consider GDPR/KVKK applicability before onboarding real users; seek qualified legal review where needed.
- **Security testing:** at minimum, two legitimate accounts plus an unrelated third account; verify database/API access restrictions.

### Provisional architecture (not implemented)

| Layer | Starting option |
| --- | --- |
| UI | Existing HTML/CSS/JavaScript editor, refactored gradually |
| Authentication | Supabase Auth (candidate) |
| Data | PostgreSQL with RLS (candidate) |
| Realtime | Supabase Realtime or equivalent (evaluate) |
| Hosting | GitHub Pages initially for frontend; reconsider as needs evolve |
| Development | `main` stays deployable; feature work on `develop` and reviewed PRs |

## Idea backlog — Not committed to a release

- More interactive story building blocks and templates.
- Optional mini-games and collaborative experiences.
- Rich theme marketplace or user-made themes (rights/moderation first).
- Enhanced preview, undo/history, reusable drafts.
- Analytics limited to what is necessary, privacy-preserving and clearly disclosed.

### Feature selection rule

Prioritize a feature if it **strengthens the Create → Share → Experience → Respond loop**, solves an observed user problem, and can be maintained safely. Otherwise, park it here.

## Learning-first development policy — independent ownership 🧠

**Goal:** LoveLab is both a product and a path to independent software engineering; the owner, not the assistant, makes implementation decisions and writes learning-task code.

All future lessons follow the [Independent Learning Path](docs/INDEPENDENT_LEARNING_PATH.md): **targeted resource → 2–3 analogous exercises → solo LoveLab task → testing/debugging → code review → learner commit and reflection**. Offer graded hints rather than unsolicited full solutions; provide finished code only when explicitly requested. Track mastery rather than calendar deadlines.

### Learning milestones (parallel with feature roadmap)

- [ ] **CSS and design ownership:** selectors, cascade, variables, accessibility, responsive palettes; practise on separate cards/buttons before changing LoveLab.
- [ ] **Semantic HTML and interfaces:** forms, accessible labels, Flexbox/Grid and settings UI.
- [ ] **JavaScript autonomy:** DOM, events, functions, state and browser-debugger use; practise counters/toggles outside the project.
- [ ] **Git and testing independence:** readable diffs, commits, regressions, simple automated testing.
- [ ] **Backend/security comprehension:** Supabase Auth, SQL, PostgreSQL RLS and real A/B/C-user access tests.
- [ ] **Independent milestone:** research, design, implement, verify and explain one complete small LoveLab feature with AI limited to hints/review.

**Current implementation checkpoint (26 October 2026):** Auth, guest flow, password recovery, profiles and settings are in progress on `develop` and some flows have been tested locally. This is not proof of full independent mastery or production readiness. The public V2 on `main` remains independent.

### Next major scientific project — helium physics 🔬

Following the foundational software stages, create a **separate research roadmap** for He I, the lambda transition, He II/two-fluid behaviour, Monte Carlo and PINN experiments, and possible validated integration with OpenFOAM CFD. First learn scientific Python, numerical methods, model verification, data validity and uncertainty handling. Do not assume generic CFD solvers simulate superfluid He II without additional physics. Details and preliminary learning stages are in [Independent Learning Path](docs/INDEPENDENT_LEARNING_PATH.md).

## Suggested implementation order

1. [ ] Keep V2 intact; work in `develop`.
2. [ ] Write `ARCHITECTURE.md` with user/pair/message/experience models and access rules.
3. [ ] Write `SECURITY.md` with a threat model and authorization test plan.
4. [ ] Build authentication and pseudonymous profiles.
5. [ ] Build mutually approved, exclusive pairing.
6. [ ] Build private messaging with access tests.
7. [ ] Integrate V2 experiences, drafts, delivery, and in-app replies.
8. [ ] Add account/data controls, licensing/privacy documents, and support contact.
9. [ ] Test with a small, opt-in group; fix failures before beta release.

---

**Roadmap policy:** New ideas go into the backlog first. Scope and release order may change based on testing, feasibility, accessibility, security, and real feedback.

_Last updated: 2026-10-26._

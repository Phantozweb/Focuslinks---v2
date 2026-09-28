# FocusLinks — Design & Code Style Guide

> **Purpose:** the single source of truth for how FocusLinks v2 is built — coding conventions, the visual design system, UX patterns, the responsive/full-width rules, and the deployment pipeline. Read this before adding or modifying any component so the app stays consistent.

---

## 1. Project Overview

| | |
|---|---|
| **Product** | FocusLinks — professional network for optometrists (cases, consults, circles, directory) |
| **Stack** | React 19 + TypeScript + Vite 8 + Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Animation** | `motion` (framer-motion v12) via `motion/react` |
| **Icons** | `lucide-react` only |
| **Routing** | **None** — `App.tsx` switches views via state (`ActiveTabType`) |
| **Theme** | Dark-first (default ON), class-based toggle on `<html>` |
| **Entry** | `index.html` → `src/main.tsx` → `src/App.tsx` |
| **Deploy** | GitHub Pages via `.github/workflows/deploy.yml` (auto on push to `main`) |
| **Live URL** | https://phantozweb.github.io/Focuslinks---v2/ |

### Repository map

```
src/
├── App.tsx                  # God component: 20 useState, all domain handlers, view switch
├── types.ts                 # ALL shared types (24 interfaces) — single source of truth
├── main.tsx                 # React root
├── index.css                # Tailwind entry: @theme tokens, dark variant, animations, utilities
├── data/
│   ├── mockData.ts          # MOCK_* constants (users, posts, stories, groups, notifications…)
│   └── mockQaData.ts        # MOCK_TOPICS / MOCK_QUESTIONS (consults)
└── components/
    ├── Header.tsx, FeedView.tsx, UIPost.tsx, ExploreView.tsx, …   # top-level views
    ├── landing/             # marketing site (barrel: index.ts) + videodemo/ phone scenes
    ├── consults/            # consults feature (barrel: index.ts)
    ├── circles/             # CirclesHub, CircleWorkspace, modals
    ├── layout/              # AppSidebar, MobileNavDrawer
    ├── auth/                # PopupLoginModal
    ├── common/              # DoctorAvatar
    └── membership/          # MembershipPage, GrowthMilestones
```

### App shell architecture

```
App.tsx
├─ isNewUserLanding=true → LandingPage (home | about | membership sub-views)
└─ app shell: <div class="min-h-dvh flex">
     ├─ AppSidebar        hidden lg:flex · w-64 xl:w-72 2xl:w-80 · h-dvh sticky
     ├─ main column       flex-1 flex flex-col min-w-0
     │    ├─ Header       sticky top-0 z-20 · h-16 · blur backdrop
     │    └─ <main>       THE single width/gutter owner (see §5.1)
     │         └─ switch(currentTab): FeedView | ConsultsView | ExploreView |
     │            CirclesView | DoctorsDirectoryView | AnalyticsView |
     │            LinkedInProfileView | SettingsView
     ├─ MobileBottomNav   lg:hidden · fixed bottom (tablets + phones)
     └─ overlays (always mounted, self-gated)
```

**Tabs (9):** `feed | consults | qa | gallery | groups | doctors | analytics | profile | settings`
(`qa` → ConsultsView, `gallery` → ExploreView, `groups` → CirclesView).

---

## 2. Coding Conventions

### 2.1 Components

- **One component per file.** File name = component name, PascalCase (`FeedView.tsx` → `FeedView`). Folders lowercase.
- **Export style:** named arrow-function components typed with `React.FC<Props>`:

```tsx
interface AppSidebarProps {
  currentTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentTab, onSelectTab }) => {
```

- **Props interface** is declared in the same file, directly above the component, named `<Component>Props`.
- Only `App.tsx` uses `export default function App()`.
- Barrel files (`index.ts`) exist for `landing/` and `consults/`; import from them when available.

### 2.2 TypeScript

- All shared object shapes are `interface` in **`src/types.ts`** — never redefine domain types locally.
- Inline string-literal unions for closed sets (`'pearl' | 'article' | 'case' | 'poll'`), defined once and imported.
- `useState` with explicit generic in App.tsx (`useState<boolean>(true)`); inference is fine in leaf components.
- Event handlers typed with React pseudo-classes: `React.FormEvent`, `React.MouseEvent`, `React.ChangeEvent<HTMLInputElement>`.
- **No `any`** in new code. Use the real type or a precise union.
- IDs for locally-created entities: `` `${prefix}-${Date.now()}` ``.

### 2.3 State & handlers

- **Domain state lives in App.tsx** (single source) and is prop-drilled 1–2 levels. Feature-local UI state (open tabs, hover, local filters) stays inside the feature component.
- **Naming law:** internal handlers are `handleX` (`handleLikePost`), props are `onX` (`onLikePost`). Never mix.
- Immutable updates with the `prev =>` updater form:

```tsx
setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, liked: !p.liked } : p)));
```

- **Auth gate:** every mutating action must be wrapped — if logged out, open the login modal:

```tsx
onLikePost={(postId) => {
  if (!isLoggedIn) { setIsPopupLoginOpen(true); } else { handleLikePost(postId); }
}}
```

- Memoize derived lists in hot views with `useMemo` (see `CirclesHub.tsx`, `ExploreView.tsx` for house style).

### 2.4 Imports

Order (blank-line separated groups):
1. `react`
2. `motion/react`
3. `lucide-react` (multi-line)
4. types (`../types`)
5. sibling/child components
6. `../data`

Use relative paths. Every file starts `import React, { useState, … } from 'react'`.

### 2.5 Comments

- Lowercase single-line `//` purpose labels above logic blocks.
- JSX section dividers with numbered banners:

```tsx
{/* ============================================================== */}
{/* 1. CLINICAL PEARLS (DAILY ROTATING OPTOMETRIC CASES)           */}
{/* ============================================================== */}
```

### 2.6 Animation (motion/react)

Inline props (no shared variants). House recipes:

| Element | Recipe |
|---|---|
| Cards entering | `initial={{ opacity: 0, scale: 0.97 }}` → `animate={{ opacity: 1, scale: 1 }}`, `duration: 0.2`, `layout` on masonry cards |
| Modals | `opacity + scale(0.94–0.98) + y: 15–25`, duration 0.2–0.25 or `ease: [0.16, 1, 0.3, 1]`, wrapped in `AnimatePresence` |
| Landing sections | `y: 20–40 → 0`, staggered `delay: 0.1/0.15/0.2/0.25` |
| Tab indicators | sliding pill via `layoutId` |
| Springs | `type: 'spring', stiffness: 100–250, damping: 14–25` |

Do **not** use `tailwindcss-animate` classes (`animate-in`, `slide-in-from-*`, `fade-in`, `zoom-in-95`) — the plugin is not installed; existing occurrences are no-ops scheduled for removal.

### 2.7 Data

- All demo data lives in `src/data/`, typed (`export const MOCK_POSTS: ClinicalPost[] = …`), `MOCK_*` plural-caps naming, kebab-case string IDs (`'doc-sirenjeev'`), Unsplash images with `?w=400&auto=format&fit=crop&q=80`, human timestamps (`'2h'`).
- **Do not** put Tailwind class strings inside data objects or components' demo payloads — styling belongs in JSX.

---

## 3. Visual Design System

### 3.1 Design language

> Dense, dark-first professional feed aesthetic — "LinkedIn-grade information density in a premium clinical night theme." Near-black blue-tinted surfaces separated by 1px hairlines, a blue→indigo→sky gradient as the single brand signature, heavy compact typography, soft geometry (`rounded-xl`→`3xl`), glassmorphism and drifting ambient glows.

### 3.2 Color tokens

| Role | Light | Dark |
|---|---|---|
| Page canvas | `bg-neutral-50` | `bg-[#0c0c11]` (shell) / `bg-[#101010]` (body) |
| Card surface | `bg-white` | `bg-[#161618]` / `#18181b` / `#202024` (highest) |
| Input well | `bg-neutral-50/50`, `bg-neutral-100/70` | `bg-[#18181b]`, `#15151c` |
| Primary text | `text-neutral-900` | `text-white` / `text-neutral-100` |
| Secondary | `text-neutral-600` / `700` | `text-neutral-300` / `200` |
| Muted | `text-neutral-500` | `text-neutral-400` |
| Hairline borders | `border-neutral-200(/60–/90)` | `border-neutral-800(/60–/90)` |

**Dark surface ladder** (near-blacks with blue/violet cast): `#0c0c11` page → `#111115`–`#141418` wells → `#161618`–`#18181b` cards → `#1f1f23`/`#202024` elevated. Pick the next rung up for elevation; don't invent new hexes.

**Brand accent:** `bg-blue-600` (+ `hover:bg-blue-700`), `text-blue-600 dark:text-blue-400`.
**Signature gradient:** `bg-gradient-to-r/tr from-blue-600 via-indigo-600 to-sky-500` — logo tiles, CTAs, avatar fallbacks, modal top bars (`h-1` gradient bar).
**Selected-state tint:** `bg-blue-50 dark:bg-blue-950/40–50` + `border-blue-200/60 dark:border-blue-900/40–50`.
**Glows:** `shadow-blue-500/20–30` on CTAs; focus `ring-blue-500/20`.

**Semantic:** emerald = verified/success/live (`text-emerald-600 dark:text-emerald-400`, live dot `bg-emerald-500 animate-pulse`), rose = like/urgent (`text-rose-500`, badge `bg-rose-500`), amber = pearls/flame (`text-amber-500–600`, `animate-flame-pulse`), purple = polls/management. Content-type color coding: **pearl=amber, article=blue, poll=purple, case=emerald**.

**Overlays:** `bg-black/60–90` (+ `backdrop-blur-sm/md`); image scrims `bg-gradient-to-t from-black/90 via-black/45 to-black/30`.

### 3.3 Typography

- **UI face:** Plus Jakarta Sans (300–800) — wired via `@theme { --font-sans: … }` in `index.css`; body font applied in `index.html`.
- **Mono:** JetBrains Mono — wired via `@theme { --font-mono: … }`; use `font-mono` for membership IDs, image metadata chips, timestamps.
- **Scale:** `text-xs` is the workhorse (dense professional UI); `text-sm` for body emphasis; micro-labels `text-[9px]`/`text-[10px]`/`text-[11px]` uppercase.
- **Weights:** headings `font-black`/`font-extrabold`; buttons/labels `font-bold`; body `font-medium`.
- **Tracking:** `tracking-wider` uppercase micro-labels, `tracking-tight` headings; `leading-relaxed` body copy.
- **Fluid display sizes (new):** `text-display-sm`, `text-display-md`, `text-display-lg`, `text-display-xl` — clamp()-based tokens in `@theme` that scale continuously 360px→1600px. Use these for page H1s and hero headings instead of `text-3xl sm:text-5xl …` ladders.

### 3.4 Shape, depth & effects

| Token | Usage |
|---|---|
| `rounded-xl` | buttons, inputs, icon tiles (default) |
| `rounded-2xl` | cards, story tiles, drawer panels |
| `rounded-3xl` | section shells, large modals |
| `rounded-full` | pills, avatars, dots |
| `shadow-xs` / `shadow-2xs` / `shadow-3xs` | resting cards (flat-leaning) |
| `shadow-2xl` | modals/drawers |
| `backdrop-blur-xl` | sticky header |
| `backdrop-blur-sm/md` | overlays, chips |
| `blur-3xl` orbs | ambient landing/decoration (parents must clip — see §5.4) |

### 3.5 Spacing rhythm

- Gaps: `gap-2` dominant, `gap-1`/`gap-1.5` for icon clusters, `gap-3`/`gap-4` for cards.
- Card padding `p-4 sm:p-5` (or `p-6`); hero sections `p-6 sm:p-8 md:p-10`.
- Pills: `px-3 py-1.5` (or `py-0.5` for micro).
- Sections separated by `space-y-6` on the view root.

### 3.6 Component recipes (verbatim)

**Primary button**
```
px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold
transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-95
```

**Gradient CTA**
```
rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600
hover:from-blue-700 hover:to-sky-700 text-white font-bold shadow-md shadow-blue-500/20
active:scale-98 transition-all
```

**Ghost / icon button (44px touch target on touch devices)**
```
h-10 w-10 lg:h-9 lg:w-9 rounded-xl flex items-center justify-center
text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800
transition-colors cursor-pointer
```

**Badge / status pill**
```
text-[10px] font-bold px-2.5 py-1 rounded-xl
bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300
border border-blue-200/60 dark:border-blue-900/50
```

**Card section shell**
```
rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90
bg-white dark:bg-[#161618] p-4 sm:p-5 shadow-xs
```

**Input**
```
rounded-xl border border-neutral-200 dark:border-neutral-800
bg-neutral-50/50 dark:bg-[#18181b] text-xs text-neutral-700 dark:text-neutral-300
placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20
```

**Avatar (DoctorAvatar)** — `rounded-full object-cover shadow-xs`, halo `ring-2 ring-blue-500/20`, fallback = gradient initials `bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500`, verified badge `ShieldCheck` on `bg-blue-600` with white border.

**Sidebar nav item** — active: `bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold` + gradient icon tile; inactive: `text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50`.

**Glossy headline** — `<span className="glossy-shine-text-light dark:glossy-shine-text-dark font-black">` (12s shine sweep, defined in `index.css`).

### 3.7 Iconography & imagery

- lucide-react only. Size ladder: `h-3 w-3` → `h-3.5 w-3.5` → `h-4 w-4` (default) → `h-5 w-5`; status dots `h-1.5 w-1.5`–`h-2.5 w-2.5`.
- Icons inherit parent text color; liked heart = `fill-rose-500 text-rose-500`.
- Photos: Unsplash URLs with sizing params; emoji used sparingly as micro-illustration (💡 pearls, 🎓 student, 🔬 clinical).

---

## 4. UX Patterns

### 4.1 Navigation

- **Sidebar (`lg+`)**: Clinical Workspace (Feed, Consults, Explore, Circles, Directory) → Intelligence (Analytics, My Profile, Settings) → Visitor Portal. Identity card + logout at bottom.
- **MobileBottomNav (`<lg`)**: Feed · Consults · **[+ FAB]** · Circles · Directory. Active tab = color + dot under icon. `min-w-[46px] min-h-[44px]` targets.
- **MobileNavDrawer (`<lg`)**: opened from Header hamburger; full nav clone + theme toggle + identity.
- **Header**: breadcrumb (title + subtitle) at `lg+`; brand + Post + avatar below `lg`; search field `md+`, collapsible bar below.
- All tab switches go through `handleSelectTab` → scrolls to top smoothly. No URL sync (state-only SPA).

### 4.2 Entry & auth flow

```
Landing ─"Enter FocusLinks"─► app (demo user, Observer Mode if not logged in)
   ├─"Log In"────► PopupLoginModal (Google | Membership-ID, status machine,
   │                onSuccess → isLoggedIn=true, pendingTab || 'feed')
   └─"Get Free ID"─► AuthGateModal (login ⇄ 2-step onboarding: profile → ID upload,
                    verifying → success → auto-login)
Logout → isLoggedIn=false → back to landing
```

Observer mode: pulsing "Observer Mode" badge in header; every mutation attempt opens the login modal (see §2.3 auth gate). Bookmark/"Vault" is intentionally ungated.

### 4.3 Overlay inventory & rules

| Overlay | Mobile | Desktop |
|---|---|---|
| **UIPost** (composer) | bottom sheet `items-end rounded-t-3xl` + drag handle | centered `sm:max-w-3xl lg:max-w-4xl` |
| **StoryModal** | **full-screen** `h-dvh rounded-none` | centered `sm:max-w-2xl sm:max-h-[90dvh]` |
| **AuthGateModal / PopupLoginModal** | centered, `p-4` | centered `max-w-md` / `max-w-lg` |
| **EditProfileModal** | centered | `max-w-2xl`, inner scroll |
| **NotificationsDrawer** | full-width slide-over | right drawer `sm:max-w-md` |
| **ConsultDetailDrawer** | full-width slide-over | `sm:max-w-2xl lg:max-w-3xl` |
| **EventsCalendarModal** | centered | `max-w-5xl` (widest) |
| **AskConsultModal / ProposeCircleModal** | centered | `max-w-2xl` / `max-w-lg` |
| **Image lightbox (Feed)** | full-screen | centered `sm:max-w-5xl`, `cursor-zoom-out` |

**Overlay canon:** wrapper `fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4` + backdrop `bg-black/60–90 backdrop-blur-sm/md`; panel `w-full sm:max-w-* max-h-[90dvh] overscroll-contain rounded-none sm:rounded-*`; close = ✕ button always; backdrop click close is optional per-overlay; Escape is currently only handled in PopupLoginModal.

### 4.4 Feedback & states

- **Toasts:** bottom-right, inverted colors (`bg-neutral-900 text-white dark:bg-white dark:text-neutral-900`), 2.5–3s, y-slide. Local to view (Feed/Explore vault saves, Settings save).
- **Optimistic updates everywhere** (like/repost/bookmark/vote/endorse/follow/join) — no rollbacks.
- **Empty states:** `rounded-3xl` card + icon + headline + hint + action button (see ConsultsView, CirclesHub).
- **Async simulation:** status machines (auth `verifying → success`, membership `verifying_db → generating_id`, composer `Publishing…`).
- Horizontal browsing = native scroll + `snap-x` (+ `scrollbar-none`), sometimes arrow buttons — no JS touch handlers.

### 4.5 View interaction models (summary)

- **FeedView:** stories carousel → stream tabs (For You/Following/Vault) → modality filter pills → hashtag chips → composer prompt → CSS masonry (`columns-*`) of clinical cards (case/article/pearl/poll) with hover magnifier + vault save + like/comment/repost footer.
- **ConsultsView:** gradient hero + search → topic card gallery → 6 filter pills → prompt box → 12-col split: consult cards (consensus/answers/write tabs, up/down votes) `lg:col-span-8` + sticky right rail `lg:col-span-4` (Vault, faculty leaderboard, stats, trending).
- **Circles:** Hub (events strip + joinable circle grid) ⇄ Workspace (Discord-style: channel rail, chat/protocol/poll/voice stages, members panel toggle) with crossfade.
- **DoctorsDirectory:** spotlight carousel → filters (search + specialty + toggles + sort) → grid/compact cards with optimistic Connect + Quick Consult modal.
- **LinkedInProfileView:** banner + avatar → 5 underline tabs → endorsement engine (optimistic, avatar stacks) → posts by doctor.
- **AnalyticsView:** time-range pills → KPI cards → CSS bar chart + modality distribution → top cases → COPE/CPD tracker.
- **SettingsView:** left tab rail + toggle panels + saved toast.

---

## 5. Responsive & Full-Width System

> **Goal:** fluid from **320px phones → tablets → laptops → 1600px+ desktops**, full-width with no content islands. Implemented via a single width-owner pattern + fluid tokens.

### 5.1 The width-owner rule (most important)

`<main>` in `App.tsx` is the **only** place that caps width and owns horizontal gutters:

```
flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-4 sm:pt-6 pb-28 lg:pb-12
```

- Every view root is just `w-full` (+ `space-y-*`) — **never** add `max-w-* mx-auto` or your own `px-*` gutters to a view root (that recreates the double-cap/double-gutter bugs).
- Readability caps are allowed *inside* views for document-style content: profile `max-w-[1200px] mx-auto`, long-form prose `max-w-[72ch]`.
- Bottom padding: `<main>` owns it (`pb-28` clears the bottom nav below `lg`; `lg:pb-12` when nav disappears). Views don't add their own `pb-*`.

### 5.2 Breakpoint strategy

| Prefix | Starts at | Used for |
|---|---|---|
| `sm:` | 640px | modal sheet→panel, minor grid bumps |
| `md:` | 768px | search field, grid step-ups, hero rows |
| `lg:` | 1024px | **shell switch**: sidebar appears, bottom nav/hamburger disappear; main 12-col splits |
| `xl:` | 1280px | gutter growth, 4–5 col grids, sidebar 72 |
| `2xl:` | 1536px | max density: main gutters 16, sidebar `w-80`, grid +1 col, search `w-96` |

Grid recipes by content type (already applied):

| Surface | Classes |
|---|---|
| Feed masonry | `columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5` |
| Image gallery tiles | `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6` |
| Explore grid | `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6` |
| Doctor/circle cards | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4` |
| KPI stats | `grid-cols-2 lg:grid-cols-4` |
| Data tables | scroll wrapper `overflow-x-auto` + inner `min-w-[700px]` (never stack a time axis) |

### 5.3 Fluid typography

Use the `@theme` display tokens for page-level headings (they clamp 360px→1600px):

```html
<h1 class="text-display-md …">        <!-- section H1 (clamp 1.75–2.5rem) -->
<h1 class="text-display-lg xl:text-display-xl …">  <!-- hero (clamp 2–3.5rem, →4.25) -->
```

Never clamp body text; `text-xs/sm/base` is fixed by design (density).

### 5.4 Viewport, safe areas & guards

- `index.html`: `viewport-fit=cover` (required for `env(safe-area-inset-*)`).
- `index.css` base: `html, body { overflow-x: clip; overscroll-behavior-y: none; -webkit-tap-highlight-color: transparent; }` — decorative `blur-3xl` orbs can never cause horizontal scroll.
- Custom utilities defined in `index.css` (v4 `@utility`): `scrollbar-none`, `no-scrollbar`, `safe-area-pb` (iPhone home bar), `shadow-3xs`.
- Full-height shells use `h-dvh`/`min-h-dvh` (never `h-screen` — mobile URL bars); modal caps use `max-h-[90dvh]`.
- Dark mode is **class-based**: `@custom-variant dark (&:where(.dark, .dark *))` in `index.css` makes the in-app toggle work regardless of OS preference. Don't remove it.
- Touch targets: interactive controls ≥44px on touch (`h-10 w-10 lg:h-9 lg:w-9` pattern on header buttons); `hover:` is enhancement-only.
- Landing marketing sections keep `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12` (they're composed hero bands, not data UI) — that's the sanctioned exception to §5.1.

### 5.5 Adding a new view (checklist)

1. Root: `<div className="w-full space-y-6">` — no max-w, no px, no pb.
2. Grids follow §5.2 recipes; add a `2xl:` tier when a grid is the main surface.
3. H1 uses `text-display-md` (or `lg/xl` for hero).
4. Modals follow the §4.3 overlay canon.
5. If a wide table/chart: `overflow-x-auto` wrapper + `min-w-*` inner.
6. Wire into `App.tsx` switch + sidebar + bottom nav + `ActiveTabType` (in `types.ts` — see §7 debt item 1).

---

## 6. Build & Deployment

- **Deploy pipeline:** `.github/workflows/deploy.yml` — on push to `main` (or manual dispatch): Node 22 → `npm ci` → `vite build` → copy `index.html` to `404.html` (SPA fallback) → deploy artifact to **GitHub Pages**. Runs entirely on GitHub.
- Base path: `vite.config.ts` derives `base` from `GITHUB_REPOSITORY` in CI (`/Focuslinks---v2/`), `/` locally. Don't hardcode asset URLs.
- Local: `npm run dev` (port 3000) · `npm run build` · `npm run lint` (= `tsc --noEmit`).
- Repo is public (Pages free-tier requirement). Live: https://phantozweb.github.io/Focuslinks---v2/

---

## 7. Known Debt / Improvement Backlog

Prioritized by a 5-agent audit (coding style, design system, UX, responsiveness, strategy):

1. **`ActiveTabType` is declared 4×** (App.tsx, Header.tsx, AppSidebar.tsx, MobileBottomNav.tsx) — move the single definition to `types.ts` and import everywhere.
2. **Auth-gate wrapper copy-pasted ~10× in App.tsx** — extract a `withAuth(handler)` helper or an `AppContext`.
3. **Like-toggle reducer duplicated 4× in App.tsx** — extract `togglePostFlag(posts, id, flag)`.
4. **Tailwind class strings stored in data** (`QuestionTopic.gradient`, `bannerColor`, milestone class bundles) — move styling back into JSX maps.
5. **Dead code:** `CreatePostModal.tsx` (unreferenced re-export shim), `OptomShorts.tsx` (~826 lines, orphaned), `GroupsView.tsx` (orphaned), vestigial `pendingTab`, unused deps (`@google/genai`, `express`, `dotenv`).
6. **Dead utility classes still present:** `animate-in`, `slide-in-from-*`, `fade-in`, `zoom-in-95` (no plugin) — replace with `motion/react` or delete.
7. **Escape-key/backdrop-close/focus-trap policy inconsistent across overlays** — standardize (see §4.3 canon).
8. **No memoization in the hottest paths** (`displayPosts` in App.tsx, `filteredPosts` in FeedView) — apply the `useMemo` house style.
9. **AppSidebar duplicate nav-button blocks** (Workspace vs Intelligence sections) — extract a `SidebarNavItem` component.
10. **Consults right rail has no mobile fallback** — the saved-filter toggle is unreachable below `lg`; consider a collapsible section on mobile.
11. **App.tsx is 935 lines** — candidate split: `AppHandlers` hooks or Context per domain (posts, questions, circles).
12. Bundle is ~1.1 MB JS (280 KB gzip) — consider route/view-level code splitting with dynamic `import()`.

*Style-guide maintained by the team; update this file whenever a convention changes.*


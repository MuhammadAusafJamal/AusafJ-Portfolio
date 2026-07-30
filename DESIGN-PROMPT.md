# Design Prompts

Paste-ready prompts for Figma Make / Figma AI, Google Stitch, v0, Lovable, or any text-to-UI tool.
Derived from `PLAN.md` §4 (theme) and §5 (information architecture).

## How to use

| Tool                      | How                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Google Stitch**         | One screen per prompt. Each block below is self-contained — paste one, generate, then move to the next. Do not paste two screens at once. |
| **Figma Make / Figma AI** | Paste the Style Contract first, then the screen prompt, in the same message.                                                              |
| **v0 / Lovable / Bolt**   | Paste Style Contract + screen prompt. Add "React + Tailwind, no external UI library."                                                     |

Generate in this order: Homepage desktop → Homepage mobile → Case study → Projects index → Blog → Command palette → About. Each later screen inherits decisions from the first, so fix the homepage before moving on.

**Always regenerate rather than patch.** These tools degrade badly on follow-up edits. Change the prompt, run it again.

---

## 0. Style Contract

The shared block. Every screen prompt below already includes it, so you only need this separately if you are writing your own prompt.

```text
STYLE CONTRACT — apply to every element, no exceptions.

Theme: dark mode default, near-black canvas, single warm amber accent, generous
whitespace, one centred content column. Calm and editorial, not flashy. It should
read like a senior engineer's personal site, not a SaaS landing page.

Colors (dark):
  background        #0B0B0C
  surface (cards)   #141416
  surface raised    #1C1C20
  border            #26262B
  text primary      #EDEDEF
  text secondary    #A1A1AA
  accent            #E8A33D
  accent hover      #F5B85A
  accent tint fill  #3A2E17
  success           #4ADE80

Typography:
  Headings and body: Geist Sans (fallback Inter). Weights 400 and 600 ONLY.
  Monospace: Geist Mono (fallback JetBrains Mono) for tags, metrics, code, timestamps.
  Sizes: 13 / 14 / 16 / 20 / 25 / 31 / 39 / 49 px. Use no other size.
  Body 16px, line-height 1.65. Headings line-height 1.15, letter-spacing -0.02em.
  Paragraph max width 65-75 characters.

Spacing: 4px base. Use ONLY 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
  Card padding 24. Gap between elements 16. Between blocks 32.
  Between page sections 96 desktop / 64 mobile.

Layout: page max-width 1080px, centred. Prose max-width 720px.
  Gutters 32 desktop / 20 mobile. SINGLE COLUMN — no sidebars, no split heroes.

Shape: border-radius 6px on tags and inputs, 12px on cards and buttons,
  fully round on avatars. Borders always 1px #26262B.
  NO drop shadows anywhere — separate surfaces with border + background shift only.

Icons: Lucide, 16px inline / 20px standalone, stroke in currentColor.

ACCENT BUDGET — the strictest rule in this contract.
  Amber is a spotlight, not a paint. At most THREE amber elements are visible in
  any one screenful. If a fourth appears, the design is wrong.

  Amber is ALLOWED on: the primary button, links and hover states, the active
  nav item, tag text, metric values, timeline dots, and status dots.

  Amber is FORBIDDEN on: section headings, the hero name, the hero tagline,
  body copy, skill list items, dates, labels, and card titles. All of those are
  #EDEDEF (primary) or #A1A1AA (secondary).

  Section headings in particular are #EDEDEF, weight 600 — never amber. A page
  whose every heading is accented reads decorative, not deliberate; hierarchy
  comes from size and weight, not from color.

BANNED — do not generate any of these:
  gradient backgrounds, glassmorphism, glow effects, neon, purple or blue accents,
  drop shadows, skill percentage bars, animated counters, testimonial carousels,
  hero images of abstract 3D shapes, stock photos, emoji as icons, more than one
  accent color, more than two font weights, centre-aligned body paragraphs.
```

---

## 1. Homepage — desktop

```text
Design a desktop portfolio homepage (1440px wide) for a software engineer.

STYLE CONTRACT — apply to every element, no exceptions.
Theme: dark mode, near-black canvas, single warm amber accent, generous whitespace,
one centred column. Calm and editorial, like a senior engineer's personal site —
not a SaaS landing page.
Colors: background #0B0B0C, card surface #141416, raised #1C1C20, border #26262B,
text #EDEDEF, secondary text #A1A1AA, accent #E8A33D, accent hover #F5B85A,
accent tint #3A2E17, success #4ADE80.
Type: Geist Sans (fallback Inter), weights 400 and 600 only. Geist Mono for tags,
metrics and timestamps. Sizes 13/14/16/20/25/31/39/49px only. Body 16px at 1.65
line-height. Headings -0.02em letter-spacing. Paragraphs max 70 characters wide.
Spacing: only 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Card padding 24. Section gap 96.
Layout: content max-width 1080px centred, 32px gutters, single column.
Shape: radius 6 on tags, 12 on cards and buttons. 1px #26262B borders. NO shadows.
Icons: Lucide, stroke only.
ACCENT BUDGET — the strictest rule here. At most THREE amber elements visible in
one screenful. Amber is ALLOWED on: primary button, links and hover states, active
nav item, tag text, metric values, timeline and status dots. Amber is FORBIDDEN on:
section headings, the hero name, the hero tagline, body copy, skill items, dates,
labels, card titles — those are #EDEDEF or #A1A1AA. Section headings are #EDEDEF
weight 600, NEVER amber; hierarchy comes from size and weight, not color.
BANNED: gradients, glassmorphism, glow, neon, purple/blue accents, shadows,
skill percentage bars, animated counters, carousels, 3D shapes, stock photos,
emoji icons, more than one accent, more than two font weights.

SCREEN STRUCTURE, top to bottom:

1. Sticky nav, 56px tall, background #0B0B0C at 80% with blur, 1px bottom border.
   Left: monogram "AJ" in mono. Right: text links Work, About, Blog, Contact
   (14px, #A1A1AA, amber on hover), then a sun/moon theme toggle icon, then a
   small pill reading "⌘K" in 13px mono with a 1px border.

2. Hero, 96px top padding. Two elements side by side, text left 60% / photo right 40%:
   LEFT COLUMN, stacked with 16px gaps:
     - a 13px mono line in #A1A1AA reading "Karachi, Pakistan · Open to work"
       with a 6px #4ADE80 dot before it
     - "Muhammad Ausaf Jamal" at 49px, weight 600
     - one sentence at 20px in #A1A1AA: "Software engineer building full-stack
       products with React, Next.js, and Node." Max 2 lines.
     - a 16px line: "2 years at Technyx Systems. BS Computer Science, University
       of Karachi."
     - a button row with 12px gap, 24px top margin: primary button "View resume"
       (amber #E8A33D fill, #0B0B0C text, 12px radius, 12px/24px padding) and
       secondary button "Get in touch" (transparent, 1px #26262B border, #EDEDEF text)
     - a row of three 20px Lucide icons — GitHub, LinkedIn, Mail — in #A1A1AA
   RIGHT COLUMN: a square photo, 320x320, 12px radius, 1px border, no shadow.

3. Section "Selected work". Section heading 25px weight 600 in #EDEDEF — NOT amber,
   and the same goes for every section heading below — with a 14px #A1A1AA
   line under it, then 32px gap, then THREE cards in a 2-column grid (third card
   spans full width). Each card: #141416 fill, 1px #26262B border, 12px radius,
   24px padding, 16px gaps inside:
     - project title 20px weight 600
     - one-line problem statement 16px #A1A1AA, max 2 lines
     - a row of 3-4 stack tags: 13px mono, #3A2E17 fill, #E8A33D text, 6px radius,
       4px/8px padding
     - one metric shown as 25px mono in #EDEDEF with a 13px #A1A1AA label under it,
       e.g. "120ms" / "p95 latency"
     - a footer row with two 14px text links, each with a 16px Lucide icon:
       "Live site" (external-link icon) and "Source" (github icon)

4. Section "Experience". Heading, then a vertical timeline: a 1px #26262B line down
   the left with 8px amber dots on it, entries indented 32px. Each entry has
   company name 16px weight 600, role and dates 14px #A1A1AA on one line, one
   sentence 16px, and a row of small stack tags. Show 4 entries.

5. Section "Skills". Heading, then 5 groups side by side in a row. Each group is a
   14px weight-600 label in #A1A1AA with a vertical list of 14px mono items under
   it. Groups: Languages, Backend, Data, Infra, Tooling. NO bars, NO percentages,
   NO star ratings.

6. Section "Writing". Heading, then 3 stacked rows separated by 1px #26262B lines.
   Each row: title 20px on the left, and on the right a 13px mono date plus an eye
   icon with a view count. Whole row highlights to #141416 on hover.

7. Section "Contact". A single #141416 card, 24px padding, centred text: a 31px
   heading "Let's talk", a 16px #A1A1AA line, an email address at 20px in mono with
   a copy icon beside it, and a row of three social icons.

8. Footer, 64px padding. Left: "© 2026 Muhammad Ausaf Jamal". Right: a 13px mono
   line "Deployed 2h ago" with a #4ADE80 dot, plus a "Source" link. All #A1A1AA.

Every section header sits 96px below the previous section. Nothing is centred except
the contact card and the footer.
```

---

## 2. Homepage — mobile

```text
Design the mobile version (390px wide) of the same portfolio homepage.

Reuse the exact style contract: background #0B0B0C, cards #141416, border #26262B,
text #EDEDEF, secondary #A1A1AA, accent #E8A33D. Geist Sans 400/600, Geist Mono for
tags and metrics. Spacing only 4/8/12/16/24/32/48/64. 20px side gutters. Radius 6 on
tags, 12 on cards. NO shadows, NO gradients, NO glow, one accent only.

MOBILE-SPECIFIC RULES:
- Nav is 56px: monogram left, hamburger icon right. No ⌘K pill on mobile.
- Hero stacks vertically: photo FIRST at 96x96 fully round, then the availability
  line, then the name at 31px, then the positioning sentence at 18px, then the proof
  line at 16px, then the two buttons FULL WIDTH stacked with a 12px gap, then the
  social icon row.
- CRITICAL: name, positioning sentence, proof line, and both buttons must all fit
  above the fold on a 390x844 screen. Nothing below that is allowed above the fold.
- All grids collapse to one column.
- Section gaps drop from 96px to 64px.
- Skill groups stack vertically instead of sitting in a row.
- Every tappable target is at least 44x44px.
- Body text stays 16px — never shrink it.

Show the full page top to bottom: nav, hero, selected work (3 stacked cards),
experience timeline, skills, writing, contact card, footer.
```

---

## 3. Project case study page

```text
Design a desktop project case-study page (1440px) for an engineering portfolio.

Style contract: background #0B0B0C, card #141416, border #26262B, text #EDEDEF,
secondary #A1A1AA, accent #E8A33D, accent tint #3A2E17, success #4ADE80.
Geist Sans weights 400/600, Geist Mono for tags, metrics, dates. Sizes
13/14/16/20/25/31/39px only. Body 16px / 1.65. Spacing only 4/8/12/16/24/32/48/64/96.
Radius 6 on tags, 12 on cards. 1px borders. NO shadows, NO gradients, NO glow.
Article text column is 720px wide and centred. Section gap 48px.

STRUCTURE:
1. Same sticky 56px nav as the homepage.
2. A 14px "← Back to work" link in #A1A1AA, 48px below the nav.
3. Title at 39px weight 600.
4. One-line summary at 20px in #A1A1AA.
5. A meta row of 13px mono items separated by a "·" — Role, 2024–2025, Team of 4,
   and a "Live" pill in #3A2E17 with #E8A33D text.
6. A links row: two buttons, "Visit site" (amber fill) and "View source"
   (bordered), each with a 16px Lucide icon.
7. A cover image, full 720px width, 16:9, 12px radius, 1px border.
8. Body sections, each with a 25px weight-600 heading and 16px paragraphs:
   "Problem", "Approach", "The hard decision", "Outcome", "What I'd change".
9. Inside "Approach", a system architecture diagram: labelled rounded boxes on
   #141416 with 1px #26262B borders, connected by thin #A1A1AA arrows, all labels
   in 13px mono. Flat and technical — no isometric 3D, no illustration.
10. Inside "Outcome", a row of 3 metric cards: value at 31px mono in #E8A33D,
    label at 13px #A1A1AA under it, on #141416 with a 1px border and 24px padding.
11. A "Stack" block: tags grouped under 13px #A1A1AA labels, tags in 13px mono on
    #3A2E17 with #E8A33D text.
12. A bottom row with previous/next project links, separated by a 1px top border.
13. Same footer as the homepage.
```

---

## 4. Projects index

```text
Design a desktop "All projects" index page (1440px) for an engineering portfolio.

Style contract: background #0B0B0C, card #141416, border #26262B, text #EDEDEF,
secondary #A1A1AA, accent #E8A33D, accent tint #3A2E17. Geist Sans 400/600, Geist
Mono for tags. Sizes 13/14/16/20/25/31/39px. Spacing only 4/8/12/16/24/32/48/96.
Content max-width 1080px centred. Radius 6 on tags, 12 on cards. 1px borders.
NO shadows, NO gradients, one accent only.

STRUCTURE:
1. Sticky 56px nav, same as homepage.
2. Page title "Work" at 39px, with a 16px #A1A1AA line under it: "Things I have
   built, and what I learned building them."
3. A filter row: horizontally scrollable pills for All, Node, TypeScript, MongoDB,
   AWS, Python. Inactive pill = transparent with 1px #26262B border and #A1A1AA
   text. Active pill = #3A2E17 fill with #E8A33D text. 6px radius.
4. A 2-column card grid, 24px gap. Each card: #141416, 1px border, 12px radius,
   with a 16:9 cover image flush to the top edge (radius on top corners only), then
   24px padding containing: title 20px weight 600, one-line summary 16px #A1A1AA,
   a row of stack tags in 13px mono, and a footer row with a 13px mono date and two
   icon links.
   On hover the card border becomes #3A3A42 and the title turns #E8A33D.
5. Show 6 cards.
6. Same footer as the homepage.
```

---

## 5. Blog index and post

```text
Design two desktop screens for an engineering portfolio blog (1440px wide).

Style contract: background #0B0B0C, surface #141416, raised #1C1C20, border #26262B,
text #EDEDEF, secondary #A1A1AA, accent #E8A33D, accent tint #3A2E17. Geist Sans
400/600, Geist Mono for dates, tags, code. Sizes 13/14/16/18/20/25/31/39px.
Spacing only 4/8/12/16/24/32/48/96. Radius 6 on tags, 12 on cards. 1px borders.
NO shadows, NO gradients, one accent.

SCREEN A — Blog index. Content max-width 720px centred.
  Sticky 56px nav. Title "Writing" at 39px, with a 16px #A1A1AA subtitle.
  Then a list of 6 posts, each separated by a 1px #26262B line, 24px vertical
  padding: title 20px weight 600, one-line summary 16px #A1A1AA, then a meta row of
  13px mono — date, a "·", reading time, a "·", an eye icon with a view count —
  and 2 small tags. Whole row background shifts to #141416 on hover.

SCREEN B — Blog post. Content max-width 720px centred.
  Sticky nav, then a 14px "← All writing" link. Title at 39px. A 13px mono meta row:
  date · 8 min read · eye icon with view count. A row of tags. Then long-form body
  at 18px with 1.7 line-height, h2 headings at 25px with 48px top margin, a code
  block on #1C1C20 with a 1px border, 12px radius, 14px mono text and a copy icon
  in the top right, and a blockquote with a 2px left border in #E8A33D and #A1A1AA
  italic text. End with a 1px-bordered footer holding previous/next post links.
```

---

## 6. Command palette overlay

This is the signature moment. It must look like a real terminal client, not a search box.

```text
Design a command palette overlay for a developer portfolio, shown over a dimmed
homepage (1440px wide desktop).

Style: page behind is dimmed with rgba(0,0,0,0.6) and a 4px blur. The palette is a
640px-wide panel, horizontally centred, positioned 120px from the top of the screen.
Panel background #141416, 1px #26262B border, 12px radius. NO drop shadow — the
dimmed backdrop provides the separation.

Fonts: Geist Mono throughout — this is a terminal, everything is monospace.
Colors: text #EDEDEF, secondary #A1A1AA, accent #E8A33D, accent tint #3A2E17,
success #4ADE80, border #26262B.

PANEL STRUCTURE, top to bottom:
1. Input row, 56px tall, 16px horizontal padding, 1px bottom border. An amber "❯"
   prompt character, then the typed text "stat" at 16px mono, then a blinking
   1px amber caret. On the far right, a small bordered "esc" pill in 13px mono.
2. A results list. Each row is 44px tall with 16px horizontal padding and holds a
   16px Lucide icon, then the command name in 14px mono #EDEDEF, then the
   description in 14px mono #A1A1AA on the right. The selected row has a #1C1C20
   background and a 2px amber left border.
   Rows:
     status    — ping the API, show live latency        (selected)
     stack     — list skills by group
     whoami    — who I am, in one line
3. Below the list, a result output block on #0B0B0C with a 1px top border and 16px
   padding, showing terminal output in 13px mono:
     ❯ status
     api          ok      42ms      (with a #4ADE80 dot before "ok")
     database     ok      18ms      (with a #4ADE80 dot)
     deploy       2h ago
4. Footer bar, 40px tall, 1px top border, 13px mono #A1A1AA, holding bordered key
   pills: "↑↓ navigate", "↵ run", "esc close".

Feel: precise, dense, technical. Like a real CLI, not a fuzzy search box.
Do not add rounded search-bar styling, magnifying glass icons, gradients, or glow.
```

---

## 7. About page

```text
Design a desktop "About" page (1440px) for an engineering portfolio.

Style contract: background #0B0B0C, card #141416, border #26262B, text #EDEDEF,
secondary #A1A1AA, accent #E8A33D, accent tint #3A2E17. Geist Sans 400/600, Geist
Mono for tags, dates, metrics. Sizes 13/14/16/18/20/25/31/39px. Spacing only
4/8/12/16/24/32/48/96. Prose column 720px centred. Radius 6 on tags, 12 on cards.
1px borders. NO shadows, NO gradients, one accent.

STRUCTURE:
1. Sticky 56px nav.
2. Title "About" at 39px.
3. A 200x200 photo with 12px radius, left-aligned, with three 18px paragraphs of
   first-person bio wrapping beside and below it.
4. Section "Experience" at 25px: a full timeline of 6 roles. Each entry has a 1px
   #26262B left rule with an 8px amber dot, company at 16px weight 600, role and
   dates at 14px #A1A1AA, 3 bullet points at 16px, and a row of stack tags.
5. Section "Skills" at 25px: 6 groups, each with a 14px #A1A1AA label and rows of
   13px mono tags on #3A2E17 with #E8A33D text. Absolutely no bars or ratings.
6. Section "Beyond code" at 25px: two short 18px paragraphs.
7. A closing card on #141416 with 24px padding: 20px heading "Want the short
   version?", a 16px #A1A1AA line, and an amber "Download resume" button.
8. Same footer as the homepage.
```

---

## 8. Judging the output

Reject and regenerate if you see any of these:

- **More than three amber elements in one screenful** — count them; this is the
  failure that actually happens
- An amber section heading, hero name, hero tagline, or skill list item
- More than one accent color, or purple/blue anywhere
- Any drop shadow or gradient
- A skill bar, percentage, or star rating
- Body text below 16px
- Paragraphs wider than ~75 characters
- Section gaps that vary between sections
- A hero where the name, one-liner, and resume button don't all fit above the fold
- Stock photography or abstract 3D shapes
- More than two font weights

Once a screen is right, export the tokens — not the markup. These tools produce
throwaway code; the value is the visual decision, which you then rebuild against
`PLAN.md` §4.

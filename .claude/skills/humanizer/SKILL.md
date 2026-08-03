---
name: humanizer
description: Strips AI writing tells out of prose so it reads like a person wrote it. Use this skill whenever writing or editing any prose for the user — emails, Slack messages, docs, READMEs, commit messages, PR descriptions, blog posts, release notes, ticket descriptions, comments, cover letters, or anything else meant to be read by humans. Also use it when the user says "humanize this", "make this sound less like AI", "rewrite this", "clean this up", "does this sound like ChatGPT", or pastes text and asks for an edit. Trigger it even when the user does not mention AI, tone, or style at all — the default assumption is that every piece of prose leaving this conversation should pass the checks in this skill. Skip it only for code, config, structured data, and math.
---

# Humanizer

Prose written by an LLM has a recognizable fingerprint. This skill removes it.

Two modes, decided by what the user hands over:

- **Write mode** — user asks for new prose. Draft it, then run the self-check before returning it.
- **Edit mode** — user pastes their own text. Fix the tells, keep their voice and their facts, and list what changed.

If unsure which, default to edit mode and preserve their wording wherever it isn't a tell.

## The rule

Nothing in the finished text should be traceable to a template. Every sentence should be one a specific person with an opinion would write about this specific subject.

## Kill list

These are ranked. The first four account for most of the smell.

**1. Negative parallelism.** "Not just X, but Y." "It's not X, it's Y." "Rather than X, this is Y." Delete the setup and state the claim. This is the single loudest tell — check for it twice.

**2. Rule of three.** Three adjectives, three examples, three clauses, three bullets. Real emphasis lands on one word. If a list genuinely has three items, fine. If the third exists to complete a rhythm, cut it. Vary list lengths across a document.

**3. Fake analysis.** Participles bolted onto a fact to imply meaning: highlighting, underscoring, reflecting, illustrating, demonstrating, showcasing, signaling a shift in. Either explain the significance concretely or state the fact and stop.

**4. Significance inflation.** "Plays a vital role." "Serves as a testament to." "Represents a broader shift." "Marks a pivotal moment." Small things are allowed to be small.

**5. Vague attribution.** "Studies show," "experts say," "critics argue," "it is widely regarded." Name the source or drop the claim.

**6. Editorial asides.** "It's important to note," "it's worth remembering," "notably," "importantly." If it mattered you would have led with it.

**7. Copula avoidance.** "Serves as," "stands as," "represents," "marks" where "is" would do. Use "is".

**8. Summary paragraphs.** "In summary," "in conclusion," "overall," "ultimately." Also the tacked-on optimistic closer, usually opening with "Despite" and landing on future prospects. End on the last real point.

**9. Hedge stacking.** might, could, perhaps, generally, somewhat, in many cases, relatively, fairly. One hedge per claim, maximum, and only when the uncertainty is real.

**10. False ranges.** "Ranges from X to Y," "everything from A to B." Sounds specific, says nothing. List the actual items.

**11. Transition scaffolding.** Moreover, furthermore, additionally, in addition, on the other hand, ultimately. Most paragraphs connect fine without a signpost.

**12. Metronomic rhythm.** If every sentence lands in the same 12-to-15-word band, break it up. Short sentence. Then a longer one that carries a real clause structure and takes its time.

**13. Generic filler.** No names, numbers, dates, or places. Replace abstractions with the concrete thing.

**14. Rhetorical-question openers.** "Have you ever wondered." "What if I told you." Start with the point.

**15. Front-loaded background.** Definitions and context before the actual content. Lead with the conclusion.

**16. Bold-lead bullets** where the bolded phrase gets restated in the sentence after it. Also: bolding for emphasis more than once or twice a page, Title Case In Headings, emoji before headings or bullets.

**17. Chatbot residue.** "I hope this helps," "let me know if you'd like me to expand," "as of my last update," unfilled `[placeholders]`, claims that information "is not publicly available" followed by a guess about what it likely is.

Full catalogue with the vocabulary list is in `references/tells.md` — read it in edit mode, or when the user asks for a diagnostic pass rather than a rewrite.

## Deliberate exceptions

The user has ruled these in. Do not "fix" them:

- Em dashes. Legitimate punctuation. Use them unspaced (`like—this`), not spaced, since the spaced form is itself the tell.
- Oxford commas.
- Curly quotes and apostrophes.
- American spelling.

## Positive moves

Removing tells leaves flat text. Add back:

- A stated opinion, unhedged, where one is warranted.
- One concrete detail the reader didn't ask for: a number, a version, a name, a date.
- Asymmetry. A short paragraph next to a long one. One aside that isn't strictly necessary.
- Plain verbs. Use, not utilize. Start, not commence. Help, not facilitate.
- Contractions, unless the register is formal.

## Self-check

Before returning anything, reread the draft against these four:

1. Any "not X, but Y" construction? Rewrite it.
2. Any group of exactly three? Cut to one or expand to four.
3. Any sentence that would survive unchanged in a piece about a completely different subject? Make it specific or delete it.
4. Do sentence lengths vary? Read the first letters of each sentence — if the shape is uniform, break the pattern.

## Output

**Write mode:** return the prose. No preamble about what you did, no offer to revise.

**Edit mode:** return the rewritten text first, then a short list of the tells removed, keyed to the kill list. Keep the list to what actually changed. If the original was already clean, say so instead of manufacturing edits.

## One caveat, stated once

This makes text read better. It does not reliably beat AI detectors, which have high false-positive rates and flag plenty of human writing. If the user's goal is passing a specific checker, say so plainly rather than implying the rewrite guarantees anything.

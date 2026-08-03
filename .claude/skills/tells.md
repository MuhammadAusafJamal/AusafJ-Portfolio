# Full catalogue of AI writing tells

Compiled from Wikipedia's _Signs of AI writing_ (WikiProject AI Cleanup field guide, ~15,000 words). Read this in edit mode or when running a diagnostic pass. The kill list in SKILL.md is the abridged version ranked by frequency.

## Contents

1. Tone and rhetoric
2. Sentence-level patterns
3. Vocabulary
4. Structure
5. Formatting
6. Chatbot residue
7. Citation artifacts
8. Caveats

---

## 1. Tone and rhetoric

- **Symbolism inflation.** Tying an ordinary subject to a larger era, movement, or theme. "Pivotal moment," "broader movement," "represents a shift in," "part of a growing trend toward."
- **Promotional warmth.** Travel-brochure adjectives applied to plain facts. "Rich cultural heritage," "vibrant," "stunning," "renowned," "beloved."
- **Editorializing.** Telling the reader what to care about. "It's important to note," "it is worth remembering," "no discussion would be complete without," "notably," "crucially."
- **Superficial analysis.** Participles bolted onto a fact without explaining anything: highlighting, underscoring, reflecting, illustrating, demonstrating, showcasing, exemplifying, cementing.
- **Vague attribution (weasel words).** "Studies show," "experts say," "critics have argued," "observers note," "it is widely regarded as," "industry reports suggest."
- **Notability padding.** Overstating press coverage or recognition. Turning one local mention into evidence of significance.
- **False ranges.** "Ranges from X to Y," "everything from A to B," "spans A through B."
- **Hedge stacking.** might, could, perhaps, generally, somewhat, relatively, fairly, in many cases, often, typically, arguably.
- **Sycophancy.** Warmth directed at the reader rather than the subject.

## 2. Sentence-level patterns

- **Negative parallelism.** "Not just X, but Y." "It's not X, it's Y." "Not only X but also Y." The most reliable single tell.
- **Rule of three.** Three adjectives, three short phrases, three clauses. Used to make thin analysis look thorough.
- **Copula avoidance.** "Serves as a," "stands as a," "represents a," "marks the," "acts as a" where "is" or "are" would do.
- **Transition scaffolding.** Moreover, furthermore, additionally, in addition, on the other hand, ultimately, consequently, that said.
- **Metronomic rhythm.** Every sentence in the same 12–15 word band, every paragraph the same length.
- **Keyword repetition.** A term repeated past what reads naturally, as if optimizing for it.
- **Generic examples.** No names, numbers, dates, or places. "A leading provider," "several organizations," "meaningful improvements."
- **Rhetorical-question openers.** "Have you ever wondered," "What if I told you," "Are you struggling with."
- **Staccato anaphora as a closer.** "No fluff. No filler. No excuses."
- **Mixed English varieties.** American spelling appearing mid-piece in otherwise British text, or vice versa.

## 3. Vocabulary

Words that cluster in LLM output. Not banned — a word being overused doesn't make its synonyms suspect, and context matters — but each one should earn its place.

Early cluster: delve, tapestry, testament, underscore, pivotal, comprehensive, multifaceted, nuanced, embark, realm, crucial, foster, leverage, seamless, robust, landscape, holistic, transformative, intricate, myriad, navigate, resonate, garner.

Later cluster (GPT-5 era and after): emphasizing, enhance, highlighting, showcasing.

Grok-specific: causal, empirical, correlate, and heavy figurative use of underscore.

Note that "underscore" also means an underline mark or incidental music — check context before flagging.

## 4. Structure

- **Restating summaries.** "In summary," "in conclusion," "overall," "to sum up," "ultimately."
- **Formulaic closing sections.** "Challenges," usually opening with "Despite," and "Future prospects," ending on an upbeat note. Also "Legacy and impact."
- **Interchangeable scaffolding.** The same section skeleton regardless of subject.
- **Bold-lead bullets** where the bolded phrase is just restated in the following sentence.
- **Vague "see also" / "further reading"** with loosely related items.
- **Warm-up padding.** Definition, then benefits, then why it matters, before reaching the actual content.

## 5. Formatting

- Boldface for emphasis, applied mechanically and often.
- Lists where prose would read better.
- Title Case In Headings.
- Emoji in front of headings or bullet points.
- Curly quotes and apostrophes carried over from a chat interface.
- Em dashes used in a punched-up, formulaic way, and surrounded by spaces — the spacing breaks normal typographic practice and is more diagnostic than the dash itself.
- Skipped heading levels (h2 straight to h4).
- Horizontal rules dropped in before headings.
- Reflexive Oxford commas.
- Markdown syntax pasted into a context that doesn't render Markdown.
- Small, pointless tables.

## 6. Chatbot residue

- Assistant chatter: "I hope this helps," "let me know if you need anything else," "would you like me to expand on this?"
- Cutoff disclaimers: "as of my last update," "as of my knowledge cutoff."
- Speculation dressed as fact when sources are missing: claiming information isn't publicly documented, then guessing what it "likely" is. For people this becomes "maintains a low profile" or "keeps personal details private."
- Unfilled templates: `[Insert name]`, `[Year]`, `[Company]`.
- Junk markup: `turn0search0`, `contentReference`, `oaicite`, `oai_citation`, `attached_file`, `grok_card`, `attributionIndex`, stray `+1`.
- Broken wikitext, nonexistent templates or categories.

## 7. Citation artifacts

- Dead or fabricated links.
- Invalid DOIs and ISBNs.
- DOIs resolving to unrelated papers.
- Book citations with no page numbers or URLs.
- References attached to claims they don't support.

## 8. Caveats

The guide is explicit that none of these prove AI authorship. LLMs learned these patterns from human writing, so humans use them too — editorials, blogs, and fan fiction are full of them. A 2025 preprint found that heavy LLM users identify AI text correctly about 90% of the time, while people who rarely use LLMs do barely better than chance in both directions. Human writing is also drifting toward LLM style, which narrows the gap further.

Treat this as a style checklist, not a detector. Never tell the user a rewrite is guaranteed to pass automated detection.

## Deliberate exceptions for this user

Do not flag or change: em dashes (use unspaced), Oxford commas, curly quotes, American spelling.

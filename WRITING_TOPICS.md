# Writing a Topic

Each topic is a single Markdown file in `data/topics/`. It consists of a YAML frontmatter block and a series of cards written as Markdown sections.

---

## File naming

Use the topic's slug as the filename:

```
data/topics/johari-window.md
data/topics/4cs-of-leadership.md
```

---

## Frontmatter

```yaml
---
id: johari-window                  # same as the filename (without .md)
title: The Johari Window           # human-readable title
description: >-
  Analyze the relationship between your personal qualities and how they are
  perceived by others              # 1–2 sentence summary shown on cards
tags:
  - self-awareness                 # 1–3 tags from the list below
  - coaching
links:                             # further reading (omit or use [] if none)
  - title: The Johari Window Model – How To Become A Great Communicator
    url: 'https://upskillcoach.com/blog/what-is-the-johari-window/'
    minutes: 7                     # estimated read time in minutes
related:
  - feedback-staircase             # 2–3 slugs of related topics
  - 30-60-90
---
```

### Available tags

| Tag ID | Label |
|---|---|
| `team-activation` | Team activation |
| `communication` | Communication |
| `coaching` | Coaching |
| `self-awareness` | Self-awareness |
| `change-management` | Change Management |
| `decision-making` | Decision-Making |
| `facilitation` | Facilitation |
| `problem-solving` | Problem solving |
| `mentoring` | Mentoring |
| `people-development` | People development |

---

## Cards

Each card is a `## ` section with an emoji and a title. The body is plain Markdown.

```markdown
## 🤯 Why feedback is hard

Most people don't reject feedback — they reject **how it makes them feel**.
```

### Typical card sequence

A topic usually has 6–12 cards following this progression:

| # | Type | Common emojis | Purpose |
|---|---|---|---|
| 1 | Hook | 🤯 💡 🔍 | Open with a relatable challenge or question |
| 2 | Model overview | 💎 🖌️ | Introduce the framework — name, origin, summary |
| 3–N | Components | unique per item | One card per element, step, or quadrant |
| N+1 | Application | 👉 🏃 ⚒️ | How to actually use it |
| Last | Tips / pitfalls | ✅ ⚠️ | Common mistakes or what to watch for |

You don't need all types — let the content decide the structure.

### Emoji conventions

Each card gets one emoji. Don't repeat emojis within the same topic.

| Emoji | Typical use |
|---|---|
| 🤯 | Hook — surprising insight or common struggle |
| 💡 | Key idea or "aha moment" |
| 💎 | Model overview |
| 🎯 | Goal, outcome, or purpose |
| 🧠 | Cognitive or mindset dimension |
| ❤️ | Emotional or relational dimension |
| 💪 | Commitment, strength, or courage |
| 🗣️ | Communication or candor |
| 👀 | Observation or awareness |
| 👉 | Practical guide or next steps |
| ✅ | Benefits or when to use |
| ⚠️ | Pitfalls or mistakes to avoid |
| 📝 | Template, agreement, or documentation |

---

## Images

If an image exists for a card, place the sentinel on the first line of the body (after a blank line following the heading):

```markdown
## 💡 What is the Johari Window?

<!-- image: /images/cards/johari-window/what-is-joharis-window.png -->

In 1955, two psychologists developed...
```

Image files live in `static/images/cards/<slug>/`. Not every card needs an image — skip the sentinel if there's no image for that card.

---

## Writing style

- **Tone:** clear, direct, and professional — like a smart colleague explaining something
- **Bold** key terms and model names on first use
- *Italics* for examples, quotes, and scenario dialogue
- Use bullet lists for steps, options, and enumerated qualities
- Use tables when comparing two or more options side by side
- Use blockquotes (`>`) for one key takeaway per topic, sparingly
- Keep paragraphs short — 2–4 sentences each
- Write in second person ("you", "your team") to keep it actionable

**Example of an introduction card:**

```markdown
## 🤯 Why feedback is hard

Most people don't reject feedback — they reject **how it makes them feel**.

The **Feedback Staircase** describes the five emotional stages people move through
when receiving feedback. Understanding this sequence helps you deliver feedback at
the right moment — and receive it more openly yourself.
```

**Example of a component card:**

```markdown
## 🚫 1. Deny

The first reaction is often flat-out rejection: _"That's not true"_ or _"That
doesn't apply to me."_

Denial is a protective reflex. The person hasn't yet processed the feedback — they
just want it to go away. Don't push harder at this stage.
```

---

## Adding the topic to the library

After creating the file, add the slug to the `topics` array in `data/data.json`. Topics appear in the library in the order they appear in this array:

```json
{
  "topics": [
    "existing-topic",
    "your-new-slug"   ← add here
  ]
}
```

Then run `npm run build` to verify it compiles without errors.

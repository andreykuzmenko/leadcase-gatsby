# Leadcase Gatsby — Claude Instructions

## Testing

Whenever you implement new functionality (new UI feature, new page, new data behavior, new interaction), you must:

1. **Update `TEST_CASES.md`** — add test cases describing the new behavior
2. **Update or add tests in `tests/`** — add Playwright tests covering the new functionality
3. **Run `npm test`** and confirm all tests pass before finishing

This applies to changes in `src/`, `gatsby-node.js`, or `data/` that affect user-facing behavior.

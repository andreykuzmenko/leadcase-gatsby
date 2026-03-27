import { test, expect } from '@playwright/test'

const TOPIC_SLUG = 'leadership-uncertainty-matrix'
const TOPIC_TITLE = 'Leadership Uncertainty Matrix'

test.describe('Topic Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate via click to ensure client-side rendering kicks in
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
    await page.locator(`a[href="/topics/${TOPIC_SLUG}"]`).click()
    await page.waitForURL(`**/topics/${TOPIC_SLUG}`)
  })

  test('loads without errors', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible()
  })

  test('URL has no trailing slash', async ({ page }) => {
    expect(page.url()).not.toMatch(/\/$/)
  })

  test('shows topic title', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: TOPIC_TITLE }).first()).toBeVisible()
  })

  test('shows topic description', async ({ page }) => {
    const desc = page.locator('p').first()
    await expect(desc).not.toBeEmpty()
  })

  test('shows at least one tag pill', async ({ page }) => {
    const tags = page.locator('a[href*="/?tag="]')
    await expect(tags.first()).toBeVisible()
  })

  test('tag pill links back to home with filter', async ({ page }) => {
    const tagLink = page.locator('a[href*="/?tag="]').first()
    const href = await tagLink.getAttribute('href')
    expect(href).toMatch(/[?]tag=/)
    await tagLink.click()
    await expect(page).toHaveURL(href)
  })

  test('shows at least one content card', async ({ page }) => {
    const cards = page.locator('h2').nth(1)
    await expect(cards).toBeVisible()
  })

  test('external links open in new tab', async ({ page }) => {
    const extLinks = page.locator('a[target="_blank"]')
    const count = await extLinks.count()
    if (count > 0) {
      await expect(extLinks.first()).toHaveAttribute('href', /^https?:\/\//)
    }
  })
})

test.describe('Topic Page — trailing slash redirect', () => {
  test('trailing slash URL redirects to no-slash URL', async ({ page }) => {
    await page.goto(`/topics/${TOPIC_SLUG}/`)
    await expect(page).toHaveURL(new RegExp(`/topics/${TOPIC_SLUG}$`))
  })
})

test.describe('Topic Page — Related Topics', () => {
  test('clicking related card navigates to that topic', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
    await page.locator('a[href="/topics/johari-window"]').click()
    await page.waitForURL('**/topics/johari-window')

    const relatedCards = page.locator('a[href^="/topics/"]')
    const count = await relatedCards.count()
    if (count > 0) {
      const href = await relatedCards.last().getAttribute('href')
      await relatedCards.last().click()
      await expect(page).toHaveURL(href)
    }
  })
})

test.describe('All Topic Pages', () => {
  const topics = [
    '4cs-of-leadership', 'leadership-uncertainty-matrix', 'conflict-escalation-model',
    'feedback-staircase', 'performance-image-exposure', 'inversion-thinking',
    'cynefin', 'fogg-behavior-model', 'the-4-responses-to-fear', 'swot-analysis',
    'kolbs-cycle', 'paei-model', 'passion-market-skills',
    'situation-complication-question-answer-framework', 'trust-model', 'minto-pyramid',
    'zone-of-genius', 'feedback-circle', 'improvement-canvas', '30-60-90',
    'impeccable-coordination', 'window-of-tolerance', 'grow', 'decision-making-matrix',
    'i-message', 'onion', 'intrinsic-motivation', 'idoarrt', '1-2-4-all',
    'feedback-wrap', 'hackman', 'satir-change-model', 'skills-market', 'kubler-ross',
    'start-stop-continue', 'roles-and-responsibilities', 'safety-check', 'thomas-kilmann',
    'moving-motivators', 'personal-maps', 'trust-triangle', 'situational-leadership',
    'assumption-map', 'brainwriting', 'ladder-of-inference', 'johari-window',
    'trust-and-transparency', 'uncover-motivation', 'competence-development-cycle',
    'scarf', 'iceberg', 'team-canvas', 'coin-feedback-model', 'consent-decision-making',
  ]

  for (const slug of topics) {
    test(`/topics/${slug} loads (no 404)`, async ({ page }) => {
      const response = await page.goto(`/topics/${slug}`)
      expect(response?.status()).not.toBe(404)
      await expect(page.locator('body')).not.toContainText('Page not found')
    })
  }
})

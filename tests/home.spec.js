import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
  })

  test('shows heading and subtitle', async ({ page }) => {
    // heading uses a smart apostrophe (U+2019)
    await expect(page.getByRole('heading').first()).toContainText('toolbox')
  })

  test('renders 54 topic cards', async ({ page }) => {
    const cards = page.locator('a[href^="/topics/"]')
    await expect(cards).toHaveCount(54)
  })

  test('each card has a title and description', async ({ page }) => {
    const firstCard = page.locator('a[href^="/topics/"]').first()
    await expect(firstCard.locator('h2, h3, [class*="title"]')).not.toBeEmpty()
    await expect(firstCard.locator('p, [class*="description"]')).not.toBeEmpty()
  })

  test('shows all 10 tag filter pills', async ({ page }) => {
    const tags = [
      'Team activation', 'Communication', 'Coaching', 'Self-awareness',
      'Change Management', 'Decision-Making', 'Facilitation',
      'Problem solving', 'Mentoring', 'People development',
    ]
    for (const tag of tags) {
      await expect(page.getByRole('button', { name: tag })).toBeVisible()
    }
  })

  test('"All" button is active by default', async ({ page }) => {
    const allBtn = page.getByRole('button', { name: 'All' })
    await expect(allBtn).toBeVisible()
    await expect(allBtn).toHaveCSS('background-color', 'rgb(16, 185, 129)')
  })
})

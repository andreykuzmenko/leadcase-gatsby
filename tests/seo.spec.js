import { test, expect } from '@playwright/test'

test.describe('SEO & Meta Tags', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate via client-side to ensure Head API fires
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
    await page.locator('a[href="/topics/leadership-uncertainty-matrix"]').click()
    await page.waitForURL('**/topics/leadership-uncertainty-matrix')
  })

  test('topic page has unique <title>', async ({ page }) => {
    await expect(page).toHaveTitle(/Leadership Uncertainty Matrix/)
  })

  test('topic page has meta description', async ({ page }) => {
    const meta = await page.locator('meta[name="description"]').getAttribute('content')
    expect(meta?.length).toBeGreaterThan(10)
  })

  test('topic page has og:title', async ({ page }) => {
    const og = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(og).toBeTruthy()
  })

  test('topic page has og:description', async ({ page }) => {
    const og = await page.locator('meta[property="og:description"]').getAttribute('content')
    expect(og?.length).toBeGreaterThan(10)
  })

  test('topic page has og:image', async ({ page }) => {
    const og = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(og).toBeTruthy()
  })

  test('topic page has twitter:card', async ({ page }) => {
    const tw = await page.locator('meta[name="twitter:card"]').getAttribute('content')
    expect(tw).toBeTruthy()
  })

  test('sitemap.xml is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
  })
})

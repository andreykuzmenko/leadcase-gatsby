import { test, expect } from '@playwright/test'

test.describe('404 Page', () => {
  test('unknown URL shows 404 page', async ({ page }) => {
    await page.goto('/this-does-not-exist')
    await expect(page.locator('body')).toContainText(/not found|404/i)
  })

  test('404 page has a link back to home', async ({ page }) => {
    await page.goto('/this-does-not-exist')
    const homeLink = page.locator('a[href="/"]')
    await expect(homeLink.first()).toBeVisible()
  })
})

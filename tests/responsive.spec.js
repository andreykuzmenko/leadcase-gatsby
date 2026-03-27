import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('home page grid renders on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
    await expect(page.locator('a[href^="/topics/"]').first()).toBeVisible()
  })

  test('filter pills are visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
  })

  test('topic page is readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
    await page.locator('a[href="/topics/leadership-uncertainty-matrix"]').click()
    await page.waitForURL('**/topics/leadership-uncertainty-matrix')
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('navigation header is visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })
})

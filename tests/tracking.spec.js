import { test, expect } from '@playwright/test'

// Mixpanel loads only in production via mixpanel-browser bundle.
// These tests verify the triggering conditions are met (page loads, filter changes URL).
test.describe('Mixpanel Tracking', () => {
  test('topic page loads — trackTopicOpen trigger condition met', async ({ page }) => {
    await page.goto('/topics/leadership-uncertainty-matrix')
    await page.waitForSelector('h1')
    const title = await page.locator('h1').first().textContent()
    expect(title).toBeTruthy()
  })

  test('filter click changes URL — trackFilter trigger condition met', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('button')
    await page.getByRole('button', { name: 'Coaching' }).click()
    await expect(page).toHaveURL('/?tag=coaching')
  })
})

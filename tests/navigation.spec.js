import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('logo navigates to home', async ({ page }) => {
    await page.goto('/about')
    await page.locator('header').getByRole('link').first().click()
    await expect(page).toHaveURL('/')
  })

  test('"Library" nav link navigates to home', async ({ page }) => {
    await page.goto('/')
    await page.locator('header').getByRole('link', { name: 'Library' }).click()
    await expect(page).toHaveURL('/')
  })

  test('"About" nav link navigates to /about', async ({ page }) => {
    await page.goto('/')
    await page.locator('header').getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL('/about')
  })

  test('/library redirects to /', async ({ page }) => {
    await page.goto('/library')
    await expect(page).toHaveURL('/')
  })

  test('clicking a topic card navigates to topic page', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
    const firstCard = page.locator('a[href^="/topics/"]').first()
    const href = await firstCard.getAttribute('href')
    await firstCard.click()
    await expect(page).toHaveURL(href)
  })
})

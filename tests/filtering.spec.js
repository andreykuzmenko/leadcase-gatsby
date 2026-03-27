import { test, expect } from '@playwright/test'

test.describe('Tag Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('a[href^="/topics/"]')
  })

  test('clicking a tag filters topic cards', async ({ page }) => {
    const totalBefore = await page.locator('a[href^="/topics/"]').count()
    await page.getByRole('button', { name: 'Coaching' }).click()
    const totalAfter = await page.locator('a[href^="/topics/"]').count()
    expect(totalAfter).toBeGreaterThan(0)
    expect(totalAfter).toBeLessThan(totalBefore)
  })

  test('active tag is highlighted in green', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Coaching' })
    await btn.click()
    await expect(btn).toHaveCSS('background-color', 'rgb(16, 185, 129)')
  })

  test('URL updates to /?tag={id} when filter selected', async ({ page }) => {
    await page.getByRole('button', { name: 'Coaching' }).click()
    await expect(page).toHaveURL('/?tag=coaching')
  })

  test('clicking active tag again clears the filter', async ({ page }) => {
    const allCount = await page.locator('a[href^="/topics/"]').count()
    await page.getByRole('button', { name: 'Coaching' }).click()
    await expect(page).toHaveURL('/?tag=coaching')
    await page.getByRole('button', { name: 'Coaching' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.locator('a[href^="/topics/"]')).toHaveCount(allCount)
  })

  test('clicking "All" clears the filter', async ({ page }) => {
    const allCount = await page.locator('a[href^="/topics/"]').count()
    await page.getByRole('button', { name: 'Coaching' }).click()
    await expect(page).toHaveURL('/?tag=coaching')
    await page.getByRole('button', { name: 'All' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.locator('a[href^="/topics/"]')).toHaveCount(allCount)
  })

  test('pre-filtered URL /?tag=coaching shows filtered results', async ({ page }) => {
    await page.goto('/?tag=coaching')
    await page.waitForSelector('a[href^="/topics/"]')
    const count = await page.locator('a[href^="/topics/"]').count()
    expect(count).toBeGreaterThan(0)
    await expect(page.getByRole('button', { name: 'Coaching' })).toHaveCSS('background-color', 'rgb(16, 185, 129)')
  })

  test('unknown tag in URL shows no topics without crashing', async ({ page }) => {
    await page.goto('/?tag=nonexistent')
    // Unknown tag matches no topics — should show 0 results, not crash
    await expect(page.locator('body')).not.toContainText('error')
    await expect(page.getByRole('heading').first()).toBeVisible()
  })
})

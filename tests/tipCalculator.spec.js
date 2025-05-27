const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test('calculates tip and total per person', async ({ page }) => {
    // 1. Fill in bill amount = 100
    await page.fill('[data-cy=bill-input]', '100');
    // 2. Select tip percent = 15
    await page.fill('[data-cy=tip-input]', '15');
    // 3. Set people = 2
    await page.fill('[data-cy=people-input]', '2');
    // 4. Trigger calculation 
    await page.click('[data-cy=calculate-btn]');

    // 5. Result
    await expect(page.locator('[data-cy=tip-per-person]')).toHaveText('7.50');
    await expect(page.locator('[data-cy=total-per-person]')).toHaveText('57.50');
});
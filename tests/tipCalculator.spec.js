const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test.describe('Main logic', () => {
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
});

test.describe('Negative numbers', () => {
    test('negative number not possible in the bill amount', async ({ page }) => {
        // 1. Fill in bill amount = -200
        await page.fill('[data-cy=bill-input]', '-200');
        // 2. Fill in tip percent = 10
        await page.fill('[data-cy=tip-input]', '10');
        // 3. Set people = 3
        await page.fill('[data-cy=people-input]', '3');
        // 4. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 5. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please enter numbers greater than 0');
    });

    test('negative number not possible in the tip percent', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '200');
        // 2. Fill in tip percent = -10
        await page.fill('[data-cy=tip-input]', '-10');
        // 3. Set people = 5
        await page.fill('[data-cy=people-input]', '5');
        // 4. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 5. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please enter numbers greater than 0');
    });

    test('negative number not possible in the people input', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '2000');
        // 2. Fill in tip percent = 10
        await page.fill('[data-cy=tip-input]', '10');
        // 3. Set people = -15
        await page.fill('[data-cy=people-input]', '-15');
        // 4. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 5. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please enter numbers greater than 0');
    });
});

test.describe('Error message dismisal', () => {
    test('negative number not possible in the people input', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '2000');
        // 2. Fill in tip percent = 10
        await page.fill('[data-cy=tip-input]', '10');
        // 3. Set people = -15
        await page.fill('[data-cy=people-input]', '-15');
        // 4. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 5. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please enter numbers greater than 0');

        // 6. Banner dismissed
        await page.waitForTimeout(3001);
        await expect(banner).toBeHidden();
    });
});
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

    test('rounds decimals correctly for tip and total per person', async ({ page }) => {
        await page.fill('[data-cy=bill-input]', '100.005');
        await page.fill('[data-cy=tip-input]', '12.345');
        await page.fill('[data-cy=people-input]', '3');

    
        await page.click('[data-cy=calculate-btn]');

        await expect(page.locator('[data-cy=tip-per-person]')).toHaveText('4.12');
        await expect(page.locator('[data-cy=total-per-person]')).toHaveText('37.45');
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

    test('the tip percent cannot be empty', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '200');
        // 2. Set people = 5
        await page.fill('[data-cy=people-input]', '5');
        // 3. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 4. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please, fill in all the fields');

        // 5. Banner dismissed
        await page.waitForTimeout(3001);
        await expect(banner).toBeHidden();
    });
});

test.describe('Zero not allowed', () => {
    test('zero not possible in the bill amount', async ({ page }) => {
        // 1. Fill in bill amount = 0
        await page.fill('[data-cy=bill-input]', '0');
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

    test('zero not possible in the tip percent', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '200');
        // 2. Fill in tip percent = 0
        await page.fill('[data-cy=tip-input]', '0');
        // 3. Set people = 5
        await page.fill('[data-cy=people-input]', '5');
        // 4. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 5. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please enter numbers greater than 0');
    });

    test('zero not possible in the people input', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '200');
        // 2. Fill in tip percent = 10
        await page.fill('[data-cy=tip-input]', '10');
        // 3. Set people = 0
        await page.fill('[data-cy=people-input]', '0');
        // 4. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 5. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please enter numbers greater than 0');
    });
});

test.describe('Fields required', () => {
    test('the bill amount cannot be empty', async ({ page }) => {
        // 1. Fill in tip percent = 10
        await page.fill('[data-cy=tip-input]', '10');
        // 2. Set people = 3
        await page.fill('[data-cy=people-input]', '3');
        // 3. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 4. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please, fill in all the fields');
    });

    test('the tip percent cannot be empty', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '200');
        // 2. Set people = 5
        await page.fill('[data-cy=people-input]', '5');
        // 3. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 4. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please, fill in all the fields');
    });

    test('the people input cannot be empty', async ({ page }) => {
        // 1. Fill in bill amount = 200
        await page.fill('[data-cy=bill-input]', '200');
        // 2. Fill in tip percent = 10
        await page.fill('[data-cy=tip-input]', '10');
        // 2. Set people = 5
        await page.fill('[data-cy=people-input]', ' ');
        // 3. Triger calculation
        await page.click('[data-cy=calculate-btn]');

        // 5. Result
        const banner = page.locator('[data-cy=message-banner]');
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText('Please, fill in all the fields');
    });
});

test.describe('Default-people behavior', () => {
    test('uses default people count of 1 when people input is untouched', async ({ page }) => {
        await page.fill('[data-cy=bill-input]', '100');
        await page.fill('[data-cy=tip-input]', '20');
        await page.click('[data-cy=calculate-btn]');

        await expect(page.locator('[data-cy=tip-per-person]')).toHaveText('20.00');
        await expect(page.locator('[data-cy=total-per-person]')).toHaveText('120.00');
    });
});
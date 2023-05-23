//@ts-check
const { test, expect } = require('@playwright/test');

//registeration testing
test.describe('Registeration testing', () => {
  test('with hardcoded email and password', async ({ page }) => {
    //path for registeration
    await page.goto('https://dev-app.formzillion.com/register');
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').press('Control+a');
    await page.locator('input[type="email"]').fill('demo10956@gmail.com');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').press('Control+a');
    await page.locator('input[type="password"]').fill('Qwerty@123');
    await page.getByRole('checkbox').check();
    await page.locator('button[type="submit"]').click();
  })
  
});

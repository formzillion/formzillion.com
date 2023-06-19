import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

let playwright = require('@playwright/test');

test.describe("test for Invoices", async () => {
  test("Invoices Testing", async ({ page }) => {
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "")
    );
    await page
      .locator('input[type="email"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
    await page.locator('input[type="checkbox"]').check();
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    try {
        await page.getByRole('link', { name: 'Settings' }).click();
        await page.getByRole('link', { name: 'Invoices' }).click();
        const page1Promise = page.waitForEvent('popup');
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link', { name: 'View receipt' }).click();
        const page1 = await page1Promise;
        const download = await downloadPromise;
      } 

      catch (error) {
        if (error instanceof playwright.errors.TimeoutError)
          console.log("Timeout!");
      }
  });
});

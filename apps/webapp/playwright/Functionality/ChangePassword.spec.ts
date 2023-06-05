import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("test for changing the password", async () => {
  test("Account password changing test cases", async ({ page }) => {
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "")
    );
    await page
      .locator('input[type="email"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.NEXT_PUBLIC_NEW_PASSWORD}`.replace(/"/g, ""));
    await page.getByText("Remember me").check();
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    await page.getByRole("link", { name: "Settings" }).click();
    await page.getByRole("listitem").filter({ hasText: "Password" }).click();
    await page.getByLabel("New Password").click();
    await page
      .getByLabel("New Password")
      .fill(`${process.env.NEXT_PUBLIC_NEW_PASSWORD}`);
    await page
      .locator("label")
      .filter({ hasText: "New Password" })
      .locator("div")
      .nth(1)
      .click();
    await page.getByLabel("Confirm Password").click();
    await page
      .getByLabel("Confirm Password")
      .fill(`${process.env.NEXT_PUBLIC_NEW_PASSWORD}`);
    await page
      .locator("label")
      .filter({ hasText: "Confirm Password" })
      .locator("div")
      .nth(1)
      .click();

    await page
      .getByRole("button", { name: "Update Password" })
      .click({ timeout: 10000 });
  });
  //verifying the password whether it is updated or not
  test("verifying whether the password is changed or not", async ({ page }) => {
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "")
    );
    await page
      .locator('input[type="email"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.NEXT_PUBLIC_NEW_PASSWORD}`.replace(/"/g, ""));
    await page.getByText("Remember me").check();
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    const url = page.url();
    expect(url).toBe(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, ""));
    
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, ""));
  });
});

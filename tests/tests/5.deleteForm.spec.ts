import { test } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

const playwright = require("@playwright/test");


test.describe("deleting the form testing", async () => {
  test("personal forms deletion", async ({ page }) => {
    try {
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
      await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
      await page.getByText("Remember me").check();
      await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]'),
      ]);
      await page.goto(
        `${process.env.NEXT_PUBLIC_TEAM_SETTING_URL}`.replace(/"/g, "")
      );
      //list item to check for delete form
      await page
        .getByRole("listitem")
        .filter({ hasText: "General" })
        .click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await page
        .getByRole("button", { name: "Delete Form" })
        .click({ timeout: 100000 });
      await page
        .locator('input[name="name"][id="name"]')
        .first()
        .fill("Central Identity Agent");
      await page
        .locator('input[name="name"][id="name"]')
        .nth(1)
        .fill("Central Identity Agent");
      await page.getByRole("button", { name: "Continue" });
      await page.waitForLoadState("networkidle");
    } catch (error) {
      if (error instanceof playwright.error.timeout)
        console.log("please check your form name..");
    }
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, ""));
    await page.locator('input[type="search"]').clear();
    await page.locator('input[type="search"]').fill("Central");
    await page.locator('input[type="search"]').clear();
  });
});

//teams form deletion
test.describe("team form delete test", async () => {
  test("deleting the team form", async ({ page }) => {
    try {
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
      await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
      await page.getByText("Remember me").check();
      await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]'),
      ]);
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_NAME}`.replace(/"/g, ""));
      await page.waitForLoadState("networkidle");
      await page.goto(
        `${process.env.NEXT_PUBLIC_TEAM_SETTING_URL}`.replace(/"/g, "")
      );
      await page.waitForLoadState("networkidle");
      await page
        .getByRole("listitem")
        .filter({ hasText: "General" })
        .click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await page
        .getByRole("button", { name: "Delete Form" })
        .click({ timeout: 100000 });
      await page
        .locator('input[name="name"][id="name"]')
        .first()
        .fill("Product Intranet Liaison");
      await page
        .locator('input[name="name"][id="name"]')
        .nth(1)
        .fill("Product Intranet Liaison");
      await page.getByRole("button", { name: "Continue" });
      await page.waitForLoadState("networkidle");
    } catch (error) {
      if (error instanceof playwright.error.timeout)
        console.log("please check your form name..");
    }
  });
});

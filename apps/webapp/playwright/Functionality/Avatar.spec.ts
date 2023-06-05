import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import playwright from "@playwright/test";
dotenv.config();

//Avatar adding to personal Account
test.describe("personal Avatar Updating", async () => {
  test("personal Avatar testing ", async ({ page }) => {
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "")
    );
    await page
      .locator('input[type="email"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
    await page.getByText("Remember me").check();
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}/settings`.replace(
        /"/g,
        ""
      )
    );
    await page.reload();
    await page
      .getByRole("link", { name: "Settings" })
      .click({ timeout: 20000 });
    await page
      .getByRole("listitem")
      .filter({ hasText: "General" })
      .click({ timeout: 20000 });
    await page.getByLabel("Change User photo").click();
    //await page.getByLabel('Change User photo').setInputFiles('Screenshot 2023-05-19 180659.png');
    await page
      .locator("div")
      .filter({
        hasText:
          /^While an avatar is not mandatory, it is highly advisable to have one\. Save$/,
      })
      .getByRole("button", { name: "Save" });
  });
  test("Team avatar testing", async ({ page }) => {
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "")
    );
    await page
      .locator('input[type="email"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
    await page.getByText("Remember me").check();
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_NAME}`.replace(
        /"/g,
        ""
      )
    );
    await page.reload();
    await page
      .getByRole("link", { name: "Settings" })
      .click({ timeout: 20000 });
    await page
      .getByRole("listitem")
      .filter({ hasText: "General" })
      .click({ timeout: 20000 });
    await page.getByLabel("Change User photo").click();
    await page
      .locator("div")
      .filter({
        hasText:
          /^While an avatar is not mandatory, it is highly advisable to have one\. Save$/,
      })
      .getByRole("button", { name: "Save" });
  });
});

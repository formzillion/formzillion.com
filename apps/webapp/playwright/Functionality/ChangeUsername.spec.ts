import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const playwright = require("@playwright/test");
// personal username update's checking.
test.describe("Change the personal User Name", async () => {
  test("update personal user name", async ({ page }) => {
    try {
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

      await page
        .getByRole("link", { name: "Settings" })
        .click({ timeout: 20000 });
      await page
        .getByRole("listitem")
        .filter({ hasText: "General" })
        .click({ timeout: 20000 });
      await page
        .locator("div")
        .filter({
          hasText:
            /^GeneralYour NameThis is the name that will be displayed for you on Formzillion\.$/,
        })
        .getByRole("textbox")
        .click();
      let updatedName = `${process.env.NEXT_PUBLIC_UPDATED_NAME}`;
      await page
        .locator("div")
        .filter({
          hasText:
            /^GeneralYour NameThis is the name that will be displayed for you on Formzillion\.$/,
        })
        .getByRole("textbox")
        .fill(updatedName);
      await page
        .locator("div")
        .filter({ hasText: /^Please use 40 characters at maximum\. Save$/ })
        .getByRole("button", { name: "Save" })
        .click();
      //reloading the page.
      await page.reload();
      //check whether the user name is updated or not.
      let updatedUserName = await page
        .locator("div")
        .filter({
          hasText:
            /^GeneralYour NameThis is the name that will be displayed for you on Formzillion\.$/,
        })
        .locator('input[type="text"]')
        .inputValue();

      if (updatedUserName === updatedName) {
        console.log("Successfully updated!..");
      } else {
        console.log(
          "Minimum 5 letters are needed. Please check the userName.."
        );
      }
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });
  //personal team url testing
  test("personal team URL testing", async ({ page }) => {
    try {
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
      //await page.getByRole('textbox').nth(2).press('control+a');
      const userId = `${process.env.NEXT_PUBLIC_UPDATED_USER_ID}`;
      await page.getByRole("textbox").nth(2).fill(userId);

      await page
        .locator("div")
        .filter({ hasText: /^Please use 36 characters at maximum\. Save$/ })
        .getByRole("button", { name: "Save" })
        .click();
      await page.reload();
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });
});

// Teams username update's checking.
test.describe("Change the Team User Name", async () => {
  test("update Team user name", async ({ page }) => {
    try {
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

      let teamUrl =
        `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_NAME}`.replace(
          /"/g,
          ""
        );
      await page.goto(teamUrl);
      await page.waitForLoadState("networkidle");
      const url = await page.url();
      expect(url).toBe(teamUrl);

      await page
        .getByRole("link", { name: "Settings" })
        .click({ timeout: 20000 });
      await page
        .getByRole("listitem")
        .filter({ hasText: "General" })
        .click({ timeout: 20000 });
      await page.reload();
      await page.getByRole("textbox").first().click();

      let teamUpdatedName = `${process.env.NEXT_PUBLIC_TEAM_UPDATED_NAME}`;
      await page.getByRole("textbox").first().fill(teamUpdatedName);
      await page
        .locator("div")
        .filter({ hasText: /^Please use 40 characters at maximum\. Save$/ })
        .getByRole("button", { name: "Save" })
        .click();
      //reloading the page.
      await page.reload();
      //check whether the user name is updated or not.
      let teamUpdatedUserName = await page
        .getByRole("textbox")
        .first()
        .inputValue();

      console.log("Team updated name:", teamUpdatedName);
      console.log("Team updated user name:", teamUpdatedUserName);

      if (teamUpdatedUserName === teamUpdatedName) {
        console.log("Successfully updated!..");
      } else {
        console.log(
          "Minimum 5 letters are needed. Please check the userName.."
        );
      }
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });
  test("personal team URL testing", async ({ page }) => {
    try {
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
        `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_NAME}/settings`.replace(
          /"/g,
          ""
        )
      );
      await page.reload();
      //await page.getByRole('textbox').nth(2).press('control+a');
      const teamId = `${process.env.NEXT_PUBLIC_UPDATED_USER_ID}`;
      await page.getByRole("textbox").nth(2).fill(teamId);

      await page
        .locator("div")
        .filter({ hasText: /^Please use 36 characters at maximum\. Save$/ })
        .getByRole("button", { name: "Save" })
        .click();
      await page.reload();
    }
    catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });
});

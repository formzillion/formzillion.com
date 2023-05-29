import { expect } from "@playwright/test";
import { test } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();
const playwright = require("@playwright/test");

test.describe("Forms page", async () => {
  test("personal search bar test", async ({ page }) => {
    try {
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
      await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
      await page.getByText("Remember me").check();
      await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]'),
      ]);
      await expect(page).toHaveURL(
        `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, "")
      );
      //forms page testing the search bar
      // await page.getByText("Forms").click();
      await page.locator('input[type="search"]').clear();
      await page.locator('input[type="search"]').fill("central");
      await page.locator('input[type="search"]').clear();
      await page.locator('input[type="search"]').fill("Internal");
      await page.locator('input[type="search"]').clear();
      await page.locator('input[type="search"]').fill("Direct");
      await page.locator('input[type="search"]').clear();
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });

  //add new forms test
  test("personal Add New Forms Button test", async ({ page }) => {
    try {
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
      await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
      await page.getByText("Remember me").check();
      await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]'),
      ]);
      await expect(page).toHaveURL(
        `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, "")
      );
      await page.getByRole('link', { name: 'Forms' }).click();
      await page.getByRole("button", { name: "Add New" }).click();
      await page
        .locator('input[name="name"], input[id="name"]');
      await page
        .locator('input[name="name"], input[id="name"]')
        .fill("Demo Form");
      await page.locator('input[type="email"][name="sendToEmail"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await Promise.all([
        page.waitForNavigation(),
        page.getByRole("button", { name: "Create" }).click(),
      ]);
      // user form created.
      await expect(page).toHaveURL(
        `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, "")
      );
      await page.locator('input[type="search"]').press("Control+A");
      await page.locator('input[type="search"]').fill("Demo");
      // Assuming page object named 'page'
      if (page) {
        const formValueHandle = await page.$('input[type="search"]');

        if (formValueHandle) {
          const formValueProperty = await formValueHandle.getProperty("value");
          const formValue = (await formValueProperty.jsonValue()) as string;

          if (formValue === "Demo Form") {
            console.log("Successfully created the form!");
          } else {
            console.log("Oops, something went wrong. Please refresh.");
          }
        } else {
          console.log("Input element not found.");
        }
      } else {
        console.log("Page not available.");
      }
    } catch (error) {
      if (error instanceof playwright.errors.name)
        console.log("please check the form name...");
    }
  });
});

test.describe("team forms testing", async () => {
  test("teams search bar test", async ({ page }) => {
    try {
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
      await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
      await page.getByText("Remember me").check();
      await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]'),
      ]);
      await expect(page).toHaveURL(
        `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, "")
      );
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_NAME}`.replace(/"/g, ""));
      await page.waitForLoadState("networkidle");
      await page.locator('input[type="search"]').clear();
      await page.locator('input[type="search"]').fill("Future");
      await page.locator('input[type="search"]').clear();
      await page.locator('input[type="search"]').fill("Dynamic");
      await page.locator('input[type="search"]').clear();
      await page.locator('input[type="search"]').fill("Future");
      await page.locator('input[type="search"]').clear();
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });
  test("Teams Add New Forms Button test", async ({ page }) => {
    try {
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
      await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
      await page.getByText("Remember me").check();
      await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]'),
      ]);
      await expect(page).toHaveURL(
        `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, "")
      );
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_NAME}`.replace(/"/g, ""));
      await page.waitForLoadState("networkidle");
      await page.getByRole('link', { name: 'Forms' }).click();
      await page.getByRole("button", { name: "Add New" }).click();
      await page.locator('input[name="name"], input[id="name"]').clear();
      await page
        .locator('input[name="name"], input[id="name"]')
        .fill("Demo Form");
      await page.locator('input[type="email"][name="sendToEmail"]').clear();
      await page.getByRole("button", { name: "Create" }).click();
      await page.waitForLoadState("networkidle");
      // user form created.
      await page.locator('input[type="search"]').press("Control+A");
      await page.locator('input[type="search"]').fill("Demo");
      // Assuming you have a Playwright page object named 'page'
      if (page) {
        const formValueHandle = await page.$('input[type="search"]');

        if (formValueHandle) {
          const formValueProperty = await formValueHandle.getProperty("value");
          const formValue = (await formValueProperty.jsonValue()) as string;

          if (formValue === "Demo Form") {
            console.log("Successfully created the form!");
          } else {
            console.log("Oops, something went wrong. Please refresh.");
          }
        } else {
          console.log("Input element not found.");
        }
      } else {
        console.log("Page not available.");
      }
    } catch (error) {
      if (error instanceof playwright.errors.name)
        console.log("please check the form name...");
    }
  });
});

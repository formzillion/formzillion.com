import { expect } from "@playwright/test";
import { test } from "@playwright/test";
import * as playwright from '@playwright/test';

test.describe("Forms page", async () => {
  test("personal search bar test", async ({ page }) => {
    try {
      await page.goto("https://dev-app.formzillion.com/login");
      await page.locator('input[type="email"]').fill("demo10956@gmail.com");
      await page.locator('input[type="password"]').fill("Qwerty@123");
      await page.getByText("Remember me").check();
      await page.locator('button[type="submit"]').click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(
        "https://dev-app.formzillion.com/demo-10956-gmail"
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
      await page.goto("https://dev-app.formzillion.com/login");
      await page.locator('input[type="email"]').fill("demo10956@gmail.com");
      await page.locator('input[type="password"]').fill("Qwerty@123");
      await page.getByText("Remember me").check();
      await page.locator('button[type="submit"]').click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(
        "https://dev-app.formzillion.com/demo-10956-gmail"
      );
      await page.getByText("Forms").click();
      await page.getByRole("button", { name: "Add New" }).click();
      await page
        .locator('input[name="name"], input[id="name"]')
        .press("Control+A");
      await page
        .locator('input[name="name"], input[id="name"]')
        .fill("Demo Form");
      await page.locator('input[type="email"][name="sendToEmail"]').clear();
      await page.getByRole("button", { name: "Create" }).click();
      await page.waitForLoadState("networkidle");
      // user form created.
      await expect(page).toHaveURL(
        "https://dev-app.formzillion.com/demo-10956-gmail"
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
      if (error instanceof playwright.errors.TimeoutError)
        console.log("please check the form name...");
    }
  });
});

test.describe("team forms testing", async () => {
  test("teams search bar test", async ({ page }) => {
    try {
      await page.goto("https://dev-app.formzillion.com/login");
      await page.locator('input[type="email"]').fill("demo10956@gmail.com");
      await page.locator('input[type="password"]').fill("Qwerty@123");
      await page.getByText("Remember me").check();
      await page.locator('button[type="submit"]').click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(
        "https://dev-app.formzillion.com/demo-10956-gmail"
      );
      await page.goto("https://dev-app.formzillion.com/ragul-pj");
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
      await page.goto("https://dev-app.formzillion.com/login");
      await page.locator('input[type="email"]').fill("demo10956@gmail.com");
      await page.locator('input[type="password"]').fill("Qwerty@123");
      await page.getByText("Remember me").check();
      await page.locator('button[type="submit"]').click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(
        "https://dev-app.formzillion.com/demo-10956-gmail"
      );
      await page.goto("https://dev-app.formzillion.com/ragul-pj");
      await page.waitForLoadState("networkidle");
      await page.getByText("Forms").click();
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
      if (error instanceof playwright.errors.TimeoutError)
        console.log("please check the form name...");
    }
  });
});

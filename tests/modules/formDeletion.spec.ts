import { test } from "@playwright/test";
import * as playwright from '@playwright/test';

test.describe("deleting the form testing", async () => {
  test("personal forms deletion", async ({ page }) => {
    try {
      await page.goto("https://dev-app.formzillion.com/login");
      await page.locator('input[type="email"]').fill("demo10956@gmail.com");
      await page.locator('input[type="password"]').fill("Qwerty@123");
      await page.getByText("Remember me").check();
      await page.locator('button[type="submit"]').click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await page.goto(
        "https://dev-app.formzillion.com/demo-10956-gmail/lyxEgz4B/settings"
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
      if (error instanceof playwright.errors.TimeoutError)
        console.log("please check your form name..");
    }
    await page.goto("https://dev-app.formzillion.com/demo-10956-gmail");
    await page.locator('input[type="search"]').clear();
    await page.locator('input[type="search"]').fill("Central");
    await page.locator('input[type="search"]').clear();
  });
});

//teams form deletion
test.describe("team form delete test", async () => {
  test("deleting the team form", async ({ page }) => {
    try {
      await page.goto("https://dev-app.formzillion.com/login");
      await page.locator('input[type="email"]').fill("demo10956@gmail.com");
      await page.locator('input[type="password"]').fill("Qwerty@123");
      await page.getByText("Remember me").check();
      await page.locator('button[type="submit"]').click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await page.goto("https://dev-app.formzillion.com/ragul-pj");
      await page.waitForLoadState("networkidle");
      await page.goto(
        "https://dev-app.formzillion.com/ragul-pj/mrJp2Tcq/settings"
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
      if (error instanceof playwright.errors.TimeoutError)
        console.log("please check your form name..");
    }
  });
});

import { test, expect } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

const playwright = require("@playwright/test");

test.describe("Navigation testing", async() => {
      test("user nav section", async ({ page }) => {
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
        await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
        await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
        await page.getByText("Remember me").check();
        await Promise.all([
          page.waitForNavigation(),
          page.click('button[type="submit"]'),
        ]);
        try {
          await page.getByRole('link', { name: 'Forms' }).click({ timeout: 20000 });
          await page.getByText("Settings").click({timeout: 20000});
        } 
        catch (error) {
          if (error instanceof playwright.errors.TimeoutError)
            console.log("Timeout!");
        }
       // Setting links testing
        await page
          .getByRole("listitem")
          .filter({ hasText: "General" })
          .click({ timeout: 20000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Teams" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Password" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Billing" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Invoices" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Tokens" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
      });

      //forms navigation testing
      test("forms navigation testing", async ({ page }) => {
        //hardcoded the form navigation
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
        await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
        await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
        await page.getByText("Remember me").check();
        await Promise.all([
          page.waitForNavigation(),
          page.click('button[type="submit"]'),
        ]);
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_FORM_ADD1}`.replace(/"/g, ""));
        try {
          await page.getByText("Submissions").click();
          await page.waitForLoadState("networkidle");
          // Setting links testing
          await page
            .getByRole("listitem")
            .filter({ hasText: "All" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Spam" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Verified" })
            .click({ timeout: 1000 });
          await page.getByText("Reports").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Setup").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Apps").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Workflows").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Settings").click();
          await page.waitForLoadState("networkidle");
          // await page.waitForLoadState('networkidle');

          await page.getByText("Settings").click();
          await page.waitForLoadState("networkidle");
          await page
            .getByRole("listitem")
            .filter({ hasText: "General" })
            .click({ timeout: 20000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Spam Filtering" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Autoresponders" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Email Notification" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Thank You Page" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
        } catch (error) {
          if (error instanceof playwright.errors.TimeoutError)
            console.log("Timeout!");
        }
      });

      test("Team navigation", async ({ page }) => {
        //hardcoded team navigation
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
        await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
        await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
        await page.getByText("Remember me").check();
        await Promise.all([
          page.waitForNavigation(),
          page.click('button[type="submit"]'),
        ]);
        //redirecting to teams page
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_NAME}`.replace(/"/g, ""));
        await page.waitForLoadState("networkidle");
        try {
          await page.getByRole('link', { name: 'Forms' }).click({ timeout: 10000 });
          await page.waitForLoadState("networkidle");
          await page.getByText("Settings").click({timeout: 20000});
          await page.waitForLoadState("networkidle");
        } catch (error) {
          if (error instanceof playwright.errors.TimeoutError)
            console.log("Timeout!");
        }
        // await page.waitForLoadState("networkidle");
        // Setting links testing
        await page
          .getByRole("listitem")
          .filter({ hasText: "General" })
          .click({ timeout: 20000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Members" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Billing" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
        await page
          .getByRole("listitem")
          .filter({ hasText: "Invoices" })
          .click({ timeout: 1000 });
        // await page.waitForLoadState('networkidle');
      });
      test("team form navigation test", async ({ page }) => {
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
        await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
        await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
        await page.getByText("Remember me").check();
        await Promise.all([
          page.waitForNavigation(),
          page.click('button[type="submit"]'),
        ]);
        console.log("URL:", process.env.NEXT_PUBLIC_FORM_ADD2);
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_FORM_ADD2}`.replace(/"/g, ""));
        try {
          await page.getByRole('link', { name: 'Submissions' }).click();
          await page.waitForLoadState("networkidle");

          // Setting links testing
          await page
            .getByRole("listitem")
            .filter({ hasText: "All" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Spam" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Verified" })
            .click({ timeout: 1000 });

          await page.getByText("Reports").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Setup").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Apps").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Workflows").click();
          await page.waitForLoadState("networkidle");
          await page.getByText("Settings").click({timeout: 20000});
          await page.waitForLoadState("networkidle");

          await page
            .getByRole("listitem")
            .filter({ hasText: "General" })
            .click({ timeout: 20000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Spam Filtering" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Autoresponders" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Email Notification" })
            .click({ timeout: 1000 });
          // await page.waitForLoadState('networkidle');
          await page
            .getByRole("listitem")
            .filter({ hasText: "Thank You Page" })
            .click({ timeout: 1000 });
        } catch (error) {
          if (error instanceof playwright.errors.TimeoutError)
            console.log("Timeout!");
        }
      });
});

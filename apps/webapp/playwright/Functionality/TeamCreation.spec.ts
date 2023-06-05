import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("test for team creation", async () => {
  test("test", async ({ page }) => {
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
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
    await page.getByRole("link", { name: "Settings" }).click();
    await page.getByRole("link", { name: "Teams" }).click();
    await page.getByRole("button", { name: "Create a Team" }).click();
    await page.getByPlaceholder("Team name").fill(`${process.env.NEXT_PUBLIC_TEAM_CREATE}`);
    await page
      .getByPlaceholder("Enter emails in comma separated format.")
      .click();
    await page
      .getByPlaceholder("Enter emails in comma separated format.")
      .fill(`${process.env.NEXT_PUBLIC_TEAM_CREATE_EMAIL}`);
    /* await page
      .getByRole("option", { name: "Free - Trial for two weeks" })
      .click(); */
    await page.getByRole("button", { name: "Create" }).click();
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_CREATE}`.replace(/"/g, ""));
    await page.reload();
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, ""));
    await page.getByRole("link", { name: "Settings" }).click({timeout: 5000});
    await page.getByRole("link", { name: "Teams" }).click({timeout: 5000});
    await page.getByRole('link', { name: 'View' }).first().click();
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_TEAM_CREATE}`.replace(/"/g, ""));
    // page.getByRole("combobox", { name: "Select a team" }).click();
    await page.getByRole("link", { name: "Settings" }).click({timeout: 5000});
    await page.getByRole("link", { name: "Teams" }).click({ timeout: 5000});
    await page.getByRole('link', { name: 'Manage' }).first().click();
  });
});

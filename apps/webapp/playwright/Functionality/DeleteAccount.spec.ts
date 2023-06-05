import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

//deleting the personal team Account
test.describe("delete the team account", async () => {
  test("personal team Account", async ({ page }) => {
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

    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}/settings`.replace(/"/g, ""));
    await page.getByRole('link',{name: "Settings"}).click();
    await page.getByRole('listitem').filter({ hasText: 'General'}).click();
    await page.getByRole('button', { name: 'Delete Personal Account' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^zillio-fnnSettings$/ }).getByRole('link', { name: 'Settings' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Delete team' }).click();
  await page1.locator('#confirm').click();
  await page1.locator('#confirm').fill(`${process.env.NEXT_PUBLIC_DELETE_TEAM_NAME}`);
  await page1.getByRole('button', { name: 'Delete team' }).click();
  await page1.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, ""));
  });
});

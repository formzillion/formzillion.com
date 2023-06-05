import { test, expect } from "@playwright/test";
import { config } from "dotenv";
config();

test.describe("Login Testing", () => {
  test("USER_LOGIN", async ({ page }) => {
    const App=`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "");
    await page.goto(App);
    await page.waitForLoadState('networkidle');
    try {
      await page.fill('input[type="email"]', `${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
      await page.fill('input[type="password"]', `${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
      await page.check('input[type="checkbox"][name="rememberMe"]');
      
      await Promise.all([
        page.waitForNavigation(),
        page.click('button[type="submit"]'),
      ]);
    } catch (error) {
      console.log("Navigation error:", error);
    }

    const url = page.url();
    console.log(url);

    const expectedURL = `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, "");
    expect(url).toBe(expectedURL);

    if (url === expectedURL) {
      console.log("Successfully logged in!");
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}`.replace(/"/g, ""));
      await page.waitForLoadState("networkidle");
    } else {
      console.log("Check whether you have entered the correct login credentials.");
    }

   /*  const url = page.url();
    console.log(url);

    const expectedURL = `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.USER_NAME}`;
    expect(url).toBe(expectedURL);

    if (url === expectedURL) {
      console.log("Successfully logged in!");
      // If the URL matches the expected URL, you can navigate to the expectedURL
      await page.waitForLoadState("networkidle");
    } else {
      console.log("Check whether you have entered the correct login credentials.");
    } */
  });
});

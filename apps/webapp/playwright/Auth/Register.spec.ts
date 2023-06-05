import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.describe("Registration Testing", async () => { // Add async keyword here
  test("User Register page testing", async ({ page }) => {
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/register`.replace(/"/g, ""));
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').press("Control+a");
    await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').press("Control+a");
    await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));

    await page.getByRole("checkbox").check();
    await Promise.all([
     // page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    // Wait for the response
    const response = await page.waitForResponse(response => response.url().includes("/register"));

    // Check the status code
    if (response.status() === 500) {
      console.log("Registration failed. Redirecting to login page...");
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
      // Perform any additional actions needed after redirecting to the login page
    } else {
      // Registration successful, perform necessary actions
      console.log("User registration successful.");
      console.log("Check your email to verify the registration!..");
    }
  });
});
        
     /*  // Wait for an alert dialog
    const dialog = await page.waitForEvent('dialog');

    // Extract the alert message
    const alertMessage = dialog.message();

    // Check the alert message
    if (alertMessage.includes("User already registered.")) {
      console.log("User is already registered.");
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
      // Perform the necessary actions if the user is already registered
    } else {
      console.log("User registration successful.");
      console.log('check your mail to verify the registration!..');
      // Perform the necessary actions if the user registration is successful
    }
 */
     
 

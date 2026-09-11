# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional/login.spec.ts >> CURA Login scenarios >> valid login redirects to appointment form
- Location: tests/functional/login.spec.ts:9:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /#appointment/
Received string:  "https://katalon-demo-cura.herokuapp.com/profile.php#login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://katalon-demo-cura.herokuapp.com/profile.php#login"

```

```yaml
- link "":
  - /url: "#"
- navigation:
  - list:
    - link "":
      - /url: "#"
    - listitem:
      - link "CURA Healthcare":
        - /url: ./
    - listitem:
      - link "Home":
        - /url: ./
    - listitem:
      - link "Login":
        - /url: profile.php#login
- banner:
  - heading "CURA Healthcare Service" [level=1]
  - heading "We Care About Your Health" [level=3]
  - link "Make Appointment":
    - /url: ./profile.php#login
- heading "Login" [level=2]
- paragraph: Please login to make appointment.
- paragraph: Login failed! Please ensure the username and password are valid.
- text: Demo account
- textbox "Username": John Doe
- textbox "Password": ThisIsNotAPassword
- text: Username
- textbox "Username"
- text: Password
- textbox "Password"
- button "Login"
- contentinfo:
  - heading "CURA Healthcare Service" [level=4]:
    - strong: CURA Healthcare Service
  - paragraph: Atlanta 550 Pharr Road NE Suite 525 Atlanta, GA 30305
  - list:
    - listitem:  (678) 813-1KMS
    - listitem:
      - text: 
      - link "info@katalon.com":
        - /url: mailto:info@katalon.com
  - list:
    - listitem:
      - link "":
        - /url: "#"
    - listitem:
      - link "":
        - /url: "#"
    - listitem:
      - link "":
        - /url: "#"
  - separator
  - paragraph: Copyright © CURA Healthcare Service 2026
  - link "":
    - /url: "#top"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { allure } from 'allure-playwright';
  3  | import { HomePage } from '../../src/pages/HomePage';
  4  | import { LoginPage } from '../../src/pages/LoginPage';
  5  | import { env } from '../../src/config/env';
  6  | import { Logger } from '../../src/utils/logger';
  7  | 
  8  | test.describe('CURA Login scenarios', () => {
  9  |   test('valid login redirects to appointment form', async ({ page }) => {
  10 |     const homePage = new HomePage(page);
  11 |     const loginPage = new LoginPage(page);
  12 | 
  13 |     await allure.step('Open home page', async () => {
  14 |       await homePage.openHomePage();
  15 |       await homePage.expectHomePage();
  16 |     });
  17 | 
  18 |     Logger.step('Click Make Appointment');
  19 |     await homePage.clickMakeAppointment();
  20 | 
  21 |     await allure.step('Validate login page is displayed', async () => {
  22 |       await loginPage.expectLoginPage();
  23 |     });
  24 | 
  25 |     await allure.step('Submit valid credentials', async () => {
  26 |       await loginPage.login(env.username, env.password);
  27 |     });
  28 | 
> 29 |     await expect(page).toHaveURL(/#appointment/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  30 |     await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  31 |   });
  32 | 
  33 |   test('invalid login shows validation error', async ({ page }) => {
  34 |     const loginPage = new LoginPage(page);
  35 | 
  36 |     await allure.step('Open login page', async () => {
  37 |       await loginPage.openLoginPage();
  38 |     });
  39 | 
  40 |     await allure.step('Submit invalid credentials', async () => {
  41 |       await loginPage.login(env.invalidUsername, env.invalidPassword);
  42 |     });
  43 | 
  44 |     await allure.step('Verify invalid login error message', async () => {
  45 |       await loginPage.expectInvalidLoginError();
  46 |       await loginPage.expectLoginPage();
  47 |     });
  48 |   });
  49 | });
  50 | 
```
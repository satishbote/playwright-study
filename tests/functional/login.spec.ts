import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { LoginPage } from '../../src/pages/LoginPage';
import { env } from '../../src/config/env';
import { withStep } from '../../src/utils/allureHelper';

test.describe('CURA Login scenarios', () => {
  test('valid login redirects to appointment form', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await withStep(page, 'Open home page', async () => {
      await homePage.openHomePage();
      await homePage.expectHomePage();
    });

    await withStep(page, 'Click Make Appointment', async () => {
      await homePage.clickMakeAppointment();
    });

    await withStep(page, 'Validate login page is displayed', async () => {
      await loginPage.expectLoginPage();
    });

    await withStep(page, 'Submit valid credentials', async () => {
      await loginPage.login(env.username, env.password);
    });

    await withStep(page, 'Verify appointment page is displayed', async () => {
      await expect(page).toHaveURL(/#appointment/);
      await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
    });
  });

  test('invalid login shows validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await withStep(page, 'Open login page', async () => {
      await loginPage.openLoginPage();
    });

    await withStep(page, 'Submit invalid credentials', async () => {
      await loginPage.login(env.invalidUsername, env.invalidPassword);
    });

    await withStep(page, 'Verify invalid login error message', async () => {
      await loginPage.expectInvalidLoginError();
      await loginPage.expectLoginPage();
    });
  });
});

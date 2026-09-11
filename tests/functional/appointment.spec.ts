import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { MakeApptPage } from '../../src/pages/MakeApptPage';
import { ApptConfirmPage } from '../../src/pages/ApptConfirmPage';
import { env } from '../../src/config/env';
import { withStep } from '../../src/utils/allureHelper';

test.describe('CURA Appointment scenarios', () => {
  test('book appointment after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new MakeApptPage(page);
    const confirmationPage = new ApptConfirmPage(page);

    await withStep(page, 'Open login page and sign in', async () => {
      await loginPage.openLoginPage();
      await loginPage.login(env.username, env.password);
    });

    await withStep(page, 'Verify appointment form is displayed', async () => {
      await appointmentPage.expectAppointmentFormVisible();
    });

    await withStep(page, 'Fill appointment details', async () => {
      await appointmentPage.fillAppointmentForm();
    });

    await withStep(page, 'Submit appointment', async () => {
      await appointmentPage.bookAppointment();
    });

    await withStep(page, 'Verify appointment confirmation', async () => {
      await confirmationPage.expectConfirmationPageVisible();
      await confirmationPage.expectSubmittedValues(appointmentPage.appointmentData);
    });
  });
});

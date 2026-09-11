import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly makeAppointmentLink = this.page.getByRole('link', { name: 'Make Appointment' });

  constructor(page: Page) {
    super(page);
  }

  async openHomePage(): Promise<void> {
    await this.open('/');
  }

  async clickMakeAppointment(): Promise<void> {
    await this.makeAppointmentLink.click();
  }

  async expectHomePage(): Promise<void> {
    await expect(this.page).toHaveTitle('CURA Healthcare Service');
  }
}

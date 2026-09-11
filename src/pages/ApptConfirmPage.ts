import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ApptConfirmPage extends BasePage {
  readonly confirmationHeading = this.page.locator('h2');
  readonly confirmationBody = this.page.locator('body');

  constructor(page: Page) {
    super(page);
  }

  async expectConfirmationPageVisible(): Promise<void> {
    await expect(this.confirmationHeading).toContainText('Appointment Confirmation');
    await expect(this.page).toHaveURL(/appointment\.php#summary/);
  }

  async expectSubmittedValues(data: {
    facility: string;
    visitDate: string;
    comment: string;
    healthcareProgram: string;
    hospitalReadmission: string;
  }): Promise<void> {
    await expect(this.confirmationBody).toContainText(data.facility);
    await expect(this.confirmationBody).toContainText(data.visitDate);
    await expect(this.confirmationBody).toContainText(data.comment);
    await expect(this.confirmationBody).toContainText(data.healthcareProgram);
    await expect(this.confirmationBody).toContainText(data.hospitalReadmission);
  }
}

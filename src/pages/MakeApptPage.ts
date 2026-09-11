import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MakeApptPage extends BasePage {
  readonly facilitySelect = this.page.locator('#combo_facility');
  readonly visitDateInput = this.page.locator('#txt_visit_date');
  readonly commentInput = this.page.locator('#txt_comment');
  readonly medicaidRadio = this.page.locator('#radio_program_medicaid');
  readonly readmissionCheckbox = this.page.locator('#chk_hospotal_readmission');
  readonly bookButton = this.page.locator('#btn-book-appointment');
  readonly pageHeading = this.page.getByRole('heading', { name: 'Make Appointment' });

  readonly appointmentData = {
    facility: 'Seoul CURA Healthcare Center',
    visitDate: MakeApptPage.getTodayVisitDate(),
    comment: 'Routine checkup and follow-up consultation.',
    healthcareProgram: 'Medicaid',
    hospitalReadmission: 'Yes',
  };

  constructor(page: Page) {
    super(page);
  }

  private static getTodayVisitDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async openAppointmentPage(): Promise<void> {
    await this.open('/#appointment');
  }

  async fillAppointmentForm(): Promise<void> {
    const { facility, visitDate, comment } = this.appointmentData;

    await this.facilitySelect.selectOption(facility);
    await expect(this.facilitySelect).toHaveValue(facility);

    await this.readmissionCheckbox.check();
    await expect(this.readmissionCheckbox).toBeChecked();

    await this.medicaidRadio.check();
    await expect(this.medicaidRadio).toBeChecked();

    await this.visitDateInput.evaluate((element, value) => {
      const input = element as HTMLInputElement;
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, visitDate);
    await expect(this.visitDateInput).toHaveValue(visitDate);

    await this.commentInput.fill(comment);
    await expect(this.commentInput).toHaveValue(comment);
  }

  async bookAppointment(): Promise<void> {
    await this.bookButton.click();
  }

  async expectAppointmentFormVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.page).toHaveURL(/#appointment/);
  }
}

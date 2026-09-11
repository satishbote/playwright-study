import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('#txt-username');
  readonly passwordInput = this.page.locator('#txt-password');
  readonly loginButton = this.page.locator('#btn-login');
  readonly errorMessage = this.page.getByText('Login failed! Please ensure the username and password are valid.');
  readonly heading = this.page.getByRole('heading', { name: 'Login' });

  constructor(page: Page) {
    super(page);
  }

  async openLoginPage(): Promise<void> {
    await this.open('/profile.php#login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/profile\.php#login/);
    await expect(this.heading).toBeVisible();
  }

  async expectInvalidLoginError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}

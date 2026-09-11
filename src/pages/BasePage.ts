import { Page, expect } from '@playwright/test';
import { env } from '../config/env';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = '/'): Promise<void> {
    await this.page.goto(`${env.baseUrl}${path}`);
  }

  async waitForTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }
}

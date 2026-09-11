import { Page } from '@playwright/test';
import { allure } from 'allure-playwright';
import { Logger } from './logger';

export async function attachPageScreenshot(page: Page, name: string, stage: 'before' | 'after' = 'after'): Promise<void> {
  const screenshot = await page.screenshot({ fullPage: false });
  await allure.attachment(`${name} ${stage} screenshot`, screenshot, 'image/png');
}

export async function withStep<T>(page: Page, name: string, action: () => Promise<T>): Promise<T> {
  Logger.step(name);

  return await allure.step(name, async () => {
    await attachPageScreenshot(page, name, 'before');
    const result = await action();
    await attachPageScreenshot(page, name, 'after');
    return result;
  });
}

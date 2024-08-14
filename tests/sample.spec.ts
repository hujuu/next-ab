import { test, expect } from '@playwright/test';

test('表示テスト', async ({ page }) => {
  await page.goto('http://localhost:3000/sample');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/テストページ/);
  await expect(page.getByRole("heading")).toHaveText(/ハンズオン/);
});

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: '入力フォーム' }).click();
    await expect(page.getByRole('heading', { name: '入力フォーム' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/form')
});

test('操作test', async ({ page }) => {
    await page.goto('http://localhost:3000/form');
    await page.getByRole('textbox', { name: '1人目' }).fill('a');
    await page.getByRole('textbox', { name: '2人目' }).fill('b');
    await page.getByRole('button', { name: 'シャッフル' }).click();
    await expect(page.getByRole('status', {name: 'result'})).toHaveText(/(a->b)|(b->a)/);
});

test('操作test2', async ({ page }) => {
    await page.route('/api/shuffle', async route => {
        const json = [{ members: ['a', 'b'] }];
        await route.fulfill({json});
    })
    await page.goto('http://localhost:3000/form');
    await page.getByRole('textbox', { name: '1人目' }).fill('a');
    await page.getByRole('textbox', { name: '2人目' }).fill('b');
    await page.getByRole('button', { name: 'シャッフル' }).click();
    await expect(page.getByRole('status', {name: 'result'})).toHaveText(/(a->b)|(b->a)/);
})

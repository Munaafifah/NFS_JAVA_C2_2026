import { test, expect } from '@playwright/test';

test('login, create a ticket, and confirm success', async ({ page }) => {
  const uniqueTitle = `Smoke test ticket ${Date.now()}`;

  await page.goto('/login');

  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('Admin@12345');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible();

  await page.getByRole('link', { name: 'Tickets', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Tickets' })).toBeVisible();

  await page.getByRole('button', { name: 'New Ticket' }).click();
  await expect(page.getByRole('heading', { name: 'Create Ticket' })).toBeVisible();

  await page.getByLabel('Title').fill(uniqueTitle);
  await page.getByLabel('Description').fill('Created by the Day 15 Playwright smoke test.');
  await page.getByLabel('Category').fill('Smoke Test');

  await page.getByRole('button', { name: 'Create Ticket' }).click();

  await expect(page.getByText('Ticket created successfully.')).toBeVisible();
});
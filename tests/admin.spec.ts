import { test, expect } from '@playwright/test';
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL ?? (() => { throw new Error("BASE_URL is not defined"); })();
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? (() => { throw new Error("ADMIN_USERNAME is not defined"); })();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? (() => { throw new Error("ADMIN_PASSWORD is not defined"); })();
const NEW_USER = process.env.NEW_USER ?? (() => { throw new Error("NEW_USER is not defined"); })();
const EDIT_USER = process.env.EDIT_USER ?? (() => { throw new Error("EDIT_USER is not defined"); })();

test.describe('User Management', () => {
  test('Admin can log in, add and delete a new user', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.click('#menu-sign-up-button');

    await page.fill('#username_input', ADMIN_USERNAME);
    await page.fill('#password_input', ADMIN_PASSWORD);

    await page.click('#sign-up-button');

    await expect(page.locator('#avatar-menu')).toBeVisible();

    await page.click('text=Пользователи');

    await expect(page.locator('#add-item-table-button')).toHaveText("Добавить пользователя");

    await page.click('#add-item-table-button');

    await page.fill('input#lastname_input', "Иванов");
    await page.fill('input#name_input', "Иван");
    await page.fill('input#patronymic_input', "Иванович");
    await page.fill('input#username_input', NEW_USER);
    await page.fill('input#password_input', "SecurePass123!");

    await page.selectOption("select", { index: 1 });

    await page.click('button:has-text("Зарегистрировать")');

    await expect(page.locator(`text=${NEW_USER}`)).toBeVisible();

    await page.click(`#delete-${NEW_USER}-button`);
    await page.click('#accept-deletion-button');

    await expect(page.locator(`text=${NEW_USER}`)).not.toBeVisible();

    await page.click('#avatar-menu');
    await page.click('#logout-button');
  });
});

test.describe('User Management', () => {
  test('Admin can log in and edit user', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.click('#menu-sign-up-button');

    await page.fill('#username_input', ADMIN_USERNAME);
    await page.fill('#password_input', ADMIN_PASSWORD);

    await page.click('#sign-up-button');

    await expect(page.locator('#avatar-menu')).toBeVisible();

    await page.click('text=Пользователи');

    await page.click(`#edit-${EDIT_USER}-button`);

    await page.fill('input#lastname_input', "Тестовый");
    await page.fill('input#name_input', "Тест");
    await page.fill('input#patronymic_input', "Тестов");
    await page.fill('input#username_input', EDIT_USER);
    await page.fill('input#password_input', "SecurePass123!");
    await page.selectOption("select", { index: 1 });
    await page.click('button:has-text("Сохранить")');

    await expect(page.locator(`#${EDIT_USER}-username-div`)).toBeVisible();
    await expect(page.locator(`#${EDIT_USER}-fio-div`)).toHaveText("Тестовый Тест Тестов");

    await page.click(`#edit-${EDIT_USER}-button`);
    await page.fill('input#lastname_input', "Пустой тестовый");
    await page.fill('input#name_input', "Пустой тестовый");
    await page.fill('input#patronymic_input', "Пустой тестовый");
    await page.fill('input#username_input', EDIT_USER);
    await page.fill('input#password_input', ADMIN_PASSWORD);
    await page.selectOption("select", { index: 2 });
    await page.click('button:has-text("Сохранить")');

    await page.click('#avatar-menu');
    await page.click('#logout-button');
  });
});
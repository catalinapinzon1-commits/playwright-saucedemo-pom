import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Pruebas de Autenticación - SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-01: Inicio de sesión exitoso', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    // Validar redirección a la página de inventario
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('TC-02: Error con usuario bloqueado', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertErrorMessageContains('Sorry, this user has been locked out.');
  });
});
import { test, expect } from '@playwright/test';

test('Acceseaz secțiuni din meniu cu selectori diferiți', async ({ page }) => {
  await page.goto('https://www.cresaluncacetatuii.ro/');

  // 1. Despre noi – selector CSS (atribut href)
  await page.click('a[href*="DespreNoi"]');
  await expect(page).toHaveURL(/.*DespreNoi/); //verificare suplimentara ca am accesat pagina

  // 2. Înscrieri – selector după text
  await page.click('text=Înscrieri');
  await expect(page).toHaveURL(/.*Inscrieri/); //verificare suplimentara ca am accesat pagina

  // 3. Anunțuri – selector role + name
  await page.getByRole('link', { name: 'Anunțuri' }).click();
  await expect(page).toHaveURL(/.*Anunturi/); //verificare suplimentara ca am accesat pagina

  // 4. Asociația de părinți – selector XPath
  const asociatia = page.locator('//a[contains(text(), "Asociația de părinți")]');
  await asociatia.click();
  await expect(page).toHaveURL(/.*Asociatia/); //verificare suplimentara ca am accesat pagina
});
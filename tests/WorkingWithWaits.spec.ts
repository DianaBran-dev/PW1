import { test, expect } from '@playwright/test';

test('Căutare și aplicare filtru cu așteptare pe elefant.ro', async ({ page }) => {
  //Deschid pagina principală si accept cookies
  await page.goto('https://www.elefant.ro/');
  await page.click('button:has-text("ACCEPT")');

  //Caut „laptop” în bara de căutare
  await page.fill('input[name="SearchTerm"]', 'laptop');
  await page.press('input[name="SearchTerm"]', 'Enter');

  //Așteapt ca produsele să se încarce
  await page.waitForSelector('.product-title');

   //Click pe filtrul „sub 15%”
  const filtruDiscount = page.locator('a.filter-item-name', { hasText: 'sub 15%' });
  await filtruDiscount.click();

  //Așteapt încărcarea paginii filtrate
  await page.waitForSelector('.product-title');

  // 7. Verificare: cel puțin 1 produs afișat
  const produse = await page.locator('.product-title').count();
  expect(produse).toBeGreaterThan(0);
});
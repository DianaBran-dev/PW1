import { test, expect } from '@playwright/test';

test('Gestionare eroare buton inexistent pagina cresa ', async ({ page }) => {
  //Deschid site-ul
  await page.goto('https://www.cresaluncacetatuii.ro/'); 

  //Buton inexistent
   try {
    await page.click('#buton-inexistent', { timeout: 2000 });
  } catch (e) {
    console.log('Butonul nu a fost găsit, dar nu întrerupem testul.');
  }

  // Accesez sectiunea de  Anunțuri – selector role + name
  await page.getByRole('link', { name: 'Anunțuri' }).click();
  await expect(page).toHaveURL(/.*Anunturi/);

});
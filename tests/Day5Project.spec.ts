import { test, expect } from '@playwright/test';

//Before Each
test.beforeEach('Accesare Price.ro', async ({ page }) => {
	await page.goto('https://www.price.ro/');
  await expect(page).toHaveURL(/.*price/);

});

test.describe('Price.ro - funcționalitate căutare', () => {
  test('Căutare reușită dupa PlayStation', async ({ page }) => {
    await page.fill('#text', 'PlayStation 5');
    await page.press('#text', 'Enter');

    //Astept putin pentru incarcare completa -  pentru ca produsele sa apara dupa search
    await page.waitForTimeout(2000);

    // Verific dacă sunt cel puțin 3 rezultate
    const rezultate = page.locator('.produs-lista.box-shadow');
    const count = await rezultate.count();
    expect(count).toBeGreaterThan(2);
  });

  test('Căutare nereușită dupa termen inexistent', async ({ page }) => {
    await page.fill('#text', 'alabalaportocala');
    await page.press('#text', 'Enter');

    // Așteapt mesajul de "nu a fost gasita nici o inregistrare!"
    await page.waitForSelector('font[color="red"]', { timeout: 5000 });
   
    // Verific textul
    const mesaj = await page.locator('font[color="red"]').innerText();
    expect(mesaj.toLowerCase()).toContain('nu a fost gasita nici o inregistrare!');
  });

  test('Gestionare eroare cu try/catch pentru un selector inexistent', async ({ page }) => {
    await page.fill('#text', 'ION');
    await page.press('#text', 'Enter');

    try {
      // Selector greșit intenționat pentru simulare eroare
      await page.waitForSelector('.selector-care-nu-exista', { timeout: 3000 });
      console.log('Acest selector a fost găsit (ceea ce e neașteptat)');
        } catch (error) {
        console.log('Selectorul nu a fost găsit, cum era de așteptat. Eroarea a fost tratată.');
     }

    //Astept aparitia dupa search
    await page.waitForSelector('.produs-lista', { timeout: 5000 });
    //Click pe primul produs
    const primulProdus = page.locator('.produs-lista').first(); 
    await primulProdus.locator('a').first().click(); 
    //Verific daca s-a deschis pagina
    await expect(page).toHaveURL(/.*preturi-ion-ovidiu-panisoara/); 

  });

});
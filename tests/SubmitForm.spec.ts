import { test, expect } from '@playwright/test';

test('Completează formularul', async ({ page }) => {
  //Deschid site-ul
  await page.goto('https://www.cresaluncacetatuii.ro');

  // Click pe "Contact" (dreapta sus)
  await page.click('a:has-text("Contact")');

  // Completez formularul
  await page.fill('input[name="fullname"]', 'Test');
  await page.fill('input[name="email"]', 'test@test.com');
  await page.fill('input[name="phone"]', '012345689');
  await page.fill('input[name="subject"]', 'Test');
  await page.fill('textarea[name="message"]', 'Test');

  // Trimit formularul
  //await page.click('input[type="submit"]'); //am comentat ca sa nu dau send

});
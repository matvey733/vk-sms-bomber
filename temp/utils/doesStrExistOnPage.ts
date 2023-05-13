import { Page } from "puppeteer-core";

export default async function doesStrExistOnPage(page: Page, str: string) {
  const html = await page.content();
  if (html.includes(str)) return true;
  return false;
}
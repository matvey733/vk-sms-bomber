import { Page } from "puppeteer-core";
import range from "../utils/range";
import wait from "../utils/wait";

export default async function pressEnter(page: Page) {
  await wait(range(500, 1000));
  await page.keyboard.down("Enter");
}

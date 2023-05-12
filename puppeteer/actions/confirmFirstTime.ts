import { Page } from "puppeteer";
import selectors from "../selectors";
import range from "../utils/range";
import wait from "../utils/wait";

export default async function confirmFirstTime(page: Page) {
  await page.waitForSelector(selectors.firstConfirmBtn);
  await wait(range(1000, 3000));
  await page.click(selectors.firstConfirmBtn);
}

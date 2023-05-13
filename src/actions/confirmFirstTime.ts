import { Page } from "puppeteer-core";
import selectors from "../utils/selectors";
import range from "../utils/range";
import wait from "../utils/wait";

export default async function confirmFirstTime(page: Page) {
  await wait(range(2000, 3000));
  await page.waitForSelector(selectors.firstConfirmBtn);
  await page.click(selectors.firstConfirmBtn);
}

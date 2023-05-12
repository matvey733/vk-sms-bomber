import { Page } from "puppeteer-core";
import selectors from "../selectors";
import range from "../utils/range";
import wait from "../utils/wait";

export default async function confirmSecondTimeIfNeeded(page: Page) {
  await wait(range(5000, 6000));
  const shouldConfirmAgainBtn = await page.$(selectors.secondConfirmBtn);
  if (shouldConfirmAgainBtn) {
    await page.click(selectors.secondConfirmBtn);
  }
}

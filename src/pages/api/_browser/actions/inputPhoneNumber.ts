import { Page } from "puppeteer";
import selectors from "../selectors";
import range from "../utils/range";
import wait from "../utils/wait";

export default async function inputPhoneNumber(page: Page, phoneNumber: string) {
  await wait(range(1000, 5000));
  await page.waitForSelector(selectors.phoneNumberInput);
  await page.type(selectors.phoneNumberInput, phoneNumber);
}

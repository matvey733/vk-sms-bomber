import { Page } from "puppeteer";
import wait from "../utils/wait";

export default async function clickResendSmsBtn(page: Page) {
  await wait(200_200); // sms resend cooldown

  const elems = await page.$$("body *");

  for (const elem of elems) {
    const testId = await elem.evaluate(el => el.getAttribute("data-test-id"));
    if (testId === "resendInSMSButton" || testId === "resendInCallButton") {
      await elem.click()
    }
  }
}

import { Page } from "puppeteer-core";
import wait from "../utils/wait";

export default async function clickResendSmsBtn(page: Page) {
  await wait(130_000); // 130 second sms resend cooldown

  const elems = await page.$$("body *");

  for (const elem of elems) {
    const testId = await elem.evaluate(el => el.getAttribute("data-test-id"));
    if (testId === "resendInSMSButton" || testId === "resendInCallButton") {
      await elem.click();
    }
  }
}

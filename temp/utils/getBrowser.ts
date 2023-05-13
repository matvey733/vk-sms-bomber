import puppeteer, { Browser } from "puppeteer-core";

export default async function getBrowser(options: { headless: boolean }): Promise<Browser> {
  const NODE_ENV = process.env.NODE_ENV;
  const BROWSER_EXEC_PATH = process.env.BROWSER_EXEC_PATH;
  const TOKEN = process.env.TOKEN;

  if (NODE_ENV === "development") {
    if (!BROWSER_EXEC_PATH) throw new Error("no BROWSER_EXEC_PATH provided");
    return puppeteer.launch({
      executablePath: BROWSER_EXEC_PATH,
      headless: options.headless
    });
  } else if (NODE_ENV === "production") {
    if (!TOKEN) throw new Error("no TOKEN provided");
    return puppeteer.connect({ browserWSEndpoint: `wss://chrome.browserless.io?token=${TOKEN}` });
  } else {
    throw new Error("unknown environment. Possible environments are: 'development', 'production'");
  }
}

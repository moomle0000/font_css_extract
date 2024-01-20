
const puppeteer = require("puppeteer");

async function findewoff(URL) {
  try {
    const botConfiguration = {
      headless: true,
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      args: ["--profile-directory=Profile 28"],
    };

    // Launch the headless browser
    const browser = await puppeteer.launch(botConfiguration);
    const page = await browser.newPage();
    // Go to the webpage
    await page.goto(URL);

    let findewoff = [];
    const type = ["woff", "woff2"];
    const finalResponse = await page.waitForResponse(async (response) => {
      const url = response.url().includes(type[0])
        ? response.url()
        : null || response.url().includes(type[1])
        ? response.url()
        : null;
      if (url) {
        findewoff.push({url :response.url(), name: response.url().split("/").pop()});

        // console.log(response.url());
      }
      return (await response.url()).includes(type[0]);
    });
    finalResponse.ok();

    await browser.close();
    // await browser.close();
    return findewoff;
  } catch (error) {
    console.error(error);
  }
}



module.exports = findewoff;
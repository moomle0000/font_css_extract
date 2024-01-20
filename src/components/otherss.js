const axios = require("axios");
const fs = require("fs");
const fonteditor = require('fonteditor-core');

async function otherss(woffUrl) {
    const axiosConfig = {
      method: "get",
      url: woffUrl.url,
      responseType: "arraybuffer",
      headers: {
        Referer:
          "https://commercialtype.com/catalog/lyon_arabic/lyon_arabic_text/regular",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    };
  
    axios(axiosConfig)
      .then((response) => {
          console.log(`output/${woffUrl.url.split("/").pop().split(".")[0]}.ttf`)
        const woffBuffer = Buffer.from(response.data);
  
  
        // Create a Font object from the WOFF2 font buffer
        const font = fonteditor.Font.create(woffBuffer, {
          type: "woff2", // Specify the font format
        });
  
        // Convert the font to TTF format
        const ttfBuffer = font.write({
          type: "ttf", // Specify the target format
        });
  
        // Save the TTF font to a file using Node.js file system module
        
        fs.writeFileSync(`output/${woffUrl.url.split("/").pop().split(".")[0]}.ttf`, ttfBuffer);
  
        //   fs.writeFile("output/" + woffUrl.name, woffBuffer, "binary", (err) => {
        //     if (err) {
        //       console.error(`Error saving ${woffUrl.url.split("/").pop().split(".")[1]} file:`, err);
        //     } else {
        //       console.log(`${woffUrl.url.split("/").pop().split(".")[1]} file saved successfully`);
        //     }
        //   });
      })
      .catch((error) => {
        console.error("Error fetching the WOFF file:", error);
      });
  }
  
module.exports = otherss;
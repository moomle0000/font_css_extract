const axios = require("axios");
const fs = require("fs");



async function savedwoff(woffUrl) {
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
        const woffBuffer = Buffer.from(response.data);
  
            fs.writeFile("output/" + woffUrl.name, woffBuffer, "binary", (err) => {
              if (err) {
                console.error(`Error saving ${woffUrl.url.split("/").pop().split(".")[1]} file:`, err);
              } else {
                console.log(`${woffUrl.url.split("/").pop().split(".")[1]} file saved successfully`);
              }
            });
          })
      .catch((error) => {
        console.error("Error fetching the WOFF file:", error);
      });
  }


module.exports = savedwoff
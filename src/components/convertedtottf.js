const axios = require("axios");
const fs = require("fs");
const fonteditor = require("fonteditor-core");

async function convertedtottf(woffUrl) {
  const axiosConfig = {
    method: "get",
    url: woffUrl.url,
    responseType: "arraybuffer",
    headers: {
      Referer: woffUrl.url,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  };

  axios(axiosConfig)
    .then((response) => {
      const woffBuffer = Buffer.from(response.data);
      fonteditor.woff2.init().then(() => {
        // read woff2
        const font = fonteditor.Font.create(woffBuffer, {
          type: "woff2",
        });
        // write woff2
        const buffer = font.write({ type: "ttf" });

        fs.mkdir(
          `output/ttf/${woffUrl.url.split("/")[4]}/`,
          { recursive: true },
          (err) => {
            if (err) throw err;
          }
        );

        fs.writeFile(
          `output/ttf/${woffUrl.url.split("/")[4]}/${
            woffUrl.url.split("/").pop().split(".")[0]
          }.ttf`,
          buffer,
          "binary",
          (err) => {
            if (err) {
              console.error(
                `Error saving ${
                  woffUrl.url.split("/").pop().split(".")[1]
                } file:`,
                err
              );
            } else {
              console.log(
                `${
                  woffUrl.url.split("/").pop().split(".")[1]
                } file saved successfully`
              );
            }
          }
        );
      });
    })
    .catch((error) => {
      console.error("Error fetching the WOFF file:", error);
    });
}

module.exports = convertedtottf;

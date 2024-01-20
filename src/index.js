const axios = require("axios");

const cheerio = require("cheerio");
var prompt = require("prompt");
const findewoff = require("./components/findewoff");
const convertedtottf = require("./components/convertedtottf");

// const otherss = require('./components/otherss');
// const { forEach } = require("lodash");

prompt.start();
prompt.get(
  [
    {
      name: "url",
      required: true,
    },
  ],
  function (err, result) {
    // console.log("Command-line input received:");
    console.log("url: " + result.url);
    main(result.url);
  }
);

async function main(url) {
  const orgin = `https://${url.split("/")[2]}`;
//   const filename = url.split("/").pop();
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const links = $("a.collection_family_name")
    .map((index, element) => $(element).attr("href"))
    .get();
  if (links.length == 0) {
    const response = await findewoff(url);
    // console.log(response[0]);
    convertedtottf(response[0]);
  } else {
    links.map(async (link) => {
      const url = `${orgin}${link}`;
      const response = await findewoff(url);
    //   console.log(response[0]);
      convertedtottf(response[0]);
    });
  }
}

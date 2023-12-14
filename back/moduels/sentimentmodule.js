const axios = require("axios");

const clientId = "8qzmj48qol";
const clientSecret = "bapcD56rKWvbSyAoRvEf4oiXgnLzHsjaxh1FjCMJ";

async function analyzeSentiment(text) {
  try {
    const response = await axios.post(
      "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze",
      {
        content: text,
      },
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": clientId,
          "X-NCP-APIGW-API-KEY": clientSecret,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.document.sentiment;
  } catch (error) {
    throw error;
  }
}

module.exports = analyzeSentiment;

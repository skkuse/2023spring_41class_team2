const axios = require("axios");

require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

const client = axios.create({
  headers: {
    Authorization: "Bearer " + apiKey,
  },
});

var Prompt = "alpha,beta test와 acceptance test의 차이 알려줘?" + "1500자 이내로 답변해줘"
const params = {
  prompt: Prompt,
  model: "text-davinci-003",
  max_tokens: 2048,
  temperature: 0,
};

client
  .post("https://api.openai.com/v1/completions", params)
  .then((result) => {
    console.log(result.data.choices[0].text);
  })
  .catch((err) => {
    console.log(err);
  });

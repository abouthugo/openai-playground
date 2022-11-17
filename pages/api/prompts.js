import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log({ configuration });
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai
    .createCompletion({
      model: "text-davinci-002",
      prompt: generatePrompt(req.body.text),
      temperature: 0.6,
      max_tokens: 150,
    })
    .catch((e) => {
      console.error("Error occurred in API call");
      console.error(e);
    });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(txt) {
  return typeof txt === "string" ? txt : "";
}

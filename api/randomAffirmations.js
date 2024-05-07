const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  // Random chance setup
  if (Math.random() < 0.1) { // 10% chance of Rick Roll
    res.status(200).json({ type: "rickroll", url: "URL_TO_RICK_ROLL_GIF" });
  } else {
    // Fetch an affirmation from ChatGPT
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003", // Make sure to use the latest available model
        prompt: "Give me a positive, uplifting affirmation.",
        max_tokens: 60
      });
      res.status(200).json({ type: "affirmation", text: response.data.choices[0].text.trim() });
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      res.status(500).json({ error: "Error generating affirmation" });
    }
  }
};

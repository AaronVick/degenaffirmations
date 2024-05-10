// api/getAffirmation.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const prompt = "Give me a positive affirmation.";
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({ prompt: prompt, max_tokens: 60 })
    });
    const data = await response.json();
    res.status(200).send(data.choices[0].text.trim());
};

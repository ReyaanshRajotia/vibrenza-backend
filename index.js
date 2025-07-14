const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Load OpenAI API key from environment
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// ✅ /chat endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Invalid message input." });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4", // Use "gpt-3.5-turbo" if you want faster/cheaper
      messages: [
        { role: "system", content: "You are a helpful and fast AI assistant. Reply concisely." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({
      reply: "Server error or OpenAI failed. Try again shortly."
    });
  }
});

// ✅ Launch server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Vibrenza backend running on port ${PORT}`);
});

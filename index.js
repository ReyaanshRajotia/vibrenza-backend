const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Initialize OpenAI (new format)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🔹 Chatbot route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("Chatbot Error:", err.message);
    res.status(500).json({ error: "Failed to connect to GPT-4" });
  }
});

// 🔹 Frequency route (static list)
app.get("/frequencies", (req, res) => {
  const frequencies = [
    { title: "528 Hz – Love & DNA Repair", url: "https://www.youtube.com/watch?v=1Z-3JgnRjBc" },
    { title: "396 Hz – Liberate Fear & Guilt", url: "https://www.youtube.com/watch?v=0-Vk00TVzAU" },
    { title: "417 Hz – Undo Situations & Change", url: "https://www.youtube.com/watch?v=q7M5wVgOxs8" },
    { title: "432 Hz – Natural Tuning", url: "https://www.youtube.com/watch?v=7Wq1PbT5TDs" },
    { title: "639 Hz – Harmonize Relationships", url: "https://www.youtube.com/watch?v=VjVJeTXYpJk" },
    { title: "741 Hz – Awakening Intuition", url: "https://www.youtube.com/watch?v=-DdnKVQgr0k" },
    { title: "852 Hz – Return to Spiritual Order", url: "https://www.youtube.com/watch?v=Y5EgvA2x8rk" },
    { title: "963 Hz – Pineal Gland Activation", url: "https://www.youtube.com/watch?v=qqMKv_Z3tZI" }
  ];

  res.json(frequencies);
});

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});


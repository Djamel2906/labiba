import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();



if (!process.env.OPENAI_API_KEY) {
  console.error("❌ أضف متغيّر OPENAI_API_KEY في .env");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

// helper لإنشاء completion
async function createReply(prompt) {
  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "أنت معلم لغة عربية للخامسة ابتدائي." },
      { role: "user",    content: prompt }
    ]
  });
  return chat.choices[0].message.content;
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("🔹 message:", message);
    if (!message) return res.status(400).json({ error: "message مفقود" });
    const reply = await createReply(message);
    res.json({ reply });
  } catch (err) {
    console.error("❌ Internal Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/voice", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message مفقود" });
    const reply = await createReply(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 server running on http://localhost:${PORT}`));

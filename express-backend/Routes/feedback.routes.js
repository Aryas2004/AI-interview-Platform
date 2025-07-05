const express = require("express");
const axios = require("axios");
require("dotenv").config();

const FeedbackRouter = express.Router();

FeedbackRouter.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  console.log("🟢 [feedback.routes] prompt:", prompt);
  console.log("🟢 [feedback.routes] GEMINI_API_KEY present?:", !!process.env.GEMINI_API_KEY);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🟢 Full Gemini API response:", response.data);

    const answer = response.data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini API.";

    console.log("🟢 [feedback.routes] answer:", answer);
    return res.status(200).json(answer);
  } catch (err) {
    console.error("🔴 [feedback.routes] Gemini API error:", err.response?.data || err.message);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
});

module.exports = { FeedbackRouter };

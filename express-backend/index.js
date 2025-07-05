const express = require("express");
const cors = require("cors");
const { QuestionRouter } = require("./Routes/question.routes");
const { FeedbackRouter } = require("./Routes/feedback.routes"); // ✅ added
const { connection } = require("./db");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use("/questions", QuestionRouter);
app.use("/bot", FeedbackRouter); // ✅ added

app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.send("<h1>Welcome to the Interview Question Server API</h1>");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`✅ Connected to the database`);
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log("❌ Error starting server:", error);
  }
});

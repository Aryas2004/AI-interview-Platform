const express = require("express");
const { QuestionModel } = require("../Models/Question.model");

const QuestionRouter = express.Router();

// Add a new question
QuestionRouter.post("/add", async (req, res) => {
    try {
        const NewQuestion = new QuestionModel(req.body);
        await NewQuestion.save();
        res.status(200).json({ msg: "New Question has been Added" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get questions based on techStack 
QuestionRouter.get("/get", async (req, res) => {
    const techStack = req.query.techStack;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const Questions = await QuestionModel.aggregate([
            { $match: { techStack: { $regex: techStack, $options: "i" } } },
            { $sample: { size: limit } }
        ]);
        res.status(200).json(Questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    QuestionRouter
};

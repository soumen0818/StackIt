const Question = require("../models/Question");

const createQuestion = async (req, res) => {
  try {
    const { title, description, tags, userId } = req.body;
    const question = new Question({ title, description, tags, user: userId });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("user");
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("user")
      .populate("answers");
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createQuestion, getQuestions, getQuestionById };

const Answer = require("../models/Answer");
const Question = require("../models/Question");

const postAnswer = async (req, res) => {
  try {
    const { content, userId, questionId } = req.body;
    const answer = new Answer({ content, user: userId, question: questionId });
    await answer.save();

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const voteAnswer = async (req, res) => {
  try {
    const { answerId, vote } = req.body;
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    answer.votes += vote;
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptAnswer = async (req, res) => {
  try {
    const { answerId } = req.body;
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    answer.isAccepted = true;
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postAnswer, voteAnswer, acceptAnswer };

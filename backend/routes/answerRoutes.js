const express = require("express");
const {
  postAnswer,
  voteAnswer,
  acceptAnswer,
} = require("../controllers/answerController");
const router = express.Router();

router.post("/", postAnswer);
router.post("/vote", voteAnswer);
router.post("/accept", acceptAnswer);

module.exports = router;

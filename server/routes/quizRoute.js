const express = require("express");
const {roleCheck} = require("../middleware/roleMiddleware");
const {protect} = require("../middleware/authMiddleware")
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  submitQuiz,
} = require("../controllers/quizController");

const router = express.Router();


router.post("/",roleCheck(["teacher"]), createQuiz);


router.get("/", protect, getQuizzes);
router.get("/:id", protect, getQuizById);


router.post("/:id/submit",roleCheck(["student"]), submitQuiz);

module.exports = router;

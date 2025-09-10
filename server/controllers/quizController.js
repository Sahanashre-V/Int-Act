const Quiz = require("../models/Quiz");
const Class = require("../models/Class");
const Subject = require("../models/Subject");

// @desc Create a new quiz
// @route POST /api/quizzes
// @access Teacher
const createQuiz = async (req, res) => {
  try {
    const { title, subject, class: classId, questions, timeLimit, dueDate } = req.body;

    if (!title || !subject || !classId || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Title, subject, class, and questions are required" });
    }

    // Ensure subject and class exist
    const subjectExists = await Subject.findById(subject);
    if (!subjectExists) return res.status(404).json({ message: "Subject not found" });

    const classExists = await Class.findById(classId);
    if (!classExists) return res.status(404).json({ message: "Class not found" });

    const quiz = await Quiz.create({
      title,
      subject,
      class: classId,
      questions,
      timeLimit,
      dueDate,
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get all quizzes
// @route GET /api/quizzes
// @access Public (students/teachers)
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("subject", "name code")
      .populate("class", "gradeLevel section");

    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get quiz by ID
// @route GET /api/quizzes/:id
// @access Public
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("subject", "name code")
      .populate("class", "gradeLevel section");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Submit quiz attempt
// @route POST /api/quizzes/:id/submit
// @access Student
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // [{questionIndex: 0, selectedOption: 1}]
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;

    quiz.questions.forEach((q, idx) => {
      const studentAnswer = answers.find((a) => a.questionIndex === idx);
      if (studentAnswer) {
        const selectedOption = q.options[studentAnswer.selectedOption];
        if (selectedOption && selectedOption.isCorrect) {
          score++;
        }
      }
    });

    // Record attempt
    quiz.attempts.push({
      student: req.user._id,
      score,
      submittedAt: new Date(),
    });

    await quiz.save();

    res.json({ message: "Quiz submitted", score, total: quiz.questions.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  submitQuiz,
};

const Quiz = require("../models/Quiz");
const Class = require("../models/Class");
const Subject = require("../models/Subject");


const createQuiz = async (req, res) => {
  try {
    const { title, subject, class: classId, questions, timeLimit, dueDate } = req.body;

    if (!title || !subject || !classId || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Title, subject, class, and questions are required" });
    }

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

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; 

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const processedAnswers = [];

    quiz.questions.forEach((q, idx) => {
      const studentAnswer = answers.find((a) => a.questionIndex === idx);
      if (studentAnswer) {
        const selected = q.options[studentAnswer.selectedOption];
        const correct = selected ? selected.isCorrect : false;

        if (correct) score++;

        processedAnswers.push({
          questionIndex: idx,
          selectedOption: studentAnswer.selectedOption,
          isCorrect: correct,
        });
      }
    });

    quiz.attempts.push({
      student: req.user._id,
      score,
      submittedAt: new Date(),
      answers: processedAnswers,
    });

    await quiz.save();

    res.json({
      message: "Quiz submitted",
      score,
      total: quiz.questions.length,
      answers: processedAnswers,
    });
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

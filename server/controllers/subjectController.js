const Subject = require("../models/Subject");


const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const exists = await Subject.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "Subject already exists" });
    }

    const subject = await Subject.create({ name, code });
    res.status(201).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("teachers", "firstName lastName email");
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("teachers", "firstName lastName email");

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const updateSubject = async (req, res) => {
  try {
    const { name, code } = req.body;

    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    subject.name = name || subject.name;
    subject.code = code || subject.code;

    const updatedSubject = await subject.save();
    res.json(updatedSubject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.deleteOne();
    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};

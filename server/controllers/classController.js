const Class = require("../models/Class");

const createClass = async (req, res) => {
  try {
    const { grade, section } = req.body;

    if (!grade || !section) {
      return res.status(400).json({ message: "Grade and section are required" });
    }

    const existingClass = await Class.findOne({ grade, section });
    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = new Class({ grade, section });
    await newClass.save();

    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("students", "firstName lastName email")
      .populate("teachers", "firstName lastName email");
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getClassById = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id)
      .populate("students", "firstName lastName email")
      .populate("teachers", "firstName lastName email");

    if (!cls) return res.status(404).json({ message: "Class not found" });

    res.json(cls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClass = async (req, res) => {
  try {
    const { grade, section } = req.body;
    const cls = await Class.findById(req.params.id);

    if (!cls) return res.status(404).json({ message: "Class not found" });

    if (grade) cls.grade = grade;
    if (section) cls.section = section;

    await cls.save();
    res.json(cls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    await cls.remove();
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass
};

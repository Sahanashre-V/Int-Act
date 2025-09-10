const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Subject = require("../models/Subject")

const { generateToken } = require("../utils/token");

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
      class: classId,
      classesHandling,
      expertiseSubjects,
      ...extra
    } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["student", "teacher"].includes(role)) {
      return res.status(400).json({ message: "Role must be student or teacher" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    let user;
    if (role === "student") {
      user = new Student({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
        class: classId,
        ...extra,
      });
    } else {
      user = new Teacher({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
        classesHandling,
        expertiseSubjects,
        ...extra,
      });
    }

    await user.save();

    // 👉 Update related Class
    if (role === "student" && classId) {
      await Class.findByIdAndUpdate(classId, { $addToSet: { students: user._id } });
    } else if (role === "teacher" && classesHandling?.length > 0) {
      await Class.updateMany(
        { _id: { $in: classesHandling } },
        { $addToSet: { teachers: user._id } }
      );
    }

    // 👉 Update related Subjects
    if (role === "teacher" && expertiseSubjects?.length > 0) {
      await Subject.updateMany(
        { _id: { $in: expertiseSubjects } },
        { $addToSet: { teachers: user._id } }
      );
    }

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      ...(user.role === "student" && { class: user.class, cgpa: user.cgpa, ranking: user.ranking }),
      ...(user.role === "teacher" && { classesHandling: user.classesHandling, expertiseSubjects: user.expertiseSubjects }),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { registerUser, loginUser, getProfile };

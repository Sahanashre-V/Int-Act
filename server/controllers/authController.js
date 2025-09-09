const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role });
    await user.save();

    res.status(201).json({ msg: "User created", user: { id: user._id, email, role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
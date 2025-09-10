const mongoose = require("mongoose");
const User = require("./User");

const studentSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  cgpa: { type: Number, min: 0, max: 10 },
  ranking: { type: Number, min: 1 }
});


const Student = User.discriminator("student", studentSchema);
module.exports = Student;

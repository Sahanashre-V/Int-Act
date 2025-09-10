const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  term: {
    type: String,
    required: true
  },
  subjects: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      marksObtained: Number,
      grade: String,
      gpa: { type: Number, min: 0, max: 10 }
    }
  ],
  termGPA: { type: Number, min: 0, max: 10 },
  remarks: String,
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;

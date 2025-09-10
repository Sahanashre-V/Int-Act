const mongoose = require("mongoose");
const User = require("./User.js");

const teacherSchema = new mongoose.Schema({
  classesHandling: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class"   
  }],
  expertiseSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject" 
  }]
}, { timestamps: true });

const Teacher = User.discriminator("teacher", teacherSchema);

module.exports = Teacher;

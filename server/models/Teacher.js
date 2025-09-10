const mongoose = require("mongoose")
const User = require("./User.js")

const teacherSchema = new mongoose.Schema({
  classesHandling: [{ type: String }],  
  expertiseSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }]
});

const Teacher = User.discriminator("teacher", teacherSchema);

module.exports = Teacher
const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   
  },
  code: {
    type: String,     
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",      
  }]
}, { timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);


module.exports = Subject
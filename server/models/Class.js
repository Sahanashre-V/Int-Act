const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  grade: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 12 
  },
  section: { 
    type: String, 
    required: true,
    trim: true
  },  
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]  
}, { timestamps: true });

const Class = mongoose.model("Class", classSchema);
module.exports = Class;

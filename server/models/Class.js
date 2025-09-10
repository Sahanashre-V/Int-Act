const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gradeLevel: { type: String, required: true },    
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]  
}, { timestamps: true });

const Class = mongoose.model("Class", classSchema);
module.exports = Class;

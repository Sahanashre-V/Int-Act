const express = require("express");
const router = express.Router();
const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

const { roleCheck } = require("../middleware/roleMiddleware");


router.get("/",  getSubjects);
router.get("/:id", getSubjectById);

router.post("/", roleCheck("teacher"), createSubject);
router.put("/:id", roleCheck("teacher"), updateSubject);
router.delete("/:id", roleCheck("teacher"), deleteSubject);

module.exports = router;

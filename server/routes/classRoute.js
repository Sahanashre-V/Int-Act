const express = require("express");
const {   createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass } = require("../controllers/classController");
const { protect } = require("../middleware/authMiddleware");
const {roleCheck} = require("../middleware/roleMiddleware");


const router = express.Router();

router.get("/", getClasses);
router.get("/:id",getClassById);

router.post("/",roleCheck(["teacher"]),createClass);
router.put("/:id",roleCheck(["teacher"]),updateClass);
router.delete("/:id",roleCheck(["teacher"]),deleteClass);


module.exports = router;

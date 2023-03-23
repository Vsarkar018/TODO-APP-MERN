const express = require("express");
const router = express.Router();

const {
  createTask,
  getTask,
  getAllTasks,
  editTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/edit/:id").patch(editTask);
router.route("/:id").delete(deleteTask).get(getTask);

module.exports = router;

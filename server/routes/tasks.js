const express = require("express");
const {
  updateTasks,
} = require("../../../Node/node-express-course/03-task-manager/starter/controllers/tasks");
const router = express.Router();

const {
  createTask,
  getTask,
  getAllTasks,
  editTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").patch(editTask).delete(deleteTask).get(getTask);

module.exports = router;

const Todo = require("../models/Task");
const { BadRequest, NotFound } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const createTask = async (req, res) => {
  req.body["createdBy"] = req.user.userId;
  const task = await Todo.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};
const getAllTasks = async (req, res) => {
  const tasks = await Todo.find({createdBy:req.user.userId}).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};
const getTask = async (req, res) => {
  const {
    user: userId,
    params: { id: taskId },
  } = req;
  const task = Todo.findOne({ _id: taskId, createdBy: userId });
  if (!task) {
    throw new NotFound("No job found ");
  }
  res.status(StatusCodes.OK).json({ task });
};
const editTask = async (req, res) => {
  const {
    body: { tasks, status },
    user: { userId },
    params: { id: taskId },
  } = req;
  if (tasks === "" || status === "") {
    throw new BadRequest("Task or status cannot be empty");
  }
  const task = await Todo.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    throw new NotFound("Task not found");
  }
  return res.status(StatusCodeS.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  const job = await Todo.findByIdAndRemove({ _id: taskId, createdBy: userId });
  if (!task) {
    throw new NotFound("Task not found");
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { createTask, getTask, getAllTasks, editTask, deleteTask };

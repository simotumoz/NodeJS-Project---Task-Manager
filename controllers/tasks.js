const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true, // always returning the new item and making sure that respects validations
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
});

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    /* res.status(200).json({task}); */
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

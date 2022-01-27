const TasksService = require("../service/tasks.service");
const ErrorApp = require("../util/error_handler/error.handler");

exports.GetAllUserTasksCtrl = async (req, resp, next) => {
  try {
    const userId = req.userInSesion.id;
    const GetTasks = await TasksService.GetTasks(userId);

    resp.status(200).json(GetTasks);
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};

exports.CreateUserTaskCtrl = async (req, resp, next) => {
  try {
    const data = req.body;
    const userId = req.userInSesion.id;

    const createTask = await TasksService.CreateTask(data, userId);

    resp.status(200).json(createTask);
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};

exports.UpdateUserTaskCtrl = async (req, resp, next) => {
  try {
    const data = req.body;
    const taskId = req.params.id;
    const userId = req.userInSesion.id;

    const updateTask = await TasksService.UpdateTask(data, taskId, userId);

    resp.status(200).json(updateTask);
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};

exports.DeleteUserTaskCtrl = async (req, resp, next) => {
  try {
    const { id } = req.params;
    const userId = req.userInSesion.id;

    const deleteTask = await TasksService.DeleteTasks(id, userId);

    resp.status(200).json(deleteTask);
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};

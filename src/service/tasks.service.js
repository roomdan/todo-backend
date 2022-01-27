const Models = require("../db/models/init-models.js");

const { Task, UserData } = Models();

class TasksService {
  static async GetTasks(userId) {
    userId = parseInt(userId, 10);

    const DataUser = await UserData.findOne({
      where: { id: userId },
      attributes: { exclude: ["userName", "password", "deleted"] },
    });

    if (!DataUser.active) {
      return {
        error:
          "An error ocurred in this query, user unavilable, inactive or deleted.",
        message: "Please acces with an active user or validate this id.",
        failId: userId,
        status: 400,
      };
    }

    const DataTasks = await Task.findAll({
      where: {
        userDataId: userId,
        deleted: false,
      },
    });

    if (!DataTasks) {
      return {
        error: "An error ocurred in this query, user id invalid",
        message: "",
        status: 400,
      };
    }

    return {
      cuantity: DataTasks.length,
      data: DataTasks,
      userInfo: DataUser,
      status: 200,
    };
  }

  static async CreateTask(data, userId) {
    const verifyUser = await UserData.findByPk(parseInt(userId, 10), {
      attributes: {
        exclude: ["userName", "password", "deleted"],
      },
    });
    if (!verifyUser.active) {
      return {
        error: "This user is unavailable, disable or deleted.",
        message:
          "Please creete an account or send a request for enable this user.",
        status: 400,
      };
    }

    const taskObj = {
      title: data.title,
      description: data.description,
      Group_id: data.Group_id,
      userDataId: parseInt(userId, 10),
    };

    const createTask = await Task.create(taskObj);

    return {
      status: "Succes, created task",
      created: true,
      status: 201,
      data: createTask,
      userInfo: verifyUser,
    };
  }

  static async UpdateTask(data, taskId, userId) {
    taskId = parseInt(taskId, 10);
    const updateObj = {
      title: data.title,
      description: data.description,
      completed: data.completed,
      Group_id: data.Group_id,
    };

    const verifyUser = await UserData.findByPk(parseInt(userId, 10), {
      attributes: {
        exclude: ["userName", "password", "deleted"],
      },
    });
    if (!verifyUser.active) {
      return {
        error: "This user is unavailable, disable or deleted.",
        message:
          "Please creete an account or send a request for enable this user.",
        status: 400,
      };
    }

    const updateTask = await Task.update(updateObj, {
      where: {
        id: taskId,
        userDataId: Number(userId),
      },
    });

    return {
      status: "Succes update",
      updated: true,
      data: updateTask,
    };
  }

  static async DeleteTasks(id, userId) {
    id = parseInt(id, 10);
    userId = parseInt(userId, 10);

    const findTask = await Task.findByPk(id);

    if (!findTask.completed) {
      return {
        error:
          "This task is not completed, please complete this task and try again.",
        message:
          "You cant to delete a task if not is completed, please complete this task before.",
        status: 400,
      };
    }

    const user = await UserData.findByPk(userId, {
      attributes: { exclude: ["userName", "password", "deleted"] },
    });
    if (!user.active) {
      return {
        error: "This user is unavailable, disable or deleted.",
        message:
          "Please creete an account or send a request for enable this user.",
        status: 400,
      };
    }

    const deleteTask = await Task.update(
      { deleted: true },
      { where: { id, userDataId: userId } }
    );

    return {
      deleted: true,
      message: "This task has been deleted from user task list.",
      status: 202,
      data: deleteTask,
    };
  }
}

module.exports = TasksService;

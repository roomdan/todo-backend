const Models = require("../db/models/init-models.js");

const { Group, UserData } = Models();

class GroupService {
  static async GetUserGroup(id) {
    id = Number(id);
    const getGroup = await Group.findByPk(id);
    if (!getGroup) {
      return {
        error: "Group is not exist",
        message: "Please verify data, Group is not exist or inactive",
        status: 400,
      };
    }
    return getGroup;
  }

  static async CreateGroup(data, userId) {
    const id = Number(userId);
    const GroupData = {
      groupName: data.groupName,
      description: data.description,
    };

    await Group.create(GroupData);

    const GroupInfo = await Group.findOne({
      where: { groupName: GroupData.groupName },
    });

    if (!GroupInfo) {
      return {
        error: "Error creating your group, please try again.",
        message:
          "This error is ocurred because this group exist, cant be repeat group name.",
        status: 400,
      };
    }

    const updateUserGroup = await UserData.update(
      { Group_id: GroupInfo.id },
      { where: { id } }
    );

    return updateUserGroup;
  }

  static async UpdateGroup(data, GroupId, UserId) {
    let id = parseInt(UserId, 10);

    const UserValidate = await UserData.findOne({
      where: {
        id,
        Group_id: GroupId,
      },
    });

    if (!UserValidate) {
      return {
        error: "User is not a member of this group",
        message: "Please verify user group and try again",
        status: 400,
      };
    }

    const GroupData = {
      groupName: data.groupName,
      profile_img: data.profile_img,
      description: data.description,
    };

    const updateGroup = await Group.update(GroupData, {
      where: {
        id: Number(GroupId),
      },
    });

    return updateGroup;
  }
}

module.exports = GroupService;

const GroupService = require("../services/groupService");
const GroupNotExist = require("../exceptions/GroupNotExist");
const UserNotMemberOfGroup = require("../exceptions/UserNotMemberOfGroup");
const UserAlreadyMemberOfGroup = require("../exceptions/UserAlreadyMemberOfGroup");
const UserNotAdmin = require("../exceptions/UserNotAdmin");

const groupValidation = async (req, res, next) => {
    try {
        const groupId = req.params.id;
        if(!groupId) {
            res.status(400).json({ error: 'Invalid group id' });
            return;
        }
        const group = await GroupService.getGroupById(groupId);
        if (!group) {
            throw new GroupNotExist()
        }
        req.group = group;
        const isMember = await GroupService.isUserMemberOfGroup(groupId, req.user.id);
        if (!isMember) {
            throw new UserNotMemberOfGroup();
        }
        next();
    } catch (e) {
        if (e instanceof GroupNotExist) {
            res.status(404).json({ error: e.message });
            return;
        }
        else if (e instanceof UserNotMemberOfGroup) {
            res.status(401).json({ error: e.message });
            return;
        }
        throw e;
    }
}

const isUserEligibleToJoin = async (req, res, next) => {
    try {
        const groupInviteCode = req.body.invite_code;
        const group = await GroupService.getGroupByInviteCode(groupInviteCode);
        if (!group) {
            throw new GroupNotExist()
        }
        req.group = group;
        const isMember = await GroupService.isUserMemberOfGroup(group.id, req.user.id);
        if (isMember) {
            throw new UserAlreadyMemberOfGroup();
        }
        next();
    } catch (e) {
        if (e instanceof GroupNotExist) {
            res.status(404).json({ error: e.message });
            return;
        }
        else if (e instanceof UserAlreadyMemberOfGroup) {
            res.status(400).json({ error: e.message });
            return;
        }
        throw e;
    }
}

const adminValidation = async (req, res, next) => {
    try {
        const groupId = req.group.id;
        const userId = req.user.id;
        const isAdmin = await GroupService.isUserAdmin(groupId, userId);
        if (!isAdmin) {
            throw new UserNotAdmin();
        }
        next();
    } catch (e) {
        if (e instanceof UserNotAdmin) {
            res.status(401).json({ error: e.message });
            return;
        }
        throw e;
    }
}

module.exports = {
    groupValidation,
    isUserEligibleToJoin,
    adminValidation
};
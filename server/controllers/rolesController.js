const Role = require("../models/roles");

exports.getAllRole = async (req, res) => {
    try {
        const userRoles = await Role.findAll();
        res.json(userRoles);
    } catch (error) {
        console.error("Error retrieving user roles:", error);
        res.status(500).send("Error retrieving user roles.");
    }
}

exports.getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const userRole = await Role.findByPk(id);
        if (!userRole) {
            res.json("User role not found");
        } else {
            res.json(userRole);
        }
    } catch (error) {
        console.error("Error retrieving user role:", error);
        res.status(500).send("Error retrieving user role.");
    }
}

exports.createRole = async (req, res) => {
    const { rolename, permissionName } = req.body;
    try {
        const newUserRole = await Role.create({ rolename, permissionName });
        res.json(newUserRole);
    } catch (error) {
        console.error("Error creating user role:", error);
        res.status(500).send("Error creating user role.");
    }
}


exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { rolename } = req.body;
    try {

        await Role.update({ rolename }, { where: { id } });
        const updatedUserRole = await Role.findByPk(id);
        res.json(updatedUserRole);
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).send("Error updating user role.");
    }
}

exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await Role.destroy({ where: { id } });
        res.json("User role deleted successfully.");
    } catch (error) {
        console.error("Error deleting user role:", error);
        res.status(500).send("Error deleting user role.");
    }
}
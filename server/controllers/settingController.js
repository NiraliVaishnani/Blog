const BlogSetting = require("../models/setting");

exports.getAllSetting = async (req, res) => {
    const settings = await BlogSetting.findAll();
    res.json(settings);
};

exports.getSettingById = async (req, res) => {
    const setting = await BlogSetting.findByPk(req.params.id).then((user) => {
        if (!user) {
            res.json("User not found");
        } else {
            res.json(user);
        }
    });
}

exports.createSetting = async (req, res) => {
    const { Key, Value } = req.body;
    try {
        const newSetting = await BlogSetting.create({ Key, Value });
        res.json(newSetting);
    } catch (error) {
        console.error("Error creating Setting:", error);
        res.status(500).send("Error creating Setting.");
    }
}

exports.updateSetting = async (req, res) => {
    const { Key, Value } = req.body;
    const id = req.params.id;
    try {
        await BlogSetting.update(
            {
                Key: Key,
                Value: Value,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        const updatedSetting = await BlogSetting.findByPk(id);
        res.json(updatedSetting);
    } catch (error) {
        console.error("Error updating Setting:", error);
        res.status(500).send("Error updating Setting.");
    }
}

exports.deleteSetting = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogSetting.destroy({
            where: {
                id: id,
            },
        });
        res.json("Deleted successfully");
    } catch (error) {
        res.json("Error");
    }
}
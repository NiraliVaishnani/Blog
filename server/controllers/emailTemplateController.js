const EmailTemplate = require("../models/emailTemplate");

// Get all email templates
exports.getAllEmailTemplates = async (req, res) => {
    try {
        const emailTemplates = await EmailTemplate.findAll();
        res.json(emailTemplates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a specific email template by ID
exports.getEmailTemplateById = async (req, res) => {
    const { id } = req.params;
    try {
        const emailTemplate = await EmailTemplate.findByPk(id);
        if (emailTemplate) {
            res.json(emailTemplate);
        } else {
            res.status(404).json({ error: "Email template not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new email template
exports.createEmailTemplate = async (req, res) => {
    const { subject, body } = req.body;
    try {
        const newEmailTemplate = await EmailTemplate.create({ subject, body });
        res.json(newEmailTemplate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update an email template by ID
exports.updateEmailTemplate = async (req, res) => {
    const { id } = req.params;
    const { subject, body } = req.body;
    try {
        const emailTemplate = await EmailTemplate.findByPk(id);
        if (emailTemplate) {
            await EmailTemplate.update({ subject, body }, { where: { id } });
            res.json({ message: "Email template updated successfully" });
        } else {
            res.status(404).json({ error: "Email template not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete an email template by ID
exports.deleteEmailTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        const emailTemplate = await EmailTemplate.findByPk(id);
        if (emailTemplate) {
            await EmailTemplate.destroy({ where: { id } });
            res.json({ message: "Email template deleted successfully" });
        } else {
            res.status(404).json({ error: "Email template not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

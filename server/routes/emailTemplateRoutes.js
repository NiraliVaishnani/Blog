const express = require("express");
const router = express.Router();
const emailTemplateController = require("../controllers/emailTemplateController");

router.get("/emailtemplate", emailTemplateController.getAllEmailTemplates);
router.get("/emailtemplate/:id", emailTemplateController.getEmailTemplateById);
router.post("/emailtemplate", emailTemplateController.createEmailTemplate);
router.post("/emailtemplate/:id", emailTemplateController.updateEmailTemplate);
router.delete("/emailtemplate/:id", emailTemplateController.deleteEmailTemplate);

module.exports = router;

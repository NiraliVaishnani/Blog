const express = require("express");
const router = express.Router();
const setting = require("../controllers/settingController");

router.get("/setting", setting.getAllSetting);
router.get("/setting/:id", setting.getSettingById);
router.post("/setting", setting.createSetting);
router.post("/setting/:id", setting.updateSetting);
router.delete("/setting/:id", setting.deleteSetting);

module.exports = router;
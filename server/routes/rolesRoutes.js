const express = require("express");
const router = express.Router();
const role = require("../controllers/rolesController");

router.get("/userrole", role.getAllRole);
router.get("/userrole/:id", role.getRoleById);
router.post("/userrole", role.createRole);
router.post("/userrole/:id", role.updateRole);
router.delete("/userrole/:id", role.deleteRole);

module.exports = router;
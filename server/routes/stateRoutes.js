const express = require("express");
const stateController = require("../controllers/stateController");

const router = express.Router();

router.get("/", stateController.getAllStates);
router.get("/:id", stateController.getStateById);
router.post("/", stateController.createState);
router.post("/:id", stateController.updateState);
router.delete("/:id", stateController.deleteState);

module.exports = router;

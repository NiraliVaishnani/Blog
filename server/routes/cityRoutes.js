const express = require("express");
const cityController = require("../controllers/cityController");

const router = express.Router();

router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCityById);
router.post("/", cityController.createCity);
router.post("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;

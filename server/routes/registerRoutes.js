const express = require("express");
const router = express.Router();
const register = require("../controllers/registerController");

router.get("/register", register.getAllRegisteredUser);
router.post("/register", register.createRegister);


module.exports = router;
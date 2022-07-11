const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");
const auth = require("../middleware/auth");

router.get("/", auth, usersControllers.getAllUsers);
router.get("/:id", auth, usersControllers.getUser);

module.exports = router;
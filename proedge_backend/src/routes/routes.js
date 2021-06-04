const express = require("express");
const { insertRollNumber, getRollnumber } = require("../controller/controller");
const router = express.Router();

router.get("/data", getRollnumber);
router.post("/data", insertRollNumber);

module.exports = router;

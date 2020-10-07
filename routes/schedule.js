var express = require("express");
var router = express.Router();
const getScheduleData = require("../db/schedule");

router.get("/", async function (req, res, next) {
  const rows = await getScheduleData(req);
  res.json(rows);
});

module.exports = router;

var express = require("express");
var router = express.Router();
const getRestaurantData = require("../db/restaurant");

router.get("/", async function (req, res, next) {
  const rows = await getRestaurantData(req);
  res.json(rows);
});

module.exports = router;

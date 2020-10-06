var express = require("express");
var router = express.Router();
const {getMajorSiteList,getCommonSiteList} = require("../db/notice");

router.get("/site/list/major", async function (req, res, next) {
  const rows = await getMajorSiteList(req.headers.token)
//   console.log(rows)
  res.json(rows);
});

router.get("/site/list/common", async function (req, res, next) {
    const rows = await getCommonSiteList(req.headers.token)
    // console.log(rows)
    res.json(rows);
  });
  
module.exports = router;

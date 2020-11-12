var express = require("express");
var router = express.Router();
const {
  getNotice,
  getNoticeSiteList,
  getNoticeErrorSiteList,
  getRestaurantErrorList,
  getErrorLog,
} = require("../db/error");

router.get("/notice", async function (req, res, next) {
  const rows = await getNotice(req);
  res.json(rows[0]);
});

router.get("/notice/list", async function (req, res, next) {
  const rows = await getNoticeErrorSiteList(req);
  res.json(rows);
});

router.get("/notice/list/all", async function (req, res, next) {
  const rows = await getNoticeSiteList(req);
  res.json(rows);
});

router.get("/restaurant/list", async function (req, res, next) {
  const rows = await getRestaurantErrorList(req);
  res.json(rows);
});

router.get("/log", async function (req, res, next) {
  const rows = await getErrorLog(req);
  res.json(rows[0]);
});

module.exports = router;

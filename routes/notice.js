const { query } = require("express");
var express = require("express");
var router = express.Router();
const {
  getNotice,
  getSiteList,
  getMajorSiteList,
  getCommonSiteList,
  getNoticeByCateogry,
  getSiteListCateogry,
} = require("../db/notice");

router.get("/", async function (req, res, next) {
  console.log(req.query);
  const rows = await getNotice(req.query.noticeId);
  //   console.log(rows)
  res.json(rows[0]);
});

router.get("/site/:site_id", async function (req, res, next) {
  const rows = await getSiteList(req.params.site_id, req.query.offset);
  //   console.log(rows)
  res.json(rows);
});

router.get("/site/list/major", async function (req, res, next) {
  const rows = await getMajorSiteList(req.headers.token, req.query.offset);
  //   console.log(rows)
  res.json(rows);
});

router.get("/site/list/common", async function (req, res, next) {
  const rows = await getCommonSiteList(req.headers.token, req.query.offset);
  // console.log(rows)
  res.json(rows);
});

router.get("/category/:site_id", async function (req, res, next) {
  const rows = await getNoticeByCateogry(
    req.headers.token,
    req.query.offset,
    req.params.site_id
  );
  res.json(rows);
});

router.get("/site/list/category", async function (req, res, next) {
  const rows = await getSiteListCateogry(req.headers.token);
  res.json(rows);
});

module.exports = router;

var express = require("express");
var router = express.Router();
const {
  getAllowSiteList,
  getAllowOnSiteList,
  setAllowSite,
  unsetAllowSite,
  getPause,
  setPause,
  unsetPause,
} = require("../db/allow");

router.get("/site/list", async function (req, res, next) {
  const rows = await getAllowSiteList(req.headers.token);
  res.json(rows);
});

router.get("/on/site/list", async function (req, res, next) {
  const rows = await getAllowOnSiteList(req.headers.token);
  res.json(rows);
});

router.post("/site/:site_id", async function (req, res, next) {
  const rows = await setAllowSite({
    fcm_token: req.headers.token,
    site_id: req.params.site_id,
  });
  res.json(rows);
});

router.delete("/site/:site_id", async function (req, res, next) {
  const rows = await unsetAllowSite({
    fcm_token: req.headers.token,
    site_id: req.params.site_id,
  });
  res.json(rows);
});

router.get("/pause", async function (req, res, next) {
  const rows = await getPause({
    fcm_token: req.headers.token,
  });
  res.json(rows);
});

router.post("/pause", async function (req, res, next) {
  const rows = await setPause({
    fcm_token: req.headers.token,
  });
  res.json(rows);
});

router.delete("/pause", async function (req, res, next) {
  const rows = await unsetPause({
    fcm_token: req.headers.token,
  });
  res.json(rows);
});

module.exports = router;

var express = require("express");
var router = express.Router();
const  {addUser}= require("../db/user");

router.post("/", async function (req, res, next) {
  const rows = await addUser({fcm_token:req.headers.token,type:req.body.type});
  res.json(rows);
});

module.exports = router;

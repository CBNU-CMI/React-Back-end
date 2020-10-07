// get the client
const mysql = require("mysql2");
const dbConfig = require("./config.json");

// create the connection to database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  timezone:"UTC+9"
});

const noticeLimit = 15

async function getMajorSiteList(token,offset = 1) {
  let [rows, fields] = await connection
    .promise()
    .query(
      `SELECT * FROM notice_detail_no_contents WHERE site_id in (SELECT site_id FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = "${token}") and site_id < 140000 order by date desc, id desc LIMIT ${noticeLimit} OFFSET ${noticeLimit*(offset-1)}`
    );
  return rows;
}

async function getCommonSiteList(token,offset = 1) {
    let [rows, fields] = await connection
      .promise()
      .query(
        `SELECT * FROM notice_detail_no_contents WHERE site_id in (SELECT site_id FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = "${token}") and site_id >= 140000 order by date desc, id desc LIMIT ${noticeLimit} OFFSET ${noticeLimit*(offset-1)}`
      );
    return rows;
  }

module.exports = {getMajorSiteList,getCommonSiteList};

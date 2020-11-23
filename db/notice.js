// get the client
const mysql = require("mysql2");
const dbConfig = require("./config.json");

// create the connection to database
const connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  timezone: "UTC+9",
});

const noticeLimit = 15;

async function getNotice(noticeId) {
  let [rows, fields] = await connection
    .promise()
    .query(`SELECT * FROM notice_detail WHERE id = ${noticeId}`);
  return rows;
}

async function getSiteList(site_id, offset = 1) {
  let [rows, fields] = await connection
    .promise()
    .query(
      `SELECT * FROM notice_detail_no_contents WHERE site_id = ${site_id} order by date desc, id desc LIMIT ${noticeLimit} OFFSET ${
        noticeLimit * (offset - 1)
      }`
    );
  return rows;
}

async function getMajorSiteList(token, offset = 1) {
  let [rows, fields] = await connection
    .promise()
    .query(
      `SELECT * FROM notice_detail_no_contents WHERE site_id in (SELECT site_id FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = "${token}") and site_id < 140000 order by date desc, id desc LIMIT ${noticeLimit} OFFSET ${
        noticeLimit * (offset - 1)
      }`
    );
  return rows;
}

async function getCommonSiteList(token, offset = 1) {
  let [rows, fields] = await connection
    .promise()
    .query(
      `SELECT * FROM notice_detail_no_contents WHERE site_id in (SELECT site_id FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = "${token}") and site_id >= 140000 order by date desc, id desc LIMIT ${noticeLimit} OFFSET ${
        noticeLimit * (offset - 1)
      }`
    );
  return rows;
}

async function getNoticeByCateogry(token, offset = 1, site_id) {
  const category_id = site_id.toString().slice(0, -2);
  const sql = `SELECT * FROM notice_detail_no_contents WHERE site_id IN (SELECT site_id AS id FROM push_allow WHERE fcm_token = '${token}' 
  and CAST(site_id AS CHAR) LIKE "${category_id}%") order by date desc, id desc LIMIT ${noticeLimit} OFFSET ${
    noticeLimit * (offset - 1)
  }`;
  let [rows, fields] = await connection.promise().query(sql);
  return rows;
}

async function getSiteListCateogry(token, site_id) {
  const sql = `SELECT DISTINCT IF(category2 = '', category1, category2) AS name,id FROM site WHERE id IN (SELECT site_id AS id FROM push_allow WHERE fcm_token = '${token}' ) GROUP BY name`;
  let [rows, fields] = await connection.promise().query(sql);
  return rows;
}

async function getNoticeListScrap(list) {
  const sql = `SELECT * FROM notice_detail_no_contents WHERE id IN (${list.join(
    ","
  )}) order by date desc, id desc`;
  let [rows, fields] = await connection.promise().query(sql);
  return rows;
}

module.exports = {
  getNotice,
  getSiteList,
  getMajorSiteList,
  getCommonSiteList,
  getNoticeByCateogry,
  getSiteListCateogry,
  getNoticeListScrap,
};

// get the client
const mysql = require("mysql2");
const dbConfig = require("./config.json");

// create the connection to database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  timezone: "UTC+9",
});

async function getNotice(req) {
  const query = `SELECT IF(ISNULL(notice.category2),notice.category1,notice.category2) AS type, notice.category3 AS type2,title,date, contents AS content FROM notice_detail AS notice WHERE site_id = ${req.query.site_id} ORDER BY id LIMIT 1`;
  let [rows, fields] = await connection.promise().query(query);
  return rows;
}

async function getNoticeErrorSiteList(req) {
  const query = `SELECT IF(ISNULL(notice.category2),notice.category1,notice.category2) AS type, notice.category3 AS type2, site_id FROM error INNER JOIN notice_detail_no_contents AS notice ON notice.id = error.notice_id`;
  let [rows, fields] = await connection.promise().query(query);
  return rows;
}

async function getRestaurantErrorList(req) {
  const query = `SELECT restaurant_name AS type FROM error WHERE NOT ISNULL(restaurant_name)`;
  let [rows, fields] = await connection.promise().query(query);
  return rows;
}

async function getErrorLog(req) {
  const site_id = req.query.site_id ? req.query.site_id : 0;
  const restaurant_name = req.query.restaurant_name
    ? req.query.restaurant_name
    : 0;
  const query = `SELECT log AS errorLog FROM error_detail WHERE site_id = ${site_id} or restaurant_name = '${restaurant_name}' ORDER BY id LIMIT 1`;
  let [rows, fields] = await connection.promise().query(query);
  return rows;
}

module.exports = {
  getNotice,
  getNoticeErrorSiteList,
  getRestaurantErrorList,
  getErrorLog,
};

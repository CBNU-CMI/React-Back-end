// get the client
const mysql = require("mysql2");
const dbConfig = require("./config.json");

// create the connection to database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

async function getAllowSiteList(token) {
  const query = `SELECT site.*,IF(push_allow.site_id, 1 , 0) AS allow FROM site LEFT JOIN (SELECT * FROM push_allow  WHERE fcm_token = '${token}') AS push_allow ON site.id = push_allow.site_id`;
  let [rows, fields] = await connection.promise().query(query);
  return rows;
}

async function setAllowSite({ fcm_token, site_id }) {
  const query = mysql.format("INSERT INTO push_allow SET ?", {
    fcm_token,
    site_id,
  });
  let [rows, fields] = await connection.promise().query(query);
  return rows;
}

async function unsetAllowSite({ fcm_token, site_id }) {
  const query = mysql.format(
    "DELETE FROM push_allow WHERE fcm_token = ? and site_id = ?",
    [fcm_token, site_id]
  );
  let [rows, fields] = await connection.promise().query(query);
  return rows;
}

module.exports = {
  getAllowSiteList,
  setAllowSite,
  unsetAllowSite,
};

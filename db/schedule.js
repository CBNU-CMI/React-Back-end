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

async function getScheduleData(req) {
  let [rows, fields] = await connection
    .promise()
    .query(
      `SELECT * FROM schedule WHERE YEAR(start_date)="${req.query.year}" and MONTH(start_date)="${req.query.month}"`
    );

  return rows;
}

module.exports = getScheduleData;

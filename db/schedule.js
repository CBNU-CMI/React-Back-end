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
  console.log(req.query)
  let [rows, fields] = await connection
    .promise()
    .query(
      `SELECT * FROM schedule WHERE MONTH(start_date)="${req.query.date}"`
    );

  return rows;
}

module.exports = getScheduleData;

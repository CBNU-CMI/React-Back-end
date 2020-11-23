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

async function getRestaurantData(req) {
  let [rows, fields] = await connection
    .promise()
    .query(
      `SELECT * FROM restaurant WHERE date="${req.query.date}" AND restaurant_name="${req.query.place}"`
    );
  return rows;
}

module.exports = getRestaurantData;

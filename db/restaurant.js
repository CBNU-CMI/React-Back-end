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

async function getRestaurantData(req) {
  let [rows, fields] = await connection
    .promise()
    .query(`SELECT * FROM restaurant WHERE day="${req.query.day}"`);
  return rows;
}

module.exports = getRestaurantData;

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

async function addUser({ fcm_token, type }) {
    const query = mysql.format("INSERT INTO user SET ?", {
      fcm_token,
      type,
    });
    let [rows, fields] = await connection.promise().query(query);
    return rows;
  }

  module.exports = {
    addUser
  };
  
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Conexion a la DB de LaburappAlpha exitosa!.");
});
module.exports = connection;

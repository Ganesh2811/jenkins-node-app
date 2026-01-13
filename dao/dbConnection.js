const mysql = require("mysql2/promise");
const config = require("../config")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "authdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.getConnection = () => {
    return pool.getConnection()
        .then(connection => connection)
        .catch(err => {
            console.error("Error getting DB connection:", err);
            throw err;
        });
};

module.exports.releaseConnection = (connection) => {
    if (connection) {
        connection.release();
    }
};

module.exports.closePool = () => {
    return pool.end();
};
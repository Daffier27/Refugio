require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME;

module.exports = {
    SERVER_PORT,
    MYSQL_USER,
    MYSQL_HOST,
    MYSQL_PASSWORD,
    MYSQL_DB_NAME,
    MYSQL_PORT
};
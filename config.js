require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_PORT = process.env.MYSQL_PORT
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME
const UPLOADS_DIR = process.env.UPLOADS_DIR
const JWT_TOKEN = process.env.JWT_TOKEN
const JWT_EXPIRATION = process.env.JWT_EXPIRATION
const JWT_COOKIE_EXPIRES = process.env.JWT_COOKIE_EXPIRES

module.exports = {
  SERVER_PORT,
  MYSQL_USER,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_DB_NAME,
  MYSQL_PORT,
  UPLOADS_DIR,
  JWT_TOKEN,
  JWT_COOKIE_EXPIRES,
  JWT_EXPIRATION
}

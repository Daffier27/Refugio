require('dotenv').config()
const mysql = require('mysql2/promise')
const { MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DB_NAME, MYSQL_PORT } = require('../config.js')

const dbConfig = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  database: MYSQL_DB_NAME,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT
}

let pool

async function getPool () {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

module.exports = getPool

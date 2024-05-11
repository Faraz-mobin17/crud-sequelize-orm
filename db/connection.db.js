const { Sequelize } = require("sequelize");
const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASS,
  MYSQL_USER,
  MYSQL_PORT,
} = require("../config/serverConfig.config");

module.exports = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

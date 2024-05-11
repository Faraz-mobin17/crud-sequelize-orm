const { DataTypes } = require("sequelize");
const db = require("../db/connection.db");

const Gig = db.define("gig", {
  title: DataTypes.STRING,
  technologies: DataTypes.STRING,
  description: DataTypes.STRING,
  budget: DataTypes.STRING,
  contact_email: DataTypes.STRING,
});

module.exports = Gig;

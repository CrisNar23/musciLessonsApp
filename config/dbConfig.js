/******************** DB Connection musicLessonsDB ********************/

/* Configuration to connect to the database */
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 10 },
});

module.exports = knex;

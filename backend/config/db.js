const knex = require("knex")({
    client: "pg",
    connection: {
      host: "db",
      port: 5432,
      user: "postgres",
      password: "P@ssw0rd",
      database: "TaskScore",
    },
  });

module.exports = knex;
module.exports = {
  "type": process.env.DB_ENGINE,
  "host": process.env.HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": [
      "src/**/**.entity{.ts,.js}",
      "src/**.entity{.ts,.js}",
  ],
  "synchronize": true
};
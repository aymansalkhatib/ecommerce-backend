const mongoose = require("mongoose");

const dbConnection = () =>
  mongoose.connect(process.env.DB_URI).then((connection) => {
    console.log(`Database Connection: ${connection.connection.host}`);
  });

module.exports = dbConnection;

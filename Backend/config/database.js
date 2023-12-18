const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `MongoDB connected successfully on host: ${data.connection.host}`
      );
    });
};

module.exports = connectDatabase;

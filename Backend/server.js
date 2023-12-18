const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
});
// Config
dotenv.config({ path: "Backend/config/config.env" });
// connect to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Rejection`);
  server.close(() => {
    process.exit(1);
  });
});

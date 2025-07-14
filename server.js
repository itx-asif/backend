//require("dotenv").config({ path: "config/.env" });
// Load environment config in dev
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/.env" });
}
const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary").v2;


// 🔴 Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`❌ Uncaught Exception: ${err.message}`);
  console.log("Shutting down due to uncaught exception...");
  process.exit(1);
});

// ✅ Connect to MongoDB
connectDatabase();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ✅ Set PORT
const PORT = process.env.PORT || 8000;
connectDatabase().then(() => {
  // Start server only after DB connection
  app.listen(8000, () => console.log('Server running on port 3000'));
});


// ⚠️ Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`❌ Unhandled Promise Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

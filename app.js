const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { globalErrorHandler } = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/projects", require("./routes/project.route"));

// Error handler
app.use(globalErrorHandler);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

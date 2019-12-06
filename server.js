const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const { dbName } = require("./config.json");
const PORT = process.env.PORT || 3001;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add API Routes
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${dbName}`);
app.listen(PORT);

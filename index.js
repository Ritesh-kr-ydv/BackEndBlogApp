const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Import the routes
const blog = require("./routes/blog");

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
const connectWithDb = require("./config/database");
connectWithDb();

// Routes
app.use("/api/v1", blog);


// Root route should be defined before starting the server
app.get("/", (req, res) => {
    res.send(`<h1>This is HomePage</h1>`);
});

// Start the server
app.listen(4000, () => {
    console.log("App is running at 4000")
});

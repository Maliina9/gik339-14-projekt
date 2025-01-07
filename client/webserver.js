const express = require("express");
const path = require("path");

const app = express();

// Serve static files like HTML, CSS, and JS
app.use(express.static(path.join(__dirname, "/")));

// Route to serve the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Set the port number (for example, 3000)
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000/");
});

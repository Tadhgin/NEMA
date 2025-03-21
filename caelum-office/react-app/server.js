const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON (optional, for API routes)
app.use(express.json());

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, "build")));

// Example API route (optional)
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Catch-all route to serve React's index.html for any other requests
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "build", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).send("Error loading the React app.");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
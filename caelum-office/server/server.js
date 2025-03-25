const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint for Caelum to confirm connection
app.get('/', (req, res) => {
  res.json({ message: "Caelum Office backend live and ready." });
});

// Endpoint for Caelum to write a file (example action)
const fs = require('fs');
app.post('/caelum/write', (req, res) => {
  const { filename, content } = req.body;

  fs.writeFile(`./${filename}`, content, err => {
    if (err) {
      res.status(500).json({ error: "Couldn't write file." });
    } else {
      res.json({ message: "File written successfully." });
    }
  });
});

app.listen(port, () => {
  console.log(`Caelum Office is running at http://localhost:${port}`);
});

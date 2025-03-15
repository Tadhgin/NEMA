const config = require('./config');
const express = require('express');
const { getRepoFiles, updateFile } = require('./repoService');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Integration Service is running');
});

app.get('/repo/files', async (req, res) => {
  try {
    const files = await getRepoFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/repo/files/:path', async (req, res) => {
  const { path } = req.params;
  const { content, sha } = req.body;
  try {
    const result = await updateFile(path, content, sha);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
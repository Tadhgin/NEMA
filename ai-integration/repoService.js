const config = require('./config');
const axios = require('axios');

const BASE_URL = "https://api.github.com/repos/your-username/your-repo";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization": `token ${config.githubPat}`
  }
});

const getRepoFiles = async () => {
  const response = await apiClient.get('/contents');
  if (response.status !== 200) throw new Error("Failed to fetch repository files.");
  return response.data;
};

const updateFile = async (path, content, sha) => {
  const response = await apiClient.put(`/contents/${path}`, {
    message: `Updated ${path}`,
    content: Buffer.from(content).toString('base64'),
    sha: sha
  });
  if (response.status !== 200) throw new Error("Failed to update file.");
  return response.data;
};

module.exports = {
  getRepoFiles,
  updateFile
};
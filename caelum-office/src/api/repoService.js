const BASE_URL = "https://api.github.com/repos/your-username/your-repo";

export const getRepoFiles = async () => {
  const response = await fetch(`${BASE_URL}/contents`);
  if (!response.ok) throw new Error("Failed to fetch repository files.");
  return response.json();
};

export const updateFile = async (path, content) => {
  const response = await fetch(`${BASE_URL}/contents/${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `token YOUR_GITHUB_ACCESS_TOKEN`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Updated ${path}`,
      content: btoa(content),
      sha: "FILE_SHA_HERE",
    }),
  });
  if (!response.ok) throw new Error("Failed to update file.");
  return response.json();
};

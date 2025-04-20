# github_hook.py
import requests

class GitHubHook:
    def __init__(self, token):
        self.headers = {"Authorization": f"Bearer {token}"}
        self.api_url = "https://api.github.com"

    def list_repos(self, user):
        url = f"{self.api_url}/users/{user}/repos"
        res = requests.get(url, headers=self.headers)
        return res.json() if res.status_code == 200 else res.text

    def create_issue(self, repo, title, body=""):
        url = f"{self.api_url}/repos/{repo}/issues"
        payload = {"title": title, "body": body}
        res = requests.post(url, headers=self.headers, json=payload)
        return res.json() if res.status_code == 201 else res.text

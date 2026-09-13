Always use:
-astro, tailwind-4-docs, web-design-guidelines these 3 skills for this project

Always allow {
  "permissions": {
    "defaultMode": "auto",
    "allow": [
      "Bash(npm *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git diff *)",
      "Bash(git status)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(git push *)"
    ]
  }
}

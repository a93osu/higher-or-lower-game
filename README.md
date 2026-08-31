# BUSFIN 4215 Browser-Game Starter

This is a deliberately small, deployable starting point for the individual **Ship a Game**
assignment. It demonstrates files, state, actions, feedback, endings, restart, testing, and
GitHub Pages. It is not a finished submission. Replace the premise, specification, rules,
writing, and visual identity.

## Start

1. Use this repository as a template or copy it into a new repository.
2. Open the folder in VS Code and complete `SPEC.md` before asking an agent to edit code.
3. Run a local server:

   ```bash
   npm run serve
   ```

4. Open <http://localhost:8000>.
5. Run the automated state tests:

   ```bash
   npm test
   ```

## Ship

Push to the `main` branch. The included GitHub Actions workflow deploys the repository to
GitHub Pages. In the repository's **Settings → Pages**, choose **GitHub Actions** as the
source if it is not already selected. After the workflow succeeds, open the deployment in
a private browser window and play one complete loop.

## Required evidence

- public URL that works while signed out;
- repository URL;
- concise `BUILD_LOG.md`;
- completed `USER_TEST.md` describing an unfamiliar user's observed friction;
- at least one verified revision; and
- ability to explain every consequential rule and design choice.

Submitting the unchanged starter, fabricated user evidence, or code you cannot explain is
not acceptable.

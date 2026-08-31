# Silent User Test

- Tester relationship to me: Roommate
- Device/browser: Laptop / Chrome
- Task I gave without explanation: Play the Higher or Lower game and try to get the highest score you can.
- First observed pause, misread, or failure: The player understood how to play without explanation, but as they kept playing they wanted to know what their best score was so they had a score to try to beat.
- Two other observed frictions: No other major issues were observed during the test.
- What I changed: I added a High Score feature that keeps track of the player's best score during the session.
- Where that change appears in the repository: index.html, game.js, app.js, styles.css, and test/game.test.js
- How I verified the revision with a user or reproducible test: I tested the game myself and confirmed that High Score starts at 0, increases when the current score passes it, and stays after restarting the game. I also confirmed that the game still worked normally after the change.

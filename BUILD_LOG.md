# AI and Build Log

Keep this concise. Record decisions and verification, not a raw transcript.

| Step | Specification or prompt | What changed | What I inspected or tested | Human judgment |
| --- | --- | --- | --- | --- |
| 1 | Asked Codex to update only SPEC.md with my four-sentence Higher or Lower specification and definition of done. | SPEC.md was updated with the game rules and definition of done. | I read the completed specification and checked that no game files were changed. | The specification matched the simple game I wanted to build. |
| 2 | Asked Codex to build the first playable version using vanilla HTML, CSS, and JavaScript. | Codex built the game with Higher/Lower choices, score, 3 lives, game over, and restart. | Codex reported 9 automated tests passing, but I also opened the game myself. | My manual test found that the starting Current Number was blank, so I did not consider the first version finished even though the automated tests passed. |
| 3 | Reported the blank Current Number and asked Codex to diagnose and fix the existing implementation instead of rebuilding it. | The initialization/script-loading issue was fixed and the tests were expanded. | Codex reported 13 tests passing. I manually played multiple rounds, tested both choices, reached game over, and restarted. | I confirmed the starting number appeared and the complete game loop worked correctly. |
| 4 | After my roommate's silent user test, I asked Codex to add a High Score that stays when the game is restarted. | High Score was added alongside Score and Lives and updates when the player gets a new best score. | I played the game, increased the High Score, restarted, and confirmed Score reset while High Score remained. | This directly addressed the user-test feedback by giving the player a score to try to beat. |
| 5 | Asked Codex for a final restrained visual and usability polish without changing the core gameplay. | The Current Number became more prominent, Higher/Lower became easier to distinguish, feedback became clearer, and the Game Over state was improved. | The final version passed 14 automated tests. I also played through the game myself, tested restart and High Score, and checked the deployed GitHub Pages version. | I kept the game simple instead of adding extra features and confirmed the final public version worked correctly. |

## Failure and diagnosis

- **Exact symptom:** The first playable version loaded, but the Current Number area was blank, so there was no number for the player to make the first Higher or Lower guess from.
- **Expected behavior:** A random whole number from 1 to 100 should appear immediately when the game loads.
- **Smallest diagnosis attempted:** I reported the exact problem I saw during manual testing and asked Codex to inspect the existing HTML, JavaScript, CSS, and tests and fix the current implementation rather than rebuild the game.
- **Evidence that the fix worked:** After the fix, I reopened the game and a starting number appeared immediately. I played multiple rounds, confirmed score and lives updated correctly, reached Game Over, and successfully restarted. The updated automated test suite also passed.

## Ownership check

The most important rule is that each new number is compared to the previous Current Number before becoming the Current Number for the next round. A correct guess adds one point, an incorrect guess removes one of the three lives, and the game ends when the player reaches zero lives.

My main design choice was to keep the game simple and easy to understand instead of adding extra features. I added High Score because it came directly from the silent user test and gave the player a reason to play again.

One limitation is that High Score only lasts for the current page session. If the player completely refreshes the page, the High Score resets to 0 because I chose not to add saved browser data, accounts, or a database.

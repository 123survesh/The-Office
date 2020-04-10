# The Office
The Office is a 2D, drag and drop game, where the player has to drag and drop service men to repair the things that break in the office. This game was made made during the Global Game Jam of 2020. The game is in a playable state but it has some really solid bugs. 
I did not know my team mate @Sushanth15 before this gamejam. He was the one who came up with the idea for the game and worked up all the ideas for how things should be done. And we finished up the game with the help of @harish-hammer.

Check the game out at: https://123survesh.github.io/The-Office/

### Things to do:
* Change the current logic for makign things break.
* Fix the bugs
* Add more polish
* Add a currency system and add powerups



### Quick start to run the game in your computer
**Node version >= 8.0 (recommended 10.6.0) and NPM >= 5 (recommended 6.1.0)**

```bash
# clone the repo.
# --depth 1 removes all but one .git commit history (Optional).
git clone --depth 1 https://github.com/123survesh/The-Office.git

# go to the repo
cd The-Office

# install the dependencies via npm
npm install

# start the server in dev mode with HMR
npm run start
```
go to [http://localhost:1234](http://localhost:1234) in your browser. Done.

### npm scripts

* `npm run start` - runs the compiler and a server at the same time in dev mode with HMR (Hot Module Replacement) 🔥.
* `npm run build` - runs the compiler once and generates a production build.
* `npm run build_serve` - it makes a build and serves it to port 8080.
* `npm run test` - runs the unit tests (.spec.ts files).

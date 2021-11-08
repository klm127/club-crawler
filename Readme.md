## Crawler

![a screenshot from club-crawler](https://github.com/unhm-programming-team/club-crawler/blob/main/screen.png)

[Link to the documentation](https://unhm-programming-team.github.io/club-crawler/)

Club Crawler is a dungeon crawler style javascript web game made with Phaser. It runs client-side in the browser. An older version is playable on Netlify until the free builds run out at this link: [https://club-crawler.netlify.app/](https://club-crawler.netlify.app/)

Club Crawler is similar to the Arcade classic [Gauntlet](https://en.wikipedia.org/wiki/Gauntlet_(1985_video_game)). Clicking causes the player to fire whatever weapon they are wielding in the direction of the mouse pointer. Arrow keys move the player around the map.

Once a better base game is set up, we may look at making it more rogue-lite-like by adding procedural map generation with, for example, [Dungeoneer](https://github.com/LucianBuzzo/dungeoneer/). 

## Contributing

Reach out to klm127#5121 on Discord if you have any questions about the code base. The [documentation](https://unhm-programming-team.github.io/club-crawler/) may be helpful. If you have an idea or improvement to the code, fork this repository and make a pull request. Please make pull requests for just 1 feature at a time to make the review process more simple and don't add anything malicious to the code base.

Contributions don't have to be code. If you have some art, music, sound effect, or an idea to add to the game, you can either pull request that in or contact klm127 on Discord to add it for you. 

Maps are currently created using [tiled](https://www.mapeditor.org/), which integrates well with Phaser. 

There is a [tentative to-do list](https://github.com/unhm-programming-team/club-crawler/blob/main/todo.md)

## Dependencies

#### Main dependency:

[Node/NPM](https://nodejs.org/en/download/) - for serving locally

#### NPM Installed Dependencies: 

_You probably won't have to worry about these once you have node/npm_

[Phaser](https://phaser.io/) - The game engine **Lots of documentation and examples at the link**

[Parcel](https://www.npmjs.com/package/parcel) - for serving a website in test and packaging javascript

## How to Run it

1. Install Node js and NPM

1. Open the command line
    - On windows: `Windows Key` + `R`, then type `cmd`, then hit `enter`

1. Clone this repo in the command line `git clone https://github.com/unhm-programming-team/club-crawler.git`

1. Open this projects root directory in the command line `cd club-crawler`

1. Execute `npm install` to instruct NPM to install all dependencies

1. Execute `npm start` to start the web server

1. In a browser such as Firefox, navigate to http://localhost:1234/
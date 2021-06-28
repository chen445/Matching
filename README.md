## Introduction
Matching Game is a classic elimination of the game which players must remove all the images from the board. The board is N by N grid with different images. Players need to find images with same pattern. After players click the two matching images that have a path between them, images will disappear from the board. The game will end when all images disappear.

Live Site: [Matching](https://chen445.github.io/Matching/)

## Technologies
* Vanilla Javascript
* Node.js and Express.js
* CSS
* HTML
* Native broswer API

## Features
* Players can start and pause the game.
* Play background music, sound effects and enable player to mute/unmute the sound. 
* Players can click on images if two images are identical. Two images disappear if there is a valid path between them.
* Display happy face when there is match, otherwise a sad face is displayed.
* Show a count down when the game start.

<img src="https://github.com/chen445/Matching/blob/gh-pages/images/record6.gif?raw=truef" alt="demo" width="900"/>


## Game Rules
* Players can click on images if two images are identical.Matched images will disapper with valid path.
* The paths cannot be more than three straight lines.
* Players need to find all the matched images with certain amount of time to win the game. 

To determine whether the path between two images, a variation of DFS (Depth First Search) is used. 

### Invalid Path 

<img src="https://github.com/chen445/Matching/blob/gh-pages/images/invalidMove.png?raw=true" alt="invalid-path" width="500"/>

### Valid Path

<img src="https://github.com/chen445/Matching/blob/gh-pages/images/validMove.png?raw=true" alt="valid-path" width="500"/>

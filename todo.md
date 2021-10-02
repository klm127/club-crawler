# TODO

## Refactor and Abstract Code Logic
# _Templat-tize the game!_

- **Event driven** - there is a central update function used in Game but it's mostly just for input detection... other things update by attaching events to timers 
- Information on where to place everything except the overlay (for now) is derived from map data created by **Tiled**


- _Keep_ the current design of
    - MapManager : manages the map, builds the map from the Tiled .json export, so handles that logic. Does not extend the map - but perhaps it could do that
    - Game Scene : permanently references player and mapManager, calls the Overlay screen and detects user input
    - **The MapManager places objects in the Scene** based on the Tiled Map data in `blueworld.json` for example
    - The MapManager places GameItems from the `Objects` layer of the Tiled export

- Entities (Base Class of the objects which have any kind of physics in the Game)
    - Have an associated object in Tiled... perhaps a [Tiled object template](https://doc.mapeditor.org/en/stable/manual/using-templates/)
    - each have a "preload" function to get the relevant asset, called by the MapManager before the scene is started
    - extend a `Phaser.Image` or `Phaser.Group` or similar and call their ancestor class (super() ) in their constructor, with the graphic(s) they preloaded
    - add physics properties to themselves, by calling `this.scene.physics.add.existing()` - this gives them a new property called `this.body` which controls physics properties (velocity, drag, mass, etc) in the world
    - add physics colliders/overlap relationships between themselves and groups of other physics objects, i.e. `this.scene.physics.add.collider(this, this.scene.mapManager.walls..)`
    - There will be groups of physics objects stored as properties in the `mapManager` object, such as `mapManager.walls` (or could be renamed to `mapManager.solids`) - gameitems will add colliders (or overlaps) between themselves and these groups as necessary
    - have `this.updateEvent` if they update
    - call `this.updateEvent.destroy()` before they are destroyed if they have an updateEvent

- Beings
    - have health, speed, acceleration, updateSpeed
    - Have a base way of moving , i.e. `this.move(angle, accelerationMultiplier=1)`
    - update at some interval (events)
    - should have a way of checking the world around them. Can get distance to player or to other entities
    - could use tweens to move in some cases? For interesting movement patterns like arcs and such

- Effects
    - probably set more overlaps than colliders
    - sprite animations or extending `Phaser.Graphics` for special effects might be interesting 


## General ToDos 

1. Create a bad guy
    1. Set up sprites
    1. ~Spawn in map~
    1. ~Set up movement~

1. ~Create a basic weapon for player~
    1. ~Shooting fireballs or something for now~
    1. Should shoot at where mouse is located when space is pressed
    1. ~Set bullets to damage bad guy~
    1. Should be able to move reticle with wsad

1. ~Set up documentation~
    1. ~Will use jsdoc~
    1. Will retrieve phaser info and directly link to those docs
    1. Generate a sleek webpage

1. Connect player health to overlay using an event emitter
    1. ~Design and create eventcenter type paradigm using instance of phaser event emitter~
    1. Create graphics for UI
    1. Set up bad guy damaging player

1. Create a game over scene with a restart button

1. Create a high score table

1. Create an inventory screen / scene and the ability to pickup objects

1. Clickable buttons on the overlay that don't cause player to shoot when they're clicked, and can open an inventory overlay

### Other notes, links

Extend a Sprite in Phaser 3:

https://phasergames.com/extend-a-sprite-in-phaser-3/?mc_cid=3f4ee26e5d&mc_eid=a4d9ee0291


A tutorial on tilemaps: https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6

A free alternative to TexturePacker on the web : https://free-tex-packer.com/app/

Paint.net is amazing for sprite creation




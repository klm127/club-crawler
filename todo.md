1. Create a bad guy
    1. Set up sprites
    1. Spawn in map
    1. Set up movement

1. Create a basic weapon for player
    1. Shooting fireballs or something for now
    1. Should shoot at where mouse is located when sprace is pressed
    1. Set bullets to damage bad guy

1. Set up documentation
    1. Will use jsdoc
    1. Will retrieve phaser info and directly link to those docs
    1. Generate a sleek webpage

1. Connect player health to overlay using an event emitter
    1. Design and create eventcenter type paradigm using instance of phaser event emitter
    ```
    create ()
    {
        //  Create our own EventEmitter instance
        var emitter = new Phaser.Events.EventEmitter();

        //  Set-up an event handler
        emitter.on('addImage', this.handler, this);

        //  Emit it a few times with varying arguments
        emitter.emit('addImage', 200, 300);
        emitter.emit('addImage', 400, 300);
        emitter.emit('addImage', 600, 300);
    }

    handler (x, y)
    {
        this.add.image(x, y, 'plush');
    }
    ```
    1. Create graphics for UI
    1. Hook DungeonCrawlerOverlay into Player class
    1. Set up bad guy damaging player

1. Create a game over scene with a restart button

1. Create a high score table










----- Notes -----
Extend a Sprite in Phaser 3:

https://phasergames.com/extend-a-sprite-in-phaser-3/?mc_cid=3f4ee26e5d&mc_eid=a4d9ee0291

Issues is, how do you add it to the scene?

A tutorial on tilemaps: https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6

A free alternative to TexturePacker on the web : https://free-tex-packer.com/app/


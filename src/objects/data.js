import Phaser from "phaser";

const emitter = new Phaser.Events.EventEmitter()

export const dataManager = {
    score: 0,
    health: 0,
    emitter: emitter,
    changeScore: function(change) {
        dataManager.score += 1;
        emitter.emit('scoreChange');
    }
    
} ;
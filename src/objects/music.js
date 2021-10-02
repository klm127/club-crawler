/**
 * 
 * @memberof ClubCrawler.Objects
 * Holds a global music object to play across title screen
 * 
 * Needed? Not sure, but I think so
 */

import Phaser from "phaser";

const musicManager = {
    music: null,
    preload: function(scene) {
        scene.load.audio('music', 'sounds/Psyjamsnake.mp3');
    },
    /**
     * Description
     * @param {Phaser.Scene} scene
     * @returns {any}
     */
    create: function(scene) {
        musicManager.music = scene.sound.add('music');
        // comment out this line if you don't want to hear the music
        musicManager.music.play({loop:true});
        musicManager.music.setVolume(0.2);
    }
};

module.exports = musicManager;
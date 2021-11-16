const RightUI = require('./domUI/rightUI');
const LeftUI = require('./domUI/leftUI');
const gameInventory = require('../src/objects/player/inventory');

const rightUIelement = document.getElementById('club-crawler-right-UI');
const leftUIelement = document.getElementById('club-crawler-left-UI');

const rightUI = new RightUI(rightUIelement);
const leftUI = new LeftUI(leftUIelement);

/**
 * How can I get images from the game scene?
 * 
 * scene
 * .textures
 *  .list
 *   ["popper-inventory"]
 *    .frames
 *     .__BASE
 *      .source
 *       .source    // an img element
 *         .src
 */

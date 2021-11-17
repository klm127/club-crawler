const RightUI = require('./domUI/rightUI');
const LeftUI = require('./domUI/leftUI');
const UIManager = require('./domUI/uiManager');
const testingStubs = require('./testingStubs');

const rightUIelement = document.getElementById('club-crawler-right-UI');
const leftUIelement = document.getElementById('club-crawler-left-UI');

const rightUI = new RightUI(rightUIelement);
const leftUI = new LeftUI(leftUIelement);

var player = new testingStubs.Player({});

var uiManager = new UIManager(player, rightUI, leftUI);

uiManager.loadDataManager(testingStubs.dataManager);

setTimeout(()=>{
    uiManager.showPlayerWeapon();
    uiManager.loadPlayerInventory();
}, 500)

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

const _DebugUI = require('./_debugUI');
const DebugUI = require('./debugUI');
const SettingsUI = require('./settingsUI');
const DebugMessages = require('./debugMessages');

const DEFAULT_STYLES = {
    width: "250px"
}

/**
 * @classdesc Creates instances and DOM elements for the left side UI
 * @memberof ClubCrawler.DOMUserInterface
 */

class DOMLeftUI {
    /**
     * @param {HTMLElement} element - The right UI element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element.style, DEFAULT_STYLES);

        //
        // !! remove this on integration with game !!
        //
        this._debugElement = document.createElement('div');
        this._debug = new _DebugUI(this._debugElement);
        this.element.appendChild(this._debugElement);

        this.settingsElement = document.createElement('div');
        this.settingsUI = new SettingsUI(this.settingsElement);
        this.element.appendChild(this.settingsElement);   

        this.debugElement = document.createElement('div');
        this.debug = new DebugUI(this.debugElement);
        this.element.appendChild(this.debugElement);

        this.debugMessagesElement = document.createElement('div');
        this.debugMessages = new DebugMessages(this.debugMessagesElement);
        this.element.appendChild(this.debugMessagesElement);

        this.uiManager = null;        
        
    }

    loadManager(uiManager) {
        this.uiManager = uiManager;
        this._debug.loadManager(uiManager);
        this.debug.loadManager(uiManager);
        this.settingsUI.loadManager(uiManager);
    }

    /**
     * Loads the settings into the settings object
     * Loads the global debug config object into the debug messages object
     * @param {ClubCrawler.Data.dataManager} - The data manager
     */
    loadDataManager(dataManager) {
        this.settingsUI.loadSettingsObject(dataManager.settings, "settings");
        this.debugMessages.loadDebugObject(dataManager.debug);
        this.debug.loadDebugObject(dataManager.debug, "debug");
        //this.debug.addDebugMessageOnListener(dataManager.emitter);
        this._debug.loadDataManager(dataManager);

    }
}

module.exports = DOMLeftUI;
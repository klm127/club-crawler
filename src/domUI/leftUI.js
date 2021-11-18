const DebugUI = require('./debugUI');
const SettingsUI = require('./settingsUI');
const DebugMessages = require('./debugMessages');

const DEFAULT_STYLES = {
    id:"club-crawler-left-ui",
    style: {
        width: "250px"
    }
}

/**
 * @classdesc Creates instances and DOM elements for the left side UI
 * @memberof ClubCrawler.DOMUserInterface
 */
class LeftUI {
    /**
     * @param {HTMLElement} element - The left container element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element, DEFAULT_STYLES);
        Object.assign(this.element.style, DEFAULT_STYLES.style);

        /**
         * @property {HTMLElement} - The SettingsUI container element
         */
        this.settingsElement = document.createElement('div');
        /**
         * @property {ClubCrawler.DOMUserInterface.SettingsUI} - The Settings User Interface
         */
        this.settingsUI = new SettingsUI(this.settingsElement);
        this.element.appendChild(this.settingsElement);   

        /**
         * @property {HTMLElement} - The DebugUI container element
         */
        this.debugElement = document.createElement('div');
        /**
         * @property {ClubCrawler.DOMUserInterface.DebugUI} - The Debug options user interface
         */
        this.debug = new DebugUI(this.debugElement);
        this.element.appendChild(this.debugElement);

        /**
         * @property {HTMLElement} - The DebugMessages container element
         */
        this.debugMessagesElement = document.createElement('div');
        /** @property {ClubCrawler.DOMUserInterface.DebugMessageBox}- The DebugMessages user interface */
        this.debugMessages = new DebugMessages(this.debugMessagesElement);
        this.element.appendChild(this.debugMessagesElement);

        /** @property {ClubCrawler.DOMUserInterface.UIManager} - The UI manager */
        this.uiManager = null;        
        
    }

    /**
     * Loads the UI manager into this left UI and loads it into the debug and settings UI.
     * @param {ClubCrawler.DOMUserInterface.UIManager} - The UIManager
     */
    loadManager(uiManager) {
        this.uiManager = uiManager;
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

    }
}

module.exports = LeftUI;
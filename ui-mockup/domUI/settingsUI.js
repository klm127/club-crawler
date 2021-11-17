const CONTAINER_PROPS = {
    className: "club-crawler-settings-container",
    style: {
        width: "100%",
        color: "white",
    }
}

const DROP_DOWN_PROPS = {
    className: "club-crawler-settings-drop-down",
    style: {
        cursor: "pointer",
    }
}

const INPUT_CONTAINER = {
    className: "club-crawler-settings-drop-down-area",
    style: {
        display: "none"
    }
}

/**
 * @classdesc Allows user to change settings
 * @memberof ClubCrawler.UserInterface
 */
class SettingsUI {
    /**
     * @param {HTMLElement} element - The container element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element, CONTAINER_PROPS);
        Object.assign(this.element.style, CONTAINER_PROPS.style);
        /** @property {Object} - The object whose properties to make configurable */
        this.settingsObject = null;
        /** @property {HTMLElement} - The drop down button with the title */
        this.dropDownElement = document.createElement('div');
        Object.assign(this.dropDownElement, DROP_DOWN_PROPS);
        Object.assign(this.dropDownElement.style, DROP_DOWN_PROPS.style);
        this.element.appendChild(this.dropDownElement);
        /** @property {HTMLElement} - The element containing the options, to hide/show on drop down click */
        this.inputContainer = document.createElement('div');
        Object.assign(this.inputContainer, INPUT_CONTAINER);
        Object.assign(this.inputContainer.style, INPUT_CONTAINER.style);
        this.element.appendChild(this.inputContainer);
        /** @property {Array} - The child settingsUIs and InputComponents created */
        this.children = [];
        /** @property {ClubCrawler.UserInterface.DOMUIManager} - The ui manager */
        this.uiManager = null;

        this.addDropDownListener();

    }

    addDropDownListener() {
        let dropDownArea = this.inputContainer;
        this.dropDownElement.addEventListener('click', (ev)=> {
            switch(dropDownArea.style.display) {
                case "none":
                    dropDownArea.style.display = "block";
                    break;
                default:
                    dropDownArea.style.display = "none";
                    break;
            }
        })
    }

    /**
     * @param {Object} settingsObject - The object to load and create interfaces for
     * @param {string} [name="settings"] - The name for the drop down button
     */
    loadSettingsObject(settingsObject, name="settings") {
        this.settingsObject = settingsObject;
        
        this.dropDownElement.innerHTML = name + "⬇";

        let keys = Object.keys(settingsObject);
        for(let key of keys) {
            testValue = settingsObject[key];
            if(typeof testValue == "object") {
                let newElement = document.createElement('div');
                if(testValue.name) {
                    let inputObject = new InputComponent(newElement, testValue);
                    inputObject.inputElement.addEventListener('change', (ev)=> {
                        inputObject.validate();
                    });
                    this.children.push(inputObject);

                }
                else {
                    let subObjectSettingsUI = new SettingsUI(newElement);
                    this.children.push(subObjectSettingsUI);
                    subObjectSettingsUI.loadSettingsObject(testValue, key);

                }
                this.inputContainer.appendChild(newElement);
            }
        }

    }

    /** load the UI manager into this and all children objects
     * @param {ClubCrawler.DOMUserInterface.DOMUIManager} - The manager
     */
    loadManager(uiManager) {
        for(let child of this.children) {
            child.loadManager(uiManager);
        }
        this.uiManager = uiManager;
    }
}

const INPUT_COMPONENT = {
    className: "club-crawler-input",
    style: {

    }}
const INPUT_NAME = {
    className: "club-crawler-input-name",
    style: {
        width: "25%"
    }}
const INPUT_BOOLEAN = {
    className: "club-crawler-input-bool",
    type:"checkbox",
    style: {

    }}
const INPUT_NUMBER = {
    className: "club-crawler-input-number", 
    // avoid type:number, because of buggy browsers
    style: { 
        width:"25%"
    }}
const INPUT_STRING = {
    className: "club-crawler-input-string",
    style: {
        width:"25%",

    }}

/**
 * @private
 * 
 * A component for allowing user selection
 */
class InputComponent {
    /**
     * @param {HTMLElement} element - The container element
     * @param {string} name - The name to display
     * @param {string} value - The starting value
     */
    constructor(element, inputSettingsObject) { 
        /** @property {HTMLElement} - The container */
        this.element = element;
        /** @property {ClubCrawler.Types.InputConfig} - The input configuration object this models */
        this.config = inputSettingsObject;
        Object.assign(this.element, INPUT_COMPONENT);
        Object.assign(this.element.style, INPUT_COMPONENT.style);
        /** @property {HTMLElement} - The element showing the name of this control */
        this.nameElement = document.createElement('span');
        Object.assign(this.nameElement, INPUT_NAME);
        Object.assign(this.nameElement, INPUT_NAME.style);
        this.nameElement.innerHTML = "➡" + this.config.name;
        this.element.appendChild(this.nameElement);
        /** @property {HTMLElement} - The input element */
        this.inputElement = document.createElement('input');
        switch(typeof this.config.type) {
            case "boolean": {
                Object.assign(this.inputElement, INPUT_BOOLEAN);
                Object.assign(this.inputElement.style, INPUT_BOOLEAN.style);
                this.inputElement.checked = this.config.value;
                break;
            }
            case "number": {
                Object.assign(this.inputElement, INPUT_NUMBER);
                Object.assign(this.inputElement.style, INPUT_NUMBER.style);
                this.inputElement.value = this.config.value;
                break;
            }
            default: {
                Object.assign(this.inputElement, INPUT_STRING);
                Object.assign(this.inputElement.style, INPUT_STRING.style);
                this.inputElement.value = this.config.value;
                break;
            }
        }
        this.element.appendChild(this.inputElement);

    }

    /** validates input and sets this.value to the input*/
    validate() {
        if(this.config.type == "number") {
            let inputVal = this.inputElement.value;
            try {
                this.config.value = parseFloat(this.inputElement.value);
                this.inputElement.value = this.config.value;
            }
            catch(e) {
                this.inputElement.value = this.config.value;
            }
            if(this.config.value > this.config.max) {
                this.config.value = this.config.max;
                this.inputElement.value = this.config.value;
            }
            if(this.config.value < this.config.min) {
                this.config.value = this.config.min;
                this.inputElement.value = this.config.value;
            }            
        }
        else if(this.config.type == "boolean") {
            this.config.value = this.inputElement.checked;
        }
        else { // string
            this.config.value = this.inputElement.value;
        }
    }
}

module.exports = SettingsUI;
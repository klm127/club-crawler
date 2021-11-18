
const MESSAGE_BOX = {
    className: "club-crawler-debug-messages",
    style: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto"
    }}

/**
 * @classdesc Contains displayed debug messages created by [dataManager.log]{@link ClubCrawler.Data.dataManager} when [dataManager.debug.on]{@link ClubCrawler.Types.DebugConfig} is true.
 * @memberof ClubCrawler.DOMUserInterface
 */
class DebugMessageBox {
    /**
     * @param {HTMLElement} container - The DOM container element.
     */
    constructor(container) {
        /** @member {HTMLElement} - The DOM container element. */
        this.element = container;
        Object.assign(this.element, MESSAGE_BOX);
        Object.assign(this.element.style, MESSAGE_BOX.style);
        /** @member {ClubCrawler.Types.DebugConfig} - The debug settings object to reference.  */
        this.debugObject = null;
        /** @member {Array} - The debug message elements. */
        this.messages = [];
    }

    /**
     * Loads the debug object. Adds listeners to debug.emitter for changes to debug.debugLines.
     * @property {ClubCrawler.Types.DebugConfig} - The global debug settings object.
     */
    loadDebugObject(debugObject) {
        this.debugObject = debugObject;
        debugObject.emitter.on('debugMessageToggle', ()=>{
            if(this.element.style.display != "none") {
                this.element.style.display = "none";
            }
            else {
                this.element.style.display = "block";
            }
        }, this);
        debugObject.emitter.on('debugLog', this.updateDebugMessages, this);
        this.updateDebugMessages();
        if(this.debugObject.on) {
            this.element.style.display = "block";
        }
        else {
            this.element.style.display = "none";
        }
    }

    /**
     * Updates debug messages.
     * 
     * Also deletes extra messages which are larger than max debug lines.
     */
    updateDebugMessages() {
        this.element.innerHTML = "";
        this.messages = [];
        while(this.debugObject.debugLines.length > this.debugObject.max) {
            this.debugObject.debugLines.shift();
        }
        for(let line of this.debugObject.debugLines) {
            let dbm = new DebugMessage(this, line);
            this.messages.push(dbm);
        }
    }

    /**
     * Deletes a message from debug lines when the "x" on a message is clicked, then calls updateDebugMessages.
     * @param {ClubCrawler.UserInterface.DebugMessage} debugMessage - The message to delete.
     */
    deleteMessage(debugMessage) {
        let dblines = this.debugObject.debugLines
        let index = dblines.indexOf(debugMessage.messageText);
        let pre = dblines.slice(0, index);
        let post =  dblines.slice(index+1, dblines.length);
        this.debugObject.debugLines = pre.concat(post)
        this.updateDebugMessages();

    }
}

const MESSAGE = {
    className: "club-crawler-debug-message",
    style: {
        backgroundColor: "red",
        margin: "5px"
    } }
const MESSAGE_X = {
    className: "club-crawler-debug-message-x",
    style: {
        cursor: "pointer",
        backgroundColor: "rgb(150,20,20)",
        marginLeft: "10px"
    } }

/**
 * @classdesc A Message box for displaying a single debug message.
 * @memberof ClubCrawler.UserInterface
 */
class DebugMessage {
    /**
     * @param {ClubCrawler.UserInterface.DebugMessageBox} messagebox - The creating message box.
     * @param {string} message - The message to display.
     */
    constructor(messagebox, message) {
        /** @member {ClubCrawler.UserInterface.DebugMessageBox} - The creating message box. */
        this.parentBox = messagebox;
        /** @member {string} - The message. */
        this.messageText = message;
        /** @member {HTMLElement} - The div which displays the message. */
        this.element = document.createElement('div');
        Object.assign(this.element, MESSAGE);
        Object.assign(this.element.style, MESSAGE.style);
        this.element.innerHTML = message;
        this.parentBox.element.appendChild(this.element);
        /** @member {HTMLSpanElement} - The button for deleting this message. */
        this.deleteButton = document.createElement('span');
        this.deleteButton.innerHTML = "❌";
        Object.assign(this.deleteButton, MESSAGE_X);
        Object.assign(this.deleteButton.style, MESSAGE_X.style);
        this.element.appendChild(this.deleteButton);
        var that = this;
        this.deleteButton.addEventListener('click', (ev)=> {
            that.delete();
        })
    }

    /**
     * Called when the "X" is clicked on a debug message.
     * Tells DebugMessageBox to delete this message from the debugLines.
     * Also deletes the html element.
     */
    delete() {
        this.parentBox.deleteMessage(this);
        this.deleteElement();
    }

    deleteElement() {
        if(this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

}

module.exports = DebugMessageBox;
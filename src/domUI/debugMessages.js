
const MESSAGE_BOX = {
    className: "club-crawler-debug-messages",
    style: {
        width:"100%",
    }}

/**
 * @classdesc Contains debug messages when activated
 * @memberof ClubCrawler.UserInterface
 */
class DebugMessageBox {
    /**
     * @param {HTMLElement} container - The DOM container elemenet
     */
    constructor(container) {
        /** @property {HTMLElement} - The DOM container element */
        this.element = container;
        Object.assign(this.element, MESSAGE_BOX);
        Object.assign(this.element.style, MESSAGE_BOX.style);
        /** @property {ClubCrawler.Types.DebugConfig} - The global debug settings object to reference  */
        this.debugObject = null;
        /** @property {Array} - The debug message elements */
        this.messages = [];
    }

    /**
     * Loads the debug object
     * @property {ClubCrawler.Types.DebugConfig} - The global debug settings object
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
        }, this)
    }

    /**
     * Updates debug messages.
     * 
     * Also deletes extra messages which are larger than max debug lines
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
     * Deletes a message from debug lines then updates debug messages
     * @param {ClubCrawler.UserInterface.DebugMessage} debugMessage - The message to delete
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
        width: "100%",
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
 * @classdesc A DOM Message box for debug messages
 * @memberof ClubCrawler.UserInterface
 */
class DebugMessage {
    /**
     * @param {ClubCrawler.UserInterface.DebugMessageBox} - The creating message box
     */
    constructor(messagebox, message) {
        /** @property {ClubCrawler.UserInterface.DebugMessageBox} - The creating message box */
        this.parentBox = messagebox;
        /** @property {string} - The message */
        this.messageText = message;
        /** @property {HTMLElement} - The displayed message */
        this.element = document.createElement('div');
        Object.assign(this.element, MESSAGE);
        Object.assign(this.element.style, MESSAGE.style);
        this.element.innerHTML = message;
        this.parentBox.element.appendChild(this.element);
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
     * Called when the "X" is clicked on a debug message
     * Tells DebugMessageBox to delete this message from the debugLines
     * Also deletes the html element
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
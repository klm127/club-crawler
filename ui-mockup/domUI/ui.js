/**
 * @namespace ClubCrawler.Ui
 * The User Interace is comprised of DOM objects which interact with the dataManager.emitter to respond to game logic
 */

const UI_HARD_STYLE = {

}
const UI_SETTINGS = {
    uiContainerclassName: "club-crawler-ui-container",
    rightUiContainerClassName: "club-crawler-right-ui"
}
/** 
 * @memberof ClubCrawler.Ui
 * 
 * Wrapper for all user interface elements in the dom
*/
class DOMUserInterface {
    constructor(parentContainer) {
        this.element = document.createElement('div');
        this.element.className = UI_SETTINGS.rightUiContainerClassName;
        this.rightContainer = document.createElement('div');
        this.rightContainer.className = UI_SETTINGS.rightUiContainerClassName;
        
        this.element.appendChild(this.rightContainer);

    }

}
"use strict";

export default class Page {

    constructor() {
        this.addEventsOnButtons();
    }

    addEventOnButtons() {};

    static hideAllPages() {
       let pages = document.getElementsByClassName("page");
       for (let i = 0; i < pages.length; i++) {
            pages[i].hidden = true;
       }
    }

    showOnlyOnePage(pageName) {
        Page.hideAllPages();
        this.getElementByClass(pageName.toString()).hidden = false;
    }

    addRedirectOnButtons(...buttons) {
        buttons.forEach( button => {
            this.getElementByClass(button.button).addEventListener("click", () => this.showOnlyOnePage(button.nextPage));
        });
    }
}

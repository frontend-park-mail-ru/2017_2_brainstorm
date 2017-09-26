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
        this.constructor.hideAllPages();
        this.getElementByClass(pageName.toString()).hidden = false;
    }

    addRedirectOnButtons(...buttons) {
        let t = this;

        buttons.forEach(function (button, i, buttons) {
            t.getElementByClass(button.button).addEventListener("click", function () {
                t.showOnlyOnePage(button.nextPage);
            });
        });
    }

}

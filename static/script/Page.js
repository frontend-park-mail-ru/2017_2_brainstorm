"use strict";

export default class Page {

    constructor() {
        Page.pagePath();
        this.addEventsOnButtons();
    }

    static pagePath() {}

    addEventsOnButtons() {}

    static hideAllPages() {
        let pages = document.getElementsByClassName("page");
        for (let i = 0; i < pages.length; i++) {
            pages[i].hidden = true;
        }
    }

    static showOnlyOnePage(pageName) {
        Page.hideAllPages();
        document.querySelector("." + pageName).hidden = false;
    }

    addRedirectOnButtons(...buttons) {
        buttons.forEach( button => {
            document.querySelector("."+button.button).addEventListener("click", () => {
                Page.showOnlyOnePage(button.nextPage);
                history.pushState({}, "", button.pagePath);
            });
        });
    }
}

"use strict";

import PagePresenter from "./PagePresenter.js";

export default class Page {

    constructor() {
        Page.pagePath();
        Page.pageBoxName();
        this.render();
        this.addEventsOnButtons();
    }

    static pagePath() {}

    static pageBoxName() {}

    render() {}

    addEventsOnButtons() {}

    static createBoxForPage(pageBoxName) {
        let pageBox = document.createElement("div");
        pageBox.className = pageBoxName + " page";
        pageBox.hidden = true;
        document.querySelector(".main-box").appendChild(pageBox);
        return pageBox;
    }

    addRedirectOnButtons(...buttons) {
        buttons.forEach(button => {
            document.querySelector("." + button.button).addEventListener("click", () => {
                PagePresenter.showOnlyOnePage(button.nextPage);
                history.pushState({}, "", button.pagePath);
            });
        });
    }
}

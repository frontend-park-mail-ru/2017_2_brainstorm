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

    static messageBox() {
        return ".message-box";
    }

    static hideMessageBox() {
        document.querySelector(".fon-box").hidden = true;
        document.querySelector(".message-box").hidden = true;
    }

    static showMessageBox() {
        document.querySelector(".fon-box").hidden = false;
        document.querySelector(".message-box").hidden = false;
    }

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

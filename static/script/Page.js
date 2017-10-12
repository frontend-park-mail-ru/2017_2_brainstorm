"use strict";

import PagePresenter from "./PagePresenter.js";

export default class Page {

    constructor() {
        Page.pagePath();
        this.addEventsOnButtons();
    }

    static pagePath() {}

    addEventsOnButtons() {}

    addRedirectOnButtons(...buttons) {
        buttons.forEach(button => {
            document.querySelector("." + button.button).addEventListener("click", () => {
                PagePresenter.showOnlyOnePage(button.nextPage);
                history.pushState({}, "", button.pagePath);
            });
        });
    }
}

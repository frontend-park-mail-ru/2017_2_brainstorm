"use strict";

import Page from "../../modules/Page.js";

export default class MainPage extends Page {

    constructor() {
        super();
        MainPage.render();
    }

    static pagePath() {
        return "/main";
    }

    static pageBoxName() {
        return "main-page";
    }

    static render(resp = null) {
        let template = require("./main-page.pug");
        let mainPageBox = Page.createBoxForPage(this.pageBoxName());
        mainPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

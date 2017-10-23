"use strict";

import Page from "../../modules/Page.js";

export default class MainPage extends Page {

    constructor() {
        super();
    }

    static pagePath() {
        return "/main";
    }

    static pageBoxName() {
        return "main-page";
    }

    render(resp = null) {
        let template = require("./main-page.pug");
        let mainPageBox = Page.createBoxForPage(MainPage.pageBoxName());
        mainPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

"use strict";

import Page from "../../modules/Page.js";

export default class InfoPage extends Page {

    constructor() {
        super();
        InfoPage.render();
    }

    static pagePath() {
        return "/info";
    }

    static pageBoxName() {
        return "info-page";
    }

    static render() {
        let template = require("./info-page.pug");
        let infoPageBox = Page.createBoxForPage(this.pageBoxName());
        infoPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

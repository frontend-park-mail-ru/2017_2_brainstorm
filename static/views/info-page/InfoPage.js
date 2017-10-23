"use strict";

import Page from "../../modules/Page.js";

export default class InfoPage extends Page {

    constructor() {
        super();
    }

    static pagePath() {
        return "/info";
    }

    static pageBoxName() {
        return "info-page";
    }

    render() {
        let template = require("./info-page.pug");
        let infoPageBox = Page.createBoxForPage(InfoPage.pageBoxName());
        infoPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

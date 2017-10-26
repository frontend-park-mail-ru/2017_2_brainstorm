"use strict";

import Page from "../../modules/Page.js";
import template from "./info-page.pug";

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
        let infoPageBox = Page.createBoxForPage(InfoPage.pageBoxName());
        infoPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

"use strict";

import Page from "../../modules/Page.js";
import template from "./main-page.pug";

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

    render() {
        let mainPageBox = Page.createBoxForPage(MainPage.pageBoxName());
        mainPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

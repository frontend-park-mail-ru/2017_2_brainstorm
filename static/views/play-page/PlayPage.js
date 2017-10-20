"use strict";

import Page from "../../modules/Page.js";

export default class PlayPage extends Page {

    constructor() {
        super();
        PlayPage.render();
    }

    static pagePath() {
        return "/play";
    }

    static pageBoxName() {
        return "play-page";
    }

    static render() {
        let template = require("./play-page.pug");
        let playPageBox = Page.createBoxForPage(this.pageBoxName());
        playPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

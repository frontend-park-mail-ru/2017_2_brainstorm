"use strict";

import Page from "../../modules/Page.js";

export default class PlayPage extends Page {

    constructor() {
        super();
        // PlayPage.render();
    }

    static pagePath() {
        return "/play";
    }

    static pageBoxName() {
        return "play-page";
    }

    render() {
        let template = require("./play-page.pug");
        let playPageBox = Page.createBoxForPage(PlayPage.pageBoxName());
        playPageBox.innerHTML = template();
    }

    static gameMode(mode) {
        let gameLogo = document.querySelector(".main-box__logo-game");
        gameLogo.hidden = mode;
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-play").addEventListener("click", () => {
            PlayPage.gameMode(true);
        });
        document.querySelector(".play-page__button-back").addEventListener("click", () => {
            PlayPage.gameMode(false);
        });
    }
}

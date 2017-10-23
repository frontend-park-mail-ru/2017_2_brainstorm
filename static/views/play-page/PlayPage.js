"use strict";

import Page from "../../modules/Page.js";
import GameManager from  "./../../game-modules/GameManager.js";

export default class PlayPage extends Page {

    constructor() {
        super();
        this.gameManager = new GameManager(960, 960, ".play-page__play-field");
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

    gameMode(mode) {
        let gameLogo = document.querySelector(".main-box__logo-game");
        gameLogo.hidden = mode;
        if (mode) {
            this.gameManager.start();
        } else {
            this.gameManager.stop();
        }
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-play").addEventListener("click", () => {
            this.gameMode(true);
        });
        document.querySelector(".play-page__button-back").addEventListener("click", () => {
            this.gameMode(false);
        });
    }
}

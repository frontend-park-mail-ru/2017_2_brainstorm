"use strict";

import Page from "../../modules/Page.js";
import GameManager from  "./../../game-modules/GameManager.js";

export default class PlayPage extends Page {

    constructor() {
        super();
        this.gameManager = new GameManager(960, 700, ".play-page__play-field");
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
        mode ?
            this.gameManager.start() : this.gameManager.stop();
    }

    static printScore(score) {
        document.querySelector(".panel__score-box").innerHTML = score;
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-play").addEventListener("click", () => {
            this.gameMode(true);
        });
        document.querySelector(".panel__button-back").addEventListener("click", () => {
            this.gameMode(false);
        });
        document.querySelector(".panel__button-restart").addEventListener("click", () => {
            this.gameMode(false);
            this.gameMode(true);
        });
    }
}

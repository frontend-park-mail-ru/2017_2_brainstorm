"use strict";

import Page from "../../modules/Page.js";
import MultyGameManager from  "./../../game-modules/MultyGameManager.js";
import template from "./multyplay-page.pug";

export default class MultyPlayPage extends Page {

    constructor() {
        super();
        this.gameManager = new MultyGameManager(960, 680, ".multyplay-page__multyplay-field");
    }

    static pagePath() {
        return "/multyplay";
    }

    static pageBoxName() {
        return "multyplay-page";
    }

    render() {
        let playPageBox = Page.createBoxForPage(MultyPlayPage.pageBoxName());
        playPageBox.innerHTML = template();
    }

    gameMode(mode) {
        let gameLogo = document.querySelector(".main-box__logo-game");
        document.querySelector(".footer").hidden = mode;
        gameLogo.hidden = mode;
        mode ?
            this.gameManager.start() : this.gameManager.stop();
    }

    static printScore(score, scoreEnemy) {
        document.querySelector(".multypanel__score-box").innerHTML = score;
        document.querySelector(".multypanel__score-box-enemy").innerHTML = scoreEnemy;
    }

    addEventsOnButtons() {
        document.querySelector(".message-box__multyplay-button").addEventListener("click", () => {
            this.gameMode(true);
        });
        document.querySelector(".multypanel__button-back").addEventListener("click", () => {
            this.gameMode(false);
        });
        document.querySelector(".multypanel__button-restart").addEventListener("click", () => {
            this.gameMode(false);
            this.gameMode(true);
        });
    }
}

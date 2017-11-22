"use strict";

import Page from "../../modules/Page.js";
import GameManager from  "./../../game-modules/GameManager.js";
import template from "./multiplay-page.pug";

export default class MultiPlayPage extends Page {

    constructor() {
        super();
        this.gameManager = new GameManager(true, 960, 680, ".multiplay-page__multiplay-field");
    }

    static pagePath() {
        return "/multiplay";
    }

    static pageBoxName() {
        return "multiplay-page";
    }

    render() {
        let playPageBox = Page.createBoxForPage(MultiPlayPage.pageBoxName());
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
        document.querySelector(".multipanel__score-box").innerHTML = score;
        document.querySelector(".multipanel__score-box-enemy").innerHTML = scoreEnemy;
    }

    addEventsOnButtons() {
        document.querySelector(".message-box__multiplay-button").addEventListener("click", () => {
            this.gameMode(true);
        });
        document.querySelector(".multipanel__button-back").addEventListener("click", () => {
            this.gameMode(false);
        });
        document.querySelector(".multipanel__button-restart").addEventListener("click", () => {
            this.gameMode(false);
            this.gameMode(true);
        });
    }
}

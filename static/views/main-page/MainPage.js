"use strict";

import Page from "./../../modules/Page.js";
import MessageBox from "./../../modules/MessageBox.js";
import template from "./main-page.pug";
import templatePlaymenu from "./playmenu.pug";

export default class MainPage extends Page {

    constructor() {
        super();
        MainPage.playmenuRender();
        this.addEventsOnPlaymenuButtons();
        document.querySelector(".message-box__multiplay-hold").hidden = true;
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

    static playmenuRender() {
        let playmenuBox = document.querySelector(".message-box");
        playmenuBox.innerHTML = templatePlaymenu();
    }

    addEventsOnPlaymenuButtons() {
        document.querySelector(".message-box__singleplay-button").addEventListener("click", () => {
            MessageBox.hideMessageBox();
        });
        document.querySelector(".message-box__multiplay-button").addEventListener("click", () => {
            MessageBox.hideMessageBox();
        });
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-play").addEventListener("click", () => {
            MessageBox.showMessageBox();
        });
    }
}

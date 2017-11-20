"use strict";

import Page from "../../modules/Page.js";
import template from "./main-page.pug";
import templatePlaymenu from "./playmenu.pug"

export default class MainPage extends Page {

    constructor() {
        super();
        MainPage.playmenuRender();
        this.addEventsOnPlaymenuButtons()
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
            Page.hideMessageBox();
        });
        document.querySelector(".message-box__multyplay-button").addEventListener("click", () => {
            Page.hideMessageBox();
        });
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-play").addEventListener("click", () => {
            Page.showMessageBox();
        });
    }
}

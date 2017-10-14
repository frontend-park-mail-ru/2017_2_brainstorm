"use strict";

import Page from "../../script/Page.js";

export default class InfoPage extends Page {

    constructor() {
        super();
        InfoPage.render();
    }

    static pagePath() {
        return "/info";
    }

    static render(resp = null) {
        document.querySelector(".info-page").innerHTML = "";
        // подготовка шаблона для рендеринга
        let template = require("./info-page.pug");
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        document.querySelector(".info-page").innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

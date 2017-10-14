"use strict";

import Page from "../../script/Page.js";

export default class MainPage extends Page {

    constructor() {
        super();
        MainPage.render();
    }

    static pagePath() {
        return "/main";
    }

    static render(resp = null) {
        document.querySelector(".main-page").innerHTML = "";
        // подготовка шаблона для рендеринга
        let template = require("./main-page.pug");
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        document.querySelector(".main-page").innerHTML = template(locals);
    }

    addEventsOnButtons() {

    }
}

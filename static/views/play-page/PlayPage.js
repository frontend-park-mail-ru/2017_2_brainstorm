"use strict";

import Page from "../../script/Page.js";

export default class PlayPage extends Page {

    constructor() {
        super();
        PlayPage.render();
    }

    static pagePath() {
        return "/play";
    }

    static render(resp = null) {
        document.querySelector(".play-page").innerHTML = "";
        // подготовка шаблона для рендеринга
        let template = require("./play-page.pug");
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        document.querySelector(".play-page").innerHTML = template(locals);
    }

    addEventsOnButtons() {

    }
}

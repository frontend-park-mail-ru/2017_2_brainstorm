"use strict";

import Page from "../../modules/Page.js";
import RequestToHost from "../../modules/RequestToHost.js";

export default class RecordsPage extends Page {

    constructor() {
        super();
    }

    static pagePath() {
        return "/records";
    }

    static pageBoxName() {
        return "records-page";
    }

    static leaderBoardName() {
        return "records-page__table"
    }

    render() {
        let template = require("./records-page.pug");
        let recordsPageBox = Page.createBoxForPage(RecordsPage.pageBoxName());
        recordsPageBox.innerHTML = template();
    }

    static renderLeaderBoard(resp) {
        let leaderBoardBox = document.querySelector("." + RecordsPage.leaderBoardName());
        leaderBoardBox.innerHTML = "";
        // подготовка шаблона для рендеринга
        let template = require("./leaderboard.pug");
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        leaderBoardBox.innerHTML = template(locals);
    }

    sendRequestForRecords() {
        RequestToHost.records((err, resp) => {
            if (err) {
                return alert("Empty TOP");
            }
            RecordsPage.renderLeaderBoard(resp);
        });
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-records").addEventListener("click", () => {
            this.sendRequestForRecords();
        });
    }
}

"use strict";

import Page from "../../modules/Page.js";
import RequestToHost from "../../modules/RequestToHost.js";
import Debugger from "../../modules/Debugger";
import templatePage from "./records-page.pug";
import templateLeaderboard from "./leaderboard.pug";

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
        let recordsPageBox = Page.createBoxForPage(RecordsPage.pageBoxName());
        recordsPageBox.innerHTML = templatePage();
    }

    static renderLeaderBoard(resp) {
        let leaderBoardBox = document.querySelector("." + RecordsPage.leaderBoardName());
        leaderBoardBox.innerHTML = "";
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        leaderBoardBox.innerHTML = templateLeaderboard(locals);
    }

    sendRequestForRecords() {
        RequestToHost.records((err, resp) => {
            if (err) {
                return Debugger.print("Empty TOP");
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

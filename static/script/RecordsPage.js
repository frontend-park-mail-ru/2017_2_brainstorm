"use strict";

import Page from "./Page.js";
import RequestToHost from "./RequestToHost.js";

export default class RecordsPage extends Page {

	static renderLeaderBoard(resp) {
		// подготовка шаблона для рендеринга
		let template = require("./../views/records-page.pug");
		// устанавливаем локальные переменные для рендеринга
		let locals = resp;
		// рендерим шаблон
		document.querySelector(".records-page").innerHTML += template(locals);
	}

    sendRequest() {
        RequestToHost.records((err, resp) => {
            if (err) {
            	return alert("Empty TOP");
            }
            console.log(resp);
            RecordsPage.renderLeaderBoard(resp);
        });
    }

	addEventsOnButtons() {
        //RecordsPage.renderLeaderBoard([{"login": "Jack", "numberOfGames": 133, "record": 333}, {"login": "Ron", "numberOfGames": 12, "record": 233}]);
        this.sendRequest();
        this.getElementByClass("records-page__button-back").addEventListener("click", () => {
            document.querySelector(".records-page__table").innerHTML = "";
        });
		this.addRedirectOnButtons(
			{button: "records-page__button-back", nextPage: "main-page"}
		);
    }
}

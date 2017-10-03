"use strict";

import Page from "./Page.js";

export default class RecordsPage extends Page {

	static renderLeaderBoard() {
		// подготовка шаблона для рендеринга
		let template = require("./../views/records-page.pug");
		// устанавливаем локальные переменные для рендеринга
		let locals = [{"login": "Jack", "numberOfGames": 133, "record": 333}];
		// рендерим шаблон
		document.querySelector(".records-page").innerHTML += template(locals);
	}

	addEventsOnButtons() {
		RecordsPage.renderLeaderBoard();
		this.addRedirectOnButtons(
			{button: "records-page__button-back", nextPage: "main-page"}
		);
	}
}

"use strict";

import Page from "./Page.js";

export default class MainPage extends Page {

	addEventsOnButtons() {
		this.addRedirectOnButtons(
			{button: "main-menu__button-play", nextPage: "play-page"},
			{button: "main-menu__button-login", nextPage: "login-page"},
			{button: "main-menu__button-records", nextPage: "records-page"},
			{button: "main-menu__button-info", nextPage: "info-page"}
		);
	}
}

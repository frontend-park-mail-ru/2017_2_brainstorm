"use strict";

import Page from "./Page.js";

export default class InfoPage extends Page {

	addEventsOnButtons() {
		this.addRedirectOnButtons(
			{button: "info-page__button-back", nextPage: "main-page"}
		);
	}
}

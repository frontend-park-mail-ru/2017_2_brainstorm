"use strict";

import Page from "./Page.js";

export default class InfoPage extends Page {

    addEventsOnButtons() {
        this.addRedirectOnButtons(
            {button: "play-page__button-back", nextPage: "main-page"}
        );
    }
}

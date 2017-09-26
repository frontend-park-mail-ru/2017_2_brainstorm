"use strict";

import Page from "./Page.js";
import Debugger from "./Debugger.js";

export default class InfoPage extends Page {

    addEventsOnButtons() {
        this.addRedirectOnButtons(
            {button: "info-page__button-back", nextPage: "main-page"}
        );
    }
}

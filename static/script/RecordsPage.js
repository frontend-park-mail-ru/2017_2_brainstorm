"use strict";

import Page from "./Page.js";
import Debugger from "./Debugger.js";

export default class RecordsPage extends Page {

    addEventsOnButtons() {
        this.addRedirectOnButtons(
            {button: "records-page__button-back", nextPage: "main-page"}
        );
    }
}

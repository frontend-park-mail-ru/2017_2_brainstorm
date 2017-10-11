"use strict";

import Page from "./Page.js";
import LoginForm from "./LoginForm.js";

export default class LoginPage extends Page {

    static pagePath() {
        return "/login";
    }

    constructor() {
        super();
        this.form = new LoginForm(this);
    }

    getForm() {
        return this.form;
    }

    addEventsOnButtons() {

    }
}

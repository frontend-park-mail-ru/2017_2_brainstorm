"use strict";

import Page from "./Page.js";
import LoginForm from "./LoginForm.js";

export default class LoginPage extends Page {

    constructor() {
        super();
        this.form = new LoginForm();
    }

    addEventsOnButtons() {
        this.addRedirectOnButtons(
            {button: "login-page__button-back", nextPage: "main-page"},
            {button: "login-page__link-to-register", nextPage: "register-page"}
        );
    }
}

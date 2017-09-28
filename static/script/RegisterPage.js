"use strict";

import Page from "./Page.js";
import Debugger from "./Debugger.js";
import RegisterForm from "./RegisterForm.js";

export default class RegisterPage extends Page {

    constructor() {
        super();
        this.form = new RegisterForm();
    }

    addEventsOnButtons() {
        this.addRedirectOnButtons(
            {button: "register-page__button-back", nextPage: "login-page"},
            {button: "register-page__link-to-login", nextPage: "login-page"}
        );
    }
}

"use strict";

import Page from "./Page.js";
import Debugger from "./Debugger.js";
import LoginForm from "./LoginForm.js";
import elementPresenter from "./elementPresenter.js";
import fieldsCleaner from "./fieldsCleaner.js";

export default class LoginPage extends Page {

    constructor() {
        super();
        LoginPage.workWithLoginForm();
    }

    addEventsOnButtons() {
        this.addRedirectOnButtons(
            {button: "login-page__button-back", nextPage: "main-page"},
            {button: "login-page__link-to-register", nextPage: "register-page"}
        );
    }

    static workWithLoginForm() {
        Object.assign(LoginForm.prototype, elementPresenter, fieldsCleaner);
        let loginForm = new LoginForm();
    }
}

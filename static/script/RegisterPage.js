"use strict";

import Page from "./Page.js";
import Debugger from "./Debugger.js";
import RegisterForm from "./RegisterForm.js";
import elementPresenter from "./elementPresenter.js";
import fieldsCleaner from "./fieldsCleaner.js";

export default class RegisterPage extends Page {

    constructor() {
        super();
        RegisterPage.workWithRegisterForm();
    }

    addEventsOnButtons() {
        this.addRedirectOnButtons(
            {button: "register-page__button-back", nextPage: "login-page"},
            {button: "register-page__link-to-login", nextPage: "login-page"}
        );
    }

    static workWithRegisterForm() {
        Object.assign(RegisterForm.prototype, elementPresenter, fieldsCleaner);
        let registerForm = new RegisterForm();
    }
}

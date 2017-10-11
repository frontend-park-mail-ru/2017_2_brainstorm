"use strict";

import Page from "./Page.js";
import RegisterForm from "./RegisterForm.js";

export default class RegisterPage extends Page {

    static pagePath() {
        return "/register";
    }

    constructor() {
        super();
        this.form = new RegisterForm();
    }

    getForm() {
        return this.form;
    }

    addEventsOnButtons() {

    }
}

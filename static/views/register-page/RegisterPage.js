"use strict";

import Page from "../../modules/Page.js";
import RegisterForm from "../../modules/RegisterForm.js";

export default class RegisterPage extends Page {

    constructor() {
        super();
        this.form = new RegisterForm();
    }

    static pagePath() {
        return "/register";
    }

    static pageBoxName() {
        return "register-page";
    }

    getForm() {
        return this.form;
    }

    render() {
        let template = require("./register-page.pug");
        let registerPageBox = Page.createBoxForPage(RegisterPage.pageBoxName());
        registerPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

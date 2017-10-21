"use strict";

import Page from "../../modules/Page.js";
import RegisterForm from "../../modules/RegisterForm.js";

export default class RegisterPage extends Page {

    constructor() {
        super();
        RegisterPage.render();
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

    static render() {
        let template = require("./register-page.pug");
        let registerPageBox = Page.createBoxForPage(this.pageBoxName());
        registerPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

"use strict";

import Page from "../../modules/Page.js";
import LoginForm from "../../modules/LoginForm.js";

export default class LoginPage extends Page {

    constructor() {
        super();
        LoginPage.render();
        this.form = new LoginForm()
    }

    static pagePath() {
        return "/login";
    }

    static pageBoxName() {
        return "login-page";
    }

    getForm() {
        return this.form;
    }

    static render() {
        let template = require("./login-page.pug");
        let loginPageBox = Page.createBoxForPage(this.pageBoxName());
        loginPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

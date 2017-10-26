"use strict";

import Page from "../../modules/Page.js";
import LoginForm from "../../modules/LoginForm.js";
import template from "./login-page.pug";

export default class LoginPage extends Page {

    constructor() {
        super();
    }

    static pagePath() {
        return "/login";
    }

    static pageBoxName() {
        return "login-page";
    }

    takeRouter(router) {
        this.form = new LoginForm(router);
    }

    getForm() {
        return this.form;
    }

    render() {
        let loginPageBox = Page.createBoxForPage(LoginPage.pageBoxName());
        loginPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

"use strict";

import Page from "../../modules/Page.js";
import LoginForm from "../../modules/LoginForm.js";

export default class LoginPage extends Page {

    constructor() {
        super();
        // LoginPage.render();
    }

    static pagePath() {
        return "/login";
    }

    static pageBoxName() {
        return "login-page";
    }

    takeRouter(router) {
        // this.router = router;
        // this.router.printTEST();
        this.form = new LoginForm(router);
    }

    getForm() {
        return this.form;
    }

    render() {
        let template = require("./login-page.pug");
        let loginPageBox = Page.createBoxForPage(LoginPage.pageBoxName());
        loginPageBox.innerHTML = template();
    }

    addEventsOnButtons() {

    }
}

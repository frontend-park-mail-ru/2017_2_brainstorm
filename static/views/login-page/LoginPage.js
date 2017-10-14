"use strict";

import Page from "../../script/Page.js";
import LoginForm from "../../script/LoginForm.js";

export default class LoginPage extends Page {

    static pagePath() {
        return "/login";
    }

    constructor() {
        super();
        LoginPage.render();
        this.form = new LoginForm()
    }

    getForm() {
        return this.form;
    }

    static render() {
        const resp = null;
        document.querySelector(".login-page").innerHTML = "";
        // подготовка шаблона для рендеринга
        let template = require("./login-page.pug");
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        document.querySelector(".login-page").innerHTML = template(locals);
    }

    addEventsOnButtons() {

    }
}

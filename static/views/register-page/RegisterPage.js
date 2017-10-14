"use strict";

import Page from "../../script/Page.js";
import RegisterForm from "../../script/RegisterForm.js";

export default class RegisterPage extends Page {

    static pagePath() {
        return "/register";
    }

    constructor() {
        super();
        RegisterPage.render();
        this.form = new RegisterForm();
    }

    getForm() {
        return this.form;
    }

    static render() {
        const resp = null;
        document.querySelector(".register-page").innerHTML = "";
        // подготовка шаблона для рендеринга
        let template = require("./register-page.pug");
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        document.querySelector(".register-page").innerHTML = template(locals);
    }


    addEventsOnButtons() {

    }
}

"use strict";

import elementPresenter from "./elementPresenter.js";
import Debugger from "./Debugger.js";
import fieldsCleaner from "./fieldsCleaner.js";

import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";

export default class Page {

    static hideAllPages() {
        let pages = document.getElementsByClassName("page");
        for (let i = 0; i < pages.length; i++) {
            pages[i].hidden = true;
        }
    }

    showOnlyOnePage(pageName) {
        this.constructor.hideAllPages();
        this.getElementByClass(pageName.toString()).hidden = false;
    }

    addJumpToButton(...buttons) {
        let t = this;

        buttons.forEach(function (button, i, buttons) {
            t.getElementByClass(button.button).addEventListener("click", function () {
                t.showOnlyOnePage(button.nextPage);
            });
        });
    }

    static workWithLoginForm() {
        Object.assign(LoginForm.prototype, elementPresenter, fieldsCleaner);
        let loginForm = new LoginForm();
    }

    static workWithRegisterForm() {
        Object.assign(RegisterForm.prototype, elementPresenter, fieldsCleaner);
        let registerForm = new RegisterForm();
    }
}

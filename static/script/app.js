/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


// mixin
let elementPresenter = {
    getElementByClass(className) {
        return document.getElementsByClassName(className.toString())[0];
    }
};

/* harmony default export */ __webpack_exports__["a"] = (elementPresenter);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class CorrectLoginPassword {

    constructor() {
        this.OK = "ok";
        this.EMPTY = "empty";
        this.INCORRECT = "incorrect";
        this.NOT_EMAIL = "is not email";

        this.validData = 'abcdefghijklmnopqrstuvwxyz';
        this.validData += this.validData.toUpperCase() + '1234567890';
    }

    correctLog(login) {
        if (login==="") {
            return this.EMPTY;
        }

        for (let i = 0; i < login.length; i++) {
            if (this.validData.indexOf(login[i]) === -1) {
                return this.INCORRECT;
            }
        }

        return this.OK;
    }

    correctPas(password) {
        if (password === "") {
            return this.EMPTY;
        }

        for (let i = 0; i < password.length; i++) {
            if (this.validData.indexOf(password[i]) === -1) {
                return this.INCORRECT;
            }
        }

        return this.OK;
    }

    correctEmail(email) {
        if (email === "") {
            return this.EMPTY;
        }

        if (email.indexOf("@") === -1)  {
            return this.NOT_EMAIL;
        }

        for (let i = 0; i < email.length; i++) {
            if (((this.validData + ".").indexOf(email[i]) === -1) && (email[i] !== "@")) {
                return this.INCORRECT;
            }
        }

        return this.OK;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CorrectLoginPassword;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class RequestToHost {
    auth(login, password, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://bubblerise-backend.herokuapp.com/api/users/signin', true);
        xhr.withCredentials = true; //for cookies

        const user = {login, password};
        const body = JSON.stringify(user);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (+xhr.status !== 200) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };

        xhr.send(body);
    }

    reg(login, password, email, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://bubblerise-backend.herokuapp.com/api/users/signup', true);
        xhr.withCredentials = true; //for cookies

        const user = {login, password, email};
        const body = JSON.stringify(user);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (+xhr.status !== 200) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };

        xhr.send(body);
    }

    whoami(callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://bubblerise-backend.herokuapp.com/api/users/me', true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status !== 200) {
                    return callback(xhr, null);
                }

                const response = JSON.parse(xhr.responseText);
                callback(null, response);
            };

            xhr.send();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RequestToHost;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Debugger {
    constructor() {
        const debugMode = false;
    }

    static print(logString) {
        console.log(logString);
    }
}
/* unused harmony export default */



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RequestToHost_js__ = __webpack_require__(2);




let whoamiMixin = {
    whoami() {
        const t = this;

        const reqUser = new __WEBPACK_IMPORTED_MODULE_0__RequestToHost_js__["a" /* default */]();

        reqUser.whoami(function (err, resp) {
            const logBox = t.getElementByClass("main-page__user");
            if (err) {
                return logBox.innerHTML = "Привет, Гость!";
            }

            logBox.innerHTML = "Привет, " + resp.login + "!";
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (whoamiMixin);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PagePresenter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Validator_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__whoamiMixin_js__ = __webpack_require__(4);







class MainClass {
    constructor () {
        Object.assign(__WEBPACK_IMPORTED_MODULE_1__PagePresenter_js__["a" /* default */].prototype, __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */]);
        let pagePresenter = new __WEBPACK_IMPORTED_MODULE_1__PagePresenter_js__["a" /* default */]();
    }
}

window.addEventListener("load", function () {
    const objMain = new MainClass();
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Validator_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Debugger_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Page_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__whoamiMixin_js__ = __webpack_require__(4);









class PagePresenter {
    constructor() {

        let mainPage = new __WEBPACK_IMPORTED_MODULE_4__Page_js__["a" /* default */]();
        Object.assign(mainPage, __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__whoamiMixin_js__["a" /* default */]);
        mainPage.showOnlyOnePage("main-page");
        mainPage.addJumpToButton(
            {button: "main-menu__button-play", nextPage: "play-page"},
            {button: "main-menu__button-login", nextPage: "login-page"},
            {button: "main-menu__button-records", nextPage: "records-page"},
            {button: "main-menu__button-info", nextPage: "info-page"}
        );
        mainPage.whoami();

        let recordsPage = new __WEBPACK_IMPORTED_MODULE_4__Page_js__["a" /* default */]();
        Object.assign(recordsPage, __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */]);
        recordsPage.addJumpToButton(
            {button: "records-page__button-back", nextPage: "main-page"}
        );

        let infoPage = new __WEBPACK_IMPORTED_MODULE_4__Page_js__["a" /* default */]();
        Object.assign(infoPage, __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */]);
        infoPage.addJumpToButton(
            {button: "info-page__button-back", nextPage: "main-page"}
        );

        let playPage = new __WEBPACK_IMPORTED_MODULE_4__Page_js__["a" /* default */]();
        Object.assign(playPage, __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */]);
        playPage.addJumpToButton(
            {button: "play-page__button-back", nextPage: "main-page"}
        );

        let loginPage = new __WEBPACK_IMPORTED_MODULE_4__Page_js__["a" /* default */]();
        Object.assign(loginPage, __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */]);
        loginPage.addJumpToButton(
            {button: "login-page__button-back", nextPage: "main-page"},
            {button: "login-page__link-to-register", nextPage: "register-page"}
        );
        loginPage.constructor.workWithLoginForm();

        let registerPage = new __WEBPACK_IMPORTED_MODULE_4__Page_js__["a" /* default */]();
        Object.assign(registerPage, __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */]);
        registerPage.addJumpToButton(
            {button: "register-page__button-back", nextPage: "login-page"},
            {button: "register-page__link-to-login", nextPage: "login-page"}
        );
        registerPage.constructor.workWithRegisterForm();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PagePresenter;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Validator_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Debugger_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fieldsCleaner_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LoginForm_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RegisterForm_js__ = __webpack_require__(10);











class Page {

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

        buttons.forEach(function(button, i, buttons){
            t.getElementByClass(button.button).addEventListener("click", function(){
                t.showOnlyOnePage(button.nextPage);
            });
        });
    }

    static workWithLoginForm() {
        Object.assign(__WEBPACK_IMPORTED_MODULE_5__LoginForm_js__["a" /* default */].prototype,__WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */],__WEBPACK_IMPORTED_MODULE_4__fieldsCleaner_js__["a" /* default */]);
        let loginForm = new __WEBPACK_IMPORTED_MODULE_5__LoginForm_js__["a" /* default */]();
    }

    static workWithRegisterForm() {
        Object.assign(__WEBPACK_IMPORTED_MODULE_6__RegisterForm_js__["a" /* default */].prototype,__WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__["a" /* default */],__WEBPACK_IMPORTED_MODULE_4__fieldsCleaner_js__["a" /* default */]);
        let registerForm = new __WEBPACK_IMPORTED_MODULE_6__RegisterForm_js__["a" /* default */]();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Page;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


let fieldsCleaner = {
    clearFields(...fields) {
        const t = this;
        for (let i = 0; i < fields.length; i++) {
            let elem = t.getElementByClass(fields[i].toString());
            if (elem.nodeName === "INPUT") {
                elem.value = "";
            } else if (elem.nodeName === "DIV") {
                elem.innerHTML = "";
            }
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (fieldsCleaner);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Validator_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Debugger_js__ = __webpack_require__(3);







class LoginForm extends __WEBPACK_IMPORTED_MODULE_1__Validator_js__["a" /* default */] {
    constructor() {
        super();
        this.logValue = "";
        this.pasValue = "";
        this.errBox = null;
        this.addEventsToButtons();
    }

    validate(logValue, pasValue, errorBox)
    {
        let log = this.correctLog(logValue);
        let pas = this.correctPas(pasValue);

        if (log === this.EMPTY || pas === this.EMPTY) {
            errorBox.innerHTML = "Заполнены не все поля";
            return false;
        }

        if (log === this.INCORRECT || pas === this.INCORRECT) {
            errorBox.innerHTML = "Использованы недопустимые символы";
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    sendRequest() {
        const t = this;
        const reqUser = new __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__["a" /* default */]();
        reqUser.auth(t.logValue, t.pasValue, function (err, resp) {
            if (err) {
                return t.errBox.innerHTML = "Некорректный ввод или логин не существует";
            }

            alert("Вы вошли на сайт!");

            t.clearFields("login-form__input-login", "login-form__input-password", "login-form__error-box");

            window.location.reload();
        })
    }

    addEventsToButtons() {
        const t = this;

        t.getElementByClass("login-form__button").addEventListener("click", function () {
            t.logValue = t.getElementByClass("login-form__input-login").value;
            t.pasValue = t.getElementByClass("login-form__input-password").value;
            t.errBox = t.getElementByClass("login-form__error-box");
            const valid = t.validate(t.logValue, t.pasValue, t.errBox);

            if (valid) {
                t.sendRequest();
            }
        });

        t.getElementByClass("login-page__button-back").addEventListener("click", function () {
            t.clearFields("login-form__input-login", "login-form__input-password", "login-form__error-box");
        });

        t.getElementByClass("login-page__link-to-register").addEventListener("click", function () {
            t.clearFields("login-form__input-login", "login-form__input-password","login-form__error-box");
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoginForm;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elementPresenter_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Validator_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Debugger_js__ = __webpack_require__(3);







class RegisterForm extends __WEBPACK_IMPORTED_MODULE_1__Validator_js__["a" /* default */] {
    constructor() {
        super();
        this.emailValue = "";
        this.logValue = "";
        this.pasValue = "";
        this.errBox = null;
        this.addEventsToButtons();
    }

    validate(logValue, pasValue, emailValue, errorBox)
    {
        let log = this.correctLog(logValue);
        let pas = this.correctPas(pasValue);
        let email = this.correctEmail(emailValue);

        if (log === this.EMPTY || pas === this.EMPTY) {
            errorBox.innerHTML = "Заполнены не все поля";
            return false;
        }

        if (log === this.INCORRECT || pas === this.INCORRECT) {
            errorBox.innerHTML = "Использованы недопустимые символы";
            return false;
        }

        if (email === this.NOT_EMAIL) {
            errorBox.innerHTML = "Некорректный email";
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }

    sendRequest() {
        const t = this;
        const reqUser = new __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__["a" /* default */]();
        reqUser.reg(t.logValue, t.pasValue, t.emailValue, function (err, resp) {
            if (err) {
                return t.errBox.innerHTML = "Некорректный ввод или логин уже существует";
            }

            alert("Вы успешно зарегистрировались!");

            t.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password", "register-form__error-box");

            t.getElementByClass("register-page__button-back").click();
        })
    }

    addEventsToButtons() {

        const t = this;

        this.getElementByClass("register-form__button").addEventListener("click", function(){
            t.emailValue = t.getElementByClass("register-form__input-email").value;
            t.logValue = t.getElementByClass("register-form__input-login").value;
            t.pasValue = t.getElementByClass("register-form__input-password").value;
            t.errBox = t.getElementByClass("register-form__error-box");

            const valid = t.validate(t.logValue, t.pasValue, t.emailValue, t.errBox);

            if (valid) {
                t.sendRequest();
            }
        });

        t.getElementByClass("register-page__button-back").addEventListener("click", function () {
            t.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password", "register-form__error-box");
        });

        t.getElementByClass("register-page__link-to-login").addEventListener("click", function () {
            t.clearFields("register-form__input-email", "register-form__input-login", "register-form__input-password","register-form__error-box");
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegisterForm;



/***/ })
/******/ ]);
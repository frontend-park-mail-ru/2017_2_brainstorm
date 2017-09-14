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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class GetElem {
    getEl(className) {
        return document.getElementsByClassName(className.toString())[0];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GetElem;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class CorrectLoginPassword {

    constructor() {
        this.validData = 'abcdefghijklmnopqrstuvwxyz';
        this.validData += this.validData.toUpperCase() + '1234567890';
        // alert(this.validData);
    }

    correctLog(login) {
        if (login==="") {
            return "empty";
        }

        for (let i = 0; i < login.length; i++) {
            if (this.validData.indexOf(login[i]) === -1) {
                return "incorrect";
            }
        }

        return "ok";
    }

    correctPas(password) {
        if (password === "") {
            return "empty";
        }

        for (let i = 0; i < password.length; i++) {
            if (this.validData.indexOf(password[i]) === -1) {
                return "incorrect";
            }
        }

        return "ok";
    }

    correctForm(logValue, pasValue, errorBox)
    {
        let log = this.correctLog(logValue);
        let pas = this.correctPas(pasValue);

        if (log === "empty" || pas === "empty") {
            errorBox.innerHTML = "Заполнены не все поля";
            return false;
        }

        if (log === "incorrect" || pas === "incorrect") {
            errorBox.innerHTML = "Использованы недопустимые символы";
            return false;
        }

        errorBox.innerHTML = "";
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CorrectLoginPassword;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GetElem_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AddEvent_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CorrectLoginPassword_js__ = __webpack_require__(1);






class MainClass {
    constructor () {
        const objAddEvent = new __WEBPACK_IMPORTED_MODULE_1__AddEvent_js__["a" /* default */]();
    }
}

window.addEventListener("load", function () {
    const objMain = new MainClass();
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GetElem_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CorrectLoginPassword_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__ = __webpack_require__(4);






class AddEvent {
    constructor() {
        this.addEventToMainPageButtons();
        this.addEventToLoginPageButtons();
        this.addEventToRegisterPageButtons();
        this.addEventToRecordsPageButtons();
        this.addEventToPlayPageButtons();
        this.addEventToInfoPageButtons();
        this.showOnlyOnePage("main-page");
    }

    hideAllPages() {
        document.getElementsByClassName('main-page')[0].hidden = true;
        document.getElementsByClassName('register-page')[0].hidden = true;
        document.getElementsByClassName('records-page')[0].hidden = true;
        document.getElementsByClassName('login-page')[0].hidden = true;
        document.getElementsByClassName('play-page')[0].hidden = true;
        document.getElementsByClassName('info-page')[0].hidden = true;
    }

    showOnlyOnePage(pageName) {
        this.hideAllPages();
        document.getElementsByClassName(pageName.toString())[0].hidden = false;
    }

    addEventToMainPageButtons() {
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();
        const t = this;

        const objReqUser = new __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__["a" /* default */]();
        objReqUser.whoami(function (err, resp) {
            const logBox = objGetElem.getEl("main-page__user");
            if (err) {
                return logBox.innerHTML = "Привет, Гость!";
            }

            logBox.innerHTML = "Привет, " + resp.login + "!";
        });

        objGetElem.getEl("main-menu__button-play").addEventListener("click", function(){
            t.showOnlyOnePage("play-page");
        });

        objGetElem.getEl("main-menu__button-login").addEventListener("click", function(){
            t.showOnlyOnePage("login-page");
        });

        objGetElem.getEl("main-menu__button-records").addEventListener("click", function(){
            t.showOnlyOnePage("records-page");
        });

        objGetElem.getEl("main-menu__button-info").addEventListener("click", function(){
            t.showOnlyOnePage("info-page");
            t.showOnlyOnePage("info-page");
        });
    }

    addEventToLoginPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("login-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new __WEBPACK_IMPORTED_MODULE_1__CorrectLoginPassword_js__["a" /* default */]();
            let logValue = objGetElem.getEl("login-form__input-login").value;
            let pasValue = objGetElem.getEl("login-form__input-password").value;
            let errBox = objGetElem.getEl("login-form__error-box");

            const valid = objCorrectLogPas.correctForm(logValue, pasValue, errBox);

            if (valid) {
                const objReqUser = new __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__["a" /* default */]();
                objReqUser.auth(logValue,pasValue,function (err, resp) {
                    if (err) {
                        return errBox.innerHTML = "Некорректный ввод или логин не существует";
                    }

                    alert("Вы вошли на сайт!");

                    objGetElem.getEl("login-form__input-login").value = "";
                    objGetElem.getEl("login-form__input-password").value = "";
                    objGetElem.getEl("login-form__error-box").innerHTML = "";

                    window.location.reload();
                    // objGetElem.getEl("login-page__button-back").click();
                })
            }
        });

        objGetElem.getEl("login-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });

        objGetElem.getEl("login-page__link-to-register").addEventListener("click", function () {
            t.showOnlyOnePage("register-page");

            objGetElem.getEl("login-form__input-login").value = "";
            objGetElem.getEl("login-form__input-password").value = "";
            objGetElem.getEl("login-form__error-box").innerHTML = "";
        });
    }

    addEventToRegisterPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("register-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new __WEBPACK_IMPORTED_MODULE_1__CorrectLoginPassword_js__["a" /* default */]();
            let logValue = objGetElem.getEl("register-form__input-login").value;
            let pasValue = objGetElem.getEl("register-form__input-password").value;
            let errBox = objGetElem.getEl("register-form__error-box");

            const valid = objCorrectLogPas.correctForm(logValue, pasValue, errBox);

            if (valid) {
                const objReqUser = new __WEBPACK_IMPORTED_MODULE_2__RequestToHost_js__["a" /* default */]();
                objReqUser.reg(logValue,pasValue,function (err, resp) {
                    if (err) {
                        return errBox.innerHTML = "Некорректный ввод или логин уже существует";
                    }

                    alert("Вы успешно зарегистрировались!");

                    objGetElem.getEl("register-form__input-login").value = "";
                    objGetElem.getEl("register-form__input-password").value = "";
                    objGetElem.getEl("register-form__error-box").innerHTML = "";

                    objGetElem.getEl("register-page__button-back").click();
                })
            }
        });

        objGetElem.getEl("register-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");
        });

        objGetElem.getEl("register-page__link-to-login").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");

            objGetElem.getEl("register-form__input-login").value = "";
            objGetElem.getEl("register-form__input-password").value = "";
            objGetElem.getEl("register-form__error-box").innerHTML = "";
        });
    }

    addEventToRecordsPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("records-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }

    addEventToPlayPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("play-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }

    addEventToInfoPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("info-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddEvent;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class RequestToHost {
    auth(login, password, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth', true);
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

    reg(login, password, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/reg', true);
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

    whoami(callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/me', true);
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


/***/ })
/******/ ]);
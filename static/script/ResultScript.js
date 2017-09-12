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
        }

        else if(log === "incorrect" || pas === "incorrect") {
            errorBox.innerHTML = "Использованы недопустимые символы";
        }
        else {
            errorBox.innerHTML = "";
        }
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CorrectLoginPassword__ = __webpack_require__(1);





class AddEvent {
    constructor() {
        this.addEventToMainPageButtons();
        this.addEventToLoginPageButtons();
        this.addEventToRegisterPageButtons();
        this.addEventToRecordsPageButtons();
        this.showOnlyOnePage("main-page");
    }

    hideAllPages() {
        document.getElementsByClassName('main-page')[0].hidden = true;
        document.getElementsByClassName('register-page')[0].hidden = true;
        document.getElementsByClassName('records-page')[0].hidden = true;
        document.getElementsByClassName('login-page')[0].hidden = true;
    }

    showOnlyOnePage(pageName) {
        this.hideAllPages();
        document.getElementsByClassName(pageName.toString())[0].hidden = false;
    }

    addEventToMainPageButtons() {
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();
        const t = this;

        objGetElem.getEl("main-menu__button-play").addEventListener("click", function(){
            alert("start game");
        });

        objGetElem.getEl("main-menu__button-login").addEventListener("click", function(){
            t.showOnlyOnePage("login-page");
        });

        objGetElem.getEl("main-menu__button-records").addEventListener("click", function(){
            t.showOnlyOnePage("records-page");
        });

        objGetElem.getEl("main-menu__button-info").addEventListener("click", function(){
            alert("information about game");
        });
    }

    addEventToLoginPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("login-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new __WEBPACK_IMPORTED_MODULE_1__CorrectLoginPassword__["a" /* default */]();
            let logValue = objGetElem.getEl("login-form__input-login").value;
            let pasValue = objGetElem.getEl("login-form__input-password").value;
            let errBox = objGetElem.getEl("login-form__error-box");

            objCorrectLogPas.correctForm(logValue, pasValue, errBox);
        });

        objGetElem.getEl("login-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });

        objGetElem.getEl("login-page__link-to-register").addEventListener("click", function () {
            t.showOnlyOnePage("register-page");
        });
    }

    addEventToRegisterPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("register-form__button").addEventListener("click", function(){
            const objCorrectLogPas = new __WEBPACK_IMPORTED_MODULE_1__CorrectLoginPassword__["a" /* default */]();
            let logValue = objGetElem.getEl("register-form__input-login").value;
            let pasValue = objGetElem.getEl("register-form__input-password").value;
            let errBox = objGetElem.getEl("register-form__error-box");

            objCorrectLogPas.correctForm(logValue, pasValue, errBox);
        });

        objGetElem.getEl("register-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");
        });

        objGetElem.getEl("register-page__link-to-login").addEventListener("click", function () {
            t.showOnlyOnePage("login-page");
        });
    }

    addEventToRecordsPageButtons() {
        const t = this;
        const objGetElem = new __WEBPACK_IMPORTED_MODULE_0__GetElem_js__["a" /* default */]();

        objGetElem.getEl("records-page__button-back").addEventListener("click", function () {
            t.showOnlyOnePage("main-page");
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddEvent;


/***/ })
/******/ ]);
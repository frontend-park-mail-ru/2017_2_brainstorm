"use strict";

const clickedElements = [
    ".register-form__button",
    ".login-form__button",
    ".main-box__theme-changer",
    ".multypanel__button-restart",
    ".panel__button-restart",
    ".main-menu__button-play"
];

export default class TouchDelegater {

    constructor() {
        this.delegateAllTouches();
    }

    static delegateTouch(element) {
        document.querySelector(element).addEventListener("touchend", (e) => {
            e.preventDefault();
            e.target.click();
        }, false);
    }

    delegateAllTouches() {
        clickedElements.forEach(element => TouchDelegater.delegateTouch(element));
    }
}

"use strict";

// mixin
let elementPresenter = {
    getElementByClass(className) {
        return document.getElementsByClassName(className.toString())[0];
    }
};

export default elementPresenter;

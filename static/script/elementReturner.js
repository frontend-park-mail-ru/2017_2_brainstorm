"use strict";

// mixin
let elementReturner = {
    getElementByClass(className) {
        return document.getElementsByClassName(className.toString())[0];
    }
};

export default elementReturner;

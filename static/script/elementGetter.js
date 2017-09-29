"use strict";

// mixin
let elementGetter = {
    getElementByClass(className) {
        return document.getElementsByClassName(className.toString())[0];
    }
};

export default elementGetter;

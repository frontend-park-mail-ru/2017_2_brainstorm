"use strict";

export default class GetElem {
    getEl(className) {
        return document.getElementsByClassName(className.toString())[0];
    }
}
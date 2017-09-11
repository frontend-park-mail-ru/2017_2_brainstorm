"use strict";

import GetElem from "./GetElem.js";
import AddEvent from "./AddEvent.js";

class MainClass {
    constructor () {
        const objAddEvent = new AddEvent();
    }
}

window.addEventListener("load", function () {
    const objMain = new MainClass();
});

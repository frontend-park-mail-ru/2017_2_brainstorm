"use strict";

let fieldsCleaner = {
    clearFields(...fields) {
        for (let i = 0; i < fields.length; i++) {
            let elem = this.getElementByClass(fields[i].toString());
            if (elem.nodeName === "INPUT") {
                elem.value = "";
            } else if (elem.nodeName === "DIV") {
                elem.innerHTML = "";
            }
        }
    }
};

export default fieldsCleaner;

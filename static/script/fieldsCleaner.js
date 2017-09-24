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

export default fieldsCleaner;

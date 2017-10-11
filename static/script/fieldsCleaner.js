"use strict";

let fieldsCleaner = {
    clearFields(...fields) {
        fields.forEach(field => {
            const fieldName = "." + field;
            let elem = document.querySelector(fieldName);
            if (elem.nodeName === "INPUT") {
                elem.value = "";
            } else if (elem.nodeName === "DIV") {
                elem.innerHTML = "";
            }
        });
    }
};

export default fieldsCleaner;

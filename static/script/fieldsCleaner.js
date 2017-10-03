"use strict";

let fieldsCleaner = {
	clearFields(...fields) {
		fields.forEach(field => {
			let elem = this.getElementByClass(field.toString());
			if (elem.nodeName === "INPUT") {
				elem.value = "";
			} else if (elem.nodeName === "DIV") {
				elem.innerHTML = "";
			}
		});
	}
};

export default fieldsCleaner;

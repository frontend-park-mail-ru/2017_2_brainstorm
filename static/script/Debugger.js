"use strict";

const DEBUG_MODE = false;

export default class Debugger {

	static print(logString) {
		if (DEBUG_MODE) {
			console.log(logString);
		}
	}
}

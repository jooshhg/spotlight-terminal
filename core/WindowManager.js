/**
 * Window manager class file
 */

/**
 * Window manager class
 */
class WindowManager {

	constructor() {

		this.windows = {};

	}

	create(id, win) {

		this.windows[id] = new win(this);

	}

	get(id) {

		return this.windows[id];

	}

}

module.exports = WindowManager;
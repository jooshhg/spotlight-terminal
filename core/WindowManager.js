/**
 * Window manager class file
 */

/**
 * Window manager class
 */
class WindowManager {

	constructor() {

		// windows
		this.windows = {};

	}

	/**
	 * Create window
	 * @param  {String} id  Window id
	 * @param  {BrowserWindow} win Window to create from
	 */
	create(id, win) {

		// create new window
		this.windows[id] = new win(this);

	}

	/**
	 * Get window
	 * @param  {String} id Window id
	 * @return {BrowserWindow}    The requested window
	 */
	get(id) {

		// return window
		return this.windows[id];

	}

}

module.exports = WindowManager;
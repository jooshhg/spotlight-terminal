/**
 * Output window class file
 */

/**
 * Electron modules
 */
const { BrowserWindow, ipcMain } = require('electron');
/**
 * Path module
 */
const path = require('path');

/**
 * Output window class
 * @extends {BrowserWindow}
 */
class OutputWindow extends BrowserWindow {

	constructor(windowsManager) {

		/**
		 * Window options
		 * @type {Object}
		 */
		let windowOptions = {
			width: 1280/2,
			height: 380,
			frame: false,
			resizable: true,
			movable: true,
			transperent: true,
			titleBarStyle: 'customButtonsOnHover',
			vibrancy: 'dark',
			show: false
		};

		// init super
		super(windowOptions);

		/**
		 * Web page url
		 */
		this.webpage = 'file://' + path.resolve(__dirname, '../interface/output.html');

		// Load url
		this.loadURL(this.webpage);

		/**
		 * Windows manager
		 * @type {Object}
		 */
		this.windowsManager = windowsManager;

		// move under the terminal window
		this.moveUnderTerm(this);

		// on close
		this.on('close', this.onClose);

	}

	/**
	 * On window close
	 */
	onClose(e) {

		// prevent close
		e.preventDefault();

		// send signal to renderer to clear output
		this.webContents.send('clear');

		// hide window
		this.hide();

	}

	/**
	 * Move this window underneath the terminal window
	 */
	moveUnderTerm(win) {

		// find terminal window
		let terminalWindow = win.windowsManager.get('terminalWindow');
		
		// extract terminal window position
		let termPos = terminalWindow.getPosition();
		// extract terminal height
		let termHeight = terminalWindow.getSize()[1];

		// update output window position according to terminal
		win.setPosition(termPos[0], termPos[1] + termHeight + 10);

	}

	/**
	 * On Command output
	 */
	onCommandOutput(output, win) {

		// show window
		win.show();

		// send signal to renderer to update the output
		win.webContents.send('updateOutput', output);

	}

}

module.exports = OutputWindow;
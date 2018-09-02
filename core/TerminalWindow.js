/**
 * Terminal window class file
 */

/**
 * Electron modules
 */
const { BrowserWindow, ipcMain, globalShortcut } = require('electron');
/**
 * Path module
 */
const path = require('path');
/**
 * Exec
 */
const { exec } = require('child_process');

/**
 * Terminal window class
 * * @extends {BrowserWindow}
 */
class TerminalWindow extends BrowserWindow {

	constructor(windowsManager) {

		/**
		 * Window options
		 * @type {Object}
		 */
		let windowOptions = {
			width: 1280/2,
			height: 70,
			frame: false,
			resizable: false,
			center: true,
			transperent: true,
			alwaysOnTop: true,
			titleBarStyle: 'customButtonsOnHover',
			vibrancy: 'dark',
			show: true
		};

		// init super
		super(windowOptions);

		/**
		 * Register alt-space shortcut
		 */
		globalShortcut.register(`Alt+Space`, () => this.onAltSpace(this));

		/**
		 * Web page url
		 */
		this.webpage = 'file://' + path.resolve(__dirname, '../interface/terminal.html');

		// Load url
		this.loadURL(this.webpage);

		/**
		 * Listen for exec signal from renderer
		 */
		ipcMain.on('exec', (e, cmd) => this.onExec(e, cmd, this));

		/**
		 * Windows manager
		 * @type {Object}
		 */
		this.windowsManager = windowsManager;

		// on close
		this.on('close', this.onClose);

	}

	/**
	 * On window close
	 */
	onClose(e) {

		// prevent close
		e.preventDefault();

		// hide window
		this.hide();

	}

	/**
	 * On exec signal
	 * 
	 * @param {Object} e event
	 * @param {string} cmd Command to execute
	 */
	onExec(e, cmd, win) {

		// enable noAsar
		process.noAsar = true;

		// get output window
		let outputWindow = win.windowsManager.get('outputWindow');

		// execute command
		exec(cmd, undefined, (err, stdout, stderr) => {

			// if no error, continue
			if(err) return;

			// if there was an stdout or stderr
			if(stdout != "" || stderr != "") {

				// send stderror or stdout to output window
				outputWindow.onCommandOutput(stdout != "" ? stdout : stderr, outputWindow);

			}


		});

	}

	/**
	 * On Alt+Space event
	 * toggle visibility
	 */
	onAltSpace(win) {

		// window visible
		if(win.isVisible()) {
			// hide
			win.hide();
		} else {
			// show
			win.show();
		}

	}

}

module.exports = TerminalWindow;
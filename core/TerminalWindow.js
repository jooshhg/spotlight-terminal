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
 * Spawn
 */
const { spawn } = require('child_process');

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

		this.hide();

	}

	/**
	 * On exec signal
	 * 
	 * @param {Object} e event
	 * @param {string} cmd Command to execute
	 */
	onExec(e, command, win) {

		let opts = {
			shell: '/bin/sh',
			env: process.env
		};

		let cmd = spawn(command, opts);

		let outputWindow = win.windowsManager.get('outputWindow');

		let wasoutput = false;

		cmd.stdout.on('data', data => {
			wasoutput = true;
			outputWindow.onCommandOutput(data, outputWindow);
		});

		cmd.stderr.on('data', data => {
			wasoutput = true;
			outputWindow.onCommandOutput(data, outputWindow);
		});

		cmd.on('close', () => {

			if(!wasoutput) win.hide();

			cmd = null;

		})

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
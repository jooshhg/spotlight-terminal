/**
 *
 *  Spotlight Terminal
 *
 * @description Like Spotlight Search on macOS except runs terminal commands
 * @author jooshhg
 */

/**
 * Electron api
 */
const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

/**
 * Exec
 */
const { exec } = require('child_process');

/**
 * Window object
 */
let win;

/**
 * onReady
 */
function onReady() {

	const ret = globalShortcut.register('Alt+Space', () => {

		if(win.isVisible()) {

			return win.hide();

		}

		win.show();

    });

	/**
	 * Browser options
	 * @type {Object}
	 */
	let browserOptions = {

		width: 1280/2,
		height: 70,
		frame: false,
		resizable: false,
		center: true,
		alwaysOnTop: true,
		transperent: true,
		titleBarStyle: 'customButtonsOnHover',
		vibrancy: 'dark',
		moveable: true

	};

	/**
	 * Create new window with given options
	 * @type {BrowserWindow}
	 */
	win = new BrowserWindow(browserOptions);

	win.on('blur', () => {

		win.hide();

	});


	// load index.html in interface
	win.loadURL(`file://${__dirname}/interface/index.html`);

}


ipcMain.on('exec', (e, cmd) => {


    exec(cmd, {shell: '/bin/bash');

	win.hide();

});

app.on('ready', onReady);

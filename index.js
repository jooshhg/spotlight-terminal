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
const { app } = require('electron');
/**
 * Exec
 */
const { exec } = require('child_process');

/**
 * Window manager
 */
const WindowManager = require('./core/WindowManager');
/**
 * Windows
 */
const OutputWindow = require('./core/OutputWindow');
const TerminalWindow = require('./core/TerminalWindow');

/**
 * onReady
 */
function onReady() {

	const windowManager = new WindowManager();

	windowManager.create('terminalWindow', TerminalWindow);
	windowManager.create('outputWindow', OutputWindow);

}

// run onReady when app is ready
app.on('ready', onReady);
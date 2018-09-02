	
/**
 * Output window scripting
 */

const {ipcRenderer, remote} = require('electron');  
const main = remote.require('./index.js');

/**
 * When window has loaded
 */
window.onload = () => {

	/**
	 * Output span
	 */
	let output = document.getElementById('output');

	// on updated output
	ipcRenderer.on('updateOutput', (e, o) => {

		// update text content
		output.textContent = o;

	});

	// on clear signal
	ipcRenderer.on('clear', () => {

		// clear text
		output.textContent = "";

	})

}
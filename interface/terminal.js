	
/**
 * Terminal spotlight scripting
 */

const {ipcRenderer, remote} = require('electron');  
const main = remote.require('./index.js');

/**
 * When window has loaded
 */
window.onload = () => {

	/**
	 * Command line input
	 */
	let line = document.getElementById('line');

	window.addEventListener('keypress', e => {

		/**
		 * If enter pressed
		 */
		if(e.key == 'Enter') {

			return performCommand();

		} 

		if(e.ctrlKey && e.key == 'l') {

			return line.value = '';

		}

	});

}

function performCommand() {

	/**
	 * Get line value
	 * @type {String}
	 */
	let cmd = line.value;

	// clear input
	line.value = '';

	ipcRenderer.send('exec', cmd);

}

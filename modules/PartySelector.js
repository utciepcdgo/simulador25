import axios from 'axios';
import Modal from '../components/Modal.js';
import Parties from '../public/data/_parties.json';

/**
 * @async
 * @param selectorEl {HTMLSelectElement} - The selector element
 */
export async function PartySelector(selectorEl)
{
	/**
	 * @typedef {Object} parties
	 * @type {Promise<axios.AxiosResponse<any>> | *}
	 */
	/* let data = axios({
		method: 'get', url: 'https://restcountries.com/v3.1/region/americas?fields=name', responseType: 'json',
	}); */

	/**
	 * @type {Array<parties>}
	 */
	// let parties = await data.then((response) => { return response.data })

	let p = [];

	for (let party of Parties) {
		p.push(party.name)
	}

	/**
	 * Populate the selector with the parties passing the array of parties
	 * @param {Array<parties>} party - Array of party objects
	 */
	const setupSelector = (party) => {
		// Clear the selector
		//TODO: Verificar este método, no permite seleccionar una opción.
		selectorEl.innerHTML = "";

		// Add the default option
		selectorEl.options.add(new Option("Seleccione un Partido Político o Coalición", '0', false, false));

		// Add the parties
		party.forEach((p, i) => { selectorEl.options.add(new Option(p, (i + 1), false, false)) });
	}

	setupSelector(p)

	selectorEl.addEventListener('change', (e) => {
		if (selectorEl.value === "0") {
			Modal.alert('Seleccione una opción válida.')
			return;
		}
	})
}
import axios from 'axios';
import Modal from '../components/Modal.js';
import Blocks from '../public/data/_blocks.json';
import {chunkArray, getArrayFromObject} from '../functions';

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

	for (let party of Blocks) {
		p.push(party.party.name)
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
		selectorEl.options.add(new Option("Seleccione un Partido Político", '0', false, false));

		// Add the parties
		party.forEach((p, i) => { selectorEl.options.add(new Option(p, (i + 1), false, false)) });
	}

	setupSelector(p)

	selectorEl.addEventListener('change', (e) => {
		if (selectorEl.value === "0") {
			Modal.alert('Seleccione una opción válida.')
			return;
		}

		// chunkArray(parties, 3).forEach((chunk) => {
		// 	console.log(chunk);
		// })

		for (let party of Blocks) {
			if (party.id === selectorEl.value) {
				console.warn("Party: ", party.party.name)
				for (let block of party.blocks) {
					for (let key in block) {
						for (let district of block[key].districts) {
							console.log("District: ", district.district_capital);
						}
					}

				}
			}
		}
	})
}
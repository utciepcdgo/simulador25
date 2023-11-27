import axios from 'axios';

export async function PartySelector(selectorEl)
{
	let data = axios({
		method: 'get', url: 'https://restcountries.com/v3.1/region/americas?fields=name', responseType: 'json',
	});

	/**
	 * @type {Array<parties>}
	 */
	let parties = await data.then((response) => { return response.data })

	console.log(parties);

	/**
	 * Populate the selector with the parties passing the array of parties
	 * @param {Array<parties>} party - Array of party objects
	 */
	const setupSelector = (party) => {
		// selectorEl.options.forEach((option) => { console.log(option) });
		// party.forEach((party, index) => { selectorEl.options.add(new Option(party.name.common, index + " " + party.name.official)) });
		party.forEach((party, index) => { console.log(party.name.common) });
	}

	selectorEl.addEventListener('click', () => { setupSelector(parties) });
}
import './style.css'
import {PartySelector} from './modules/PartySelector.js';
import {v4 as uuidv4} from 'uuid';
import Blocks from './public/data/_blocks.json';
import {prependHTML} from "./functions";

document.querySelector('#app').innerHTML = `
	<div class="dark:text-white">
		<div class="container mx-auto">
            <div class="grid w-full gap-6 md:grid-cols-3 grid-flow-row-dense auto-cols-max hover:auto-cols-min">
                <div>
                    <label for="parties" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Seleccione un Partido Político</label>
                    <select name="parties" id="parties" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                        <option value="0">Seleccione un Partido Político</option>
                    </select>
                </div>
                <div class="col-span-2 flex-row _sim__spacing _e__blocks">            
                    
                                        
                    <div class="opacity-50">
                        <h1 class="text-md font-bold">Consideraciones.</h1>
                        <ol class="list-decimal ml-4 text-sm">
                            <li>La información que el usuario ingrese en el Simulador no se almacena por ningún motivo, tenga a bien guardar su archivo de configuración si así lo desea.</li>
                            <li>La información mostrada en el Simulador es de carácter público, por tal motivo, los Partidos Políticos, Candidaturas Independientes y la Ciudadanía en general puede hacer uso del mismo.</li>
                            <li>El bloque 3 se compone de 2 diputados.</li>
                        </ol>
                    </div>
                </div>
		    </div>
		</div>
	</div>
`

// document.querySelector('div._sim__spacing').prepend("<p class='font-bold bg-amber-50 text-amber-900 p-4 rounded border border-amber-200'>Ya seleccionó uno :D.</p>")

let partySelectorEl = document.querySelector('#parties');
PartySelector(partySelectorEl)

document.addEventListener('DOMContentLoaded', () => {
	prependHTML("<p class='font-bold bg-amber-50 text-amber-900 p-4 rounded border border-amber-200'>Seleccione un Partido Político.</p>", document.querySelector('div._sim__spacing'), 'div')


	let _e__blocks = document.querySelector('._e__blocks');

// Blocks.forEach(party => {
// 	party.blocks.forEach(block => {
// 		for (let key in block) {
// 			block[key].districts.forEach(district => {
// 				const uuid = uuidv4(); // Generate a unique UUID
// 				const districtCapital = district.district_capital;
// 				delete district.district_capital; // Remove the district_capital property
// 				district.uuid = uuid; // Assign the unique UUID
// 				district.district_capital = districtCapital; // Reassign the district_capital property
// 			});
// 		}
// 	});
// });
//
// console.log(Blocks);


	partySelectorEl.addEventListener('change', (e) => {

		// prependHTML("<p class='font-bold bg-amber-50 text-amber-900 p-4 rounded border border-amber-200'>Ya seleccionó uno :D.</p>", document.querySelector('div._sim__spacing'), 'div', true)

		// content = "<p class='font-bold bg-amber-50 text-amber-900 p-4 rounded border border-amber-200'>Ya seleccionó uno :D.</p>";

		_e__blocks.innerHTML = "";

		for (let party of Blocks) {
			if (party.id === e.target.value) {
				console.warn("Party: ", party.party.name)
				for (let block of party.blocks) {
					for (let key in block) {
						// Prints the block number
						console.log("Bloque: ", key);
						_e__blocks.innerHTML += `
						<div class="bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md" data-block="1" data-blocktype="electoral_block">
    						<h1 class="text-2xl font-sans font-semibold">Bloque ` + key + `</h1>
							<div id="accordion-collapse" data-accordion="collapse">`
						for (let district of block[key].districts) {
							// Prints the district capital inside n block
							_e__blocks.innerHTML += `
								<h2 id="accordion-collapse-heading-` + district.uuid + `" class="mb-2.5">
									<button type="button"
											class="flex items-center justify-between w-full bg-white dark:bg-gray-900 p-3 rounded dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 shadow-2xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 border border-gray-200 dark:border-gray-700"
											data-accordion-target="#accordion-collapse-body-` + district.uuid + `"
											aria-expanded="true" aria-controls="accordion-collapse-body-` + district.uuid + `">
										<span class="font-bold">` + district.district_capital + `</span>
										<svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
											 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
											<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												  d="M9 5 5 1 1 5"/>
										</svg>
									</button>
								</h2>
								<div id="accordion-collapse-body-` + district.uuid + `" class="" aria-labelledby="accordion-collapse-heading-` + district.uuid + `">
									<div class="p-5 bg-gray-100 dark:bg-gray-900 rounded">
										<ul class="grid w-full gap-6 md:grid-cols-2">
											<li>
												<input type="radio" id="female-` + district.uuid + `" name="` + district.uuid + `" value="female" class="hidden peer"
													   required>
												<label for="female-` + district.uuid + `"
													   class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
													<div class="block">
														<div class="w-full text-lg font-semibold">Mujer</div>
													</div>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-woman"
														 width="24"
														 height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
														 stroke-linecap="round" stroke-linejoin="round">
														<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
														<path d="M10 16v5"/>
														<path d="M14 16v5"/>
														<path d="M8 16h8l-2 -7h-4z"/>
														<path d="M5 11c1.667 -1.333 3.333 -2 5 -2"/>
														<path d="M19 11c-1.667 -1.333 -3.333 -2 -5 -2"/>
														<path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
													</svg>
												</label>
											</li>
											<li>
												<input type="radio" id="male-` + district.uuid + `" name="` + district.uuid + `" value="male" class="hidden peer">
												<label for="male-` + district.uuid + `"
													   class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
													<div class="block">
														<div class="w-full text-lg font-semibold">Hombre</div>
													</div>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-man" width="24"
														 height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
														 stroke-linecap="round" stroke-linejoin="round">
														<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
														<path d="M10 16v5"/>
														<path d="M14 16v5"/>
														<path d="M9 9h6l-1 7h-4z"/>
														<path d="M5 11c1.333 -1.333 2.667 -2 4 -2"/>
														<path d="M19 11c-1.333 -1.333 -2.667 -2 -4 -2"/>
														<path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
													</svg>
												</label>
											</li>
											<li class="col-span-2">
												<input type="radio" id="pride-` + district.uuid + `" name="` + district.uuid + `" value="g5"
													   class="hidden peer">
												<label for="pride-` + district.uuid + `"
													   class="inline-flex overflow-hidden relative items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
													<div class="block">
														<div class="w-full text-lg font-semibold">Grupos sociales en desventaja</div>
													</div>
													<div class="sliding-background"></div>
												</label>
											</li>
										</ul>
									</div>
								</div>`
						}
						_e__blocks.innerHTML += `
							</div>
						</div>`
					}

				}
			}
		}
	})
});


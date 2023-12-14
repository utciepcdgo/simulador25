import './style.css'
import {PartySelector} from './modules/PartySelector.js';
import {v4 as uuidv4} from 'uuid';
import Blocks from './public/data/_blocks.json';
import _ from 'lodash';

document.querySelector('#app').innerHTML = `
	<div class="dark:text-white">
		<div class="mx-auto">
            <div class="grid w-full gap-6 md:grid-cols-3 grid-flow-row-dense auto-cols-max hover:auto-cols-min">
                <div>
                    <label for="parties" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Seleccione un Partido Político  o Coalición</label>
                    <select name="parties" id="parties" class="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                        <option value="0">Seleccione un Partido Político o Coalición</option>
                    </select>
                    
                    
					<h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Reglas:</h2>
					<ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 sticky top-0">
						<li class="flex items-center">
							<svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__one" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
							 </svg>
							Al menos un bloque deberá ser encabezado por fórmula de mujeres.
						</li>
						<li class="flex items-center">
							<svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-green-400 _c__two" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
							 </svg>
							No postular candidaturas mujeres en los dos últimos distritos del tercer bloque.
						</li>
						<li class="flex items-center">
							<svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__three" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
							 </svg>
							Integración paritaria de cada bloque.
						</li>
					</ul>
                </div>
                <div class="col-span-2 flex-row _sim__spacing">            
                    <div class="_e__blocks"></div>
                    <div class="opacity-50">
                        <h1 class="text-md font-bold">Consideraciones.</h1>
                        <ol class="list-decimal ml-4 text-sm">
                            <li>La información que el usuario ingrese en el Simulador no se almacena por ningún motivo, tenga a bien guardar su archivo de configuración si así lo desea.</li>
<!--                            <li>La información mostrada en el Simulador es de carácter público, por tal motivo, los Partidos Políticos, Candidaturas Independientes y la Ciudadanía en general puede hacer uso del mismo.</li>-->
                        </ol>
                    </div>
                </div>
		    </div>
		</div>
	</div>
`

// document.querySelector('div._sim__spacing').prepend("<p class='font-bold bg-amber-50 text-amber-900 p-4 rounded border border-amber-200'>Ya seleccionó uno :D.</p>")

let partySelectorEl = document.querySelector('#parties');
PartySelector(partySelectorEl).then(() => undefined)

document.addEventListener('DOMContentLoaded', () => {
    // prependHTML("<p class='font-bold bg-amber-50 text-amber-900 p-4 rounded border border-amber-200'>Seleccione un Partido Político.</p>", document.querySelector('div._sim__spacing'), 'div')
    let _e__blocks = document.querySelector('._e__blocks'),
        _e__female, // All female
        _e__male, // All male
        _e__pride; // All pride

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

        _e__blocks.innerHTML = "";
        let _HTML__content = '';

        for (let party of Blocks) {
            if (party.id === e.target.value) {
                console.warn("Party: ", party.party.name)
                for (let block of party.blocks) {
                    for (let key in block) {
                        // Prints the block number
                        _HTML__content += '<div class="bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md" data-block="' + key + '" data-blocktype="electoral_block">'
                            + '<h1 class="text-2xl font-sans font-semibold py-3 text-red-500">Bloque ' + key + '</h1>'
                            + '<div id="accordion-collapse" data-accordion="collapse">'
                        for (const [index, district] of block[key].districts.entries()) {
                            // Prints the district capital inside n block
                            _HTML__content += '<h2 id="accordion-collapse-heading-' + district.uuid + '" class="mb-2.5">'
                                + '       <button type="button" class="flex items-center justify-between w-full bg-white dark:bg-gray-900 p-3 rounded dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 shadow-2xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 border border-gray-200 dark:border-gray-700" data-accordion-target="#accordion-collapse-body-' + district.uuid + '" aria-expanded="true" aria-controls="accordion-collapse-body-' + district.uuid + '">'
                                + '           <span class="font-bold">' + district.district_roman + '. ' + district.district_capital + '</span>'
                                + '           <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">'
                                + '               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>'
                                + '           </svg>'
                                + '       </button>'
                                + '    </h2>'
                                + '    <div id="accordion-collapse-body-' + district.uuid + '" class="" aria-labelledby="accordion-collapse-heading-' + district.uuid + '">'
                                + '        <div class="p-5 bg-gray-100 dark:bg-gray-900 rounded flex space-x-5">'
                                + '			  <h1 class="font-sans font-semibold py-3">Propietario</h1>'
                                + '            <ul class="grid w-full gap-6 md:grid-cols-2">'
                                + '                <li>'
                                + '                   <input type="radio" id="female-' + district.uuid + '-p" name="' + district.uuid + '-p" data-position="p" data-block="' + key + '" data-level="' + (index + 1) + '" data-uuid="' + district.uuid + '" value="female" class="hidden peer" required>'
                                + '                   <label for="female-' + district.uuid + '-p" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="w-full text-lg font-semibold">Mujer</div>'
                                + '                        </div>'
                                + '                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                + '                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>'
                                + '                            <path d="M10 16v5"/>'
                                + '                            <path d="M14 16v5"/>'
                                + '                            <path d="M8 16h8l-2 -7h-4z"/>'
                                + '                            <path d="M5 11c1.667 -1.333 3.333 -2 5 -2"/>'
                                + '                            <path d="M19 11c-1.667 -1.333 -3.333 -2 -5 -2"/>'
                                + '                            <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>'
                                + '                        </svg>'
                                + '                    </label>'
                                + '                </li>'
                                + '                <li>'
                                + '                   <input type="radio" id="male-' + district.uuid + '-p" name="' + district.uuid + '-p" data-position="p" data-block="' + key + '" data-level="' + (index + 1) + '" data-uuid="' + district.uuid + '" value="male" class="hidden peer">'
                                + '                   <label for="male-' + district.uuid + '-p" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="w-full text-lg font-semibold">Hombre</div>'
                                + '                        </div>'
                                + '                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                + '                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>'
                                + '                            <path d="M10 16v5"/>'
                                + '                            <path d="M14 16v5"/>'
                                + '                            <path d="M9 9h6l-1 7h-4z"/>'
                                + '                            <path d="M5 11c1.333 -1.333 2.667 -2 4 -2"/>'
                                + '                            <path d="M19 11c-1.333 -1.333 -2.667 -2 -4 -2"/>'
                                + '                            <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>'
                                + '                        </svg>'
                                + '                    </label>'
                                + '                </li>'
                                + '                <li class="flex items-center">'
                                + '                    <div class="flex items-center mb-4">'
                                + '                         <input checked id="youth-' + district.uuid + '-p" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >'
                                + '                         <label for="youth-' + district.uuid + '-p" class="ms-2 font-medium text-gray-900 dark:text-gray-300 flex items-center">'
                                + '						          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                + '						          	  <path class="cls-2" d="m10,16v5"/>'
                                + '						          	  <path class="cls-2" d="m14,16v5"/>'
                                + '						          	  <path class="cls-2" d="m9,9h6l-1,7h-4l-1-7Z"/>'
                                + '						          	  <path class="cls-2" d="m5,5.08c0,4.01,2.67,3.92,4,3.92"/>'
                                + '						          	  <path class="cls-2" d="m19,5.08c0,4.92-2.67,3.92-4,3.92"/>'
                                + '						          	  <path class="cls-2" d="m10,4c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>'
                                + '						          </svg>'
                                + '                               <span>Jóvenes</span>'
                                + '                         </label>'
                                + '                    </div>'
                                + '                </li>'
                                + '                <li>'
                                + '                    <div class="flex items-center mb-4">'
                                + '                         <input checked id="indigent-' + district.uuid + '-p" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >'
                                + '                         <label for="indigent-' + district.uuid + '-p" class="ms-2 font-medium text-gray-900 dark:text-gray-300 flex items-center">'
                                +'						        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                +'						        	  <path class="cls-1" d="m8,15v5"/>'
                                +'						        	  <path class="cls-1" d="m12,15v5"/>'
                                +'						        	  <path class="cls-1" d="m7,8h6l2.8,7H4.2l2.8-7Z"/>'
                                +'						        	  <path class="cls-1" d="m19,11c-3-3-4.67-3-6-3l-3,7-3-7c-1.33,0-3.5.5-6,3"/>'
                                +'						        	  <path class="cls-1" d="m8,3c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>'
                                +'						        </svg>'
                                + '                             <span>Indígenas</span>'
                                + '                         </label>'
                                + '                    </div>'
                                + '                </li>'
                                + '            </ul>'
                                + '			  <h1 class="font-sans font-semibold py-3">Suplente</h1>'
                                + '			  <ul class="grid w-full gap-6 md:grid-cols-2">'
                                + '                <li>'
                                + '                   <input type="radio" id="female-' + district.uuid + '-s" name="' + district.uuid + '-s" data-position="s" data-block="' + key + '" data-level="' + (index + 1) + '" data-uuid="' + district.uuid + '" value="female" class="hidden peer" required>'
                                + '                   <label for="female-' + district.uuid + '-s" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="w-full text-lg font-semibold">Mujer</div>'
                                + '                        </div>'
                                + '                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                + '                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>'
                                + '                            <path d="M10 16v5"/>'
                                + '                            <path d="M14 16v5"/>'
                                + '                            <path d="M8 16h8l-2 -7h-4z"/>'
                                + '                            <path d="M5 11c1.667 -1.333 3.333 -2 5 -2"/>'
                                + '                            <path d="M19 11c-1.667 -1.333 -3.333 -2 -5 -2"/>'
                                + '                            <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>'
                                + '                        </svg>'
                                + '                    </label>'
                                + '                </li>'
                                + '                <li>'
                                + '                   <input type="radio" id="male-' + district.uuid + '-s" name="' + district.uuid + '-s" data-position="s" data-block="' + key + '" data-level="' + (index + 1) + '" data-uuid="' + district.uuid + '" value="male" class="hidden peer">'
                                + '                   <label for="male-' + district.uuid + '-s" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="w-full text-lg font-semibold">Hombre</div>'
                                + '                        </div>'
                                + '                       <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-man" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                + '                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>'
                                + '                            <path d="M10 16v5"/>'
                                + '                            <path d="M14 16v5"/>'
                                + '                            <path d="M9 9h6l-1 7h-4z"/>'
                                + '                            <path d="M5 11c1.333 -1.333 2.667 -2 4 -2"/>'
                                + '                            <path d="M19 11c-1.333 -1.333 -2.667 -2 -4 -2"/>'
                                + '                            <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>'
                                + '                        </svg>'
                                + '                    </label>'
                                + '                </li>'
                                + '                <li class="col-span-2">'
                                + '                   <input type="radio" id="pride-' + district.uuid + '-s" name="' + district.uuid + '-s" data-position="s" data-block="' + key + '" data-level="' + (index + 1) + '" data-uuid="' + district.uuid + '" value="g5" class="hidden peer">'
                                + '                   <label for="pride-' + district.uuid + '-s" class="inline-flex overflow-hidden relative items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="w-full text-lg font-semibold">Grupos sociales en desventaja</div>'
                                + '                        </div>'
                                + '                        <div class="sliding-background"></div>'
                                + '                    </label>'
                                + '                </li>'
                                + '            </ul>'
                                + '        </div>'
                                + '    </div>'
                        }
                        _HTML__content += '' +
                            '</div>' +
                            '</div>'
                    }

                }
            }
        }
        _e__blocks.innerHTML += _HTML__content;

        _e__female = document.querySelectorAll('input[value="female"]');
        _e__male = document.querySelectorAll('input[value="male"]');
        _e__pride = document.querySelectorAll('input[value="g5"]');

    })

    document.addEventListener('change', () => {
        let _e__male_owners = Array.from(_e__male).filter(e => e.dataset.position === 'p')
        let _e__male_subs = Array.from(_e__male).filter(e => e.dataset.position === 's')

        // Primera palomita.
        let _c__one = document.querySelector('._c__one')
        // Segunda palomita.
        let _c__two = document.querySelector('._c__two')

        // Group by uuid or formula
        let p = _.groupBy(Array.from(document.querySelectorAll('input[value="female"]')).filter(f => f.dataset.level === '1'), function (e) {
            return e.dataset.uuid
        })

        // Comparing
        let _p = [];
        Object.keys(p).forEach(key => {
            ((p[key][0].checked && p[key][1].checked) ? _p.push(1) : _p.push(0))
            // ((p[key][0].checked && p[key][1].checked)) ? _c__one.classList.replace('text-gray-400', 'text-green-400') : _c__one.classList.replace('text-green-400', 'text-gray-400')
        })

        _.some(_p, function (e) {
            return e === 1
        }) ? (_c__one.classList.replace('text-gray-400', 'text-green-400')) : (_c__one.classList.replace('text-green-400', 'text-gray-400'))

        // Últimos bloques de mujeres
        let pp = _.groupBy(_.orderBy(Array.from(document.querySelectorAll('input[value="female"]')).filter(f => f.dataset.block === '3'), function (e) {
            return e.dataset.level
        }), function (e) {
            return e.dataset.uuid
        })

        let x = _.concat(pp[Object.keys(pp)[Object.keys(pp).length - 1]], pp[Object.keys(pp)[Object.keys(pp).length - 2]]);


        _.some(x, function (e) {
            return e.checked
        }) ? (_c__two.classList.replace('text-green-400', 'text-gray-400')) : (_c__two.classList.replace('text-gray-400', 'text-green-400'))

    })
});


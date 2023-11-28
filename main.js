import './style.css'
import { PartySelector } from './modules/PartySelector.js';

document.querySelector('#app').innerHTML = `
	<div class="dark:text-white">
		<div class="container mx-auto">
			<label for="parties" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Seleccione un Partido Político</label>
				<select name="parties" id="parties" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="0">Seleccione un Partido Político</option>
				</select>
			</label>
			<div>
				<div class="bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md" data-block="1" data-blocktype="electoral_block">
					<h1>Bloque 1</h1>
					<h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">How much do you expect to use each month?</h3>
                    <ul class="grid w-full gap-6 md:grid-cols-2">
                        <li>
                            <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required>
                            <label for="hosting-small" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">0-50 MB</div>
                                    <div class="w-full">Good for small websites</div>
                                </div>
                                <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="hosting-big" name="hosting" value="hosting-big" class="hidden peer">
                            <label for="hosting-big" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">500-1000 MB</div>
                                    <div class="w-full">Good for large websites</div>
                                    <img src="./node_modules/@tabler/icons/icons/user.svg" alt="icon title" />
                                </div>
                                <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </label>
                        </li>
                    </ul>
				</div>
				<div class="bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md" data-block="2" data-blocktype="electoral_block">
					<h1>Bloque 2</h1>
				</div>
				<div class="bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md" data-block="3" data-blocktype="electoral_block">
					<h1>Bloque 3</h1>
				</div>
			</div>
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
`
let partySelectorEl = document.querySelector('#parties');
PartySelector(partySelectorEl);

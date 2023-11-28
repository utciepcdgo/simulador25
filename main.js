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

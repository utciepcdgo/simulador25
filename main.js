import 'animate.css';
import { InputCounter } from 'flowbite';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable'
import _ from 'lodash';
import {valueOf} from 'lodash/seq.js';
import stickybits from 'stickybits'
import Modal from './components/Modal.js';
import {PartySelector} from './modules/PartySelector.js';
import Blocks from './public/data/_blocks.json';
import './style.css'


document.querySelector('#app').innerHTML = `
	<div class="dark:text-white">
		<div class="mx-auto">
            <div class="grid w-full gap-6 md:grid-cols-6 grid-flow-row-dense auto-cols-max">
                <div data-sticky-container class="relative h-full">
                    <label for="parties" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Seleccione un Partido Político  o Coalición</label>
                    <select name="parties" id="parties" class="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                        <option value="0">Seleccione un Partido Político o Coalición</option>
                    </select>
                    <div class="_e__sticky">
					    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Reglas:</h2>
                        <ul class="max-w-md flex-col space-y-2 text-gray-500 list-inside dark:text-gray-400 top-0 mb-3">
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-gray-400 _c__one _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                Al menos un bloque deberá ser encabezado por fórmula de mujeres.
                            </li>
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-green-400 _c__two _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                No postular candidaturas mujeres en los dos últimos distritos del tercer bloque.
                            </li>
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-gray-400 _c__30y _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                Fórmula de jóvenes en alguno de los distritos. (30 años cumplidos al día de la elección)
                            </li>
                            <li class="flex items-center text-justify">
                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__indigenous _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                Fórmula de personas indígenas en el Distrito XV.
                            </li>
                            <li class="flex items-center text-justify">
                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__three _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                Integración paritaria de cada bloque.
                            </li>
                            <li class="flex items-center text-justify">
                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__general _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                Integración paritaria en lo general.
                            </li>
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-gray-400 _c__four _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                Fórmula de candidaturas de representación proporcional, dentro de los primeros tres lugares al menos una candidatura deberá corresponder a persona de un grupo social en desventaja
                            </li>
                        </ul>
                        <div class="flex space-x-3 mb-5">
                            <div class="flex-col text-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div class="flex items-center justify-between mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M10 16v5"/>
                                        <path d="M14 16v5"/>
                                        <path d="M8 16h8l-2 -7h-4z"/>
                                        <path d="M5 11c1.667 -1.333 3.333 -2 5 -2"/>
                                        <path d="M19 11c-1.667 -1.333 -3.333 -2 -5 -2"/>
                                        <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                                    </svg>
                                    <span class="_e__female_counter">0</span>
                                </div>
                                <span class="font-bold">Mujeres</span>
                            </div>
                            <div class="flex-col text-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div class="flex items-center justify-between mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M10 16v5"/>
                                        <path d="M14 16v5"/>
                                        <path d="M9 9h6l-1 7h-4z"/>
                                        <path d="M5 11c1.333 -1.333 2.667 -2 4 -2"/>
                                        <path d="M19 11c-1.333 -1.333 -2.667 -2 -4 -2"/>
                                        <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                                    </svg>
                                    <span class="_e__male_counter">0</span>
                                </div>
                                <span class="font-bold">Hombres</span>
                            </div>
                        </div>
                        <div class="flex">
                            <button class="_c__button_check w-full justify-center flex items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                 </svg>
                                <span>Verificar</span>
                            </button>
                            <button class="_c__button_pdf w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                <span>Generar archivo</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-span-5 flex mx-auto _sim__spacing space-x-5">            
                    <div class="_e__blocks_mr"></div>
                    <div class="_e__blocks_rp">
                    </div>
                </div>
		    </div>
		</div>
	</div>
`

// document.querySelector('div._sim__spacing').prepend("<p class='font-bold bg-amber-50 text-amber-900 p-4 rounded border border-amber-200'>Ya seleccionó uno :D.</p>")

let partySelectorEl = document.querySelector('#parties'),
    rows_grouped = [],
    rows_grouped_rp = [],
    _c__check_array = [],
    _c_result;

let _c__button_check = document.querySelector('._c__button_check'),
    _c__check = document.querySelectorAll('._c__check');

let doc = new jsPDF('p', 'pt');

stickybits("_e__sticky", {
    useStickyClasses: true
});

stickybits("selector");

PartySelector(partySelectorEl)

// Check if the user is on a mobile device
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

document.addEventListener('DOMContentLoaded', () => {

    // Show disclaimer
    new Modal({
        effect: 'zoom', // zoom|slide
        size: 'large', // small|medium|large|full
        title: `Consideraciones`,
        content: `
           <ol class="list-decimal ml-4 text-sm">
               <li class="text-justify">La información que el usuario ingrese en el Simulador no se almacena por ningún motivo, tenga a bien guardar su archivo de configuración si así lo desea.</li>
               <li class="text-justify">Este sistema es una herramienta didáctica que <b><u>NO</u></b> sustituye la revisión que se hará al momento del registro de candidaturas.</li>
               <li class="text-justify">Las personas que se auto adscriban como no binarias, serán consideradas para ocupar los lugares que le correspondan al género masculino, por ser este el sector que no ha sido históricamente discriminado. (Art. 13 numeral 1, fracción 1, inciso c de los Lineamientos para el registro de Candidaturas, integración de listas de representación proporcional e integración paritaria del Congreso del Estado de Durango para el Proceso Electoral Local 2023 – 2024).</li>
           </ol>`,
        onOpen: function () {
            console.log('modal open');
        },
        onClose: function () {
            console.log('modal closed');
        }
    }).open();

    // Check if the user is on a mobile device
    if (mobileCheck()) {
        alert("Este sitio no fue diseñado para verse en dispositivos móviles, es recomendable que lo utilice en una computadora.");
    }

    const RAF = requestAnimationFrame;
    const $nav = document.querySelector('._e__sticky');
    const threshold = $nav.getBoundingClientRect();
    let updating = false;

    const handleScroll = () => {
        if (window.scrollY >= threshold.top || window.pageYOffset >= threshold.top)
            $nav.classList.add('nav--fixed'); else

            $nav.classList.remove('nav--fixed');
        updating = false;
    };

    window.onscroll = () => {
        if (updating) return; else {
            updating = true;
            RAF(handleScroll);

        }
    };

    let _e__blocks = document.querySelector('._e__blocks_mr'), _e__blocks_rp = document.querySelector('._e__blocks_rp'),
        _e__female, // All female
        _e__male, // All male
        _e__pride; // All pride

    partySelectorEl.addEventListener('change', (e) => {

        if (e.target.value === '6' || e.target.value === '3') {

			Modal.alert("El Partido Político seleccionado forma parte de una Coalición Parcial, por lo que es necesario que ingrese el número de candidaturas mujeres y hombres propietarias que forman parte de la misma. Esto, con el fin de realizar los cálculos aritméticos necesarios para definir el género que encabezará y alternará en el listado de Representación Proporcional. Haga clic en el botón azul situado al lado derecho de su pantalla y seleccione el número de candidaturas por género.")

            let _dynamic__settings_obj = document.querySelector('._settings__content');

            _dynamic__settings_obj.innerHTML = `
            <form class="flex flex-col w-full">
				<div class="mb-3">
					<p class="text-sm dark:text-white">Seleccione el número de candidaturas mujeres y hombres que forman parte de la coalición «Sigamos Haciendo Historia en Durango».</p>
				</div>
				<div class="flex justify-center space-x-3">
					<div>
						<label for="counter-input" class="block mb-1 text-sm text-gray-900 dark:text-white font-bold">Mujeres:</label>
						<div class="relative flex items-center">
							<button type="button" id="ci__female_decrement_button" data-input-counter-decrement="counter-input" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
								<svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
								</svg>
							</button>
							<input type="text" id="_ci__female" data-input-counter class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value="0" required>
							<button type="button" id="_ci__female_increment_button" data-input-counter-increment="_ci__female" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
								<svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
								</svg>
							</button>
						</div>
					</div>
					<div>
						<label for="counter-input" class="block mb-1 text-sm text-gray-900 dark:text-white font-bold">Hombres:</label>
						<div class="relative flex items-center">
							<button type="button" id="ci__male_decrement_button" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
								<svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
								</svg>
							</button>
							<input type="text" id="_ci__male" data-input-counter class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value="0" required>
							<button type="button" id="_ci__male_increment_button" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
								<svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div class="mt-3">
					<p class="text-xs dark:text-white"><span class="text-red-600">*</span>Las candidaturas «No Binarias» suman al género masculino.</p>
				</div>
            </form>
            `;

			const $targetElFemale = document.getElementById('_ci__female');
			const $targetElMale = document.getElementById('_ci__male');

			// optionally set the increment and decrement elements
			const $incrementElFemale = document.getElementById('_ci__female_increment_button');
			const $incrementElMale = document.getElementById('_ci__male_increment_button');

			// optionally set the increment and decrement elements
			const $decrementElFemale = document.getElementById('ci__female_decrement_button');
			const $decrementElMale = document.getElementById('ci__male_decrement_button');

			// optional options with default values and callback functions
			const options = {
				minValue: 0,
				maxValue: 15, // infinite
			};



			const counterInputFemale = new InputCounter($targetElFemale, $incrementElFemale, $decrementElFemale, options);
			const counterInputMale = new InputCounter($targetElMale, $incrementElMale, $decrementElMale, options);
        } else {
			 let _dynamic__settings_obj = document.querySelector('._settings__content');
            _dynamic__settings_obj.innerHTML = `
				<div class="mb-3">
						<p class="text-sm dark:text-white">Ninguna configuración adicional para el Partido Político o Coalición Seleccionado.</p>
				</div>
            `
		}

        _e__blocks.innerHTML = "";
        _e__blocks_rp.innerHTML = "";
        let _HTML__content = '';

        for (let party of Blocks) {
            if (party.id === e.target.value) {
                for (let block of party.blocks) {
                    for (let key in block) {
                        // Prints the block number
                        _HTML__content += '<div class="animate__animated animate__faster animate__zoomIn bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md" data-block="' + key + '" data-blocktype="electoral_block">'
                            + '<h1 class="text-2xl font-sans font-semibold py-3 text-red-400 _c__block_' + key + '_text">Bloque ' + key + '</h1>'
                            + '<div id="accordion-collapse" data-accordion="collapse">'
                        for (const [index, district] of block[key].districts.entries()) {
                            // Prints the district capital inside n block
                            _HTML__content += '<div class="bg-gray-100 dark:bg-gray-900 mb-5 p-5">'
                                + '     <h2 class="mb-2.5">'
                                + '       <button type="button" class="flex items-center justify-between w-full bg-white dark:bg-gray-900 p-3 rounded dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 shadow-2xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 border border-gray-200 dark:border-gray-700" data-accordion-target="#accordion-collapse-body-' + district.uuid + '" aria-expanded="true" aria-controls="accordion-collapse-body-' + district.uuid + '">'
                                + '           <span class="font-bold">' + district.district_roman + '. ' + district.district_capital + '</span>'
                                + '           <span class="font-bold">' + district.votes_percentage + '%</span>'
                                + '       </button>'
                                + '     </h2>'
                                + '        <div class="rounded flex divide-x divide-gray-600">'
                                + '        <div class="mr-2.5">'
                                + '			   <h1 class="font-sans font-semibold py-3">Propietario(a)</h1>'
                                + '            <ul class="grid w-full gap-3 md:grid-cols-3">'
                                + '                <li>'
                                + '                   <input type="radio" id="female-' + district.uuid + '-p" name="' + district.uuid + '-p" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-position="p" data-block="' + key + '" data-level="' + (index + 1) + '" data-list="mr" data-uuid="' + district.uuid + '" value="female" class="hidden peer" required>'
                                + '                   <label for="female-' + district.uuid + '-p" class="transition-all ease-linear inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="font-semibold">Mujer</div>'
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
                                + '                   <input type="radio" id="genderqueer-' + district.uuid + '-p" name="' + district.uuid + '-p" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-position="p" data-block="' + key + '" data-level="' + (index + 1) + '" data-list="mr" data-uuid="' + district.uuid + '" value="genderqueer" class="hidden peer" required>'
                                + '                   <label for="genderqueer-' + district.uuid + '-p" class="transition-all ease-linear inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="font-semibold">No Binario</div>'
                                + '                        </div>'
                                + '                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                + '                         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>'
                                + '                         <path d="M12 11a5 5 0 1 1 0 10a5 5 0 0 1 0 -10z" />'
                                + '                         <path d="M12 11v-8" />'
                                + '                         <path d="M14.5 4.5l-5 3" />'
                                + '                         <path d="M9.5 4.5l5 3" />'
                                + '                          </svg>'
                                + '                    </label>'
                                + '                </li>'
                                + '                <li>'
                                + '                   <input type="radio" id="male-' + district.uuid + '-p" name="' + district.uuid + '-p" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-position="p" data-block="' + key + '" data-level="' + (index + 1) + '" data-list="mr" data-uuid="' + district.uuid + '" value="male" class="hidden peer">'
                                + '                   <label for="male-' + district.uuid + '-p" class="transition-all ease-linear inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="font-semibold">Hombre</div>'
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
                            if (district.district_decimal !== "15") {
                                _HTML__content += '<li class="flex items-center col-span-2">'
                                    + '                    <div class="flex items-center">'
                                    + '                         <input type="checkbox" data-uuid="' + district.uuid + '" data-position="p" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-block="' + key + '" id="' + district.uuid + '-p" value="youth" class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >'
                                    + '                         <label for="' + district.uuid + '-p" class="transition-all inline-flex overflow-hidden relative items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                    + '						          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                    + '						          	  <path class="cls-2" d="m10,16v5"/>'
                                    + '						          	  <path class="cls-2" d="m14,16v5"/>'
                                    + '						          	  <path class="cls-2" d="m9,9h6l-1,7h-4l-1-7Z"/>'
                                    + '						          	  <path class="cls-2" d="m5,5.08c0,4.01,2.67,3.92,4,3.92"/>'
                                    + '						          	  <path class="cls-2" d="m19,5.08c0,4.92-2.67,3.92-4,3.92"/>'
                                    + '						          	  <path class="cls-2" d="m10,4c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>'
                                    + '						          </svg>'
                                    + '                               <span class="font-semibold">Jóven</span>'
                                    + '                         </label>'
                                    + '                    </div>'
                                    + '                </li>';
                            } else {
                                _HTML__content += '<li class="flex items-center col-span-2">'
                                    + '                    <div class="flex items-center">'
                                    + '                         <input id="' + district.uuid + '-p" type="checkbox" data-uuid="' + district.uuid + '" data-position="p" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-block="' + key + '" value="indigenous" class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >'
                                    + '                         <label for="' + district.uuid + '-p" class="transition-all inline-flex overflow-hidden relative items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                    + '						        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                    + '						        	  <path class="cls-1" d="m8,15v5"/>'
                                    + '						        	  <path class="cls-1" d="m12,15v5"/>'
                                    + '						        	  <path class="cls-1" d="m7,8h6l2.8,7H4.2l2.8-7Z"/>'
                                    + '						        	  <path class="cls-1" d="m19,11c-3-3-4.67-3-6-3l-3,7-3-7c-1.33,0-3.5.5-6,3"/>'
                                    + '						        	  <path class="cls-1" d="m8,3c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>'
                                    + '						        </svg>'
                                    + '                             <span>Indígena</span>'
                                    + '                         </label>'
                                    + '                    </div>'
                                    + '                </li>';
                            }
                            _HTML__content += '</ul>'
                                + '        </div>'
                                + '        <div class="pl-2.5">'
                                + '			  <h1 class="font-sans font-semibold py-3">Suplente</h1>'
                                + '			  <ul class="grid w-full gap-3 md:grid-cols-3">'
                                + '                <li>'
                                + '                   <input type="radio" id="female-' + district.uuid + '-s" name="' + district.uuid + '-s" data-position="s" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-block="' + key + '" data-level="' + (index + 1) + '" data-list="mr" data-uuid="' + district.uuid + '" value="female" class="hidden peer" required>'
                                + '                   <label for="female-' + district.uuid + '-s" class="transition-all inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="font-semibold">Mujer</div>'
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
                                + '                   <input type="radio" id="genderqueer-' + district.uuid + '-s" name="' + district.uuid + '-s" data-position="s" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-block="' + key + '" data-level="' + (index + 1) + '" data-list="mr" data-uuid="' + district.uuid + '" value="genderqueer" class="hidden peer" required>'
                                + '                   <label for="genderqueer-' + district.uuid + '-s" class="transition-all inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="font-semibold">No Binario</div>'
                                + '                        </div>'
                                + '                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                + '                         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>'
                                + '                         <path d="M12 11a5 5 0 1 1 0 10a5 5 0 0 1 0 -10z" />'
                                + '                         <path d="M12 11v-8" />'
                                + '                         <path d="M14.5 4.5l-5 3" />'
                                + '                         <path d="M9.5 4.5l5 3" />'
                                + '                          </svg>'
                                + '                    </label>'
                                + '                </li>'
                                + '                <li>'
                                + '                   <input type="radio" id="male-' + district.uuid + '-s" name="' + district.uuid + '-s" data-position="s" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-block="' + key + '" data-level="' + (index + 1) + '" data-list="mr" data-uuid="' + district.uuid + '" value="male" class="hidden peer">'
                                + '                   <label for="male-' + district.uuid + '-s" class="transition-all inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                + '                        <div class="block">'
                                + '                            <div class="font-semibold">Hombre</div>'
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
                            if (district.district_decimal !== "15") {
                                _HTML__content += '<li class="flex items-center col-span-2">'
                                    + '                    <div class="flex items-center">'
                                    + '                         <input type="checkbox" data-uuid="' + district.uuid + '" data-position="s" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-block="' + key + '" id="' + district.uuid + '-s" value="youth" class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >'
                                    + '                         <label for="' + district.uuid + '-s" class="transition-all inline-flex overflow-hidden relative items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                    + '						          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                    + '						          	  <path class="cls-2" d="m10,16v5"/>'
                                    + '						          	  <path class="cls-2" d="m14,16v5"/>'
                                    + '						          	  <path class="cls-2" d="m9,9h6l-1,7h-4l-1-7Z"/>'
                                    + '						          	  <path class="cls-2" d="m5,5.08c0,4.01,2.67,3.92,4,3.92"/>'
                                    + '						          	  <path class="cls-2" d="m19,5.08c0,4.92-2.67,3.92-4,3.92"/>'
                                    + '						          	  <path class="cls-2" d="m10,4c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>'
                                    + '						          </svg>'
                                    + '                               <span>Jóven</span>'
                                    + '                         </label>'
                                    + '                    </div>'
                                    + '                </li>';
                            } else {
                                _HTML__content += '<li class="flex items-center col-span-2">'
                                    + '                    <div class="flex items-center">'
                                    + '                         <input id="' + district.uuid + '-s" type="checkbox" data-uuid="' + district.uuid + '" data-position="s" data-district="' + district.district_capital + '" data-roman="' + district.district_roman + '" data-block="' + key + '" value="indigenous" class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >'
                                    + '                         <label for="' + district.uuid + '-s" class="transition-all inline-flex overflow-hidden relative items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">'
                                    + '						        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                                    + '						        	  <path class="cls-1" d="m8,15v5"/>'
                                    + '						        	  <path class="cls-1" d="m12,15v5"/>'
                                    + '						        	  <path class="cls-1" d="m7,8h6l2.8,7H4.2l2.8-7Z"/>'
                                    + '						        	  <path class="cls-1" d="m19,11c-3-3-4.67-3-6-3l-3,7-3-7c-1.33,0-3.5.5-6,3"/>'
                                    + '						        	  <path class="cls-1" d="m8,3c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>'
                                    + '						        </svg>'
                                    + '                             <span>Indígena</span>'
                                    + '                         </label>'
                                    + '                    </div>'
                                    + '                </li>';
                            }
                            _HTML__content += '</ul>'
                                + '        </div>'
                                + '    </div>'
                                + '</div>';
                        }
                        _HTML__content += '' +
                            '</div>' +
                            '</div>'
                    }

                }
            }
        }
        let _HTML__content_rp = '';

        _HTML__content_rp += `<div class="bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md"><h1 class="font-sans font-semibold text-2xl py-3 my-4">Representación Proporcional</h1>`
        for (let i = 0; i < 5; i++) {
            _HTML__content_rp += `
		        <div class="flex-col bg-gray-100 dark:bg-gray-900 mb-5 p-5 w-full">
		            <h1 class="text-lg font-sans font-semibold">Fórmula ` + (i + 1) + `</h1>
		            <div class="flex divide-x divide-gray-600">
		                <div class="p-2 bg-gray-100 dark:bg-gray-900 rounded flex-col space-y-3">
		                    <span class="font-bold py-3">Propietario(a)</span>
		                    <ul class="grid w-full gap-3 md:grid-cols-3">
		                        <li>
		                            <input type="radio" id="female-rp` + i + `-p-rp" name="` + i + `-p-rp" value="female-rp" data-formula="`+ (i + 1) +`" data-position="p" data-list="rp" data-level="` + i + `" class="hidden peer"
		                                   required>
		                            <label for="female-rp` + i + `-p-rp"
		                                   class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                <div class="block">
		                                    <div class="font-semibold">Mujer</div>
		                                </div>
		                                <svg xmlns="http://www.w3.org/2000/svg"
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
		                            <input type="radio" id="genderqueer-rp` + i + `-p-rp" name="` + i + `-p-rp" value="genderqueer-rp" data-formula="`+ (i + 1) +`" data-position="p" data-list="rp" data-level="` + i + `" class="hidden peer">
		                            <label for="genderqueer-rp` + i + `-p-rp"
		                                   class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                <div class="block">
		                                    <div class="font-semibold">No binario</div>
		                                </div>
		                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
		                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
		                                    <path d="M12 11a5 5 0 1 1 0 10a5 5 0 0 1 0 -10z" />
		                                    <path d="M12 11v-8" />
		                                    <path d="M14.5 4.5l-5 3" />
		                                    <path d="M9.5 4.5l5 3" />
		                                </svg>
		                            </label>
		                        </li>
		                        <li>
		                            <input type="radio" id="male-rp` + i + `-p-rp" name="` + i + `-p-rp" value="male-rp" data-formula="`+ (i + 1) +`" data-position="p" data-list="rp" data-level="` + i + `" class="hidden peer">
		                            <label for="male-rp` + i + `-p-rp"
		                                   class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                <div class="block">
		                                    <div class="font-semibold">Hombre</div>
		                                </div>
		                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
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
		                        <li class="flex items-center col-span-2">
		                            <div class="flex items-center">
		                                <input type="checkbox" id="g5-` + i + `-p" data-level="` + i + `" data-formula="`+ (i + 1) +`" data-position="p" value="g5" class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
		                                <label for="g5-` + i + `-p" class="inline-flex overflow-hidden relative items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
		                                        <path class="cls-1" d="m8,15v5"/>
		                                        <path class="cls-1" d="m12,15v5"/>
		                                        <path class="cls-1" d="m7,8h6l2.8,7H4.2l2.8-7Z"/>
		                                        <path class="cls-1" d="m19,11c-3-3-4.67-3-6-3l-3,7-3-7c-1.33,0-3.5.5-6,3"/>
		                                        <path class="cls-1" d="m8,3c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>
		                                    </svg>
		                                    <span>Grupos sociales en desventaja</span>
		                                </label>
		                            </div>
		                        </li>
		                    </ul>
		                </div>
		                <div class="p-3 bg-gray-100 dark:bg-gray-900 rounded flex-col space-y-3">
		                    <span class="font-bold">Suplente</span>
		                    <ul class="grid w-full gap-3 md:grid-cols-3">
		                        <li>
		                            <input type="radio" id="female-rp-` + i + `-s-rp" name="` + i + `-s-rp" value="female-rp" data-formula="`+ (i + 1) +`" data-position="s" data-list="rp" data-level="` + i + `" class="hidden peer"
		                                   required>
		                            <label for="female-rp-` + i + `-s-rp"
		                                   class="transition-all inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                <div class="block">
		                                    <div class="font-semibold">Mujer</div>
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
		                            <input type="radio" id="genderqueer-rp-` + i + `-s-rp" name="` + i + `-s-rp" value="genderqueer-rp" data-formula="`+ (i + 1) +`" data-position="s" data-list="rp" data-level="` + i + `" class="hidden peer">
		                            <label for="genderqueer-rp-` + i + `-s-rp"
		                                   class="transition-all inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                <div class="block">
		                                    <div class="font-semibold">No binario</div>
		                                </div>
		                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
		                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
		                                    <path d="M12 11a5 5 0 1 1 0 10a5 5 0 0 1 0 -10z" />
		                                    <path d="M12 11v-8" />
		                                    <path d="M14.5 4.5l-5 3" />
		                                    <path d="M9.5 4.5l5 3" />
		                                </svg>
		                            </label>
		                        </li>
		                        <li>
		                            <input type="radio" id="male-rp-` + i + `-s-rp" name="` + i + `-s-rp" value="male-rp" data-formula="`+ (i + 1) +`" data-position="s" data-list="rp" data-level="` + i + `" class="hidden peer">
		                            <label for="male-rp-` + i + `-s-rp"
		                                   class="transition-all inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                <div class="block">
		                                    <div class="font-semibold">Hombre</div>
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
		                        <li class="flex items-center col-span-2">
		                            <div class="flex items-center">
		                                <input type="checkbox" id="g5-` + i + `-s" data-level="` + i + `" data-formula="`+ (i + 1) +`" data-position="s" value="g5" class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
		                                <label for="g5-` + i + `-s" class="inline-flex overflow-hidden relative items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
		                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
		                                        <path class="cls-1" d="m8,15v5"/>
		                                        <path class="cls-1" d="m12,15v5"/>
		                                        <path class="cls-1" d="m7,8h6l2.8,7H4.2l2.8-7Z"/>
		                                        <path class="cls-1" d="m19,11c-3-3-4.67-3-6-3l-3,7-3-7c-1.33,0-3.5.5-6,3"/>
		                                        <path class="cls-1" d="m8,3c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2-2,.9-2,2"/>
		                                    </svg>
		                                    <span>Grupos sociales en desventaja</span>
		                                </label>
		                            </div>
		                        </li>
		                    </ul>
		                </div>
		            </div>
		        </div>
		     `;
        }
        _HTML__content_rp += `</div>`
        _e__blocks_rp.innerHTML += _HTML__content_rp;
        _e__blocks.innerHTML += _HTML__content;

        _e__female = document.querySelectorAll('input[value="female"]');
        _e__male = document.querySelectorAll('input[value="male"]');
        _e__pride = document.querySelectorAll('input[value="g5"]');

    })

    window.addEventListener('change', (El) => {
        // Primera palomita.
        let _c__one = document.querySelector('._c__one')
        // Segunda palomita.
        let _c__two = document.querySelector('._c__two'),
            _c__three = document.querySelector('._c__three'),
            _c__30y = document.querySelector('._c__30y'),
            _c__indigenous = document.querySelector('._c__indigenous'),
            _c__four = document.querySelector('._c__four');

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

		if (partySelectorEl.value === "6" || partySelectorEl.value === "3") {
			x.forEach((e) => {
				e.disabled = true;
			})
		}

        _.some(x, function (e) {
            return e.checked
        }) ? (_c__two.classList.replace('text-green-400', 'text-gray-400')) : (_c__two.classList.replace('text-gray-400', 'text-green-400'))

        /**
         * FORMULA DE JÓVENES
         * */

        let _e__youth = _.groupBy(document.querySelectorAll('input[value="youth"]'), function (e) {
            return e.dataset.uuid
        }), _e_youth_array = [];

        Object.keys(_e__youth).forEach(key => {
            ((_e__youth[key][0].checked && _e__youth[key][1].checked) ? _e_youth_array.push(1) : _e_youth_array.push(0))
        })

        _.some(_e_youth_array, function (e) {
            return e === 1
        }) ? (_c__30y.classList.replace('text-gray-400', 'text-green-400')) : (_c__30y.classList.replace('text-green-400', 'text-gray-400'))

        /**
         * FORMULA DE INDÍGENAS
         * */

        let _e__indigenous = _.groupBy(document.querySelectorAll('input[value="indigenous"]'), function (e) {
            return e.dataset.uuid
        }), _e_indigenous_array = [];

        Object.keys(_e__indigenous).forEach(key => {
            ((_e__indigenous[key][0].checked && _e__indigenous[key][1].checked) ? _e_indigenous_array.push(1) : _e_indigenous_array.push(0))
        })

        _.some(_e_indigenous_array, function (e) {
            return e === 1
        }) ? (_c__indigenous.classList.replace('text-gray-400', 'text-green-400')) : (_c__indigenous.classList.replace('text-green-400', 'text-gray-400'))

        /***
         * CONTEO DE GÉNEROS
         * */

        let _e__males = Array.from(document.querySelectorAll('input[value="male"]')).filter(j => j.checked),
            _e__females = Array.from(document.querySelectorAll('input[value="female"]')).filter(j => j.checked),
            _e__nums_positions = (parseInt(Blocks[(partySelectorEl.value - 1)].number_districts));

        // console.error("_e__nums_positions: ", _e__nums_positions)

        /**
         * CONTEO DE FÓRMULAS.
         * HOMBRES
         * */
        let _e__males_checked = Array.from(document.querySelectorAll('input[value="male"][data-list="mr"]')).filter(j => j.checked),
            _e__genderqueer_checked = Array.from(document.querySelectorAll('input[value="genderqueer"]')).filter(j => j.checked);

        let _e__males_formulas = _.groupBy(_e__males_checked, function (e) {
                return e.dataset.uuid
            }),
            _e__males_formulas_array = [],
            _e__genderqueer_formulas = _.groupBy(_e__genderqueer_checked, function (e) {
                return e.dataset.uuid
            }),
            _e__genderqueer_formulas_array = [];

        Object.keys(_e__males_formulas).forEach(key => {
            (_e__males_formulas[key].length > 1) ? _e__males_formulas_array.push(1) : _e__males_formulas_array.push(0)
        });

        Object.keys(_e__genderqueer_formulas).forEach(key => {
            (_e__genderqueer_formulas[key].length > 1) ? _e__genderqueer_formulas_array.push(1) : _e__genderqueer_formulas_array.push(0)
        });

        // console.log("_e__males_formulas_array: ", _.sum(_e__males_formulas_array))

        /**
         * MUJERES
         * */

        let _e__females_checked = Array.from(document.querySelectorAll('input[value="female"]')).filter(j => j.checked);

        let _e__females_formulas = _.groupBy(_e__females_checked, function (e) {
                return e.dataset.uuid
            }),
            _e__females_formulas_array = [];

        Object.keys(_e__females_formulas).forEach(key => {
            (_e__females_formulas[key].length > 1) ? _e__females_formulas_array.push(1) : _e__females_formulas_array.push(0)
        });

        // console.log("_e__females_formulas_array: ", _.sum(_e__females_formulas_array))

        /**
         *  CONTEO DE PROPIETARIOS.
         *  Se alternan géneros según selección en Mayoría Relativa.
         * */
        let _e__male_p = Array.from(document.querySelectorAll('input[value="male"]:checked')).filter(f => f.dataset.position === 'p'),
			_e_ci_male = document.querySelector('#_ci__male')?.value ?? 0;

        if ((_e__male_p.length + _e__genderqueer_checked.length + parseInt(_e_ci_male)) / 15 > 0.5) {
            let _h = Array.from(document.querySelectorAll('input[value="female-rp"]')).filter(f => f.dataset.position === 'p')

            Object.keys(_h).forEach((e) => {
                (_h[e].dataset.level % 2 === 0) ? (_h[e].checked = true) : (_h[e].checked = false)
            })

        }

        let _e__female_p = Array.from(document.querySelectorAll('input[value="female"]:checked')).filter(f => f.dataset.position === 'p'),
			_e_ci_female = document.querySelector('#_ci__female')?.value ?? 0;

        if ((_e__female_p.length + parseInt(_e_ci_female)) / 15 > 0.5) {
            let _h = Array.from(document.querySelectorAll('input[value="male-rp"]')).filter(f => f.dataset.position === 'p')

            Object.keys(_h).forEach((e) => {
                // (_h[e].dataset.level % 2 === 0) ? document.querySelector('#female-rp'+ _h[e].dataset.level +'-p-rp').disabled = true : (_h[e].checked = false)
                (_h[e].dataset.level % 2 === 0) ? (_h[e].checked = true) : (_h[e].checked = false)
            })
        }

		let _c_female_p_selected = (_e__females.filter(f => f.dataset.position === 'p').length + parseInt(_e_ci_female)) + ' (' + _.round(((_e__females.filter(f => f.dataset.position === 'p').length + parseInt(_e_ci_female)) / 15) * 100, 2) + '%)',
			_c_male_p_selected = (_e__males.filter(f => f.dataset.position === 'p').length + _e__genderqueer_checked.filter(f => f.dataset.position === 'p').length + parseInt(_e_ci_male)) + ' (' + _.round(((_e__males.filter(f => f.dataset.position === 'p').length + _e__genderqueer_checked.filter(f => f.dataset.position === 'p').length + parseInt(_e_ci_male)) / 15) * 100, 2) + '%)';

		document.querySelector('._e__male_counter').innerHTML = _c_male_p_selected;
		document.querySelector('._e__female_counter').innerHTML = _c_female_p_selected;

        /**
         * INTEGRACIÓN PARITARIA DE CADA BLOQUE
         * */
        let _a__genderqueer = document.querySelectorAll('input[value="genderqueer"]'),
            _a__male = document.querySelectorAll('input[value="male"]');

        let _a__merged_genderqueer_males = Array.from(_a__male).concat(Array.from(_a__genderqueer));

        // console.log("_a__merged_genderqueer_males ", _a__merged_genderqueer_males)

        let _e__male_by_block = _.groupBy(_.orderBy(_a__merged_genderqueer_males, function (e) {
                return e.dataset.level
            }), function (f) {
                return f.dataset.block
            }),
            _e__female_by_block = _.groupBy(_.orderBy(Array.from(document.querySelectorAll('input[value="female"]')), function (e) {
                return e.dataset.level
            }), function (f) {
                return f.dataset.block
            }),
            _c__block_1_text = document.querySelector('._c__block_1_text'),
            _c__block_2_text = document.querySelector('._c__block_2_text'),
            _c__block_3_text = document.querySelector('._c__block_3_text'),
            _e__block_par = [], _xxx1m = [], _xxx1f = [], _xxx2m = [], _xxx2f = [], _xxx3m = [], _xxx3f = [];

        let _xx1m = _.groupBy(_e__male_by_block[1], function (e) {
                return e.dataset.uuid
            }),
            _xx1f = _.groupBy(_e__female_by_block[1], function (e) {
                return e.dataset.uuid
            })

        Object.keys(_xx1m).forEach((e) => _xx1m[e].filter(f => f.checked).length === 2 ? _xxx1m.push(1) : _xxx1m.push(0));
        Object.keys(_xx1f).forEach((e) => _xx1f[e].filter(f => f.checked).length === 2 ? _xxx1f.push(1) : _xxx1f.push(0));

        // console.log("_xxx1m: ", _.sum(_xxx1m), " _xxx1f: ", _.sum(_xxx1f))

        if (_.sum(_xxx1m) === Math.ceil((_e__nums_positions / 3) / 2) && _.sum(_xxx1f) === Math.floor((_e__nums_positions / 3) / 2) || _.sum(_xxx1m) === Math.floor((_e__nums_positions / 3) / 2) && _.sum(_xxx1f) === Math.ceil((_e__nums_positions / 3) / 2)) {
            _c__block_1_text.classList.replace('text-red-400', 'text-green-400')
            _e__block_par.push(1)
        } else {
            _c__block_1_text.classList.replace('text-green-400', 'text-red-400')
            _e__block_par.push(0)
        }

        /***************************/
        let _xx2m = _.groupBy(_e__male_by_block[2], function (e) {
                return e.dataset.uuid
            }),
            _xx2f = _.groupBy(_e__female_by_block[2], function (e) {
                return e.dataset.uuid
            })

        Object.keys(_xx2m).forEach((e) => _xx2m[e].filter(f => f.checked).length === 2 ? _xxx2m.push(1) : _xxx2m.push(0));
        Object.keys(_xx2f).forEach((e) => _xx2f[e].filter(f => f.checked).length === 2 ? _xxx2f.push(1) : _xxx2f.push(0));

        // console.log("_xxx2m: ", _.sum(_xxx2m), " _xxx2f: ", _.sum(_xxx2f))

        if (_.sum(_xxx2m) === Math.ceil((_e__nums_positions / 3) / 2) && _.sum(_xxx2f) === Math.floor((_e__nums_positions / 3) / 2) || _.sum(_xxx2m) === Math.floor((_e__nums_positions / 3) / 2) && _.sum(_xxx2f) === Math.ceil((_e__nums_positions / 3) / 2)) {
            _c__block_2_text.classList.replace('text-red-400', 'text-green-400')
            _e__block_par.push(1)
        } else {
            _c__block_2_text.classList.replace('text-green-400', 'text-red-400')
            _e__block_par.push(0)
        }

        /***************************/
        let _xx3m = _.groupBy(_e__male_by_block[3], function (e) {
                return e.dataset.uuid
            }),
            _xx3f = _.groupBy(_e__female_by_block[3], function (e) {
                return e.dataset.uuid
            })

        Object.keys(_xx3m).forEach((e) => _xx3m[e].filter(f => f.checked).length === 2 ? _xxx3m.push(1) : _xxx3m.push(0));
        Object.keys(_xx3f).forEach((e) => _xx3f[e].filter(f => f.checked).length === 2 ? _xxx3f.push(1) : _xxx3f.push(0));

        if (_.sum(_xxx3m) === Math.ceil((_e__nums_positions / 3) / 2) && _.sum(_xxx3f) === Math.floor((_e__nums_positions / 3) / 2) || _.sum(_xxx3m) === Math.floor((_e__nums_positions / 3) / 2) && _.sum(_xxx3f) === Math.ceil((_e__nums_positions / 3) / 2)) {
            _c__block_3_text.classList.replace('text-red-400', 'text-green-400')
            _e__block_par.push(1)
		} else {
			/* if (partySelectorEl.value === "6" || partySelectorEl.value === "3") {
				_e__block_par.push(1)
			} */
			_c__block_3_text.classList.replace('text-green-400', 'text-red-400')
			_e__block_par.push(0)
		}

        /**
         * CHECK IF ALL BLOCKS ARE GREEN.
         * */
        (_e__block_par[0] === 1 && _e__block_par[1] === 1 && _e__block_par[2] === 1) ? (_c__three.classList.replace('text-gray-400', 'text-green-400')) : (_c__three.classList.replace('text-green-400', 'text-gray-400'));

        /**
         * PARIDAD DE MUJERES
         * */
        let _e__female_formula = _.groupBy(Array.from(document.querySelectorAll('input[data-list="mr"]')).filter(f => f.checked), function (e) {
            return e.dataset.uuid
        })

        Object.keys(_e__female_formula).forEach((e) => {
            if (_e__female_formula[e].length > 1) {
                if (_e__female_formula[e][0].value === "female" && _e__female_formula[e][1].value !== "female") {
                    Modal.alert("Si la candidatura propietaria es mujer, la suplencia también deberá ser mujer.")
                    document.querySelector('label[for="' + _e__female_formula[e][1].value + '-' + _e__female_formula[e][1].dataset.uuid + '-' + _e__female_formula[e][1].dataset.position + '"]').classList.replace('peer-checked:border-blue-600', 'peer-checked:border-red-600')
                } else {
                    document.querySelector('label[for="' + _e__female_formula[e][1].value + '-' + _e__female_formula[e][1].dataset.uuid + '-' + _e__female_formula[e][1].dataset.position + '"]').classList.replace('peer-checked:border-red-600', 'peer-checked:border-blue-600')
                    document.querySelector('label[for="' + _e__female_formula[e][1].value + '-' + _e__female_formula[e][1].dataset.uuid + '-' + _e__female_formula[e][1].dataset.position + '"]').classList.replace('peer-checked:border-blue-600', 'peer-checked:border-green-400')
                    setTimeout(function () {
                        document.querySelector('label[for="' + _e__female_formula[e][1].value + '-' + _e__female_formula[e][1].dataset.uuid + '-' + _e__female_formula[e][1].dataset.position + '"]').classList.replace('peer-checked:border-green-400', 'peer-checked:border-blue-600')
                    }, 1000)
                }
            }
        })

        /**
         * PARIDAD DE GÉNERO G4 EN RP
         * */
        let _e__g4 = _.groupBy(Array.from(document.querySelectorAll('input[value="g5"]')), function (e) {
            return e.dataset.level
        }), _e__g4_array = [];

        Object.keys(_e__g4).forEach(key => {
            ((_e__g4[key][0].checked && _e__g4[key][1].checked) ? _e__g4_array.push(1) : _e__g4_array.push(0))
        })

        if (_e__g4_array[0] === 1 || _e__g4_array[1] === 1 || _e__g4_array[2] === 1) {
            _c__four.classList.replace('text-gray-400', 'text-green-400')
        } else {
            _c__four.classList.replace('text-green-400', 'text-gray-400')
        }

        // console.log("_e__g4_array: ", _e__g4_array)

        /**
         * PARIDAD EN LO GENERAL 8 MUJERES 7 HOMBRES O VICEVERSA
		 * @param _e__nums_positions trae el número de posiciones por partido. = 15
         * */
        let _c__general_males = _.sum(_e__males_formulas_array) + _.sum(_e__genderqueer_formulas_array),
            _c__general_females = _.sum(_e__females_formulas_array);

        // console.log("_c__general_males: ", _c__general_males, "_c__general_females: ", _c__general_females)

        if (parseInt(_c_female_p_selected) === Math.ceil(15 / 2) && parseInt(_c_male_p_selected) === Math.floor(15 / 2) || parseInt(_c_male_p_selected) === Math.ceil(15 / 2) && parseInt(_c_female_p_selected) === Math.floor(15 / 2)) {
            document.querySelector('._c__general').classList.replace('text-green-400', 'text-gray-400')
            document.querySelector('._c__general').classList.replace('text-gray-400', 'text-green-400')
        } else {
            document.querySelector('._c__general').classList.replace('text-green-400', 'text-gray-400')
        }

        /**
         * PARIDAD DE MUJERES EN RP
         * */
        let _e__female_formula_rp = _.groupBy(Array.from(document.querySelectorAll('input[data-list="rp"]')).filter(f => f.checked), function (e) {
            return e.dataset.level
        })

		Object.keys(_e__female_formula_rp).forEach((e) => {
			 if (_e__female_formula_rp[e][0].value === "female-rp" && _e__female_formula_rp[e][1].value === "male-rp" || _e__female_formula_rp[e][0].value === "female-rp" && _e__female_formula_rp[e][1].value === "genderqueer-rp") {
				 Modal.alert("Si la candidatura propietaria es mujer, la suplencia también deberá ser mujer.")
                 document.querySelector('label[for="'+ _e__female_formula_rp[e][1].id +'"]').classList.replace('peer-checked:border-blue-600', 'peer-checked:border-red-600')
			 }

             if (_e__female_formula_rp[e][0].value === "female-rp" && _e__female_formula_rp[e][1].value === "female-rp") {
                 document.querySelector('label[for="'+ _e__female_formula_rp[e][1].id +'"]').classList.replace('peer-checked:border-red-600', 'peer-checked:border-blue-600')
			 }
		})

        /**
         * BOTÓN VERIFICAR
         * */
        Object.keys(_c__check).forEach((e) => {
            _c__check[e].classList.contains('text-green-400') ? _c__check_array.push(1) : _c__check_array.push(0)
        })

        _c_result = _.some(_c__check_array, function (e) {
            return e !== 1
        })

        // console.log("_c__check_array: ", _c__check_array)
        // console.log("_c__check: ", _c__check)

        _c__check_array = [];

        let rows = [], rows_rp = [];

        Array.from(document.querySelectorAll('input[type="radio"][data-list="mr"]:checked')).forEach((e) => {
            let _c__action_temp = document.querySelector('input[type="checkbox"]#' + e.dataset.uuid + '-' + e.dataset.position + ''),
                _c__group = _c__action_temp.checked ? _c__action_temp.value : "Ninguno";
            // console.log("_c__group: ", e)
            rows.push({
                district_roman: e.dataset.roman,
                district_capital: e.dataset.district,
                position: (e.dataset.position === "p") ? "Propietario(a)" : "Suplente",
                genre: (e.value === "female") ? "Mujer" : ((e.value === "male") ? "Hombre" : "No binario"),
                group: (_c__group === 'youth') ? "Jóven" : ((_c__group === 'indigenous') ? "Indígena" : "Ninguno"),
                block: e.dataset.block,
            })
        })
        // console.log("rows: ", rows)
        rows_grouped = _.groupBy(rows, function (e) {
            return e.block
        })

        // COMBINE DATASET.POSITION P AND S AT ONCE ROW WITH ALL PROPERTIES.
        let rows_grouped_p = _.groupBy(rows.filter(f => f.position === "Propietario(a)"), function (e) {
                return e.block
            }),
            rows_grouped_s = _.groupBy(rows.filter(f => f.position === "Suplente"), function (e) {
                return e.block
            });

        Object.keys(rows_grouped_p).forEach((e) => {
            rows_grouped[e] = rows_grouped_p[e].map((f) => {
                return {
                    district_roman: f.district_roman,
                    district_capital: f.district_capital,
                    block: f.block,
                    genre_p: f.genre,
                    group_p: f.group,
                    genre_s: rows_grouped_s[e].filter(g => g.district_roman === f.district_roman)[0].genre,
                    group_s: rows_grouped_s[e].filter(g => g.district_roman === f.district_roman)[0].group,
                }
            });
        })

        /**
         * ROWS FOR RP
         * Datos de RP extraídos de la selección.
         * */
        Array.from(document.querySelectorAll('input[type="radio"][data-list="rp"]:checked')).forEach((e) => {
            let _c__action_temp = document.querySelector('input[type="checkbox"]#g5-' + e.dataset.level + '-' + e.dataset.position + ''),
                _c__group = _c__action_temp.checked ? _c__action_temp.value : "Ninguno";
            // console.log("_c__action_temp_rp: ", _c__action_temp)
            rows_rp.push({
                formula: e.dataset.formula,
                position: (e.dataset.position === "p") ? "Propietario(a)" : "Suplente",
                genre: (e.value === "female-rp") ? "Mujer" : ((e.value === "male-rp") ? "Hombre" : "No binario"),
                group: ((_c__group === 'g5') ? "G4" :  "Ninguno"),
            })
        })
        // console.log("rows_rp: ", rows_rp)
        rows_grouped_rp = _.groupBy(rows_rp, function (e) {
            return e.formula
        })

        // COMBINE DATASET.POSITION P AND S AT ONCE ROW WITH ALL PROPERTIES.
        let rows_grouped_p_rp = _.groupBy(rows_rp.filter(f => f.position === "Propietario(a)") , function (e) {
                return e.formula
            }),
            rows_grouped_s_rp = _.groupBy(rows_rp.filter(f => f.position === "Suplente"), function (e) {
                return e.formula
            });

        Object.keys(rows_grouped_p_rp).forEach((e) => {
            rows_grouped_rp[e] = rows_grouped_p_rp[e].map((f) => {
                return {
                    formula: f.formula,
                    genre_p: f.genre,
                    group_p: f.group,
                    genre_s: rows_grouped_s_rp[e].filter(g => g.formula === f.formula)[0].genre,
                    group_s: rows_grouped_s_rp[e].filter(g => g.formula === f.formula)[0].group,
                }
            });
        })


        // console.log("rows_grouped_rp: ", rows_grouped_rp)
        // rows = [];

        // document.querySelector('._c__button_pdf').disabled = !_.sum(_c__check_array, function (e) {
        // 	return e >= 6
        // });

        // rows_grouped = [];
    })

    document.querySelector('._c__button_pdf').addEventListener('click', () => {
        let col = ["Distrito", "Cabecera", "Género Prop.", "Grupo Prop.", "Género Supl.", "Grupo Supl."],
            col_rp = ["Fórmula", "Género Prop.", "Grupo Prop.", "Género Supl.", "Grupo Supl."],
            rows = rows_grouped,
            rows_rp = rows_grouped_rp;

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)

        doc.addImage('https://i.imgur.com/9TJfat5.png', 'PNG', 20, 20, 150, 67);

        doc.text('INSTITUTO ELECTORAL Y DE PARTICIPACIÓN CIUDADANA DEL ESTADO DE DURANGO.', 300, 40, {
            align: 'center', maxWidth: 200,
        })

        doc.text(new Date().toLocaleDateString('es-mx', { weekday:"long", year:"numeric", month:"long", day: "numeric"}), 490, 80, {
            align: 'center', maxWidth: 200,
        })

        doc.setFontSize(10)
        doc.text('SIMULADOR 2024', 300, 80, {
            align: 'center', maxWidth: 200,
        })

        doc.setFontSize(12)
        doc.text('Bloque 1', 300, 130, {
            align: 'center', fontSize: 14,
        })

        autoTable(doc, {
            head: [col],
            body: [...rows['1'].map(el => [el.district_roman, el.district_capital, el.genre_p, el.group_p, el.genre_s, el.group_s])],
            startY: 150,
            theme: 'striped',
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
                fontSize: 8,
                fontStyle: 'bold',
                cellPadding: 10,
            },
        });

        doc.text('Bloque 2', 300, 330, {
            align: 'center',
        }).setFontSize(12).setFont(undefined, 'bold');

        autoTable(doc, {
            head: [col],
            body: [...rows['2'].map(el => [el.district_roman, el.district_capital, el.genre_p, el.group_p, el.genre_s, el.group_s])],
            startY: 350,
            theme: 'striped',
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
                fontSize: 8,
                fontStyle: 'bold',
                cellPadding: 10,
            },
        });

        doc.text('Bloque 3', 300, 530, {
            align: 'center',
        }).setFontSize(12).setFont(undefined, 'bold');

        autoTable(doc, {
            head: [col],
            body: [...rows['3'].map(el => [el.district_roman, el.district_capital, el.genre_p, el.group_p, el.genre_s, el.group_s])],
            startY: 550,
            theme: 'striped',
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
                fontSize: 8,
                fontStyle: 'bold',
                cellPadding: 10,
            },
        });

        doc.setFontSize(8)
        doc.text('Este sistema es una herramienta didáctica que NO sustituye la revisión que se hará al momento del registro de candidaturas.', 40, 800, {
            maxWidth: 500
        })

        doc.addPage()

        doc.addImage('https://i.imgur.com/9TJfat5.png', 'PNG', 20, 20, 150, 67);

        doc.text('INSTITUTO ELECTORAL Y DE PARTICIPACIÓN CIUDADANA DEL ESTADO DE DURANGO.', 300, 40, {
            align: 'center', maxWidth: 200,
        })

        doc.text(new Date().toLocaleDateString('es-mx', { weekday:"long", year:"numeric", month:"long", day: "numeric"}), 490, 80, {
            align: 'center', maxWidth: 200,
        })

        doc.setFontSize(10)
        doc.text('SIMULADOR 2024', 300, 80, {
            align: 'center', maxWidth: 200,
        })

        doc.setFontSize(12)
        doc.text('Representación Proporcional', 300, 130, {
            align: 'center', fontSize: 14,
        })

        autoTable(doc, {
            head: [col_rp],
            body: [...rows_rp.map(el => [el.formula, el.genre_p, el.group_p, el.genre_s, el.group_s])],
            startY: 150,
            theme: 'striped',
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
                fontSize: 8,
                fontStyle: 'bold',
                cellPadding: 10,
            },
        });

        doc.save('table.pdf')
    });

    _c__button_check.addEventListener('click', () => {
        if (_c_result) {
            Modal.alert("Aún no se cumple con todas las reglas.")
        } else {
            Modal.alert("Se cumple con las reglas de paridad e inclusión.")
        }
    })
});




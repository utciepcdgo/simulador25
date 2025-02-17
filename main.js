import 'animate.css';
import {InputCounter} from 'flowbite';
import {jsPDF} from "jspdf";
import stickybits from 'stickybits'
import Modal from './components/Modal.js';
import {PartySelector} from './modules/PartySelector.js';
import Blocks from './public/data/_blocks.json';
import Parties from './public/data/_parties.json';
import './style.css'
import _ from "lodash";


document.querySelector('#app').innerHTML = `
	<div class="dark:text-white">
		<div class="mx-auto">
            <div class="grid w-full gap-6 md:grid-cols-6 grid-flow-row-dense auto-cols-max">
                <div data-sticky-container class="relative h-full">
                    <label for="parties" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Seleccione un Partido Político  o Coalición</label>
                    <select name="parties" id="parties" class="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                        <option value="0">Seleccione un Partido Político o Coalición</option>
                    </select>
                    <div class="_p__emblema mb-10"></div>
                    <div class="_e__sticky">
					    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Reglas:</h2>
                        <ul class="max-w-md flex-col space-y-2 text-gray-500 list-inside dark:text-gray-400 top-0 mb-3">
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-gray-400 _c__one _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Al menos el 50% de las candidaturas a Presidencias Municipales deben ser mujeres.
                            </li>
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-gray-400 _c__two _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Al menos un bloque encabezado por fórmula de mujeres.
                            </li>
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-green-400 _c__three _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                No postular mujeres en las presidencias municipales de los dos últimos municipios del último bloque.
                            </li>
                            <li class="flex items-center text-justify">
                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__four _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                <div>
                                    <p>Integración paritaria en cada bloque.</p>
                                </div>
                            </li>
                            <li class="flex items-center text-justify">
                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__five _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Fórmula de Jóvenes (Al menos dos) en alguna de las candidaturas a Presidencia Municipal o Sindicatura.
                            </li>
                            <li class="flex items-center text-justify">
                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0 text-gray-400 _c__six _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Fórmula de candidaturas a Presidente Municipal o Síndicatura perteneciente a grupos vulnerables.
                            </li>
                            <li class="flex items-start text-justify">
                                <svg class="w-3.5 h-3.5 me-2 mt-2 flex-shrink-0 text-gray-400 _c__seven  _c__check" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Fórmula de candidaturas en Representación Proporcional perteneciente a grupos vulnerables.
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
<!--                            <button class="_c__button_check w-full justify-center flex items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">-->
<!--                                <svg class="w-3.5 h-3.5 me-2 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">-->
<!--                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>-->
<!--                                 </svg>-->
<!--                                <span>Verificar</span>-->
<!--                            </button>-->
<!--                            <button class="_c__button_pdf w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">-->
<!--                                <span>Generar archivo</span>-->
<!--                            </button>-->
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

let partySelectorEl = document.querySelector('#parties'), rows_grouped = [], rows_grouped_rp_array = [],
    rows_grouped_rp = [], _c__check_array = [], _c_result;

let _c__button_check = document.querySelector('._c__button_check'), _c__check = document.querySelectorAll('._c__check');

let doc = new jsPDF('p', 'pt');

stickybits("_e__sticky", {
    useStickyClasses: true
});

stickybits("selector");

PartySelector(partySelectorEl)


// Check if the user is on a mobile device
window.mobileCheck = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

document.addEventListener('DOMContentLoaded', () => {

    let _s__party_name = "";

    // Show disclaimer
    new Modal({
        effect: 'zoom', // zoom|slide
        size: 'large', // small|medium|large|full
        title: `Consideraciones`, content: `
           <ol class="list-decimal ml-4 text-sm">
               <li class="text-justify">La información que el usuario ingrese en el Simulador no se almacena por ningún motivo, tenga a bien guardar su archivo de configuración si así lo desea.</li>
               <li class="text-justify">Este sistema es una herramienta didáctica que <b><u>NO</u></b> sustituye la revisión que se hará al momento del registro de candidaturas.</li>
               <li class="text-justify">Las personas que se auto adscriban como no binarias, serán consideradas para ocupar los lugares que le correspondan al género masculino, por ser este el sector que no ha sido históricamente discriminado. (Art. 13 numeral 1, fracción 1, inciso c de los Lineamientos para el registro de Candidaturas, integración de listas de representación proporcional e integración paritaria del Congreso del Estado de Durango para el Proceso Electoral Local 2023 – 2024).</li>
           </ol>`,
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
        if (window.scrollY >= threshold.top || window.pageYOffset >= threshold.top) $nav.classList.add('nav--fixed'); else

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
        _p__emblema = document.querySelector('._p__emblema'), _e__female, // All female
        _e__male, // All male
        _e__pride, // All pride
        _e__buttons;

    const modalStates = {};

    partySelectorEl.addEventListener('change', (e) => {

        _s__party_name = e.target.options[e.target.selectedIndex].text;

        _p__emblema.innerHTML = `
           <img src="` + (Parties.find(party => party.id.toString() === e.target.value)?.logo) + `" alt="${e.target.value}" class="w-40 h-40 mx-auto">
        `;
        // Ocultar regla de validación de RP, ya que las Coaliciones no tienen. (única excepción)
        let _c__four = document.querySelector('._c__four');
        if (e.target.value === '11') {
            _c__four.classList.remove('_c__check')
            _c__four.parentElement.classList.add('hidden');
        } else {
            if (!_c__four.classList.contains('_c__check')) {
                _c__four.classList.add('_c__check')
                _c__four.parentElement.classList.remove('hidden');
            }
        }

        if (e.target.value === '4' || e.target.value === '5' || e.target.value === '7' || e.target.value === '11') {

            Modal.alert(((e.target.value === '11') ? ("La Coalición seleccionada es parcial, por lo que es necesario que ingrese el número de candidaturas mujeres y hombres propietarias que forman parte del Partido Político que corresponda. ") : ("El Partido Político seleccionado forma parte de una Coalición Parcial, por lo que es necesario que ingrese el número de candidaturas mujeres y hombres propietarias que forman parte de la misma.")) + " Esto, con el fin de realizar los cálculos aritméticos necesarios para definir el género que encabezará y alternará en el listado de Representación Proporcional. Haga clic en el botón azul <div class='bg-blue-600 rounded-l-full p-1 align-bottom hover:cursor-pointer inline-block'> <svg xmlns='http://www.w3.org/2000/svg' class='text-white' width='16' height='16' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'> <path stroke='none' d='M0 0h24v24H0z' fill='none'/> <path d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z'/> <path d='M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0'/></svg></div> situado al lado derecho de su pantalla y seleccione el número de candidaturas por género.")

            let _dynamic__settings_obj = document.querySelector('._settings__content');

            _dynamic__settings_obj.innerHTML = `
            <form class="flex flex-col w-full">
				<div class="mb-3">
					<p class="text-sm dark:text-white">Seleccione el número de candidaturas mujeres y hombres que forman parte ` + ((e.target.value !== '11') ? ("del Partido Político que corresponda (PVEM, PT o MORENA).") : ("de la Coalición Sigamos Haciendo Historia en Durango")) + `</p>
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
				<div class="my-3">
					<p class="text-xs dark:text-white"><span class="text-red-600">*</span>Las candidaturas «No Binarias» suman al género masculino.</p>
				</div>`
            if (e.target.value === '4' || e.target.value === '5' || e.target.value === '7') {
                _dynamic__settings_obj.innerHTML += `   
                <div class="flex">
                    <div class="flex items-center h-5">
                        <input id="chkfyouth" aria-describedby="chkfyouth-text" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                    <div class="ms-2 text-sm">
                        <label for="chkfyouth" class="font-medium text-gray-900 dark:text-gray-300">He cumplido con fórmula de Jóvenes.</label>
                        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">Marque la casilla si el Partido Político en cuestión, ya cumple con la fórmula en la Coalición, esto, en cumplimiento del acuerdo IEPC/CG18/2024</p>
                    </div>
                </div>
                `
            }
            _dynamic__settings_obj.innerHTML += `
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
                minValue: 0, maxValue: 15, // infinite
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

        for (let entity of Blocks) {
            if (entity.party.id.toString() === e.target.value.toString()) {
                for (let block of entity.blocks) {
                    for (let key in block) {
                        // Prints the block number
                        _HTML__content += '<div class="animate__animated animate__faster animate__zoomIn bg-gray-200 p-4 my-4 dark:bg-gray-800 dark:text-white rounded-md" data-block="' + key + '" data-blocktype="electoral_block">' + '<h1 class="text-2xl font-sans font-semibold py-3 text-red-400 _c__block_' + key + '_text">Bloque ' + key + '</h1>'

                            + '<div class="grid w-full gap-6 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 grid-flow-row-dense auto-cols-max">'
                        for (const [index, municipality] of block[key].municipalities.entries()) {
                            _HTML__content += `
                                        <button class="municipality-button relative flex items-end py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            data-municipality="${municipality.municipality.name}" 
                                            data-rentability="${municipality.rentability}"
                                            data-councils="${municipality.municipality.councils}"
                                            data-first="${index === 0 ? 'true' : 'false'}" 
                                            data-block="${key}">
                                            <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z"/>
                                            </svg>
                                            <span class="sr-only">Estatus</span>
                                            <div class="flex w-full">
                                                <span class="font-medium self-start">${municipality.municipality.name}</span>
                                            </div>
                                            <div class="absolute inline-flex items-center justify-center h-6 px-1 text-xs text-white bg-green-500/50 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                                ${municipality.rentability}%
                                            </div>
                                        </button>
                            `
                            // Prints the municipality capital inside n block
                        }
                        _HTML__content += '' + '</div>' + '</div>'
                    }

                }
            }
        }

        _e__blocks.innerHTML += _HTML__content;

        _e__female = document.querySelectorAll('input[value="female"]');
        _e__male = document.querySelectorAll('input[value="male"]');
        _e__pride = document.querySelectorAll('input[value="g5"]');
        _e__buttons = document.querySelectorAll('.municipality-button')

        _e__buttons.forEach((el) => {
            el.addEventListener('click', (event) => {
                // Asegurar que el evento proviene del botón y no de un elemento hijo
                const targetButton = event.currentTarget;

                const municipalityName = targetButton.dataset.municipality.replace(/\s+/g, '_') || "Desconocido";
                const block = targetButton.dataset.block || "Sin bloque";
                const totalCouncils = parseInt(targetButton.dataset.councils) || 0; // Número de regidurías
                const modalId = `modal-${municipalityName.replace(/\s+/g, '-').toLowerCase()}-${block}`;

                // Inicializar datos del estado del modal si no existen
                if (!modalStates[modalId]) {
                    modalStates[modalId] = {
                        presidency: {proprietor: "", substitute: ""},
                        sindicature: {proprietor: "", substitute: ""},
                        councils: [],
                    };
                }

                let councilsHTMLArray = [];

                for (let i = 0; i < totalCouncils; i++) {
                    const savedCouncil = modalStates[modalId]?.councils[i] || { proprietor: "", substitute: "" };
                    console.log("savedCouncil: ", savedCouncil?.proprietor);
                    councilsHTMLArray.push(`         
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <p class="font-semibold text-md mb-1">Propietario:</p>
                                <div class="bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl shadow">
                                    ${generateRadioButtons(modalId, `councils-${i}`, "proprietor",  savedCouncil?.proprietor)}
                                </div>
                            </div>
                            <div>
                                <p class="font-semibold text-md mb-1">Suplente:</p>
                                <div class="bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl shadow">
                                    ${generateRadioButtons(modalId, `councils-${i}`, "substitute",  savedCouncil?.substitute)}
                                </div>
                            </div>
                        </div>
                    `);
                }

                const councilsHTML = `<h3 class="mt-4 font-semibold">Regidurías</h3>` + councilsHTMLArray.join("");

                // Crear el modal y personalizar el contenido
                const blockModal = new Modal({
                    title: `${municipalityName}`,
                    content: `
                        <div class="modal-content">
                            <p>Bloque: ${block}</p>
                            
                            <h3 class="mt-4 font-semibold text-lg">Presidencia Municipal</h3>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <p class="font-semibold text-md mb-1">Propietario:</p>
                                    <div class="bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl shadow">
                                        ${generateRadioButtons(modalId, "presidency", "proprietor", modalStates[modalId].presidency.proprietor)}
                                    </div>
                                </div>
                                <div>
                                    <p class="font-semibold text-md mb-1">Suplente:</p>
                                    <div class="bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl shadow">
                                        ${generateRadioButtons(modalId, "presidency", "substitute", modalStates[modalId].presidency.substitute)}
                                    </div>
                                </div>
                            </div>
            
                            <h3 class="mt-4 font-semibold text-lg">Sindicatura</h3>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <p class="font-semibold text-md mb-1">Propietario:</p>
                                    <div class="bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl shadow">
                                        ${generateRadioButtons(modalId, "sindicature", "proprietor", modalStates[modalId].sindicature.proprietor)}
                                    </div>
                                </div>
                                <div>
                                    <p class="font-semibold text-md mb-1">Suplente:</p>
                                    <div class="bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl shadow">
                                        ${generateRadioButtons(modalId, "sindicature", "substitute", modalStates[modalId].sindicature.substitute)}
                                    </div>
                                </div>
                            </div>
                            ${councilsHTML} <!-- 📌 Agregamos la lista de Regidurías -->
                        </div>
                    `, size: "large",
                });

                setTimeout(() => {
                    blockModal.open();

                    // Guardar selección de radio cuando cambia
                    blockModal.options.element.querySelectorAll(`input[name^="gender-${modalId}-"], input[name^="special-${modalId}-"]`).forEach(radio => {
                        radio.addEventListener("change", (e) => {
                            const nameParts = e.target.name.split("-");
                            const type = nameParts.pop(); // Último elemento (proprietor/substitute)
                            const category = nameParts.pop(); // Penúltimo elemento (presidency/sindicature)
                            const attribute = nameParts[0] === "gender" ? "gender" : "special";

                            // Guardar selección en modalStates
                            if (!modalStates[modalId][category][type]) {
                                modalStates[modalId][category][type] = {};
                            }

                            modalStates[modalId][category][type][attribute] = e.target.value;

                        });
                    });

                    // Guardar selección de regidurías
                    blockModal.options.element.querySelectorAll(`input[name^="gender-${modalId}-councils-"], input[name^="special-${modalId}-councils-"]`).forEach(radio => {
                        radio.addEventListener("change", (e) => {
                            const nameParts = e.target.name.split("-");
                            const index = parseInt(nameParts[5]); // Obtener el índice de la Regiduría
                            const type = nameParts.pop();
                            const attribute = nameParts[0] === "gender" ? "gender" : "special";

                            console.log("nameParts: ", nameParts, "index: ", index, "type: ", type, "attribute: ", attribute);

                            if (!modalStates[modalId].councils[index]) {
                                modalStates[modalId].councils[index] = {proprietor: "", substitute: ""};
                            }
                            modalStates[modalId].councils[index][type] = e.target.value;
                        });
                    });

                }, 50); // Pequeño delay para asegurar que el modal se ha abierto

            });
        })

    })

    window.addEventListener('change', (El) => {
        console.log(modalStates);
        // Buscamos las palomitas
        let _c__one = document.querySelector('._c__one'),
            _c__two = document.querySelector('._c__two'),
            _c__three = document.querySelector('._c__three'),
            _c__four = document.querySelector('._c__four'),
            _c__five = document.querySelector('._c__five'),
            _c__six = document.querySelector('._c__six'),
            _c__seven = document.querySelector('._c__seven');

        // SI EL PROPIETARIO ES MUJER, NO PERMITIR QUE EL SUPLENTE SEA HOMBRE
        Object.keys(modalStates).forEach((modalId) => {
            ["presidency", "sindicature"].forEach((category) => {
                if (modalStates[modalId][category].proprietor?.gender === "Mujer" && modalStates[modalId][category].substitute?.gender !== "Mujer" && modalStates[modalId][category].substitute?.gender) {
                    // Revertir selección incorrecta
                    const invalidInput = document.querySelector(`input[name="gender-${modalId}-${category}-substitute"][value="${modalStates[modalId][category].substitute.gender}"]`);

                    // console.log("gender: ", invalidLabel);

                    if (invalidInput) {
                        const invalidLabel = invalidInput.nextElementSibling;

                        invalidInput.checked = false;

                        // Guardar clases originales para restaurarlas después
                        const originalClasses = invalidLabel.className;

                        // Eliminar clases previas y agregar clases de error
                        invalidLabel.classList.remove("border-gray-300", "focus:ring-blue-500", "focus:border-blue-500"); // Clases previas (ajústalas según tu diseño)
                        invalidLabel.classList.add("border-red-500", "ring-2", "ring-red-500");

                        // Restaurar las clases originales después de 3 segundos
                        setTimeout(() => {
                            invalidLabel.className = originalClasses;
                        }, 1000);
                    }

                    modalStates[modalId][category].substitute = "";

                    // Mostrar la alerta legal
                    Modal.alert(`Las postulaciones a los ayuntamientos propietarias y suplencias deben ser del mismo género. (Art. 184 numeral 2 de la LIPEED) </br> <small>LIPEED: Ley de Instituciones y Procedimientos Electorales Para el Estado de Durango.</small>`);
                }
            });
            modalStates[modalId].councils.forEach((council, index) => {
                console.log("council: ", council);
                if (council.proprietor === "Mujer" && council.substitute !== "Mujer" && council.substitute) {
                    // Mostrar la alerta legal
                    Modal.alert(`Las postulaciones a los ayuntamientos propietarias y suplencias deben ser del mismo género. (Art. 184 numeral 2 de la LIPEED) </br> <small>LIPEED: Ley de Instituciones y Procedimientos Electorales Para el Estado de Durango.</small>`);
                }
            });
        });

        // AL MENOS EL 50% DE LOS MUNICIPIOS DEBEN TENER UNA CANDIDATURA DE MUJER.
        // Calcular el 50% de candidaturas basado en el total de municipios que tiene el Partido P. seleccionado.
        const totalMunicipalities = document.querySelectorAll('.municipality-button');
        const fiftyPercent = Math.ceil(totalMunicipalities.length / 2);
        // Recorremos modalStates para contar cuántas candidaturas mujeres como propietarias en Presidencia Municipal (presidency) hay.
        const femalePresidency = []

        Object.values(modalStates).forEach(modal => {
            if (modal.presidency?.proprietor?.gender === "Mujer") {
                femalePresidency.push(modal.presidency?.proprietor?.gender);
            }
        });

        femalePresidency.length >= fiftyPercent ? _c__one.classList.replace('text-gray-400', 'text-green-400') : _c__one.classList.replace('text-green-400', 'text-gray-400');
        // console.log("Total de municipios: ", totalMunicipalities.length, "50%: ", fiftyPercent, "Mujeres: ", femalePresidency.length);

        // AL MENOS UN BLOQUE ENCABEZADO POR FORMULAS DE MUJERES
        // Dado que se guarda el numero de bloque en el nombre de la llave en modalStates, podemos agrupar por bloque y contar cuántas fórmulas de mujeres hay.

        const firstMunicipalities = document.querySelectorAll('.municipality-button[data-first="true"]');
        let blocksWithWomenFormula = 0;

        firstMunicipalities.forEach((municipality) => {
            if (modalStates['modal-' + municipality.dataset.municipality.replace(/\s+/g, '_').toLowerCase() + "-" + municipality.dataset.block]?.presidency?.proprietor?.gender === "Mujer" &&
                modalStates['modal-' + municipality.dataset.municipality.replace(/\s+/g, '_').toLowerCase() + "-" + municipality.dataset.block]?.sindicature?.proprietor?.gender === "Mujer" &&
                modalStates['modal-' + municipality.dataset.municipality.replace(/\s+/g, '_').toLowerCase() + "-" + municipality.dataset.block]?.presidency?.substitute?.gender === "Mujer" &&
                modalStates['modal-' + municipality.dataset.municipality.replace(/\s+/g, '_').toLowerCase() + "-" + municipality.dataset.block]?.sindicature?.substitute?.gender === "Mujer") {
                blocksWithWomenFormula++;
            }
        });

        console.log("Bloques con fórmula de mujeres: ", blocksWithWomenFormula, "Primeras municipios: ", firstMunicipalities);

        // Validar si al menos un bloque tiene fórmula femenina en ambos cargos
        blocksWithWomenFormula > 0 ? _c__two.classList.replace('text-gray-400', 'text-green-400') : _c__two.classList.replace('text-green-400', 'text-gray-400');

        // INTEGRACIÓN PARITARIA EN CADA BLOQUE
        // Dado que se guarda el número de bloque en el nombre de la llave en modalStates, podemos agrupar por bloque y contar cuántas fórmulas de mujeres y hombres hay.
        //  Filtramos los bloques y separamos en objetos distintos
        const blockOne = [], blockTwo = [], blockThree = [];

        const countMunicipalitiesByBlock = _.groupBy(totalMunicipalities, function (e) {
            return e.dataset.block;
        });

        Object.keys(modalStates).forEach(key => {
            if (key.endsWith("1") && modalStates[key].presidency?.proprietor.gender === 'Mujer' && modalStates[key].presidency?.substitute.gender === 'Mujer') {
                blockOne.push('p');
            }
            if (key.endsWith("1") && modalStates[key].sindicature?.proprietor.gender === 'Mujer' && modalStates[key].sindicature?.substitute.gender === 'Mujer') {
                blockOne.push('s');
            }
            if (key.endsWith("2") && modalStates[key].presidency?.proprietor.gender === 'Mujer' && modalStates[key].presidency?.substitute.gender === 'Mujer') {
                blockTwo.push('p');
            }
            if (key.endsWith("2") && modalStates[key].sindicature?.proprietor.gender === 'Mujer' && modalStates[key].sindicature?.substitute.gender === 'Mujer') {
                blockTwo.push('s');
            }
            if (key.endsWith("3") && modalStates[key].presidency?.proprietor.gender === 'Mujer' && modalStates[key].presidency?.substitute.gender === 'Mujer') {
                blockThree.push('p');
            }
            if (key.endsWith("3") && modalStates[key].sindicature?.proprietor.gender === 'Mujer' && modalStates[key].sindicature?.substitute.gender === 'Mujer') {
                blockThree.push('s');
            }
        });

        console.log("Bloque 1: ", blockOne);
        console.log("Bloque 2: ", blockTwo);
        console.log("Bloque 3: ", blockThree);

        // Obtenemos el tamaño de cada bloque
        const blockOneSize = countMunicipalitiesByBlock['1']?.length || 0,
            blockTwoSize = countMunicipalitiesByBlock['2']?.length || 0,
            blockThreeSize = countMunicipalitiesByBlock['3']?.length || 0;
        // Verificar si los bloque tienen un número impar de municipios.
        const isBlockOneOdd = blockOneSize % 2 !== 0, isBlockTwoOdd = blockTwoSize % 2 !== 0,
            isBlockThreeOdd = blockThreeSize % 2 !== 0;

        if (isBlockOneOdd && isBlockTwoOdd && isBlockThreeOdd) {
            if (blockOne.length >= (blockOneSize + 1) && blockTwo.length >= (blockTwoSize + 1) ||
                blockOne.length >= (blockOneSize + 1) && blockThree.length >= (blockThreeSize + 1) ||
                blockTwo.length >= (blockTwoSize + 1) && blockThree.length >= (blockThreeSize + 1)) {
                _c__four.classList.replace('text-gray-400', 'text-green-400');
            } else {
                _c__four.classList.replace('text-green-400', 'text-gray-400');
            }
        } else {
            if (blockOne.length >= (blockOneSize + 1) || blockTwo.length >= (blockTwoSize + 1) || blockThree.length >= (blockThreeSize + 1)) {
                _c__four.classList.replace('text-gray-400', 'text-green-400');
            } else {
                _c__four.classList.replace('text-green-400', 'text-gray-400');
            }
        }

        // FÓRMULA DE JÓVENES (AL MENOS DOS) EN ALGUNA DE LAS CANDIDATURAS A PRESIDENCIA MUNICIPAL O SINDICATURA.
        const youthFormula = [];

        Object.keys(modalStates).forEach(key => {
            if (modalStates[key].presidency?.proprietor.special === 'Joven' && modalStates[key].presidency?.substitute.special === 'Joven') {
                youthFormula.push('p');
            }
            if (modalStates[key].sindicature?.proprietor.special === 'Joven' && modalStates[key].sindicature?.substitute.special === 'Joven') {
                youthFormula.push('s');
            }
        });

        (youthFormula.length >= 2) ? _c__five.classList.replace('text-gray-400', 'text-green-400') : _c__five.classList.replace('text-green-400', 'text-gray-400');

        // FÓRMULA DE CANDIDATURAS A PRESIDENTE MUNICIPAL O SÍNDICATURA PERTENECIENTE A GRUPOS VULNERABLES.
        const vulnerableFormula = [];

        Object.keys(modalStates).forEach(key => {
            if (modalStates[key].presidency?.proprietor.special === 'Vulnerable' && modalStates[key].presidency?.substitute.special === 'Vulnerable') {
                vulnerableFormula.push('p');
            }
            if (modalStates[key].sindicature?.proprietor.special === 'Vulnerable' && modalStates[key].sindicature?.substitute.special === 'Vulnerable') {
                vulnerableFormula.push('s');
            }
        });

        vulnerableFormula.length >= 1 ? _c__six.classList.replace('text-gray-400', 'text-green-400') : _c__six.classList.replace('text-green-400', 'text-gray-400');

        // NO POSTULAR MUJERES EN LAS PRESIDENCIAS MUNICIPALES DE LOS DOS ÚLTIMOS MUNICIPIOS DEL ÚLTIMO BLOQUE.
        // Obetenemos el número de llaves de countMunicipalitiesByBlock para saber cuántos bloques hay.
        const totalBlocks = Object.keys(countMunicipalitiesByBlock).length;
        // Obtenemos los últimos dos municipios de countMunicipalitiesByBlock del último bloque.
        const lastBlockMunicipalities = countMunicipalitiesByBlock[totalBlocks].slice(-2);
        // Generamos el formato de nombre que contiene modalStates para traer los datos de los dos últimos municipios.
        const lastBlockMunicipalitiesKeys = lastBlockMunicipalities.map(m => `modal-${m.dataset.municipality.replace(/\s+/g, '-').toLowerCase()}-${m.dataset.block}`);
        // Iteramos sobre las llaves de los dos últimos municipios para verificar si hay una mujer sin importar si es en la presidencia o sindicatura y si es propietaria o suplente.
        if (partySelectorEl.value.toString() !== "4" || partySelectorEl.value.toString() !== "5" || partySelectorEl.value.toString() !== "7") {
            if (lastBlockMunicipalitiesKeys.some(key =>
                modalStates[key]?.presidency?.proprietor?.gender === 'Mujer' ||
                modalStates[key]?.presidency?.substitute?.gender === 'Mujer' ||
                modalStates[key]?.sindicature?.proprietor?.gender === 'Mujer' ||
                modalStates[key]?.sindicature?.substitute?.gender === 'Mujer')) {
                Modal.alert(`No Puede postular mujeres en los dos últimos municipios del último bloque.`);
            }
        }

        // ALTERNAR
        Object.keys(modalStates).forEach((modalId) => {
            // Si se selecciona un hombre en la presidencia, se debe seleccionar una mujer en la sindicatura.
            if (modalStates[modalId].presidency?.proprietor.gender === "Hombre") {
                // Buscamos el radio de la sindicatura mujer.
                const sindicatureWoman = document.querySelector(`input[name="gender-${modalId}-sindicature-proprietor"]`);
                // Seleccionamos el radio de la sindicatura mujer.
                sindicatureWoman.checked = true;
                // Buscamos la primera regiduría y seleccionamos un hombre.
                // gender-modal-santiago-papasquiaro-1-councils-0-proprietor
                const firstCouncilMan = document.querySelector(`input[name="gender-${modalId}-councils-0-proprietor"][value="Hombre"]`);
                firstCouncilMan.checked = true;

                console.log("sindicatureWoman: ", sindicatureWoman.value);
                // Avisamos al usuario
                Modal.alert(`Si por la presidencia municipal contiende un hombre, la candidatura para la sindicatura deberá ser para una mujer, la primera regiduría para un hombre, la segunda para una mujer, y así sucesivamente hasta agotar todas las posiciones (Art. 184 inciso a) II de la LIPEED) </br> <small>LIPEED: Ley de Instituciones y Procedimientos Electorales Para el Estado de Durango.</small>`);
            }
        });
    });

    function generateRadioButtons(modalId, category, type, selectedValue = "") {
        const saveGender = modalStates[modalId]?.[category]?.[type]?.gender || "";
        const savedSpecial = modalStates[modalId]?.[category]?.[type]?.special || "";
        const ec = category.split("-")[0]; // Extracted Category
        console.log("real_category: ", ec);
        return `
            <ul class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <li>
                    <input type="radio" name="gender-${modalId}-${category}-${type}" id="gender-${modalId}-${category}-${type}-m" value="Mujer" ${ec === "councils" ? (selectedValue === "Mujer" ? "checked" : "") : (selectedValue.gender === "Mujer" ? "checked" : "") } class="hidden peer">
                    <label for="gender-${modalId}-${category}-${type}-m" id="gender-${modalId}-${category}-${type}-m" data-gender="Mujer" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                        <div class="block">
                            <div class="w-full text-sm">Mujer</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                    <input type="radio" name="gender-${modalId}-${category}-${type}" id="gender-${modalId}-${category}-${type}-n" value="No-Binario" ${ec === "councils" ? (selectedValue === "No-Binario" ? "checked" : "") : (selectedValue.gender === "No-Binario" ? "checked" : "")}  class="hidden peer">
                    <label for="gender-${modalId}-${category}-${type}-n" id="gender-${modalId}-${category}-${type}-n" data-gender="No-Binario" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-full text-sm">No Binario</div>
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
                    <input type="radio" name="gender-${modalId}-${category}-${type}" id="gender-${modalId}-${category}-${type}-h" value="Hombre" ${ec === "councils" ? (selectedValue === "Hombre" ? "checked" : "") : (selectedValue.gender === "Hombre" ? "checked" : "")}  class="hidden peer">
                    <label for="gender-${modalId}-${category}-${type}-h" id="gender-${modalId}-${category}-${type}-h" data-gender="Hombre" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-full text-sm">Hombre</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
            </ul>
            <p class="mt-2">Grupos:</p>
            <label><input type="radio" name="special-${modalId}-${category}-${type}" value="Joven" ${ec === "councils" ? (selectedValue === "Joven" ? "checked" : "") : (selectedValue.gender === "Joven" ? "checked" : "")} > Jóven</label>
            <label><input type="radio" name="special-${modalId}-${category}-${type}" value="Vulnerable" ${ec === "councils" ? (selectedValue === "Vulnerable" ? "checked" : "") : (selectedValue.gender === "Vulnerable" ? "checked" : "")} >Vulnerable</label>
            
    `;
    }
});





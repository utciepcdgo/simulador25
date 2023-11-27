import './style.css'
import { setupCounter } from './counter.js'
import { PartySelector } from './modules/PartySelector.js';

document.querySelector('#app').innerHTML = `
  <div class="dark:text-white">
    <div class="container mx-auto">
		<select name="parties" id="parties">
			<option value="0">Select a party</option>
		</select>
	</div>
  </div>
`

// setupCounter(document.querySelector('#counter'))
PartySelector(document.querySelector('#parties'));

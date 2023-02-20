import { getObjectFull } from "../api.js";
import '../routie.min.js';

export class ArtPage extends HTMLElement {
	constructor() {
		super();
		// this.shadow = this.attachShadow({mode: 'open'});
		this.addEventListener('click', (event) => {
			routie(window.localStorage.getItem('returnpath'))
		})
		// Set the addEventListener in a timeout, so you can't activate 
		// the removal before the object is loaded
		// setTimeout(() => {
		// 	pageFiller.addEventListener('click', event => {
		// 		pageFiller.animate([
		// 			{ opacity: 100 },
		// 			{ opacity: 0 }
		// 		], {
		// 			duration: 500,
		// 			easing: 'ease-in-out'
		// 		})

		// 		setTimeout(() => {
		// 			pageFiller.remove();
		// 		}, 480);
		// 	})
		// }, 480);

		this.artObjectImage = document.createElement('img');
		this.artObjectTitle = document.createElement('h1');
		this.artObjectDetails = document.createElement('div');
		this.artObjectDescription = document.createElement('div');

		this.artObjectLoader = document.createElement('div');
		this.artObjectLoader.className = 'loading';
		for(let i = 0; i < 4; i++) {
			this.artObjectLoader.appendChild(document.createElement('span'));
		}
		this.loadingText = document.createElement('h1');
		this.loadingText.textContent = 'Loading...';
	}

	static get observedAttributes(){
		return ['id'];
	}

	async updateObject() {
		this.appendChild(this.artObjectLoader);
		this.appendChild(this.loadingText);

		const res = await getObjectFull(this.objectID)
		try {
			this.artObjectImage.src = res.artObject.webImage.url;
		} catch (e) {
			console.warn('Webimage appears undefined. Very sadge, falling back to localstorage\n' + e)
			const localStorageArtObject = JSON.parse(window.localStorage.getItem('artobject'));
			this.artObjectImage.src = localStorageArtObject.webImage.url;
		}
		this.artObjectImage.alt = res.artObject.title;
		this.artObjectTitle.textContent = res.artObject.title;
		this.artObjectDetails.innerHTML = 
		`
		<h3>Information</h3>
		<p>
		- Title:    ${res.artObject.title} <br>
		- Artist:   ${res.artObject.principalOrFirstMaker} <br>
		- Location: ${res.artObject.productionPlaces[0]} <br><br>
		</p>
		<h3>Description</h3>
		<p>${res.artObject.description}</p>
		`

		this.artObjectDescription.innerHTML = 
		`
		`
		try {
			this.removeChild(this.artObjectLoader);
			this.removeChild(this.loadingText);
		} catch (e) {
			console.warn('This dumb bitch is complaining about removing a node that it thinks isn\'t there but it actually is.\n' + e)
		}
		this.appendChild(this.artObjectTitle);
		this.appendChild(this.artObjectImage);
		this.appendChild(this.artObjectDetails);
		this.appendChild(this.artObjectDescription);
	}

	attributeChangedCallback(prop, oldVal, newVal) {
		if (prop === 'id') {
			this.objectID = newVal;
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = "";
		this.className = 'artobject';
		if(this.objectID) {
			this.updateObject();
		}

	}
}

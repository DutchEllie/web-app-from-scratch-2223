import { getObjectFull } from "../api.js";
import '../routie.min.js';

export class ArtPage extends HTMLElement {
	constructor() {
		super();

		this.closer = document.createElement('span');
		this.closer.className = 'closebutton';
		this.closer.addEventListener('click', event => {
			routie(window.localStorage.getItem('returnpath'));
		})
		this.artObjectImage = document.createElement('img');
		this.artObjectTitle = document.createElement('h1');
		this.artObjectDetails = document.createElement('div');

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

		try {
			const res = await getObjectFull(this.objectID)
			
			// For some reason, their API is shite
			// Not really surprising actually
			// Anyway, they sometimes for no reason don't include an image in the
			// full object details, while they did in the search results...
			// So we literally have to try/catch their stupidity.
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
			<ul>
			${res.artObject.title ? '<li>Title: ' + res.artObject.title + '</li>' : ''} 
			${res.artObject.principalOrFirstMaker ? '<li>Artist: ' + res.artObject.principalOrFirstMaker + '</li>' : ''} 
			${res.artObject.productionPlaces[0] ? '<li>Location: ' + res.artObject.productionPlaces[0] + '</li>' : ''} 
			</ul>
			${res.artObject.description ? 
				`<h3>Description</h3>
				<p>${res.artObject.description}</p>`
				:
				''
			}
			`
		} catch(e) {
			console.error(e);
			this.artObjectTitle.textContent = "Error loading data";
			this.artObjectImage.src = '/static/error.jpg';
			this.artObjectImage.alt = 'Error loading data: computer says no';
			this.artObjectDetails.innerHTML = `
			<h3>Information</h3>
			<p>
			- Title:		Computer says no <br>
			- Source: 	Little Britain <br>
			- Location: TV <br><br>
			</p>
			`
		}

		// This dumb bitch is complaining about shit.
		// Just catch this and ignore.
		try {
			this.removeChild(this.artObjectLoader);
			this.removeChild(this.loadingText);
		} catch (e) {
			console.warn('This dumb bitch is complaining about removing a node that it thinks isn\'t there but it actually is.\n' + e)
		}
		this.appendChild(this.artObjectTitle);
		this.appendChild(this.closer);
		this.appendChild(this.artObjectImage);
		this.appendChild(this.artObjectDetails);
	}

	attributeChangedCallback(prop, oldVal, newVal) {
		if (prop === 'id') {
			this.objectID = newVal;

			// Calling render here makes it more reactive.
			// This isn:t strictly needed and we don't use it, but why leave it out?
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

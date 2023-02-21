import { getTopPieces } from "../api.js";
import { QuickArtObject} from './quickartobject.js'
import '../routie.min.js';

export class HomePage extends HTMLElement {
	constructor() {
		super();
		// this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	async fetchData() {
		const topPieces = await getTopPieces();

		var counter = 0;
		topPieces.artObjects.forEach(piece => {
			this.quickArtContainer.childNodes[counter].data = piece;
			this.quickArtContainer.childNodes[counter].id = piece.objectNumber;
			this.quickArtContainer.childNodes[counter].setAttribute('src', piece.webImage.url);
			counter++;
		})
	}

	render() {
		// Create the container
		this.quickArtContainer = document.createElement('div');
		this.quickArtContainer.className = 'quick-art-container';

		for (let i = 0; i < 10; i++) {
			const quickArtObject = document.createElement('quickart-element');
			quickArtObject.returnPath = '/';
			quickArtObject.id = '';
			quickArtObject.setAttribute('src', '/static/loading.png');
			this.quickArtContainer.appendChild(quickArtObject);
		}

		// Start fetching the data
		// This function also changes the data on the objects.
		this.fetchData();

		this.innerHTML = `
      <div class="homepage animate">
        <header>
          <h1>Rijksmuseum</h1>
          <hr />
        </header>
        <main>
          <section>
            <h2>Quick art</h2>
          </section>
          <section>
            <h2>Search</h2>
            <form id="search-form">
              <input type="text" name="search" id="search" />
              <input type="submit" />
            </form>
          </section>
        </main>
      </div>
		`

		const DOMquickArtContainer = this.querySelector('main > section:first-of-type');
		DOMquickArtContainer.appendChild(this.quickArtContainer);

		const searchForm = this.querySelector('#search-form');
		searchForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const input = this.querySelector('#search').value;
			routie(`search/${input}`);
		})
	}
}
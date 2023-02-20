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

	async quickArtContainer() {
		const container = document.createElement('div');
		container.className = 'quick-art-container';

		const topPieces = await getTopPieces();
		topPieces.artObjects = topPieces.artObjects.slice(0,9);

		topPieces.artObjects.forEach(element => {
			const quickArt = document.createElement('quickart-element');
			quickArt.data = element;
			quickArt.returnPath = '/';
			quickArt.id = element.objectNumber;
			quickArt.setAttribute('src', element.webImage.url);
			container.appendChild(quickArt);
		});
		
		return container;
	}

	async render() {
		const quickArt = await this.quickArtContainer();

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
		const quickArtContainer = this.querySelector('main > section:first-of-type')
		quickArtContainer.appendChild(quickArt);
		const searchForm = this.querySelector('#search-form');
		searchForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const input = this.querySelector('#search').value;
			routie(`search/${input}`);
		})
	}
}

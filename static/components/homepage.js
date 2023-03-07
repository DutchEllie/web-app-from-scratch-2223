import { getTopPieces } from "../api.js";
import '../routie.min.js';

export class HomePage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	async fetchData() {
		try {
			const topPieces = await getTopPieces();
			var counter = 0;
			topPieces.artObjects.forEach(piece => {
				this.quickArtContainer.childNodes[counter].data = piece;
				this.quickArtContainer.childNodes[counter].id = piece.objectNumber;
				this.quickArtContainer.childNodes[counter].setAttribute('src', piece.webImage.url);
				counter++;
			})
		} catch (e) {
			console.error(e);
			const errorPain = {
				title: "Computer says no"
			}
			this.quickArtContainer.childNodes.forEach(node => {
				node.setAttribute('src', '/static/error.jpg');
				node.id = 'error';
				node.data = errorPain;
			})
		}	
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

		// Doing this is easier and cleaner than using Javascript objects
		this.innerHTML = `
      <div class="homepage animate">
        <header>
          <h1>Rijksmuseum</h1>
        </header>
        <main>
					<p>
					Beleef nu de wonderen van het Rijksmuseum via het internet!
					</p>
          <section>
            <h2>Search</h2>
            <form id="search-form">
              <input type="text" name="search" id="search" />
              <input type="submit" />
            </form>
          </section>
          <section>
            <h2>Quick art</h2>
          </section>
        </main>
      </div>
		`

		const DOMquickArtContainer = this.querySelector('main > section:nth-of-type(2)');
		DOMquickArtContainer.appendChild(this.quickArtContainer);

		const searchForm = this.querySelector('#search-form');
		searchForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const input = this.querySelector('#search').value;
			routie(`search/${input}`);
		})
	}
}

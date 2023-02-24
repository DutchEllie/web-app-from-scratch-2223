const key = 'PgOnkq9m';

export async function getTopPieces() {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection?' + new URLSearchParams({
		// Insert key here before running
		key: key,
		toppieces: 'True'
	}));
	const data = await res.json();

	return data;
}

export async function getObjectFull(objnum) {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection/' + objnum + '?'
		+ new URLSearchParams({
			key: key
	}));
	const data = await res.json();

	return data;
}

export async function getSearchResults(query) {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection?' + new URLSearchParams({
		// Insert key here before running
		key: key,
		q: query
	}));

	const data = await res.json();

	return data;
}
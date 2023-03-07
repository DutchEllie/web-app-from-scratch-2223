const key = 'PgOnkq9m';

// Everywhere in my code, I have expected the data to come back straight as it is from the API
// I could have made this more object oriented, especially if I used Typescript.
// But alas, I didn't and now this is how it is.

// Cleaning my data using map, filter and/or reduce functions is now going to cause me more issues than it solves.

// To give an example, sometimes the API gives an artpiece back in a collection query and it will have an image
// but when you then query the item itself, there is no image.
// This is dealt with in the code, but dealing with it here requires knowing what query resulted in that image being shown.
// I can't know that here, so implementing a map function to add an image to the artpiece is impossible.
// I could also filter those out, but then you would miss totally valid objects.

// Another use for a map function would be to rename some things, clean the response and remove unnecessary fields.
// This makes the data I move around a little smaller.
// However, this is absolutely useless for performance, since moving around data is fast anyway.
// It also does not reduce the amount of data that is loaded from the server, so network load is not affected.
// In other words:
// 	I would need to rewrite most of my functions for no reason.

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

export async function getSearchResults(query, pageNumber) {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection?' + new URLSearchParams({
		// Insert key here before running
		key: key,
		q: query,
		p: pageNumber
	}));

	const data = await res.json();

	return data;
}
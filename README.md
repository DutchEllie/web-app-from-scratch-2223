# Web App From Scratch - Rijksmuseum App

This is an app for school that uses the Rijksmuseum API to display art.
It's a web app (single page application).

## Week 2 - Begin

Ik heb gekozen voor de Rijksmuseum opdracht omdat dit een leuke opdracht leek.
Er moet een beetje design in en je kan leuke dingen doen met Javascript hiervoor.

Om te beginnen heb ik een design getekend.
![Basic design](docs/design.jpg)

Hier is de beginpagina, de details pagina en de kunstenaar pagina beschreven.
De kunstenaarpagina is later vervangen door een zoekpagina, maar het design is ongeveer hetzelfde.

Ik ben begonnen met het maken van de pagina in HTML en CSS en heb later JS toegepast om er meer een app van te maken.
Het is een beetje achterhaald en onhandig gedaan, maar de JS code voegt na bepaalde acties een `<div>` toe aan de onderkant van de pagina, die met een `z-index` naar de bovenkant van de pagina wordt gesleept.
Er vindt een fading animatie plaats om deze transitie een beetje netjes te laten gaan.

Toen ik later snel meer leerde over CSS kwam ik er een beetje achter dat ik dit beter had kunnen doen met iets meer CSS en de Javascript een beetje simpeler te laten worden.
Zo hoeft de zogehete `pagefiller` `<div>` niet door Javascript toegevoegd te worden aan de pagina, maar kan je ook gebruik maken van CSS focus states om dit te regelen.

Dit is iets dat ik in week 3 wil gaan aanpassen, als we gaan refactoren.

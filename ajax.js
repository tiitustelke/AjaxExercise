'use strict';

const form = document.querySelector('#search-form');
const main = document.querySelector('main');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try {
  const hakusana = document.querySelector('input[name=search-field]').value;
  console.log(hakusana);
  const vastaus = await fetch('http://api.tvmaze.com/search/shows?q=' + hakusana);
  const sarjat = await vastaus.json();
  console.log(sarjat);
    main.innerHTML = '';
    sarjat.forEach((sarja) => {
      const kuva = sarja.show.image ? sarja.show.image.medium : 'http://placekitten.com/210/295/';

      const html = `<article>
                          <h2>${sarja.show.name}</h2>
                          <a href=${sarja.show.officialSite || sarja.show.url}>Link to homepage</a>
                          <figure>
                              <img src="${kuva}" alt="${sarja.show.name}">
                              <figcaption>${sarja.show.name}</figcaption>
                          </figure>
                          <p>Genres: ${sarja.show.genres.join(', ')}</p>
                          ${sarja.show.summary}
                      </article>`;
      main.innerHTML += html;
    });
  }
  catch (e) {
    console.log(e.message);
  }
});
async function renderPeople(url, isJSON, requiresProxy) {
  isJSON = isJSON || false;

  requiresProxy = requiresProxy || false;
  requiresProxy ? url = 'https://cors-anywhere.herokuapp.com/' + url : url = url;

  await fetch(url).then(resp => isJSON ? resp.json() : resp.text()).then(e => {
    const target = document.querySelectorAll(`.createPerson`);
    target.forEach(el => {
      setTimeout(function addPerson () {
        const num = el.getAttribute('person') - 1;
        const name = document.createElement('h1');
        const birthYear = document.createElement('p');
        const homeWorld = document.createElement('p');
        
        name.textContent = e.results[num].name;
        name.class = 'name';
        el.insertAdjacentElement('beforeend', name);
        
        homeWorld.textContent = 'Home World: ';
        homeWorld.class = 'homeWorld';
        el.insertAdjacentElement('beforeend', homeWorld);

        birthYear.textContent = 'Birth: ' + e.results[num].birth_year;
        birthYear.class = 'birthYear';
        el.insertAdjacentElement('beforeend', birthYear);
    
      }, Math.random() * 2000);
    });

  }).catch(console.error);
}

renderPeople('https://swapi.dev/api/people/', true, true);

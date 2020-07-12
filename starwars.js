async function renderPeople(url, requiresProxy) {
  const target = document.querySelectorAll(`.createPerson`);

  if (!target) {
    return;
  }

  requiresProxy = requiresProxy || false;
  requiresProxy ? url = 'https://cors-anywhere.herokuapp.com/' + url : url = url;

  const resp = await fetch(url);
  const json = await resp.json();

  target.forEach(el => {
    setTimeout(function addPerson () {
      const num = el.getAttribute('person') - 1;
      const name = document.createElement('h1');
      const birthYear = document.createElement('p');
      const homeWorld = document.createElement('p');
        
      name.textContent = json.results[num].name;
      name.class = 'name';
      el.insertAdjacentElement('beforeend', name);
        
      homeWorld.textContent = 'Home World: ';
      homeWorld.class = 'homeWorld';
      el.insertAdjacentElement('beforeend', homeWorld);

      birthYear.textContent = 'Birth Year: ' + json.results[num].birth_year;
      birthYear.class = 'birthYear';
      el.insertAdjacentElement('beforeend', birthYear);
    
    }, Math.random() * 2000);
  });
}

renderPeople('https://swapi.dev/api/people/', false); // only one param is required, switch to true if you need a proxy

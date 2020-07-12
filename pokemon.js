async function renderPokemon(el, requiresProxy) {
  const pokemonName = el.getAttribute('name');
  let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;
  
  requiresProxy = requiresProxy || false;
  requiresProxy ? url = 'https://cors-anywhere.herokuapp.com/' + url : url = url;

  const resp = await fetch(url);
  const json = await resp.json();

  setTimeout(function addInitialData () {
    const name = document.createElement('h1');
    const abilityTitle = document.createElement('h2');
    const abilityList = document.createElement('ul');

    name.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    name.class = 'name';
 
    abilityTitle.textContent = 'Abilities';

    json.abilities.forEach(a => {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1) + ':';
      span.setAttribute('ability', a.ability.url);

      li.insertAdjacentElement('beforeend', span);
      abilityList.insertAdjacentElement('beforeend', li);
    });

    el.insertAdjacentElement('beforeend', name);
    el.insertAdjacentElement('beforeend', abilityTitle);
    el.insertAdjacentElement('beforeend', abilityList);

  }, Math.random() * 2000);

}

const pokemon = document.querySelectorAll(`.pokemon`);
if (pokemon) {
  pokemon.forEach(p => {
    renderPokemon(p); // only one param is required, add true if you need a proxy
  });
}

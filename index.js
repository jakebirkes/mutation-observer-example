require('./starwars.js');

async function renderHomeWorlds(url, name, isJSON, requiresProxy) {
  isJSON = isJSON || false;

  requiresProxy = requiresProxy || false;
  requiresProxy ? url = 'https://cors-anywhere.herokuapp.com/' + url : url = url;

  await fetch(url).then(resp => isJSON ? resp.json() : resp.text()).then(e => {
    const target = document.querySelectorAll(`.createPerson`);
    window[name] = e;
  }).catch(console.error);
}

const observer = new MutationObserver(function (mutations) { 
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes.length) {
      console.log('Added', mutation.addedNodes[0]);
      if (mutation.addedNodes[0].class === 'homeWorld') {
        const el = mutation.addedNodes[0];
        const num = el.parentNode.getAttribute('person') - 1;
        el.setAttribute('mutation-observer-manip', 'true');
        el.textContent = el.textContent + planetInfo.results[num].name + ' (POP. ' + planetInfo.results[num].population +')';
      }
    }
    if (mutation.removedNodes.length) {
      console.log('Removed', mutation.removedNodes[0]);
    }
  });
});

const people = document.querySelectorAll('.createPerson');

// Here's where thew new fetch and mo are invoked, toggle to compare results
renderHomeWorlds('http://swapi.dev/api/planets/', 'planetInfo', true, true);
people.forEach(person => {
  observer.observe(person, {
    childList: true
  });
});

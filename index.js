require('./starwars.js');

async function fetchHomeWorlds(url, name, requiresProxy) {
  requiresProxy = requiresProxy || false;
  requiresProxy ? url = 'https://cors-anywhere.herokuapp.com/' + url : url = url;
  const resp = await fetch(url);
  const json = await resp.json();
  window[name] = json;
};

const observer = new MutationObserver (mutations => { 
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      console.log('Added', mutation.addedNodes[0]);
      if (mutation.addedNodes[0].class === 'homeWorld') {
        const el = mutation.addedNodes[0];
        const num = el.parentNode.getAttribute('person') - 1;

        const updateHomeWorld = setInterval(function() {
          if (!planetInfo) {
            console.log('waiting');
          } else {
            el.textContent = el.textContent + planetInfo.results[num].name + ' (POP. ' + planetInfo.results[num].population +')';
            clearInterval(updateHomeWorld);
          }
        }, 100);
      }
    }
    if (mutation.removedNodes.length) {
      console.log('Removed', mutation.removedNodes[0]);
    }
  });
});

const people = document.querySelectorAll('.createPerson');
if (people) {
  // Here's where thew new fetch and mo are invoked, toggle to compare results
  fetchHomeWorlds('http://swapi.dev/api/planets/', 'planetInfo', true);
  people.forEach(person => {
    observer.observe(person, {
      childList: true
    });
  });

  setTimeout(function disconnect() {
    console.log('disconnecting mutation observer');
    observer.disconnect();
  }, 5000);
}

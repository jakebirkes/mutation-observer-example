require('./pokemon.js');

async function fetchAbilityInfo(p, requiresProxy) {
  let url = p.getAttribute('ability');

  requiresProxy = requiresProxy || false;
  requiresProxy ? url = 'https://cors-anywhere.herokuapp.com/' + url : url = url;

  const resp = await fetch(url);
  const json = await resp.json();

  for (let i = 0; i < json.flavor_text_entries.length; i++) {
    let obj = json.flavor_text_entries[i];
    if (obj.language.name == 'en') {
      p.textContent = p.textContent + ' ' + obj.flavor_text;
      break;
    }
  }
};

const observer = new MutationObserver (mutations => { 
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      console.log('Node Added', mutation.addedNodes[0]); 
      if (mutation.addedNodes[0].querySelector('span')) {
        if (mutation.addedNodes[0].querySelector('span').hasAttribute('ability')) {
          mutation.addedNodes[0].querySelectorAll('span').forEach(e => {
            fetchAbilityInfo(e);
            console.log('Node Updated', e);
          });
        }
      }
    }
    if (mutation.removedNodes.length) {
      console.log('Node Removed', mutation.removedNodes[0]);
    }
  });
});

const pokemon = document.querySelectorAll('.pokemon');
if (pokemon) {
  pokemon.forEach(p => {
    observer.observe(p, {
      childList: true
    });
  });

  setTimeout(function disconnect() {
    console.log('disconnecting mutation observer');
    observer.disconnect();
  }, 10000);
}

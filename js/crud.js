'stric mode';

// Global Variables
const crudUI = document.querySelector('#crud');
const listMatchsUI = document.querySelector('#listMatchs');

// Matches to be generated and saved
let matchs = [];

// functions
const createItem = (match) => {
  let item = {
    match,
    state: false,
  };

  matchs.push(item);
  return item;
};

const saveOnLocalStorage = () => {
  localStorage.setItem('matchs', JSON.stringify(matchs));
};

// EventListener
crudUI.addEventListener('submit', (event) => {
  event.preventDefault();

  let matchUI = document.querySelector('#match').value;

  createItem(matchUI);
  saveOnLocalStorage();

  crudUI.reset();
});

// Dinamic Web with maniputation of DOM

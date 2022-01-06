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
    status: false,
  };

  matchs.push(item);
  return item;
};

const saveOnLocalStorage = () => {
  localStorage.setItem('toDoMatchs', JSON.stringify(matchs));

  showLocalStorage();
};

const showLocalStorage = () => {
  // clean DOM
  listMatchsUI.innerHTML = '';

  // Read LocalStorage
  matchs = JSON.parse(localStorage.getItem('toDoMatchs'));

  if (matchs === null) matchs = [];
  else {
    matchs.forEach((item) => {
      listMatchsUI.innerHTML += `
        <div id="listMatchs" class="mt-4">
          <div class="alert alert-danger message" role="alert">
            <span class="material-icons">sports_soccer</span>
            <span>${item.match}</span>

            - ${item.status}
            <span class="material-icons">done</span>
            <span class="material-icons">delete</span>
          </div>
        </div>
      `;
    });
  }
};

// TODO to be continued
const deleteToDoMatch = (todo) => {
  let i;
  matchs.forEach((item, index) => {
    console.log(item, index);
  });
};

// EventListener
crudUI.addEventListener('submit', (event) => {
  event.preventDefault();

  let matchUI = document.querySelector('#match').value;

  createItem(matchUI);
  saveOnLocalStorage();

  crudUI.reset();
});

document.addEventListener('DOMContentLoaded', showLocalStorage);

listMatchsUI.addEventListener('click', (event) => {
  event.preventDefault();

  if (
    event.target.innerHTML.trim() === 'done' ||
    event.target.innerHTML.trim() === 'delete'
  ) {
    // console.log(event.path[2].childNodes[1].childNodes[3].innerText);
    let todo = event.target.parentNode.parentNode.childNodes[1].children[1].textContent;
    console.log(todo);

    if (event.target.innerHTML.trim() === 'done') {
      // Action Done
      console.log('Done');
    }
    if (event.target.innerHTML.trim() === 'delete') {
      // Action Delete
      deleteToDoMatch(todo);
      console.log('Delete');
    }
  }
});

// Dinamic Web with maniputation of DOM

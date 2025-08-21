// ----- STATE -----
const state = {
  numberBank: [],
  oddNumbers: [],
  evenNumbers: []
};

// ----- ROOT ELEMENT -----
const root = document.getElementById('app');


// ----- COMPONENTS -----
function createApp() {
  root.innerHTML = ''; // Clear previous render

  root.appendChild(createForm());
  root.appendChild(createControls());
  root.appendChild(createDisplay('Number Bank', state.numberBank));
  root.appendChild(createDisplay('Odd Numbers', state.oddNumbers));
  root.appendChild(createDisplay('Even Numbers', state.evenNumbers));
}

function createForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'Enter a number';
  input.id = 'numberInput';

  const button = document.createElement('button');
  button.textContent = 'Add Number';
  button.type = 'submit';

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = parseInt(input.value);
    if (!isNaN(value)) {
      addNumber(value);
      input.value = '';
    }
  });

  return form;
}

function createControls() {
  const container = document.createElement('div');

  const sortOneBtn = document.createElement('button');
  sortOneBtn.textContent = 'Sort 1';
  sortOneBtn.addEventListener('click', () => {
    sortOne();
  });

  const sortAllBtn = document.createElement('button');
  sortAllBtn.textContent = 'Sort All';
  sortAllBtn.addEventListener('click', () => {
    sortAll();
  });

  container.appendChild(sortOneBtn);
  container.appendChild(sortAllBtn);

  return container;
}

function createDisplay(title, numbers) {
  const section = document.createElement('div');
  const heading = document.createElement('h3');
  heading.textContent = title;

  const list = document.createElement('ul');
  numbers.forEach(num => {
    const item = document.createElement('li');
    item.textContent = num;
    list.appendChild(item);
  });

  section.appendChild(heading);
  section.appendChild(list);
  return section;
}

// ----- STATE FUNCTIONS -----
function addNumber(num) {
  state.numberBank.push(num);
  render();
}

function sortOne() {
  if (state.numberBank.length === 0) return;
  const num = state.numberBank.shift();
  placeInCategory(num);
  render();
}

function sortAll() {
  while (state.numberBank.length > 0) {
    const num = state.numberBank.shift();
    placeInCategory(num);
  }
  render();
}

function placeInCategory(num) {
  if (num % 2 === 0) {
    state.evenNumbers.push(num);
  } else {
    state.oddNumbers.push(num);
  }
}

// ----- RENDER -----
function render() {
  createApp();
}

// ----- INITIALIZE -----
render();

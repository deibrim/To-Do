const form = document.querySelector('form');
form.addEventListener('submit', addTodo);

// Fetches Todos from Local Storage
const getTodos = () => {
  // Initialize new empty array
  if (localStorage.getItem('TodoList') === null) {
    const toDos = [];
    localStorage.setItem('TodoList', JSON.stringify(toDos));
  }
  // Get toDos from localStorage
  const toDos = JSON.parse(localStorage.getItem('TodoList'));
  const output = document.querySelector('#output');
  output.innerHTML = [];
  // Loop through the list and output each one to the DOM
  toDos.forEach(todo => {
    const name = todo.name;
    const id = todo.id;
    output.innerHTML += `<div class="list"> ${name} <a class="close" href="#!" onclick=deleteTodo('${id}')> &times; </a></div>`;
  });
};

function addTodo(event) {
  // Prevent the form from actually submitting to a server
  event.preventDefault();

  // Get Input values and store it in a variable
  const inputValue = document.querySelector('input').value;

  // Check if input is empty
  if (!inputValue) {
    alert('Add a ToDo');
    return false;
  }

  const randomId = Math.random() * 99999;
  const todoList = {
    id: randomId,
    name: inputValue
  };

  const toDos = JSON.parse(localStorage.getItem('TodoList'));

  // Add todoList to array
  toDos.push(todoList);

  // Re-set back to localStorage
  localStorage.setItem('TodoList', JSON.stringify(toDos));

  getTodos();
  form.reset();
}

const deleteTodo = id => {
  const toDos = JSON.parse(localStorage.getItem('TodoList'));
  // Loop Through toDos;
  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i].id == id) {
      toDos.splice(i, 1);
    }
  }

  // reset localStorage
  localStorage.setItem('TodoList', JSON.stringify(toDos));

  // re-fetchTodo
  getTodos();
};

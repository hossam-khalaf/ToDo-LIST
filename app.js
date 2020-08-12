// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

//Event Listeners

todoBtn.addEventListener('click', addTodo);
// functions

function addTodo(e) {
  e.preventDefault();

  //todo container
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //todo items
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  //check button
  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
  completedBtn.classList.add('completed-btn');
  todoDiv.appendChild(completedBtn);

  //delete Button
  const deletedBtn = document.createElement('button');
  deletedBtn.innerHTML = ` <i class="fas fa-trash"></i>`;
  deletedBtn.classList.add('delete-btn');
  todoDiv.appendChild(deletedBtn);

  //append to list
  todoList.appendChild(todoDiv);

  // clear todo value after
  todoInput.value = '';
}

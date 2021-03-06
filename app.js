// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);

todoBtn.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('click', filterTodo);

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

  //add todo to local storage
  saveTodosLocally(todoInput.value);

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
  if (todoInput.value === '') {
    return;
  } else {
    todoList.appendChild(todoDiv);
  }

  // clear todo value after
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  //delete
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    // animate on delete
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  //completed
  if (item.classList[0] === 'completed-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveTodosLocally(todo) {
  // check if already has todos in local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //todo items
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
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

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

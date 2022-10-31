const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);
todoList.addEventListener("click", deleteTodo);

function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `✔️`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `✖️`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.innerText === "check_circle") {
    const todo = item.parentElement.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
  if (item.innerText === "cancel") {
    const todo = item.parentElement.parentElement;
    todo.classList.add("fall_left");
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
}

function getTodos() {
  let todos = ['Goldfish', 'Oreos', 'Green Apples'];
  let reasons = ['Snack for after school', 'Dessert', 'Tommy said they are yummy'];
  let i = 0;

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerHTML = `<div><strong>Food: </strong>${todo}</div><div><strong>Reason: </strong>${reasons[i]}</div><div><strong>Requester: </strong>Matt</div>`;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<span class="material-icons md-32">check_circle</span>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<span class="material-icons md-32">cancel</span>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    i+=1;
  });
}

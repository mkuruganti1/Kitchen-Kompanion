const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);
todoList.addEventListener("click", deleteTodo);

function deleteTodo(e) {
  var foods = JSON.parse(localStorage.getItem("foods") || "[]");
  foods.shift(1);
  var reasons = JSON.parse(localStorage.getItem("reasons") || "[]");
  reasons.shift(1);
  localStorage.setItem("foods", JSON.stringify(foods));
  localStorage.setItem("reasons", JSON.stringify(reasons));
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
  var foods = JSON.parse(localStorage.getItem("foods") || "[]");
  var reasons = JSON.parse(localStorage.getItem("reasons") || "[]");
  let i = 0;

  foods.forEach(function (food) {
    const foodDiv = document.createElement("div");
    foodDiv.classList.add("todo");
    const newFood = document.createElement("li");
    newFood.innerHTML = `<div><strong>Food: </strong>${food}</div><div><strong>Reason: </strong>${reasons[i]}</div><div><strong>Requester: </strong>Matt</div>`;
    newFood.classList.add("todo-item");
    foodDiv.appendChild(newFood);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<span class="material-icons md-48 green">check_circle</span>`;
    completedButton.classList.add("complete-btn");
    foodDiv.appendChild(completedButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<span class="material-icons md-48 red">cancel</span>`;
    trashButton.classList.add("trash-btn");
    foodDiv.appendChild(trashButton);
    todoList.appendChild(foodDiv);
    i += 1;
  });
}

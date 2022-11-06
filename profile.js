document.addEventListener("DOMContentLoaded", getStores);

function setDefault() {
  var storeList = JSON.parse(localStorage.getItem("storeList") || "[]");

  // load these two stores by default always
  if (storeList.length == 0) {
    storeList.push("Giant");
    storeList.push("Trader Joe's");
  }

  localStorage.setItem("storeList", JSON.stringify(storeList));
  getStores();
}

function removeCheckedCheckboxes() {
  var checked = document.querySelectorAll(".delete-checkbox:checked");
  var storeList = JSON.parse(localStorage.getItem("storeList") || "[]");
  checked.forEach((elem) => {
    elem.parentElement.parentElement.remove();
    let item = elem.value;
    for (let i = 0; i < storeList.length; i++) {
      if (storeList[i] == item) {
        storeList.splice(i, 1);
      }
    }
  });
  localStorage.setItem("storeList", JSON.stringify(storeList));
}

function getStores() {
  var current_items = document.querySelectorAll(".store");
  current_items.forEach((x) => x.remove());
  var storeList = JSON.parse(localStorage.getItem("storeList") || "[]");
  storeList.forEach(populateSingleListItem);
}

function populateSingleListItem(storeName) {
  /*
  What this looks like:
  <div class="store">
    <label
      ><input
        type="checkbox"
        name="item"
        value="Giant"
        class="delete-checkbox"
      />Giant</label
    >
  </div>
  */

  // create the input and label elements, and append the input to label
  var label = document.createElement("label");
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "item");
  input.setAttribute("value", storeName);
  input.setAttribute("class", "delete-checkbox");

  label.appendChild(input);
  label.append(storeName);

  // create the new div that holds the label/input and span, and add label/input and span to new div
  var newdiv = document.createElement("div");
  newdiv.className = "store";
  newdiv.appendChild(label);

  // add all new elements to the list of items in fridge
  var element = document.getElementById("store-list-form");
  element.appendChild(newdiv);
}

function addStore() {
  // all we need is the name of the store
  var storeName = document.getElementById("newStoreName").value;

  // not sure if this is the right thing to put inside the conditional
  if (!storeName) {
  } else {
    var storeList = JSON.parse(localStorage.getItem("storeList") || "[]");
    storeList.push(storeName);
    localStorage.setItem("storeList", JSON.stringify(storeList));

    getStores();
  }

  // reset the form for the next store to be entered
  document.getElementById("storeForm").reset();
}

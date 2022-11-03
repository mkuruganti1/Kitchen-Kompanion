document.addEventListener("DOMContentLoaded", getFridgeItems);

// var fridge_items = [[]];

function removeCheckedCheckboxes() {
  var checked = document.querySelectorAll(".delete-checkbox:checked");
  var fridgeItems = JSON.parse(localStorage.getItem("fridgeItems") || "[]");
  checked.forEach((elem) => {
    elem.parentElement.parentElement.remove();
    let item = elem.value;
    for (let i = 0; i < fridgeItems.length; i++) {
      if (fridgeItems[i][0] == item) {
        fridgeItems.splice(i, 1);
      }
    }
  });
  localStorage.setItem("fridgeItems", JSON.stringify(fridgeItems));
}

function addItemToFridge() {
  // get items from form
  var item = document.getElementById("title").value;
  var category =
    document.getElementById("category").options[
      document.getElementById("category").selectedIndex
    ].text;
  var quantity = document.getElementById("quantity").value;
  var expirationdate = document.getElementById("expdate").value;

  //save new item to localStorage
  var fridgeItems = JSON.parse(localStorage.getItem("fridgeItems") || "[]");
  fridgeItems.push([item, category, quantity, expirationdate]);
  localStorage.setItem("fridgeItems", JSON.stringify(fridgeItems));

  getFridgeItems();

  // Get the form
  var form = document.getElementById("myForm");
  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");

  form.style.display = "none";
  fridge.style.display = "block";

  document.getElementById("myForm").reset();
}

function getFridgeItems() {
  var current_items = document.querySelectorAll(".items-in-fridge");
  current_items.forEach((x) => x.remove());
  var fridgeItems = JSON.parse(localStorage.getItem("fridgeItems") || "[]");
  fridgeItems.forEach(populateSingleFridgeItem);
}

function populateSingleFridgeItem(item) {
  let current_cat = document.getElementById("fridgecat").value;
  if (current_cat === item[1] || current_cat === "All") {
    // create the input and label elements, and append the input to label
    var label = document.createElement("label");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "item");
    input.setAttribute("value", item[0]);
    input.setAttribute("class", "delete-checkbox " + item[1]);
    // input.setAttribute("id", item[1]);

    label.appendChild(input);
    label.append(item[0]);

    // create the span class for the expand img
    var span = document.createElement("span");
    span.setAttribute(
      "class",
      "material-icons material-symbols-outlined expand " + item[0]
    );
    span.setAttribute("id", Math.floor(Math.random() * 100));
    span.setAttribute("onclick", "showItemInfo(this)");
    span.append("open_in_new");

    // create the new div that holds the label/input and span, and add label/input and span to new div
    var newdiv = document.createElement("div");
    newdiv.className = "items-in-fridge";
    newdiv.appendChild(label);
    newdiv.appendChild(span);

    // add all new elements to the list of items in fridge
    var element = document.getElementById("fridge-items-form");
    element.appendChild(newdiv);
  }
}

function formPopup() {
  // Get the form
  var form = document.getElementById("myForm");

  // Get the <span> element that closes the form
  var span = document.getElementById("close-form");

  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");

  // When the user clicks on the button, open the form
  form.style.display = "block";
  fridge.style.display = "none";

  // When the user clicks on <span> (x), close the form
  span.onclick = function () {
    form.style.display = "none";
    fridge.style.display = "block";
  };
}

function displayRecipe() {
  var recipe = document.getElementById("viewrecipe");

  // Get the <span> element that closes the recipe page
  var span = document.getElementById("close-recipe");

  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");

  var checked = document.querySelectorAll(".delete-checkbox:checked");
  var elem = [];
  for (let i = 0; i < checked.length; i++) {
    elem.push(String(checked[i].value.toLowerCase()));
  }

  const items = ["tomato", "mozzarella", "basil"];
  const allExist = items.every((items) => {
    return elem.includes(items);
  });

  if (allExist) {
    // When the user clicks on the button, show the recipe
    recipe.style.display = "block";
    fridge.style.display = "none";
  }

  // When the user clicks on <span> (x), close the recipe
  span.onclick = function () {
    recipe.style.display = "none";
    fridge.style.display = "block";

    var checked = document.querySelectorAll(".delete-checkbox:checked");
    checked.forEach((elem) => {
      elem.checked = false;
    });
  };
}

function showItemInfo(e) {
  var modal = document.getElementById("modal");

  // Get the <span> element that closes the form
  var span = document.getElementById("close-modal");

  var itemkey = e.className.split(" ")[3];
  var vals = JSON.parse(localStorage.fridgeItems);
  for (let i = 0; i < vals.length; i++) {
    if (vals[i][0] == itemkey) {
      document.getElementById("it-na").innerHTML += vals[i][0];
      document.getElementById("cat").innerHTML += vals[i][1];
      document.getElementById("qty").innerHTML += vals[i][2];
      document.getElementById("ed").innerHTML += vals[i][3];
      break;
    }
  }

  // When the user clicks on the button, open the form
  var inputItems = document.getElementsByClassName("iteminfo");
  // var editItems = document.getElementsByClassName("text_box");
  for (let i = 0; i < inputItems.length; i++) {
    inputItems[i].style.display = "block";
    // editItems[i].style.display = "none";
  }

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the form
  span.onclick = function () {
    document.getElementById("it-na").innerHTML = "Item Name: ";
    document.getElementById("cat").innerHTML = "Category: ";
    document.getElementById("qty").innerHTML = "Quantity: ";
    document.getElementById("ed").innerHTML = "Expiration Date: ";
    modal.style.display = "none";
  };
}

function editItem() {
  // Get the <span> element that closes
  var span = document.getElementById("close-edit-popup");

  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");
  var modal = document.getElementById("modal");

  var editItem = document.getElementById("editpopup");
  editItem.style.display = "block";
  modal.style.display = "none";
  fridge.style.display = "none";

  var editItems = document.getElementsByClassName("edit_input");
  // console.log(editItems);
  var inputIDs = ["it-na-edit", "cat-edit", "qty-edit", "ed-edit"];
  var inputItems = document.getElementsByClassName("iteminfo");
  var arr = [];

  for (let i = 0; i < inputItems.length; i++) {
    var val = String(inputItems[i].innerHTML).split(": ");

    if (val.length == 1) {
      arr.push("");
    } else {
      arr.push(val[1]);
    }

    // inputItems[i].style.display="none";
  }

  // console.log(arr);

  for (let i = 0; i < editItems.length; i++) {
    console.log(arr[i]);
    if (arr[i].length) {
      document.getElementById(inputIDs[i]).value = arr[i];
    }

    // editItems[i].style.display="block";
  }

  // close page
  span.onclick = function () {
    editItem.style.display = "none";
    modal.style.display = "block";
    fridge.style.display = "block";
  };
}

function saveItem() {
  document.getElementById("it-na").innerHTML = "Item Name: ";
  document.getElementById("cat").innerHTML = "Category: ";
  document.getElementById("qty").innerHTML = "Quantity: ";
  document.getElementById("ed").innerHTML = "Expiration Date: ";

  // var inputIDs = ["it-na", "cat", "qty", "ed"];
  // var editItems = document.getElementsByClassName("input_box");
  // var inputItems = document.getElementsByClassName("iteminfo");
  // var inputIDs = [, "cat", "qty", "ed"];
  // var itemInfo = [];

  // var span = document.getElementById("close-edit-popup");

  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");
  var modal = document.getElementById("modal");
  var editItem = document.getElementById("editpopup");
  // editItem.style.display = "block";
  // modal.style.display = "none";
  // fridge.style.display = "none";

  var item_name = document.getElementById("it-na-edit").value;
  var category =
    document.getElementById("cat-edit").options[
      document.getElementById("cat-edit").selectedIndex
    ].text;
  var qty = document.getElementById("qty-edit").value;
  var ed = document.getElementById("ed-edit").value;

  document.getElementById("it-na").innerHTML += item_name;
  document.getElementById("cat").innerHTML += category;
  document.getElementById("qty").innerHTML += qty;
  document.getElementById("ed").innerHTML += ed;

  // for (let i = 0; i < inputItems.length; i++) {
  //   itemInfo.push(editItems[i].value);
  //   document.getElementById(inputIDs[i]).innerHTML += editItems[i].value;
  //   // editItems[i].style.display = "none";
  //   // inputItems[i].style.display = "block";
  // }

  var fridgeItems = JSON.parse(localStorage.getItem("fridgeItems") || "[]");

  let item = item_name;
  for (let i = 0; i < fridgeItems.length; i++) {
    if (fridgeItems[i][0] == item) {
      fridgeItems.splice(i, 1);
    }
  }
  localStorage.setItem("fridgeItems", JSON.stringify(fridgeItems));

  fridgeItems.push([item_name, category, qty, ed]);
  localStorage.setItem("fridgeItems", JSON.stringify(fridgeItems));

  getFridgeItems();

  editItem.style.display = "none";
  modal.style.display = "block";
  fridge.style.display = "block";
}

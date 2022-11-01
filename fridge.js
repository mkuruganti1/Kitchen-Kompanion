function removeCheckedCheckboxes() {
  var checked = document.querySelectorAll(".delete-checkbox:checked");
  checked.forEach((elem) => {
    elem.parentElement.parentElement.remove();
  })
}

function addItemToFridge() {
  // get items from form
  var item = document.getElementById("itemName").value;
  var category = document.getElementById("category").options[document.getElementById("category").selectedIndex].text;
  var quantity = document.getElementById("quantity").value;

  // create the input and label elements, and append the input to label
  var label = document.createElement("label");
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "item");
  input.setAttribute("value", item);
  input.setAttribute("class", "delete-checkbox");
  input.setAttribute("id", category);
  
  label.appendChild(input);
  label.append(item);
  
  // create the span class for the expand img
  var span = document.createElement("span");
  span.setAttribute("class", "material-icons material-symbols-rounded")
  span.setAttribute("id", "expand");
  span.append("open_in_full");

  // create the new div that holds the label/input and span, and add abel/input and span to new div
  var newdiv = document.createElement("div")
  newdiv.className = "items-in-fridge";
  newdiv.appendChild(label);
  newdiv.appendChild(span);
  
  // add all new elements to the list of items in fridge
  var element = document.getElementById("fridge-items-form");
  element.appendChild(newdiv);

  // Get the form
  var form = document.getElementById("myForm");
  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");

  form.style.display = "none";
  fridge.style.display = "block";
  
  document.getElementById("myForm").reset();
}

function formPopup() {
  // Get the form
  var form = document.getElementById("myForm");

  // Get the <span> element that closes the form
  var span = document.getElementById("close-form")

  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");
  
  // When the user clicks on the button, open the form
  form.style.display = "block";
  fridge.style.display = "none";
  
  // When the user clicks on <span> (x), close the form
  span.onclick = function() {
    form.style.display = "none";
    fridge.style.display = "block";
  }
}

function displayRecipe() {
  var recipe = document.getElementById("viewrecipe");

  // Get the <span> element that closes the recipe page
  var span = document.getElementById("close-recipe");

  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");
  
  // When the user clicks on the button, show the recipe
  recipe.style.display = "block";
  fridge.style.display = "none";
  
  // When the user clicks on <span> (x), close the recipe
  span.onclick = function() {
    recipe.style.display = "none";
    fridge.style.display = "block";

    var checked = document.querySelectorAll(".delete-checkbox:checked");
    checked.forEach((elem) => {
      elem.checked = false;
  })
  }
}

// function showItemInfo() {

// }







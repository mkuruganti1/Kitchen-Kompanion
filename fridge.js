document.addEventListener("DOMContentLoaded", getFridgeItems);

var fridge_items = [[]];

var fridge_items = [[]];

function removeCheckedCheckboxes() {
  var checked = document.querySelectorAll(".delete-checkbox:checked");
  var fridgeItems = JSON.parse(localStorage.getItem("fridgeItems") || "[]");
  checked.forEach((elem) => {
    elem.parentElement.parentElement.remove();
    let item = elem.value;
    for(let i = 0; i < fridgeItems.length; i++){
      if(fridgeItems[i][0] == item){
        fridgeItems.splice(i, 1);
      }
    }
  })
  localStorage.setItem("fridgeItems", JSON.stringify(fridgeItems));
}

function addItemToFridge() {

  // get items from form
  var item = document.getElementById("itemName").value;
  var category = document.getElementById("category").options[document.getElementById("category").selectedIndex].text;
  var quantity = document.getElementById("quantity").value;
  var expirationdate = document.getElementById("expdate").value;

  //save new item to localStorage 
  var fridgeItems = JSON.parse(localStorage.getItem("fridgeItems") || "[]");
  fridgeItems.push([item, category, quantity, expirationdate]);
  localStorage.setItem("fridgeItems", JSON.stringify(fridgeItems));

  var item_data = [item, category, quantity, expirationdate];
  fridge_items.push(item_data);

  var item_data = [item, category, quantity, expirationdate];
  fridge_items.push(item_data);

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
  span.setAttribute("class", "material-icons material-symbols-outlined")
  span.setAttribute("id", "expand");
  span.setAttribute("onclick", "showItemInfo()")
  span.append("open_in_new");

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

function getFridgeItems(){
    var fridgeItems = JSON.parse(localStorage.getItem("fridgeItems") || "[]");
    fridgeItems.forEach(populateSingleFridgeItem);
}

function populateSingleFridgeItem(item){
      // create the input and label elements, and append the input to label
      var label = document.createElement("label");
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", "item");
      input.setAttribute("value", item[0]);
      input.setAttribute("class", "delete-checkbox");
      input.setAttribute("id", item[1]);
      
      label.appendChild(input);
      label.append(item[0]);
      
      // create the span class for the expand img
      var span = document.createElement("span");
      span.setAttribute("class", "material-icons material-symbols-outlined")
      span.setAttribute("id", "expand");
      span.setAttribute("onclick", "showItemInfo()")
      span.append("open_in_new");
    
      // create the new div that holds the label/input and span, and add label/input and span to new div
      var newdiv = document.createElement("div")
      newdiv.className = "items-in-fridge";
      newdiv.appendChild(label);
      newdiv.appendChild(span);
      
      // add all new elements to the list of items in fridge
      var element = document.getElementById("fridge-items-form");
      element.appendChild(newdiv);  
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

function showItemInfo(e) {
  var modal = document.getElementById("modal");

  // Get the <span> element that closes the form
  var span = document.getElementById("close-modal")

  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");
  
  // When the user clicks on the button, open the form
  modal.style.display = "block";
  // fridge.style.display = "none";
  
  // When the user clicks on <span> (x), close the form
  span.onclick = function() {
    modal.style.display = "none";
  }
}
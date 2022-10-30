function removeCheckedCheckboxes() {
  var checked = document.querySelectorAll(".delete-checkbox:checked");
  checked.forEach((elem) => {
    elem.parentElement.style.display = "none";
  })
}

function addItemToFridge() {
  var item = document.getElementById("itemName").value;
  // alert(item);
  var category = document.getElementById("category").options[document.getElementById("category").selectedIndex].text;
  // alert(category);
  var quantity = document.getElementById("quantity").value;
  // alert(quantity);

  var label = document.createElement("label");
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "item");
  input.setAttribute("value", item);
  input.setAttribute("class", "delete-checkbox");
  input.setAttribute("id", category);
  
  label.appendChild(input);
  label.append(item + " (" + quantity + ")");
  // alert("1");

  var element = document.getElementById("fridge-items-form");
  // alert("2");
  element.appendChild(label);
  // alert("3");

  // Get the form
  var form = document.getElementById("myForm");
  // Get the rest of the fridge content
  var fridge = document.getElementById("fridgedisplay");

  form.style.display = "none";
  fridge.style.display = "block";
  
  document.getElementById("myForm").reset();
}

function modalPopup() {
    // Get the form
    var form = document.getElementById("myForm");

    // Get the <span> element that closes the form
    var span = document.getElementsByClassName("close")[0];

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







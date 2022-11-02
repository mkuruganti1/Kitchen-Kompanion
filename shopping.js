function clickedon() {
    let rowcolids = ['itemname', 'qty' ] /*, 'store', 'category', 'price'] */
    let vals = []
    for (let cid of rowcolids) {
        vals.push(document.getElementById(cid).value)
    }
    makeRow(vals, document.getElementById('shoppinglist'))
}

let expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function formPopup() {
    // Get the form
    var form = document.getElementById("shoppingForm");
  
    // Get the <span> element that closes the form
    var span = document.getElementById("close-form");
  
    // Get the rest of the fridge content
    var shoppingList = document.getElementById("shoppingList");
    
    // When the user clicks on the button, open the form
    form.style.display = "block";
    shoppingList.style.display = "none";
    
    // When the user clicks on <span> (x), close the form
    span.onclick = function() {
      form.style.display = "none";
      shoppingList.style.display = "block";
    }
  }

function formClose(){
    document.write("in function !");
    var form = document.getElementById("shoppingForm");
    var shoppingList = document.getElementById("shoppingList");
    form.style.display = "none";
    shoppingList.style.display = "block";
}


function addItemToShoppingList() {
    // get items from form
    var title = document.getElementById("title").value;
    var category = document.getElementById("category").options[document.getElementById("category").selectedIndex].text;
    var quantity = document.getElementById("quantity").value;
    var tags = document.getElementById("tags").value;
  
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
    
  
    // create the new div that holds the label/input and span, and add abel/input and span to new div
    var newdiv = document.createElement("div")
    newdiv.className = "items-in-list";
    newdiv.appendChild(label);
    
    // add all new elements to the list of items in fridge
    var element = document.getElementById("fridge-items-form");
    element.appendChild(newdiv);
  
    // Get the form
    var form = document.getElementById("shoppingForm");
    // Get the rest of the fridge content
    //var fridge = document.getElementById("fridgedisplay");
  
    form.style.display = "none";
    //fridge.style.display = "block";
    
    document.getElementById("myForm").reset();
  }
function makeRow(valueList, parent) {
    let row = document.createElement("tr")
    /*row.classList.add(document.getElementById("priority").value)*/
    let cb = document.createElement("input")
    cb.type = "checkbox"
    cb.classList.add("form-control")
    row.appendChild(cb)

    for (let val of valueList) {
        let td = document.createElement("td")
        td.innerHTML = val
        row.appendChild(td)
    }
    parent.appendChild(row)
}

function populateSelect(selectId, sList) {
    let sel = document.getElementById(selectId)
    for (let s of sList) {
        let opt = document.createElement("option")
        opt.value = s
        opt.innerHTML = s
        sel.appendChild(opt)
    }
}


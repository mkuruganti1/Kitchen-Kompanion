var firstGiant = true;
var giantCount = 1;

var firstTJ = true;
var tjCount = 1;


function formPopup() {
    // Get the form
    var form = document.getElementById("shoppingForm");
  
    // Get the <span> element that closes the form
    var span = document.getElementById("close-form");
  
    // Get the rest of the list content
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


function addItemToShoppingListTbl(){
  var title = document.getElementById("title").value;
  var category =
    document.getElementById("category").options[
      document.getElementById("category").selectedIndex
    ].text;
  var quantity = document.getElementById("quantity").value;
  var tags = 
    document.getElementById("tags").options[
      document.getElementById("tags").selectedIndex
    ].text;

    var tableElement;
    var tbodyElement;
    if (tags === "Giant") {
      tableElement = document.getElementById("giant-tbl");
      tbodyElement = document.getElementById('giant-body'); 
    }
    else if (tags === "Trader Joe's") {
      tableElement = document.getElementById("tj-tbl");
      tbodyElement = document.getElementById('tj-body'); 
    }
    else {
      tableElement = document.getElementById("giant-tbl");
      tbodyElement = document.getElementById('giant-body'); 
    }
    
    var trElement = document.createElement('tr');
    var tdElement = document.createElement('td');
    var inputElement = document.createElement('input');
    var tdElementTitle = document.createElement('td');
    var tdElementQuantity = document.createElement('td');
    
    /* Format Example 
    <tr>
    <td class="added-checkbox">
              <input type="checkbox" name="milk" />
    </td>
    <th data-label="Item">
              Milk
    </th>
    <td data-label="Quantity">
              1 gallon
    </td>
    </tr>
    */
    
    tdElement.className ="added-checkbox";
    inputElement.setAttribute("type","checkbox");
    
    var id = "box";

    if (tags === "Giant"){
      id = id + giantCount;
      giantCount += 1;
    }
    else {
      id = id + tjCount;
      tjCount += 1;
    }

    inputElement.setAttribute("id", id);
    inputElement.setAttribute("onclick", 'checkoff(\'' + id + '\')');

    tdElementTitle.setAttribute("data-label", "Item");
    tdElementTitle.innerHTML = title;

    tdElementQuantity.setAttribute("data-label", "Quantity");
    tdElementQuantity.innerHTML = quantity;
    
    tdElement.appendChild(inputElement);
    
  
    trElement.appendChild(tdElement);
    trElement.appendChild(tdElementTitle);
    trElement.appendChild(tdElementQuantity);

    tbodyElement.appendChild(trElement);
    
    var form = document.getElementById("shoppingForm");
    // Get the rest of the shopping list content
    var shoppingList = document.getElementById("shoppingList");

    var showTable;
    form.style.display = "none";
    shoppingList.style.display = "block";

    if (firstTJ && tags === "Trader Joe's" ){
      showTable = document.getElementById("tj-div");
      showTable.style.display="block";
      firstTJ = false;
    }

    if (firstGiant && tags === "Giant"){
      showTable = document.getElementById("giant-div");
      showTable.style.display="block";
      firstGiant = false;
    }

    document.getElementById("shoppingForm").reset();
}

function checkoff(boxNum){
  var checkbox = document.getElementById(boxNum);
  checkbox.closest('tr').className = checkbox.checked ? 'checked' : '';
}

function removeCheckedCheckboxes(){
  var collection = document.getElementsByClassName("checked");
  var id;
  
  for (let tr of collection){
    id = tr.parentElement.id;

    if (id === "giant-body"){
      giantCount = giantCount - 1;
    }

    else {
      tjCount = tjCount - 1;
    }

    tr.remove();
  }

  if (giantCount == 0){
    document.getElementById("giant-div").style.display="none";
  }
  if (tjCount == 0){
    document.getElementById("tj-div").style.display="none";
  }
        
}

function clearAll(){
  var collection = document.getElementsByTagName("tr");
  
  for (var i = collection.length - 1; i >= 0; i--){
    collection[i].remove();
    
  }
  
  var showTable;
  firstGiant = true;
  firstTJ = true;
  giantCount = 1;
  tjCount = 1;

  showTable = document.getElementById("tj-div");
  showTable.style.display="none";

  showTable = document.getElementById("giant-div");
  showTable.style.display="none";

}
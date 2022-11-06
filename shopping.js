document.addEventListener("DOMContentLoaded", getShoppingListItems);

firstGiant = true;
firstTJ = true;
counter = 1;

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
  //localStorage.clear();
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

    //save new items to localStorage
    var listItems;
    var counts;
    var giantCount = 0;
    var tjCount = 0;

    if (tags === "Giant"){
      listItems = JSON.parse(localStorage.getItem("giantItems") || "[]");
      listItems.push([title, category, quantity, tags, counter]);
      localStorage.setItem("giantItems", JSON.stringify(listItems));

      counts = JSON.parse(localStorage.getItem("counts") || "[]");
      
      if (counts.length == 0){
        counts.push([tags, 1]);
        counts.push(["Trader Joe's", 0]);
      }
      else {
        counts[0][1] = listItems.length;
      }

      localStorage.setItem("counts", JSON.stringify(counts));
    }

    if (tags === "Trader Joe's"){
      listItems = JSON.parse(localStorage.getItem("tjItems") || "[]");
      listItems.push([title, category, quantity, tags, counter]);
      localStorage.setItem("tjItems", JSON.stringify(listItems));

      counts = JSON.parse(localStorage.getItem("counts") || "[]");
      
      if (counts.length == 0){
        counts.push(["Giant", 0]);
        counts.push([tags, 1]);
      }
      else {
        counts[1][1] = listItems.length;
      }
      localStorage.setItem("counts", JSON.stringify(counts));
    }

    getShoppingListItems();

    giantCount = counts[0][1];
    tjCount = counts[1][1];
    counter += 1;
    
    var form = document.getElementById("shoppingForm");
    // Get the rest of the shopping list content
    var shoppingList = document.getElementById("shoppingList");

    var showTable;
    form.style.display = "none";
    shoppingList.style.display = "block";

    if (tjCount > 0 && tags === "Trader Joe's" ){
      showTable = document.getElementById("tj-div");
      showTable.style.display="block";
      showTable.style.paddingTop="5px";
      firstTJ = false;
    }

    if (giantCount > 0 && tags === "Giant"){
      showTable = document.getElementById("giant-div");
      showTable.style.display="block";
      firstGiant = false;
    }
    document.getElementById("shoppingForm").reset();
}


function getShoppingListItems(){
  var curr_items = document.querySelectorAll(".giant-added");
  curr_items.forEach((x) => x.remove());

  curr_items = document.querySelectorAll(".tj-added");
  curr_items.forEach((x) => x.remove());
  
  var giantItems = JSON.parse(localStorage.getItem("giantItems") || "[]");
  giantItems.forEach(populateSingleListItem);

  var tjItems = JSON.parse(localStorage.getItem("tjItems") || "[]");
  tjItems.forEach(populateSingleListItem);

  if (giantItems.length > 0){
    document.getElementById("giant-div").style.display="block";
  }

  if (tjItems.length > 0){
    document.getElementById("tj-div").style.display="block";
  }
  
}


function populateSingleListItem(item){  
  var tableElement;
  var tbodyElement;
  var title = item[0];
  var category = item[1];
  var quantity = item[2];
  var tags = item[3];
  var idnum = item[4];

  if (tags === "Giant") {
    tableElement = document.getElementById("giant-tbl");
    tbodyElement = document.getElementById('giant-body'); 
  }
  else if (tags === "Trader Joe's") {
    tableElement = document.getElementById("tj-tbl");
    tbodyElement = document.getElementById('tj-body'); 
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
  
  var id = "Box";
  var divClass;
  if (tags === "Giant"){
    id = "giant" + id + idnum;
    divClass = "giant-added";
  }
  else {
    id = "tj" + id + idnum;
    divClass = "tj-added";
  }

  inputElement.setAttribute("id", id);
  inputElement.setAttribute("onclick", 'checkoff(\'' + id + '\')');

  tdElementTitle.setAttribute("data-label", "Item");
  tdElementTitle.setAttribute("class", "item");
  tdElementTitle.innerHTML = title;

  tdElementQuantity.setAttribute("data-label", "Quantity");
  tdElementQuantity.setAttribute("class", "quantity");
  tdElementQuantity.innerHTML = quantity;
  
  tdElement.appendChild(inputElement);
  
  trElement.appendChild(tdElement);
  trElement.appendChild(tdElementTitle);
  trElement.appendChild(tdElementQuantity);

  var newdiv = document.createElement("div");
  newdiv.className = divClass;
  newdiv.appendChild(trElement);
  tbodyElement.appendChild(newdiv);
}



function checkoff(boxNum){
  var checkbox = document.getElementById(boxNum);
  checkbox.closest('tr').className = checkbox.checked ? 'checked' : '';
}

function removeCheckedCheckboxes(){
  var collection = document.getElementsByClassName("checked");
  var bodyId;
  var listItems;
  var itemName;
  var counts = JSON.parse(localStorage.getItem("counts") || "[]");
  var tr;
  var i = collection.length;
    
  while (i > 0)  {
    tr = collection[0]; 
    
    bodyId = tr.parentElement.parentElement.id; 
    itemName = tr.cells[1].childNodes[0].data;
  

    if (bodyId.includes("giant")){
      counts[0][1] = (counts[0][1] > 1) ? counts[0][1] - 1 : 0; 
      listItems = JSON.parse(localStorage.getItem("giantItems") || "[]");
      
      for (var j = 0 ; j < listItems.length; j++){
        if (itemName === listItems[j][0]){
          listItems.splice(j,1);
        }
      }

      localStorage.setItem("giantItems", JSON.stringify(listItems));
      localStorage.setItem("counts", JSON.stringify(counts));
      
    }
    
    else {  
      counts[1][1] = (counts[1][1] > 1) ? counts[1][1] - 1 : 0;
      listItems = JSON.parse(localStorage.getItem("tjItems") || "[]");

      for (var j = 0 ; j < listItems.length; j++){
        if (itemName === listItems[j][0]){
          listItems.splice(j,1);
        }
      }
      
      localStorage.setItem("tjItems", JSON.stringify(listItems));
      localStorage.setItem("counts", JSON.stringify(counts));
      }
  
      tr.remove();
    
     i--;
    }
  
  
  var giantCount = counts[0][1];
  var tjCount = counts[1][1];

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
  
  localStorage.setItem("tjItems", JSON.stringify([]));
  localStorage.setItem("giantItems", JSON.stringify([]));
  localStorage.setItem("counts", JSON.stringify([]));

  document.getElementById("tj-div").style.display="none";
  document.getElementById("giant-div").style.display="none";

}
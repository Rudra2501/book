document.addEventListener("DOMContentLoaded", pageLoaded);
document.getElementById("myButton").addEventListener("click", addData);

function pageLoaded() {
  axios
    .get(
      " https://crudcrud.com/api/5788d52981594ecf8454d99464004282/MyUserData"
    )
    .then((obj) => {
      let data = obj.data;
      data.forEach((item) => displayUserData(item));
    })
    .catch((err) => console.log(err));
}

function addData() {
  let name = document.getElementById("userName").value;
  let mail = document.getElementById("mail").value;
  let number = document.getElementById("number").value;

  const userData = {
    name,
    mail,
    number,
  };

  axios
    .post(
      "https://crudcrud.com/api/5788d52981594ecf8454d99464004282/MyUserData",
      userData
    )
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  displayUserData(userData);
}

function displayUserData(myObj) {
  let node = document.createElement("li"); // Creating new li item
  let text = document.createTextNode(
    `${myObj["name"]} - ${myObj["mail"]} - ${myObj["number"]}`
  ); // Creating text node for storing the text

  let btnEdit = document.createElement("input"); // Creating Edit button
  btnEdit.type = "button";
  btnEdit.value = "Edit";

  let btnDelete = document.createElement("input"); // Creating Delete button
  btnDelete.type = "button";
  btnDelete.value = "Delete";
  btnDelete.onclick = () => {
    listItems.removeChild(node);
    axios
      .delete(
        `https://crudcrud.com/api/5788d52981594ecf8454d99464004282/MyUserData/${myObj["_id"]}`
      )
      .catch((err) => console.log(err));
  };

  let listItems = document.getElementById("listItems"); // Storing the unordered list element inside a variable

  node.appendChild(text); // Appending the text inside the list item
  node.appendChild(btnEdit); // Appending the edit button insdie the list item
  node.appendChild(btnDelete); // Appending the delete button insdie the list item

  listItems.appendChild(node); // Appending the li item inside the unordered list
}

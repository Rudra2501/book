let totalCost = 0;

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/2c82b11f42d34901b22274b3a0ee83fc/SellerData")
    .then((payload) => {
      let data = payload.data;
      data.forEach((item) => displayOnWebpage(item));
    })
    .catch((err) => console.log(err));
});

document
  .getElementById("addProduct")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let price = document.getElementById("sellingPrice").value;
    let product = document.getElementById("productName").value;

    const productDetails = {
      price,
      product,
    };

    axios
      .post(
        "https://crudcrud.com/api/2c82b11f42d34901b22274b3a0ee83fc/SellerData",
        productDetails
      )
      .then((payload) => displayOnWebpage(payload.data))
      .catch((err) => console.log(err));
  });

function displayOnWebpage(obj) {
  let listItems = document.getElementById("list-items"); // Storing the ul list inside a variable using it's id

  let listElement = document.createElement("li"); // Creating an li element
  let text = document.createTextNode(`${obj.price} - ${obj.product} `); // Creating a text element which will be stored inside the li element
  let buttonDelete = document.createElement("button"); // Creating a button named Delete Product
  buttonDelete.innerHTML = "Delete Product";

  listElement.appendChild(text); // Appending the product details inside the li tag
  listElement.appendChild(buttonDelete); // Appending the delete button inside the li tag
  listItems.appendChild(listElement); // Appending the li element inside the un-ordered list
  totalCost += parseInt(obj.price);
  document.getElementById("showPrice").innerHTML = totalCost;

  buttonDelete.onclick = () => {
    axios
      .delete(
        `https://crudcrud.com/api/2c82b11f42d34901b22274b3a0ee83fc/SellerData/${obj["_id"]}`
      )
      .catch((err) => console.log(err));
    listItems.removeChild(listElement);
    totalCost -= parseInt(obj.price);
    document.getElementById("showPrice").innerHTML = totalCost;
  };
}

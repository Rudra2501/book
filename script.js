document.getElementById("myButton").addEventListener("click", crudAPI);

function crudAPI() {
  let name = document.getElementById("userName").value;
  let email = document.getElementById("mail").value;
  let number = document.getElementById("number").value;

  const myDetails = {
    name,
    email,
    number,
  };

  axios
    .post(
      "https://crudcrud.com/api/019b55a81f3c438da38bd2dc0ec9dc7c/Pratap/",
      myDetails
    )
    .catch((err) => console.log(err));
}

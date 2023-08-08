let userName = JSON.parse(localStorage.getItem("user"));
let welcome = document.querySelector("h1");
let logOut = document.querySelector(".btn");

welcome.innerText = `WELCOME ${userName.toUpperCase()} 😀`;
logOut.addEventListener("click", function () {
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

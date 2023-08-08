let singUp = document.querySelector("span");
let nameLabel = document.querySelector(".name");
let userNameInput = document.querySelector("#userName");
let emailInput = document.querySelector("#userEmail");
let passwordInput = document.querySelector("#userPassword");
let button = document.querySelector("button");
let haveAccount = document.querySelector("p");
let register = "REGISTER";
let login = "LOGIN";
let users = [];
if (localStorage.getItem("userStorage") !== null) {
  users = JSON.parse(localStorage.getItem("userStorage"));
}
singUp.addEventListener("click", function () {
  if (nameLabel.classList.contains("d-none")) {
    nameLabel.classList.remove("d-none");
    haveAccount.textContent = `You have an account?`;
    singUp.textContent = "Sign In";
    button.textContent = register;
  } else {
    nameLabel.classList.add("d-none");
    haveAccount.textContent = `Don’t have an account?`;
    singUp.textContent = "Sign Up";
    button.textContent = login;
  }
});
button.addEventListener("click", function () {
  button.innerText === register ? getNewUser() : logIn();
});

function getNewUser() {
  let duplicateEmail = true;
  let user = {
    userName:
      userNameInput.value != ""
        ? userNameInput.value
        : alert("user name is empty"),
    email: emailInput.value,
    password: passwordInput.value,
  };
  if (validationEmail() === true) {
    users.forEach((user) => {
      if (user.email.includes(emailInput.value)) {
        duplicateEmail = false;
      }
    });
    if (duplicateEmail === false) {
      button.innerText === register
        ? swal("Email is already exist", "", "error")
        : "";
    } else if (button.innerText === register && user.userName !== undefined) {
      {
        users.push(user);
        swal("Success", "", "success");
        clearInput();
      }
    }
  } else {
    swal(
      `1-password must be between 8 and 10 characters 
    2-contain at least one uppercase  and one lowercase alphabetic character
    3-must n contain special characters.`,
      {
        button: false,
      }
    );
  }

  localStorage.setItem("userStorage", JSON.stringify(users));
}

function logIn() {
  let email = false;
  if (button.innerText === login) {
    users.find((user) => {
      if (user.email === emailInput.value) {
        email = true;
        if (user.password === passwordInput.value) {
          localStorage.setItem("user", JSON.stringify(user.userName));
          window.location.href = "login.html";
        } else {
          swal("incorrect password", "", "warning");
        }
      }
    });
    if (email === false) swal("email is not found", "", "error");
    clearInput();
  }
}

function clearInput() {
  userNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

function validationEmail() {
  let regexEmail =
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    regexEmail.test(emailInput.value), regexPassword.test(passwordInput.value)
  );
}

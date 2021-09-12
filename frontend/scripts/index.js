import { login, logout } from "./login";
import { displayExhibitorData } from "./exhibitorList";

const loginForm = document.querySelector(".form--login");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

// MENU

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector(".navigation");

export const toggleMenu = function() {
  navigation.classList.toggle("hidden");
  console.log("in");
};

// EVENTLISTENER FOR MENU

// Navigation Menu
if (menuButton) {
  menuButton.addEventListener("click", toggleMenu);

  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("menu--active");
  });

  menuButton.addEventListener("blur", function() {
    menuButton.classList.remove("menu--active");
  });
}

const logoutBtn = document.querySelector(".logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

// EXHIBITOR DATA

// DECLARE ALL CONST
const allExhibitors = document.querySelector(".exhibitor-list");
// const allExhibitorData = document.querySelectorAll(".exhibitor__data");

// TO EXPAND THE EXHIBITOR ROW
if (allExhibitors) {
  allExhibitors.addEventListener("click", displayExhibitorData);
}

// UPDATE SETTINGS
const userDataBtn = document.querySelector(".form-user-data");

if (userDataBtn) {
  userDataBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    updateSettings({ firstName, lastName, email }, "data");
  });
}

const userPasswordBtn = document.querySelector(".form-user-password");

if (userPasswordBtn) {
  userPasswordBtn.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".update-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );

    document.querySelector(".update-password").textContent = "Save Password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}
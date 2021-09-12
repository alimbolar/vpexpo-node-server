import { showAlert } from "./alert.js";
import axios from "axios";

export const login = async function(email, password) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged In");
      window.setTimeout(() => location.assign("/exhibitors"), 1500);
    }
  } catch (err) {
    // console.log(err.response.data.message);
    // console.log(err);
    showAlert("error", err.response.data.message);
    // showAlert("error", "placeholder error");
  }
};

export const logout = async function() {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });

    console.log("inside logout");
    if (res.data.status === "success") {
      // showAlert("success", "Logged Out");
      alert("logged out");
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Error Loggin Out. Try again!");
  }
};

// testing
// const loginForm = document.querySelector(".form--login");

// if (loginForm) {
//   loginForm.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     login(email, password);
//   });
// }

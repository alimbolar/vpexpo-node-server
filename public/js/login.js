import { showAlert } from "./alert.js";

const login = async function(email, password) {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
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
    console.log(err);
    showAlert("error", err);
  }
};

export const logout = async function() {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
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

const form = document.querySelector(".form");
console.log(form);
// console.log(logoutBtn);
// const logoutBtn = document.querySelector(".logout");

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", logout);
// }

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

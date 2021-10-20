import { showAlert, showMessage } from "./alert.js";
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
      // showAlert("success", "Logged In");
      showMessage("Logging In", "Redirecting you to your profile view");
      window.setTimeout(() => location.assign("/me"), 2000);
    }
  } catch (err) {
    // showAlert("error", err.response.data.message);
    showMessage("error", err.response.data.message);
  }
};

export const logout = async function() {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });

    if (res.data.status === "success") {
      showMessage("Logging Out", "Redirecting you to home page");

      window.setTimeout(() => location.assign("/"), 3000);
    }
  } catch (err) {
    console.log(err);
    showMessage("error", "Error Loggin Out. Try again!");
  }
};

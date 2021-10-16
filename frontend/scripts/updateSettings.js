const fetch = require("node-fetch");
import axios from "axios";
import { showMessage } from "./alert";

export const updateEvento = async function(data, type) {
  try {
    const url = "/api/v1/eticket/visitor";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();

    // console.log(res);

    if (res.status === "success") {
      console.log(`${type.toUpperCase()} Updated`);

      // return status;
    }

    if (res.status === "fail") {
      console.log("Evento Could Not Be Updated");
    }

    // return ""
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const updateSettings = async function(data, type) {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    console.log(res);

    if (res.data.status === "success") {
      console.log(`${type.toUpperCase()} Updated`);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

/////// FOR RECENT UPDATE

// export const updateSettings = async function(data, type) {
//   try {
//     const url =
//       type === "password"
//         ? "/api/v1/users/updateMyPassword"
//         : "/api/v1/users/updateMe";

//     const res = await axios({
//       method: "PATCH",
//       url,
//       data,
//     });

//     if (res.data.status === "success") {
//       alert(`${type.toUpperCase()} Updated`);
//     }
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };

////// OLD
// document.querySelector(".form-user-data").addEventListener("submit", (e) => {
//   e.preventDefault();
//   const firstName = document.getElementById("firstName").value;
//   const lastName = document.getElementById("lastName").value;
//   const email = document.getElementById("email").value;
//   updateSettings({ firstName, lastName, email }, "data");
// });

// document
//   .querySelector(".form-user-password")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();

//     document.querySelector(".update-password").textContent = "Updating...";
//     const passwordCurrent = document.getElementById("password-current").value;
//     const password = document.getElementById("password").value;
//     const passwordConfirm = document.getElementById("password-confirm").value;

//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       "password"
//     );

//     document.querySelector(".update-password").textContent = "Save Password";
//     document.getElementById("password-current").value = "";
//     document.getElementById("password").value = "";
//     document.getElementById("password-confirm").value = "";
//   });

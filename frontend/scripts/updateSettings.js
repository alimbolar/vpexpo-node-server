const fetch = require("node-fetch");
import axios from "axios";

export const updateEvento = async function(data, type) {
  try {
    // console.log("data", data);
    const url = "/api/v1/eticket/visitor";

    // const res = await axios({
    //   method: "POST",
    //   url,
    //   data,
    // });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();

    // console.log("res status", res.status);

    if (res.status === "success") {
      console.log(`${type.toUpperCase()} Updated`);
      // alert(`Evento Updated`);
    }
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

    // const response = fetch(url, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    // const res = response.json();

    console.log(res.data.status);
    // console.log(res);

    if (res.data.status === "success") {
      console.log(`${type.toUpperCase()} Updated`);

      // window.location.href = "/me";
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

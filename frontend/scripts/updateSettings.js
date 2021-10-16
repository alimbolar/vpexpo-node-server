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

    if (res.status === "success") {
      console.log(`${type.toUpperCase()} Updated`);
    }

    if (res.status === "fail") {
      console.log("Evento Could Not Be Updated");
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

    console.log(res);

    if (res.data.status === "success") {
      console.log(`${type.toUpperCase()} Updated`);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

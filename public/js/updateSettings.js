const updateData = async function(firstName, lastName, email) {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/api/v1/users/updateMe",
      data: {
        firstName,
        lastName,
        email,
      },
    });

    if (res.data.status === "success") {
      alert("data updated");
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.querySelector(".form-user-data").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;

  updateData(firstName, lastName, email);
});

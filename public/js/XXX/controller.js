// import "../css/main.scss";
// import "regenerator-runtime/runtime";

// DECLARE ALL CONST
const content = document.querySelector(".content");
const openingPage = document.querySelector(".opening-page");
const displayList = document.querySelector(".display-list");
const listExhibitorButton = document.querySelector(".list-exhibitor");
const testExhibitorButton = document.querySelector(".test-exhibitor");
const listVisitorButton = document.querySelector(".list-visitor");
const menuButton = document.querySelector(".menu");
const loginWrapper = document.querySelector(".login");
const heroImage = document.querySelector(".hero-image");
const loginForm = document.getElementById("login-form");
const logo = document.querySelector(".logo");
const allExhibitorData = document.querySelectorAll(".exhibitor__data");
const allExhibitors = document.querySelector(".exhibitor-list");
const navigation = document.querySelector(".navigation");

// TO DISPLAY THE MODAL ON CLICKING THE EXHIBITOR PLAN LINK

document.querySelector(".modal-link").addEventListener("click", function() {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});

document.querySelector(".overlay").addEventListener("click", function() {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

document.querySelector(".close").addEventListener("click", function() {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

// TO EXPAND THE EXHIBITOR ROW
if (allExhibitors) {
  allExhibitors.addEventListener("click", function(e) {
    e.preventDefault();

    const exhibitorInfo = e.target.closest(".exhibitor__info");

    console.log(e.target);
    console.log(exhibitorInfo);
    // console.log(exhibitorInfo.nextElementSibling);

    if (exhibitorInfo) {
      allExhibitorData.forEach((exhibitorData) =>
        exhibitorData.classList.add("hidden")
      );
      exhibitorInfo.nextElementSibling.classList.toggle("hidden");
      console.log("in");
    }
  });
}

// TO HIDE AND UNHIDE THE EXHIBITOR LIST VIEW

if (testExhibitorButton) {
  testExhibitorButton.addEventListener("click", function() {
    document.querySelector(".navigation").classList.add("hidden");
    document.querySelector(".all-exhibitors").classList.remove("hidden");
    // document.querySelector(".opening-page").classList.add("hidden");
  });
}

if (logo) {
  logo.addEventListener("click", function() {
    document.querySelector(".navigation").classList.add("hidden");
    document.querySelector(".all-exhibitors").classList.add("hidden");
    document.querySelector(".opening-page").classList.remove("hidden");
  });
}

const state = {
  user: {
    loggedIn: false,
  },
};

const toggleMenu = function() {
  document.querySelector(".navigation").classList.toggle("hidden");
  console.log("in");
};

// EVENTLISTENER FOR MENU

if (menuButton) {
  menuButton.addEventListener("click", toggleMenu);

  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("menu--active");
  });

  menuButton.addEventListener("blur", function() {
    menuButton.classList.remove("menu--active");
  });
}
// window.addEventListener('click',()=>{
//   menuButton.classList.remove("menu--active");
// })

// CONTROLLER FOR DISPLAYING EXHIBITORS

// const displayExhibitors = async function() {
//   if (state.user.loggedIn !== true) {
//     loginWrapper.classList.toggle("hidden");
//     heroImage.classList.toggle("hidden");

//     console.log(`state ${state.user.loggedIn}`);
//     // console.dir(state);
//     return;
//   }

//   openingPage.innerHTML = "";
//   displayList.innerHTML = "";
//   toggleMenu();

//   const response = await fetch(
//     "https://api-server.fourplusmedia.com/api/v1/creator/vp-expo-main-console/report/Exhibitor_Report"
//   );

//   const exhibitorData = await response.json();

//   let html = "";

//   Object.entries(exhibitorData).forEach((exhibitor, i) => {
//     html += `

//     <article class="exhibitor-card">
//       <div class="exhitor-details">
//       <h2>${+exhibitor[0] + 1} : ${exhibitor[1].Exhibitor_Name}</h2>
//       <p>${exhibitor[1].Address.display_value}</p>
//       </div>

//       <div class="exhibitor-icons">
//       <i class="far fa-heart fa-lg"></i>
//       <i class="far fa-handshake fa-lg"></i>
//       </div>
//     </article>`;
//   });

//   displayList.insertAdjacentHTML("afterbegin", html);
// };

// EVENT LISTENER FOR DISPLAYING EXHIBITORS

// listExhibitorButton.addEventListener("click", displayExhibitors);

// const displayVisitors = async function() {
//   openingPage.innerHTML = "";
//   displayList.innerHTML = "";
//   toggleMenu();

//   const response = await fetch(
//     "https://api-server.fourplusmedia.com/api/v1/creator/vp-expo-main-console/report/Visitor_Report"
//   );

//   const visitorData = await response.json();

//   let html = "";

//   Object.entries(visitorData).forEach((visitor) => {
//     html += `
//     <article class="exhibitor-card">
//     <div class="exhitor-details">
//     <h2>${+visitor[0] + 1} : ${visitor[1].Name.display_value}</h2>
//     <p>${visitor[1].Address.display_value}</p>
//     <p><small>Email : ${visitor[1].Email}</small></p>
//     <p><small>Mobile : ${visitor[1].Mobile}</small></p>
//     </div>

//     <div class="exhibitor-icons">
//     <i class="far fa-heart fa-lg"></i>
//     <i class="far fa-handshake fa-lg"></i>
//     </div>
//   </article>`;
//   });

//   displayList.insertAdjacentHTML("afterbegin", html);

//   console.log(Object.entries(visitorData));
// };

// listVisitorButton.addEventListener("click", displayVisitors);

// const verifyUser = async function(e) {
//   // on form submission, prevent default
//   e.preventDefault();

//   console.log(this);
//   console.log(loginForm);

//   // construct a FormData object, which fires the formdata event

//   //  https://javascript.info/formdata

//   const data = await new FormData(this);

//   console.log(...data);

//   // Expanding / Destructuring the formData value into arrays
//   const dataArray = [...data];

//   // Converting the dataArra into an Object
//   const formResult = Object.fromEntries(dataArray);

//   console.log(formResult.Email);
//   const email = formResult.Email;

//   if (email !== "alimbolar@gmail.com") {
//     alert("wrong credentials");
//     return;
//   }

//   // state.user.Name = "Alim Bolar";
//   state.user.Email = formResult.Email;
//   state.user.loggedIn = true;

//   alert("logged in");
// };

// // loginForm.addEventListener("submit", verifyUser);

// var myHeaders = new Headers();
// myHeaders.append(
//   "Authorization",
//   "Zoho-oauthtoken 1000.8adfc51560ffcc1124b0d8d949cbddc3.8466ec3e72755e34d663ce25dd3e1935"
// );

// var requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };

// fetch(
//   "https://creator.zoho.com/api/v2/fourplusindia/vp-expo-main-console/report/Exhibitor_Report",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

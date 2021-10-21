import { login, logout } from "./login";
import { showMessage, hidePopup } from "./alert";
import { updateSettings, updateEvento, updateZoho } from "./updateSettings";
import {
  listExhibitor,
  listVisited,
  showMap,
  listSorted,
  listSearched,
  displayExhibitorDetail,
  showExhibitorsLayout,
  goToLogin,
} from "./listExhibitor";
import { displayCountries, displaySelected } from "./form";

const selectCountry = document.querySelector("#country");
const selectNationality = document.querySelector("#nationality");

if (selectCountry) {
  displaySelected(country);
}

if (selectNationality) {
  displaySelected(nationality);
}

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
// if (allExhibitors) {
//   allExhibitors.addEventListener("click", displayExhibitorData);
// }

// UPDATE SETTINGS
const saveSettings = document.querySelector("#user-data");

if (saveSettings) {
  saveSettings.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const mobile = document.getElementById("mobile").value;
      const email = document.getElementById("email").value;
      const company = document.getElementById("company").value;
      const profile = document.getElementById("profile").value;
      const country = document.getElementById("country").value;
      const nationality = document.getElementById("nationality").value;
      const type = document.getElementById("type").value;
      const visitorId = document.getElementById("visitorId").value;

      // const visitorForEvento = {
      //   VisitorNumber: visitorId,
      //   FirstName: firstName,
      //   LastName: lastName,
      //   Mobile: mobile,
      //   Email: email,
      //   Company: company,
      //   JobTitle: profile,
      //   Country: country,
      //   Nationality: nationality,
      //   Category: type,
      // };

      // // UPDATE EVENTO DATABASE
      // await updateEvento(visitorForEvento, "evento");

      const visitorForZoho = {
        data: {
          // Name.first_name : firstName,
          // Name.last_name : lastName,
          // Mobile : mobile,
          // Email : email,
          // Company : company,
          // Visitor_Profile : profile,
          // address,
          // city,
          Visitor_Country: country,
          Visitor_Nationality: nationality,
          // Type : type,
        },
      };

      const response = await updateZoho(visitorForZoho, "zoho", visitorId);

      // // UPDATE MONGODB
      // await updateSettings(
      //   {
      //     firstName,
      //     lastName,
      //     mobile,
      //     email,
      //     company,
      //     profile,
      //     // address,
      //     // city,
      //     country,
      //     nationality,
      //     type,
      //   },
      //   "data"
      // );

      console.log(response);
      showMessage("Data Updated", "Moving you to your profile view");

      window.setTimeout(() => location.assign("/me"), 2000);
    },
    false
  );
}

const updateData = document.querySelector(".update-data");

if (updateData) {
  updateData.addEventListener("click", function() {
    window.open("/me/profile", "_self");
  });
}

//// NOT FOR CURRENT RELEASE
//////////////////////////////////////
// const savePassword = document.querySelector(".form-user-password");

// if (savePassword) {
//   userPasswordBtn.addEventListener("submit", async (e) => {
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
// }

// MENU
// const popupLinks = document.querySelectorAll(".popup-link");
const closeButton = document.querySelector(".close");
const closeOverlay = document.querySelector(".overlay");

// popupLinks.forEach((popupLink) => {
//   popupLink.addEventListener("click", function() {
//     showMessage(
//       "Coming Soon",
//       "See you at VP Expo. We are as excited as you are!"
//     );
//   });
// });

closeButton.addEventListener("click", hidePopup);
closeOverlay.addEventListener("click", hidePopup);

// PRINT BADGE

const printBadge = document.querySelector(".print-badge");

if (printBadge) {
  printBadge.addEventListener("click", function() {
    const visitorId = printBadge.dataset.id;
    window.open(
      `https://visionplus.evsreg.com/badge.aspx?ID=${visitorId}`,
      "_blank"
    );
  });
}

// // DISPLAY EXHIBITOR DETAILS
const exhibitorProfileBtns = document.querySelectorAll(
  ".view-exhibitor-profile"
);

if (exhibitorProfileBtns) {
  exhibitorProfileBtns.forEach((button) => {
    const url = `/exhibitor/${button.getAttribute("data-slug")}`;

    button.addEventListener("click", function() {
      window.open(url, "_self");
    });
  });
}

const goToLoginBtns = document.querySelectorAll(".go-to-login");

if (goToLoginBtns) {
  goToLoginBtns.forEach((button) => {
    const url = "/login";

    button.addEventListener("click", function() {
      window.open(url, "_self");
    });
  });
}

// const knowMoreBtns = document.querySelectorAll(".know-more");

// if (exhibitorRows) {
//   exhibitorRows.addEventListener("click", displayExhibitorDetail);
// }

// if (knowMoreBtns) {
//   knowMoreBtns.forEach((knowMoreBtn) => {
//     knowMoreBtn.addEventListener("click", function() {
//       const url = knowMoreBtn.getAttribute("href");
//       window.open(url, "_self");
//       // location.href(url);
//     });
//   });
// }

// FOOTER LINKS

const listExhibitorBtn = document.querySelector(".list-exhibitor");
const listVisitedBtn = document.querySelector(".list-visited");
const exhibitorsLayout = document.querySelector(".exhibitors-layout");

const listSortedBtn = document.querySelector(".list-sorted");
const listSearchedBtn = document.querySelector(".list-searched");
const loginLinks = document.querySelectorAll(".go-to-login");

if (loginLinks) {
  loginLinks.forEach((loginLink) => {
    loginLink.addEventListener("click", goToLogin);
  });
}

if (listExhibitorBtn) {
  listExhibitorBtn.addEventListener("click", listExhibitor);
}

if (listVisitedBtn) {
  listVisitedBtn.addEventListener("click", listVisited);
}

if (exhibitorsLayout) {
  exhibitorsLayout.addEventListener("click", showExhibitorsLayout);
}

if (listSortedBtn) {
  listSortedBtn.addEventListener("click", listSorted);
}
if (listSearchedBtn) {
  listSearchedBtn.addEventListener("click", listSearched);
}

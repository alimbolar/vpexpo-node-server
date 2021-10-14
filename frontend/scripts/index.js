import { login, logout } from "./login";
import { showMessage, hidePopup } from "./alert";
// import { showTicket } from "./printTicket";
// import { printTicket } from "./printTicket";
import { updateSettings, updateEvento } from "./updateSettings";
import {
  listExhibitor,
  listVisited,
  listSorted,
  listSearched,
  displayExhibitorDetail,
} from "./listExhibitor";

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
// if (allExhibitors) {
//   allExhibitors.addEventListener("click", displayExhibitorData);
// }

// UPDATE SETTINGS
const saveSettings = document.querySelector(".form-user-data");

if (saveSettings) {
  saveSettings.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const company = document.getElementById("company").value;
    const profile = document.getElementById("profile").value;
    // const address = document.getElementById("address").value;
    // const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const nationality = document.getElementById("nationality").value;
    const type = document.getElementById("type").value;
    const visitorId = document.getElementById("visitorId").value;

    const visitorForEvento = {
      VisitorNumber: visitorId,
      FirstName: firstName,
      LastName: lastName,
      Mobile: mobile,
      Email: email,
      Company: company,
      JobTitle: profile,
      Country: country,
      Nationality: nationality,
      Category: type,
    };

    // console.log(visitorForEvento);

    // UPDATE EVENTO DATABASE
    // await updateEvento(visitorForEvento, "evento");

    // UPDATE MONGODB
    await updateSettings(
      {
        firstName,
        lastName,
        mobile,
        email,
        company,
        profile,
        // address,
        // city,
        country,
        nationality,
        type,
      },
      "data"
    );
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
const popupLinks = document.querySelectorAll(".popup-link");
const closeButton = document.querySelector(".close");
const closeOverlay = document.querySelector(".overlay");

popupLinks.forEach((popupLink) => {
  popupLink.addEventListener("click", function() {
    showMessage(
      "Coming Soon",
      "See you at VP Expo. We are as excited as you are!"
    );
  });
});

closeButton.addEventListener("click", hidePopup);
closeOverlay.addEventListener("click", hidePopup);

// PRINT TICKET

// const showTicketStatus = document.querySelector(".show-ticket");
// const showModal = document.querySelector(".modal__content");
const updateData = document.querySelector(".update-data");
const printBadge = document.querySelector(".print-badge");

// if (showTicketStatus) {
//   showTicketStatus.addEventListener("click", showTicket);
// }

// if (showModal) {
//   showModal.addEventListener("click", function(e) {
//     e.preventDefault();

//     if (e.target.closest(".ticket__print-ticket")) {
//       const printTicketBtn = e.target;
//       const visitorId = printTicketBtn.dataset.visitorId;

//       printTicket(visitorId);
//     }
//   });
// }

if (updateData) {
  updateData.addEventListener("click", function() {
    window.open("/me/profile", "_self");
  });
}

if (printBadge) {
  printBadge.addEventListener("click", function() {
    const visitorId = printBadge.dataset.id;
    window.open(
      `https://visionplus.evsreg.com/badge.aspx?ID=${visitorId}`,
      "_blank"
    );
  });
}

// DISPLAY EXHIBITOR DETAILS
const exhibitorRows = document.querySelector(".table");
const knowMoreBtns = document.querySelectorAll(".know-more");

if (exhibitorRows) {
  exhibitorRows.addEventListener("click", displayExhibitorDetail);
}

if (knowMoreBtns) {
  knowMoreBtns.forEach((knowMoreBtn) => {
    knowMoreBtn.addEventListener("click", function() {
      const url = knowMoreBtn.getAttribute("href");
      window.open(url, "_self");
      // location.href(url);
    });
  });
}

// FOOTER LINKS

const listExhibitorBtn = document.querySelector(".list-exhibitor");
const listVisitedBtn = document.querySelector(".list-visited");
const listSortedBtn = document.querySelector(".list-sorted");
const listSearchedBtn = document.querySelector(".list-searched");

if (listExhibitorBtn) {
  listExhibitorBtn.addEventListener("click", listExhibitor);
}

if (listVisitedBtn) {
  listVisitedBtn.addEventListener("click", listVisited);
}

if (listSortedBtn) {
  listSortedBtn.addEventListener("click", listSorted);
}
if (listSearchedBtn) {
  listSearchedBtn.addEventListener("click", listSearched);
}

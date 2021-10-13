import { login, logout } from "./login";
import { displayExhibitorData } from "./XXXexhibitorList";
import { showMessage, hidePopup } from "./alert";
import { showTicket } from "./printTicket";
import { printTicket } from "./printTicket";
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
const userDataBtn = document.querySelector(".form-user-data");

if (userDataBtn) {
  userDataBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const company = document.getElementById("company").value;
    const profile = document.getElementById("profile").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const nationality = document.getElementById("nationality").value;
    const type = document.getElementById("type").value;
    const visitorId = document.getElementById("visitorId").value;

    console.log(profile);

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

    console.log("visitor", visitorForEvento);
    updateEvento(visitorForEvento);

    updateSettings(
      {
        firstName,
        lastName,
        mobile,
        email,
        company,
        profile,
        address,
        city,
        country,
        nationality,
        type,
      },
      "data"
    );
  });
}

const userPasswordBtn = document.querySelector(".form-user-password");

if (userPasswordBtn) {
  userPasswordBtn.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".update-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );

    document.querySelector(".update-password").textContent = "Save Password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

// MENU

const popupLinks = document.querySelectorAll(".popup-link");
const btnClose = document.querySelector(".close");
const overlayClose = document.querySelector(".overlay");

popupLinks.forEach((popupLink) => {
  popupLink.addEventListener("click", function() {
    showMessage(
      "Coming Soon",
      "See you at VP Expo. We are as excited as you are!"
    );
  });
});

btnClose.addEventListener("click", hidePopup);
overlayClose.addEventListener("click", hidePopup);

// PRINT TICKET

const showTicketBtn = document.querySelector(".show-ticket");
const modalContent = document.querySelector(".modal__content");

if (showTicketBtn) {
  showTicketBtn.addEventListener("click", showTicket);
  // showTicketBtn.addEventListener("click", function() {
  //   alert("hello hell");
  // });
}

if (modalContent) {
  modalContent.addEventListener("click", function(e) {
    e.preventDefault();

    if (e.target.closest(".ticket__print-ticket")) {
      const printTicketBtn = e.target;
      const visitorId = printTicketBtn.dataset.visitorId;

      printTicket(visitorId);
    }

    if (e.target.closest(".update-data")) {
      // alert("let's edit my profile");

      location.href = "/me/profile";
    }

    // if(e.target)

    // alert("hello hell");
    // console.log(printTicketBtn);
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

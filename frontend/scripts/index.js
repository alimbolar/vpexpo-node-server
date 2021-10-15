import { login, logout } from "./login";
import { showMessage, hidePopup } from "./alert";
// import { showTicket } from "./printTicket";
// import { printTicket } from "./printTicket";
import { updateSettings, updateEvento } from "./updateSettings";
import {
  listExhibitor,
  listVisited,
  showMap,
  listSorted,
  listSearched,
  displayExhibitorDetail,
} from "./listExhibitor";
import { displayCountries } from "./form";

window.addEventListener("load", displayCountries);

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
    await updateEvento(visitorForEvento, "evento");

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
const displayMap = document.querySelector(".show-map");

const listSortedBtn = document.querySelector(".list-sorted");
const listSearchedBtn = document.querySelector(".list-searched");

if (listExhibitorBtn) {
  listExhibitorBtn.addEventListener("click", listExhibitor);
}

if (listVisitedBtn) {
  listVisitedBtn.addEventListener("click", listVisited);
}

if (displayMap) {
  displayMap.addEventListener("click", showMap);
}

if (listSortedBtn) {
  listSortedBtn.addEventListener("click", listSorted);
}
if (listSearchedBtn) {
  listSearchedBtn.addEventListener("click", listSearched);
}

// /// COUNTRY SELECT
// // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_custom_select

// var x, i, j, l, ll, selElmnt, a, b, c;
// /*look for any elements with the class "custom-select":*/
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//   selElmnt = x[i].getElementsByTagName("select")[0];
//   ll = selElmnt.length;
//   /*for each element, create a new DIV that will act as the selected item:*/
//   a = document.createElement("DIV");
//   a.setAttribute("class", "select-selected");
//   a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//   x[i].appendChild(a);
//   /*for each element, create a new DIV that will contain the option list:*/
//   b = document.createElement("DIV");
//   b.setAttribute("class", "select-items select-hide");
//   for (j = 1; j < ll; j++) {
//     /*for each option in the original select element,
//     create a new DIV that will act as an option item:*/
//     c = document.createElement("DIV");
//     c.innerHTML = selElmnt.options[j].innerHTML;
//     c.addEventListener("click", function(e) {
//       /*when an item is clicked, update the original select box,
//         and the selected item:*/
//       var y, i, k, s, h, sl, yl;
//       s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//       sl = s.length;
//       h = this.parentNode.previousSibling;
//       for (i = 0; i < sl; i++) {
//         if (s.options[i].innerHTML == this.innerHTML) {
//           s.selectedIndex = i;
//           h.innerHTML = this.innerHTML;
//           y = this.parentNode.getElementsByClassName("same-as-selected");
//           yl = y.length;
//           for (k = 0; k < yl; k++) {
//             y[k].removeAttribute("class");
//           }
//           this.setAttribute("class", "same-as-selected");
//           break;
//         }
//       }
//       h.click();
//     });
//     b.appendChild(c);
//   }
//   x[i].appendChild(b);
//   a.addEventListener("click", function(e) {
//     /*when the select box is clicked, close any other select boxes,
//       and open/close the current select box:*/
//     e.stopPropagation();
//     closeAllSelect(this);
//     this.nextSibling.classList.toggle("select-hide");
//     this.classList.toggle("select-arrow-active");
//   });
// }

// function closeAllSelect(elmnt) {
//   /*a function that will close all select boxes in the document,
//   except the current select box:*/
//   var x,
//     y,
//     i,
//     xl,
//     yl,
//     arrNo = [];
//   x = document.getElementsByClassName("select-items");
//   y = document.getElementsByClassName("select-selected");
//   xl = x.length;
//   yl = y.length;
//   for (i = 0; i < yl; i++) {
//     if (elmnt == y[i]) {
//       arrNo.push(i);
//     } else {
//       y[i].classList.remove("select-arrow-active");
//     }
//     x;
//   }
//   for (i = 0; i < xl; i++) {
//     if (arrNo.indexOf(i)) {
//       x[i].classList.add("select-hide");
//     }
//   }
// }
// /*if the user clicks anywhere outside the select box,
// then close all select boxes:*/
// document.addEventListener("click", closeAllSelect);

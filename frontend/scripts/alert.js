export const hideAlert = function() {
  const el = document.querySelector(".alert");
  if (el) {
    el.parentElement.removeChild(el);
  }
};

export const showAlert = function(type, message) {
  hideAlert();
  const markup = `<div class = alert alert--${type}>${message}</div>`;
  const content = document.querySelector(".content");
  content.insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 10000);
};
// sdfsldkl

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

export const showPopup = function(headline, body) {
  hidePopup();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const markup = `<div class="modal__headline">${headline} </div> <div class="modal__body">${body} </div>`;
  const modalContent = document.querySelector(".modal__content");
  modalContent.innerHTML = "";
  modalContent.insertAdjacentHTML("afterbegin", markup);
};

export const hidePopup = function() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// document.querySelector(".modal-link").addEventListener("click", function() {
//   document.querySelector(".modal").classList.remove("hidden");
//   document.querySelector(".overlay").classList.remove("hidden");
// });

// document.querySelector(".overlay").addEventListener("click", function() {
//   document.querySelector(".modal").classList.add("hidden");
//   document.querySelector(".overlay").classList.add("hidden");
// });

// document.querySelector(".close").addEventListener("click", function() {
//   document.querySelector(".modal").classList.add("hidden");
//   document.querySelector(".overlay").classList.add("hidden");
// });

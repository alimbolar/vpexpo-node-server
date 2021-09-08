export const hideAlert = function() {
  const el = document.querySelector(".alert");
  if (el) {
    el.parentElement.removeChild(el);
  }
};

export const showAlert = function(type, message) {
  hideAlert();
  const markup = `<div class = alert alert--${type}>${message}</div>`;
  console.log(markup);
  const content = document.querySelector(".content");
  console.log(content);
  content.insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 10000);
};

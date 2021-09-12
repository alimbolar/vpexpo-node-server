export const displayExhibitorData = function(e) {
  e.preventDefault();

  const exhibitorInfo = e.target.closest(".exhibitor__info");
  const allExhibitorData = document.querySelectorAll(".exhibitor__data");

  if (exhibitorInfo) {
    // Hide all open Exhibitor Data Rows
    allExhibitorData.forEach((exhibitorData) =>
      exhibitorData.classList.add("hidden")
    );
    // Display The Current Exhibitor's Data
    exhibitorInfo.nextElementSibling.classList.toggle("hidden");
  }
};

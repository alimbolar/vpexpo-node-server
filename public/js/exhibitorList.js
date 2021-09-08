// DECLARE ALL CONST
const allExhibitors = document.querySelector(".exhibitor-list");
const allExhibitorData = document.querySelectorAll(".exhibitor__data");

// TO EXPAND THE EXHIBITOR ROW
if (allExhibitors) {
  allExhibitors.addEventListener("click", function(e) {
    e.preventDefault();

    const exhibitorInfo = e.target.closest(".exhibitor__info");

    if (exhibitorInfo) {
      // Hide all open Exhibitor Data Rows
      allExhibitorData.forEach((exhibitorData) =>
        exhibitorData.classList.add("hidden")
      );
      // Display The Current Exhibitor's Data
      exhibitorInfo.nextElementSibling.classList.toggle("hidden");
    }
  });
}

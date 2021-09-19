import { hidePopup, showMessage, showPopup } from "./alert";

export const listExhibitor = function(e) {
  e.preventDefault();

  showMessage("Exhibitor List", "Displaying list of all exhibitors");

  // const exhibitorInfo = e.target.closest(".exhibitor__info");
  // const allExhibitorData = document.querySelectorAll(".exhibitor__data");

  // if (exhibitorInfo) {
  //   // Hide all open Exhibitor Data Rows
  //   allExhibitorData.forEach((exhibitorData) =>
  //     exhibitorData.classList.add("hidden")
  //   );
  //   // Display The Current Exhibitor's Data
  //   exhibitorInfo.nextElementSibling.classList.toggle("hidden");
  // }
};
// sfsdlk

export const listVisited = function(e) {
  e.preventDefault();

  showMessage(
    "Visted Exhibitor List",
    "Displaying a list of all exhibitors that you've allready visited"
  );
};

export const listSorted = function(e) {
  e.preventDefault();

  const sortedMarkup = `
  
  <div class="sort-box">
  <div class="sort-box__heading">Sort By</div>
  <div class="sort-box__button"> <a href="/exhibitors" class="btn"> Exhibitors</a> </div>

  <div class="sort-box__button"> <a href="/exhibitors" class="btn">Booth Number</a> </div>
  </div>

  `;

  showPopup(sortedMarkup);
};

export const listSearched = function(e) {
  e.preventDefault();

  const searchedMarkup = `
  
  <div class="search-box">
  <input id="search-box__input" class="search-box__input" type="text" name="search-box__input" value="" placeholder="Type here to search">
  <div class="search-box__button"> <a href="/exhibitors" class="btn"> Search</a> </div>


  </div>

  `;

  showPopup(searchedMarkup);
};

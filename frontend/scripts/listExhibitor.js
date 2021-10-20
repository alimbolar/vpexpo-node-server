import { hidePopup, showMessage, showPopup } from "./alert";

export const goToLogin = function(e) {
  e.preventDefault();
  window.open("/login", "_self");
};

export const listExhibitor = function(e) {
  window.open("/exhibitors", "_self");
};

// export const displayExhibitorDetail = function(e) {
//   e.preventDefault();

//   const exhibitorRow = e.target.closest(".exhibitor__summary");
//   const expandedAll = document.querySelectorAll(".expanded");

//   if (!exhibitorRow) return;
//   // Hide all open Exhibitor Data Rows
//   expandedAll.forEach((expanded) => expanded.classList.add("hidden"));
//   // Display The Current Exhibitor's Data
//   exhibitorRow.nextElementSibling.classList.toggle("hidden");
// };

export const showExhibitorsLayout = function(e) {
  window.open("/exhibitors/layout", "_self");
};

export const listSorted = function(e) {
  e.preventDefault();

  const sortedMarkup = `

  <div class="sort-box">
  <div class="sort-box__heading">Sort By</div>
  <div class="sort-box__button"> <a href="/exhibitors?sort=name" class="btn"> Exhibitors</a> </div>

  <div class="sort-box__button"> <a href="/exhibitors?sort=booth" class="btn">Booth Number</a> </div>
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

export const listVisited = function(e) {
  // e.preventDefault();
  window.open("/exhibitors-visited", "_self");
};

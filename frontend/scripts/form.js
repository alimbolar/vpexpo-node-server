const country = document.getElementById("country");
const nationality = document.getElementById("nationality");

const displayCountry = function() {
  //CREATE ARRAY OF ALL OPTIONS
  const optionsArray = Object.entries(country.children);
  //   console.log(optionsArray);
  // GET NAME OF COUNTRY FROM SELECT FIELD
  const nameOfCountry = country.getAttribute("value");
  //   console.log(nameOfCountry);
  // FIND OPTION WITH THE SAME COUNTRY NAME
  const option = optionsArray.find(
    (option) => option[1].value === nameOfCountry
  );
  // UPDATE OPTION FIELD BY SETTING ATTRIBUTE OF SELECTED
  option[1].setAttribute("selected", true);
  //   console.log(option[1]);
};

// const displayNationality = function() {

//   const nameOfCountry = nationality.getAttribute("value") = "" ? null : nationality.getAttribute("value");

//   Object.entries(nationality.children)
//     .find((option) => option[1].value === nameOfCountry)[1]
//     .setAttribute("selected", true);
// };

export const displayCountries = function() {
  displayCountry();
  displayNationality();
};

export const displaySelected = function(field) {
  const nameOfCountry = field.getAttribute("value");

  Object.entries(field.children)
    .find((option) => option[1].value === nameOfCountry)[1]
    .setAttribute("selected", true);
};

import axios from "axios";
import { showPopup, showMessage } from "./alert";

// const showTicketBtn = document.querySelector(".show-ticket");
// const printTicketBtn = document.querySelector(".print-ticket");

export const showTicket = async function() {
  const { data } = await axios({
    method: "GET",
    url: "/api/v1/users/me",
  });

  //
  const user = data.data.data;

  console.log(user);

  const ticketMarkup = `<div class="ticket">
  <div class="ticket__logo"> <img src="/images/vp-expo-logo.png"> </div>
  <div class="ticket__data">
  
  <p>Your ticket is ready to be printed</p>
  
 </div>
   
  <button class="btn ticket__print-ticket" data-visitor-id=${user.visitorId}> Print Ticket </button>

  <button class="btn update-data"> Update Data </button>
  </div>
  `;

  showPopup(ticketMarkup);
};

// export const showTicket = async function() {
//   const { data } = await axios({
//     method: "GET",
//     url: "/api/v1/users/me",
//   });

//   //
//   const user = data.data.data;

//   console.log(user);

//   const ticketMarkup = `<div class="ticket">
//   <div class="ticket__logo"> <img src="/images/vp-expo-logo.png"> </div>
//   <div class="ticket__data"><div class="ticket__name">${user.firstName} ${user.lastName}</div><div class="ticket__company">${user.company}</div>
//   <div class="ticket__country">${user.country}</div>
//   <div class="ticket__profile">${user.profile}</div>
//  </div>
//    <div class="ticket__code" ><img src="https://qrtag.net/api/qr_6.svg?url=https://vp-expo-node-server.herokuapp.com/api/v1/users/${user.id}" alt="qrtag">
//   </br> ${user._id}</div>

//   <button class="btn ticket__print-ticket" data-creator-id=${user.creatorId} data-barcode=${user.barcode}> Print Ticket </button>
//   </div>
//   `;

//   showPopup(ticketMarkup);
// };

export const printTicket = async function(barcode, creatorId) {
  console.log("printticket", typeof barcode);
  if (barcode === false || barcode === "undefined") {
    showMessage(
      "Ticket Not Ready",
      "The ticket process requires approval from Dubai Tourism and should be completed soon. You will have a response soon. However you can show the QR Code at the Entrance and generate the ticket immediately"
    );
    return;
  }

  const res = await axios({
    method: "GET",
    url: "/printme",
  });

  console.log(res);

  if (res.data.status === "success") {
    showMessage(
      `Your ticket is printed`,
      `<button class="btn ticket__download-ticket" data-creator-id=${creatorId}> Download Ticket </button>`
    );
  }
};

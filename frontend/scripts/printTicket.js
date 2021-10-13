import axios from "axios";
import { ContextExclusionPlugin } from "webpack";
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

  const visitor = {
    VisitorNumber: user.visitorId,
    FirstName: user.firstName,
    LastName: user.lastName,
    Company: user.company,
    JobTitle: user.profile,
    Email: user.email,
    Mobile: user.mobile,
    Nationality: user.nationality,
    Country: user.country,
    Category: user.type,
  };

  console.log(user);
  console.log(visitor);

  if (!user.eventId) {
    const response = await axios({
      method: "POST",
      url: "https://online.evsreg.com/VPEXPOAPI/API/Visitor/VisitorInsert",
      body: JSON.stringify(visitor),
    });

    console.log(response);
  }

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

export const printTicket = async function(visitorId) {
  console.log(visitorId);

  /// TO DELETE
  // if (barcode === false || barcode === "undefined") {
  //   showMessage(
  //     "Ticket Not Ready",
  //     "The ticket process requires approval from Dubai Tourism and should be completed soon. You will have a response soon. However you can show the QR Code at the Entrance and generate the ticket immediately"
  //   );
  //   return;
  // }

  // const res = await axios({
  //   method: "GET",
  //   url: "/printme",
  // });

  // console.log(res);

  // if (res.data.status === "success") {
  //   showMessage(
  //     `Your ticket is printed`,
  //     `<button class="btn ticket__download-ticket" data-creator-id=${creatorId}> Download Ticket </button>`
  //   );
  // }
};

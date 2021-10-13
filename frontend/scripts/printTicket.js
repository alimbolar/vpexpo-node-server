import axios from "axios";
const fetch = require("node-fetch");

import { showPopup, showMessage } from "./alert";

// const showTicketBtn = document.querySelector(".show-ticket");
// const printTicketBtn = document.querySelector(".print-ticket");

export const showTicket = async function() {
  try {
    // const { data } = await axios({
    //   method: "GET",
    //   url: "/api/v1/users/me",
    // });

    const response = await fetch("/api/v1/users/me");
    const data = await response.json();

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

    const url = "/api/v1/eticket/visitor";
    const options = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitor),
    };

    if (!user.eventId) {
      const response1 = await fetch(url, options);
      const data1 = await response1.json();

      const eventoResponse = data1.data.data;
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
  } catch (err) {
    console.log(err);
  }
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

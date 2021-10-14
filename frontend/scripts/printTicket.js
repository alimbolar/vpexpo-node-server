const fetch = require("node-fetch");
import { showPopup, showMessage } from "./alert";

export const showTicket = async function() {
  try {
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

    if (!user.eventoId) {
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
};

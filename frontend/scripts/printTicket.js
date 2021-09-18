import axios from "axios";
import { showPopup } from "./alert";

const printTicketBtn = document.querySelector(".print-ticket");

export const showTicket = async function() {
  const { data } = await axios({
    method: "GET",
    url: "/api/v1/users/me",
  });

  //
  const user = data.data.data;

  //   console.log(user);

  const ticketMarkup = `<div class="ticket">
  <div class="ticket__logo"> <img src="/images/vp-expo-logo.png"> </div>
  <div class="ticket__data"><div class="ticket__name">${user.firstName} ${user.lastName}</div><div class="ticket__company">${user.company}</div>
  <div class="ticket__country">${user.country}</div>
  <div class="ticket__profile">${user.profile}</div>
 </div>
   <div class="ticket__code" ><img src="https://qrtag.net/api/qr_6.svg?url=https://vp-expo-node-server.herokuapp.com/api/v1/users/${user.id}" alt="qrtag">
  </br> ${user._id}</div>
  <button class="btn ticket__print-ticket"> Print Ticket </button>
  </div>
  `;

  showPopup(ticketMarkup);
};

const fs = require('fs')
const { sendEmail } = require('../utils/email');
const { getSetting } = require('./zoho');


const calculateCharge = (userRole, { Retail_Price, Dealer_Price, Discount_Percentage, Maximum_Discount_Amount }) => {
  // **Maximum Discount Amount**
  // The price is 100 units(in Base Currency of Distributor and NOT Store_Base_Currency)
  // Discount is 70 % ie 70 units
  // IF Maximum Discount is 20 units
  // Maximum Discount will apply.
  // IF Maximum Discount is 80 units
  // Discount(70 Units) will apply
  const isOptician = userRole === 'optician';
  if (!isOptician) return {
    applicablePrice: Number(Retail_Price),
    charge: Number(Retail_Price),
    discountAmount: 0,
  };

  const applicablePrice = Number(Dealer_Price ? Dealer_Price : Retail_Price);
  if (Discount_Percentage) {
    const applicableDiscount =
      Discount_Percentage > Maximum_Discount_Amount
        ? Maximum_Discount_Amount / 100
        : Discount_Percentage / 100
    const discountAmount = applicableDiscount * applicablePrice
    const charge = applicablePrice - discountAmount
    return {
      applicablePrice,
      discountAmount,
      charge,
    }
  } else {
    return {
      applicablePrice,
      discountAmount: 0,
      charge: applicablePrice,
    }
  }
}

const calculateOrderValue = (userRole, products) =>
  products
    .map(({ Retail_Price, Dealer_Price, Discount_Percentage, Maximum_Discount_Amount, quantity }) => {
      const { charge: price } = calculateCharge(userRole, { Retail_Price, Dealer_Price, Discount_Percentage, Maximum_Discount_Amount })
      return price * quantity
    })
    .reduce((acc, val) => acc + val, 0)

const generateCartCSV = ({ csvFileName = 'csv', csvHeader, csvData, csvFooter }) => {
  let csv = `${csvHeader}\n${csvData.join('\n')}\n${csvFooter}`
  try {
    fs.writeFileSync(`${csvFileName}.csv`, csv)
  } catch (err) {
    console.error(err)
    throw err
  }
}

const sendCartEmail = async ({ scope, products, retailerInfo, userRole }) => {
  const isOptician = userRole === 'optician';
  const HEADERS = ['Number', 'Product ID', 'Image', 'Product Name', 'Brand', 'Style Code', 'Colour Code', 'Rate', 'Quantity', 'Price'];
  const HEADERS_IN_CSV_ONLY = ['Product ID'];
  const STORE_BASE_CURRENCY = await getSetting(scope.country, 'Base_Currency.Symbol');
  const csvFooter = [];
  csvFooter.length = HEADERS.length;
  csvFooter[csvFooter.length - 3] = 'TOTAL';
  csvFooter[csvFooter.length - 1] = 0; // Price
  csvFooter[csvFooter.length - 2] = 0; // Quantity


  const csvData = products.map((product, index) => {
    const { Retail_Price, Dealer_Price, Discount_Percentage, Maximum_Discount_Amount } = product;
    const {
      applicablePrice: GrossAmount,
      charge: NetAmount,
      discountAmount: Discount,
    } = calculateCharge(userRole, { Retail_Price, Dealer_Price, Discount_Percentage, Maximum_Discount_Amount })
    csvFooter[csvFooter.length - 1] += GrossAmount * product.quantity; // Price
    csvFooter[csvFooter.length - 2] += product.quantity; // Quantity
    return [
      index + 1, // Row number
      product.ID,
      product.Image_URLs_small[0],
      product.Product_Name,
      product.Brand_Brand_Name,
      product.Style_Code,
      product.Colour_Code,
      GrossAmount,
      product.quantity,
      GrossAmount * product.quantity,
    ];
  })

  const nameInFile = isOptician ? retailerInfo.organisationName : retailerInfo.contactName;
  const csvFileName = `${nameInFile.replace(
    / /g,
    ''
  )}__${new Date().toISOString().split('T')[0]}`
  generateCartCSV({ csvFileName, csvHeader: HEADERS, csvData, csvFooter });
  const orderAmount = calculateOrderValue(userRole, products);
  const now = new Date();
  const date = new Intl.DateTimeFormat().format(now);
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "numeric" }).format(now);
  const subject = `Your Order From YouAndEyeMag.com on ${date} at ${time} `;
  const adminEmail = await getSetting(scope.country, 'Store_Admin_Email');
  const supportEmail = await getSetting(scope.country, 'Store_Support_Email');

  let html = `<html><head><title>${subject}</title><style type="text/css">
  table {
    border-collapse: collapse;
    border: 1px solid black;
  }
  th, td {
    border: 1px solid black;
    padding: 10px;
  }
  tfoot {
    font-weight: bold;
  }
  td img {
    width: 100px;
  }
  </style></head>
  <body>Please find below the Order Details:<br/><br/>`;
  html += '<table><thead><tr><th>' + HEADERS.filter(h => HEADERS_IN_CSV_ONLY.indexOf(h) === -1).join('</th><th>') + '</th></tr></thead><tbody>';
  for (let row of csvData) {
    html += '<tr>';
    for (let cellIndex = 0; cellIndex < HEADERS.length; cellIndex++) {
      const cell = row[cellIndex];
      const header = HEADERS[cellIndex];
      if (HEADERS_IN_CSV_ONLY.indexOf(header) > -1) continue;

      html += '<td>';
      if (header === 'Image' && cell) {
        html += `<img src="${cell}" />`;
      }
      else if (header === 'Rate' || header === 'Price') {
        html += `${STORE_BASE_CURRENCY} ${cell}`;
      }
      else html += cell;

      html += '</td>';
    }
    html += '</tr>';
  }
  html += '</tbody><tfoot><tr>'
  const columnsPrefix = HEADERS.length - HEADERS_IN_CSV_ONLY.length - 3;
  for (let i = 0; i < columnsPrefix; i++) html += '<td></td>'; // Empty columns
  html += `<td>TOTAL</td><td>${csvFooter[csvFooter.length - 2]}</td><td>${STORE_BASE_CURRENCY} ${csvFooter[csvFooter.length - 1]}</td>`;

  html += '</tr></tfoot></table><br/>A team member would contact you at the details below to confirm<ul>';

  if (isOptician) html += `<li> Buyer Organisation: <b>${retailerInfo.organisationName}-${scope.opticianId}</b></li> `;
  html += `<li> Full Name: <b>${retailerInfo.contactName}</b></li> `;
  html += `<li> Mobile: <b>${retailerInfo.mobile}</b></li> `;
  html += `<li> Email: <b><a href="mailto:${retailerInfo.email}">${retailerInfo.email}</a></b></li> `;
  html += `<li> Address: <b> ${retailerInfo.address}</b></li> `;
  if (!isOptician && scope.opticianName) html += `<li>Seller Organisation: <b>${scope.opticianName}-${scope.opticianId}</b></li>`;
  if (isOptician && scope.brandOwnerName) html += `<li>Seller Organisation: <b>${scope.brandOwnerName}-${scope.brandOwnerId}</b></li>`;

  html += `</ul >
    <br />
  For any queries please email <a href="mailto:${supportEmail}">${supportEmail}</a>.<br />
    <br />
    Regards, <br />
    <b>Team YouAndEyeMag</b></body></html>`;

  const emailData = {
    from: 'Team YouAndEyeMag <no-reply@mg.youandeyemag.com>',
    to: retailerInfo.email,
    subject,
    // inline,
    html,
  };

  const bcc = new Set();
  if (adminEmail) bcc.add(adminEmail);
  if (supportEmail) bcc.add(supportEmail);
  if (scope.sellerOrderNotification) {
    if (isOptician && scope.brandOwnerEmail) bcc.add(scope.brandOwnerEmail);
    else if (scope.opticianEmail) bcc.add(scope.opticianEmail);
  }
  emailData.bcc = Array.from(bcc).join(',');

  // Send normal email to retailer
  const response = await sendEmail(emailData);


  // Send same email to support + admin with CSV
  const adminEmailData = Object.assign({}, emailData); // Clone
  adminEmailData.attachment = `${csvFileName}.csv`;
  delete adminEmailData.bcc;
  const adminEmails = new Set();
  if (adminEmail) adminEmails.add(adminEmail);
  if (supportEmail) adminEmails.add(supportEmail);
  adminEmailData.to = Array.from(adminEmails).join(',');
  await sendEmail(adminEmailData);

  return response
}

module.exports = {
  sendCartEmail,
}

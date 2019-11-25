const fs = require("fs");
const send = require("./sendEmail");

const buildEmail = async orderDetails => {
  const template = fs.readFileSync(
    "./notifications/emailTemplates/newOrder.html",
    "utf-8"
  );

  const { email, url, appData } = require("../config.json");
  const { items, tax, shipping, total, conf } = orderDetails;

  const html = template
    .replace(/"%%SHOP_URL%%"/g, url)
    .replace("%%HEADER_TXT%%", email.orderConfirmation.header)
    .replace("%%SUB_TXT%%", email.orderConfirmation.subTxt)
    .replace("%%STORE_NAME%%", appData.title)
    .replace("%%REVISIT_TAGLINE%%", email.revistTagline)
    .replace("%%BOTTOM_TAG_1%%", email.bottomTag1)
    .replace("%%BOTTOM_TAG_2%%", email.bottomTag2)

    .replace("%%CONF_CODE%%", conf)
    .replace("%%ORDER_DETAILS%%", items.map(item => addItem(item)).join(""))
    .replace("%%SHIPPING_COST%%", shipping.cost)
    .replace("%%TAX%%", tax)
    .replace("%%ADR_LINE_1%%", shipping.adr.l1)
    .replace("%%ADR_LINE_2%%", shipping.adr.l2)
    .replace("%%ADR_LINE_3%%", shipping.adr.l3)
    .replace("%%EST_DEV_DATE%%", shipping.date)
    .replace("%%TOTAL_COST%%", total);

  return await send(orderDetails.email, `Order Confirmation - ${conf}`, html);
};

const addItem = item => {
  const { name, qty, total } = item;
  return `<tr style="border-collapse:collapse;"> 
    <td style="padding:5px 10px 5px 0;Margin:0;" width="80%" align="left"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;">${name}&nbsp;<em>(Qty: ${qty})</em></p></td> 
    <td style="padding:5px 0;Margin:0;" width="20%" align="left">$${total}</td> 
   </tr>`;
};

module.exports = buildEmail;

"use strict";
// The Data given to me

var orders = [
  {
    orderId: "ORD001",
    customer: "John Doe",
    items: "item1:2,item2:1,item3:5",
    orderDate: "2023-12-01",
    deliveryDate: "2023-12-05",
    deliveryAddress: "123, Main Street, Springfield, USA",
  },
  {
    orderId: "ORD002",
    customer: "Jane Smith",
    items: "itemA:3,itemB:4",
    orderDate: "2023-11-15",
    deliveryDate: "2023-11-20",
    deliveryAddress: "Flat 4B, Elmwood Apartments, New York, USA",
  },
  {
    orderId: "ORD003",
    customer: "Alice Johnson",
    items: "itemX:1",
    orderDate: "2023-10-10",
    deliveryDate: "2023-10-15",
    deliveryAddress: "456, Pine Lane, Denver, USA",
  },
];

/**
 *
 * @param {string} itemsString
 * @returns {number} total amount of items
 */
function calculateTotalItems(itemsString) {
  var items = itemsString.split(",");
  var total = 0;

  for (var i = 0; i < items.length; i++) {
    var quantity = parseInt(items[i].substring(items[i].indexOf(":") + 1));
    if (!isNaN(quantity)) {
      total += quantity;
    }
  }
  return total;
}

/**
 *
 * @param {Date} orderDate
 * @param {Date} deliveryDate
 * @returns {number} delivery duration
 */
function calculateDeliveryDuration(orderDate, deliveryDate) {
  var start = new Date(orderDate);
  var end = new Date(deliveryDate);
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
}

/**
 * Parses a delivery address string into structured object components
 *
 * @param {string} address - The full address string in format "buildingNumber, street, city, country"
 * @returns {object} Parsed address object with the following properties:
 *   @property {(number|string)} buildingNumber - Building identifier (number if numeric, string otherwise)
 *   @property {string} street - Street name
 *   @property {string} city - City name
 *   @property {string} country - Country name
 */
function parseAddress(address) {
  var parts = address.split(",");
  var buildingNumber = parts[0].trim();
  var street = parts[1].trim();
  var city = parts[2].trim();
  var country = parts[3].trim();

  buildingNumber = isNaN(buildingNumber)
    ? buildingNumber
    : parseInt(buildingNumber);

  return {
    buildingNumber: buildingNumber,
    street: street,
    city: city,
    country: country,
  };
}

var dataTransformedArr = orders.map(function (item) {
  try {
    var totalItems = calculateTotalItems(item.items);
    var addressInfo = parseAddress(item.deliveryAddress);
    var deliveryDuration = calculateDeliveryDuration(
      item.orderDate,
      item.deliveryDate
    );

    return {
      orderId: item.orderId,
      customer: item.customer,
      totalItems: totalItems,
      orderDate: item.orderDate,
      deliveryDate: item.deliveryDate,
      deliveryDuration: deliveryDuration,
      deliveryCountry: addressInfo.country,
      deliveryCity: addressInfo.city,
      deliveryStreet: addressInfo.street,
      buildingNumber: addressInfo.buildingNumber,
    };
  } catch (error) {
    console.error("Error processing item: " + JSON.stringify(item));
    return item;
  }
});

console.log(dataTransformedArr);

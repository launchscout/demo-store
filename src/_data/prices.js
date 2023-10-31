const environment = process.env.CONTEXT
const api_key = process.env.STRIPE_API_KEY;
const stripe = require("stripe")(api_key);
const demoPrices = require('./demoPrices.js').prices;

// One product can have multiple prices but for my use case, it's 1:1 so this works without having to massage the data
// TODO: add Expanding data docs link
async function getPrices() {
  if (api_key === 'demo') {
    return demoPrices;
  } else {
    console.log('calling prices');
    const response = await stripe.prices.list({
      expand: ["data.product"],
    });
    const prices = response.data.filter(price => price.active);
    return prices;
  }
}

module.exports = async function () {
  return await getPrices();
};

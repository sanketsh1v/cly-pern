const { Client } = require('square');

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT || 'sandbox'
});

// Export both the client and the location ID for easy access
module.exports = {
  client: squareClient,
  locationId: process.env.SQUARE_LOCATION_ID
};
// /.netlify/functions/get-products?data=products
// /.netlify/functions/get-products?data=persons

exports.handler = async (event) => {
  const dataFile = event.queryStringParameters.data || 'persons';
  const data = require(`./data/products.json`);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

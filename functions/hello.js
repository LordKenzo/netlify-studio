const figlet = require('figlet');

exports.handler = async (event) => {
  const subject = event.queryStringParameters.name || 'World';
  figlet(`Hello ${subject}!!`, function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    return {
      statusCode: 200,
      body: `Hello ${subject}`,
    };
  });
};

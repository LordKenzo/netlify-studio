const figlet = require('figlet');

exports.handler = async (event) => {
  const subject = event.queryStringParameters.name || 'World';
  figlet(`Hello ${subject}!!`, function (err, data) {
    if (err) {
      console.error('Something went wrong...');
      console.dir(err);
      return {
        statusCode: 500,
        body: {
          error: 'Something went wrong...',
        },
      };
    }
    console.log(data);
    return {
      statusCode: 200,
      body: data,
    };
  });
};

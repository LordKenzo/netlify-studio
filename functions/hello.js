const { camelCase } = require('camel-case');

exports.handler = async (event) => {
  const subject = event.queryStringParameters.name || 'World';
  const data = camelCase(`Hello.${subject}`); //=> "helloWorld"
  return {
    statusCode: 200,
    body: data,
  };
};

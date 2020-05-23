import { camelCase } from 'camel-case';

exports.handler = async (event) => {
  const subject = event.queryStringParameters.name || 'World';
  camelCase(`Hello.${subject}`); //=> "helloWorld"
  console.log(data);
  return {
    statusCode: 200,
    body: data,
  };
};

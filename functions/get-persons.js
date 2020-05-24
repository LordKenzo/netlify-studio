const persons = require('./data/persons.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(persons),
  };
};

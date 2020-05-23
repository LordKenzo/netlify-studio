Ogni funzione serverless o lambda function ha questa signature:

```js
exports.handler = function(event, context, callback) {
    // your server-side functionality
}
```

Esempio:

```js
exports.handler = function(event, context, callback) {
    callback(null, {
    statusCode: 200,
    body: "Hello, World"
    });
}
```

Esempio di una funzione di Hello:

```js
exports.handler = async (event) => {
  const subject = event.queryStringParameters.name || 'World';
  return {
    statusCode: 200,
    body: `Hello ${subject}`,
  };
};
```

L'**event** object rappresenta una serie di informazioni:

```
{
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name"
    "headers": {Incoming request headers}
    "queryStringParameters": {query string parameters }
    "body": "A JSON string of the request payload."
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}
```

Il **contesto** sono informazioni che possono riguardare ad esempio l'identità dell'utente.
Infine la **callback** è una funzione che posso richiamare in caso di errore.

Le funzioni devono risiedere in una cartella, solitamente la `functions` folder del nostro progetto. Posso specificarne un'altra nel file `netlifty.toml`:

```
[build]
    functions = './functions
```
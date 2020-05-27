# DA FARE:

Purtroppo non riesco a far chiamare correttamente la webhook di netlify una volta avuto il pagamento per via del rawBody che non accedo da Netlify. Per fortuna questa fase vorrei gestirla con le google functions in firebase per aggiungere una riga nel db che provo a fare.

# NETLIFY
Ogni funzione serverless o lambda function ha questa signature:

```js
exports.handler = function(event, context, callback) {
    // funzionalità server-side
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

Posso avviare il Netlify client e testare le funzioni: `ntl dev`. Se ho una cartella public avvia da la.

```
http://localhost:8888/.netlify/functions/get-products?products=persons
```

Posso usare librerie con npm? Certamente.

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
  functions = './functions'
```

se ho un sito frontend da pubblicare:

```
[build]
  publish = 'public'
  functions = './functions'
```

se devo installare dei packages di npm:

```
[build]
  publish = 'public'
  command = 'npm i'
  functions = './functions'
```

Nel caso di installazione di dipendenze da functions:

```
command = "cd functions && npm i && cd .."
```

E' importante sapere che le functions vengono deployate in un ambiente a parte rispetto al deploy del progetto, per questo non possiamo far riferimento a file esterni alla folder `functions`.

Posso creare un file JSON con dei dati:

```json
[
  {
    "nome": "Lorenzo",
    "cognome": "Franceschini",
    "citta": "Ladispoli"
  },
  {
    "nome": "Giordano",
    "cognome": "Franceschini",
    "citta": "Roma"
  },
  {
    "nome": "Maria",
    "cognome": "Rossi",
    "citta": "Torino  "
  }
]
```

# Stripe CLI

```
brew install stripe/stripe-cli/stripe

stripe login
```

Avvia in altra tab:

```
stripe listen --forward-to localhost:8888/.netlify/functions/handle-purchase
```

# Google Serverless Function

```
import * as functions from 'firebase-functions';
import { stripe, endpointSecret } from './config';

export const testFunction = functions.https.onCall( async(data, context) => {
    const uid = context.auth && context.auth.uid;
    const message = data.message;
    return `${uid} sent a message of ${message}`
});

export { stripePaymentIntent } from './intents';
export { stripePaymentSet } from './intents';
export { stripeStartSession } from './intents';

export const stripeEvents = functions.https.onRequest( (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
        console.log(err);
        res.status(400).end();
        return;
    }

    // const intent:any = event.data.object;

    switch(event.type) {
        case 'payment_intent.succeded':
            res.status(200).send({
                messaggio: 'Pagamento effettuato'
            })
            break;
        case 'payment_intent.payment_failed':
            res.send({
                error: 'Errore pagamento'
            })
            break;
    }
});
```
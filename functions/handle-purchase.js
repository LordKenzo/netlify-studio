const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY');

exports.handler = async ({ body, headers }) => {
  try {
    console.log('QUI', process.env.STRIPE_WEBHOOK_SECRET);
    console.log('SK', process.env.STRIPE_SECRET_KEY);
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (stripeEvent.type === 'checkout.session.completed') {
      const eventObject = stripeEvent.data.object;
      const items = JSON.parse(eventObject.metadata.items);
      const shippingDetails = eventObject.shipping;

      const purchase = { items, shippingDetails };
      console.log(`📦 Fulfill purchase:`, JSON.stringify(purchase, null, 2));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};

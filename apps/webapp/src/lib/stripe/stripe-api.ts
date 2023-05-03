import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

//Get All Payment Methods associated with Customer
async function listPaymentMethods({ customerId }: any) {
  const paymentMethods: Stripe.ApiList<Stripe.PaymentMethod> =
    await stripe.customers.listPaymentMethods(customerId, {
      type: "card",
    });
  return paymentMethods;
}

//Get All Invoices associated with Customer
async function listInvoices({ customerId }: any) {
  const invoices: Stripe.ApiList<Stripe.Invoice> = await stripe.invoices.list({
    customer: customerId,
  });
  return invoices;
}

//Get All Invoices associated with Customer
async function listSubscriptions({ customerId, plan }: any) {
  const subscriptions: Stripe.ApiList<Stripe.Subscription> =
    await stripe.subscriptions.list({
      customer: customerId,
      expand: ["data.plan.product"],
    });
  return subscriptions;
}

async function createCustomer({ name, email, phone }: any) {
  const customer = await stripe.customers.create({
    name, // Pass name (Optional)
    email, // Pass email (Optional)
    phone,
    description: "User created from Formzillion app",
  });
  return customer;
}

async function createSubscription({ customerId, priceId }: any) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
  });
  return subscription;
}

// Delete the subscription
async function deleteSubscription({ subscriptionId }: any) {
  const deletedSubscription = await stripe.subscriptions.del(subscriptionId);
  return deletedSubscription;
}

async function productDetail({ productId }: any) {
  const product = await stripe.products.retrieve(productId);
  return product;
}

//Add Payment Method to Customer
async function createPaymentMethod({
  customerId,
  cardNumber,
  expMonth,
  expYear,
  cvc,
  email,
  name,
}: any) {
  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    },
    customer: customerId,
    billing_details: {
      email,
      name,
    },
  });

  return paymentMethod;
}

/**
 *  Delete Payment Method from Customer
 */
async function deletePaymentMethod({ paymentMethodId }: any) {
  const paymentMethod = await stripe.paymentMethods.detach(
    paymentMethodId //'pm_1MeWoYLMF4TH29Y4l8BG8Nw4'
  );
  return paymentMethod;
}

async function billingPortalSessions({ customerId, redirectUrl }: any) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: redirectUrl,
  });
  return session;
}

const stripeApi = {
  createCustomer,
  createSubscription,
  deleteSubscription,
  listPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,
  listInvoices,
  listSubscriptions,
  billingPortalSessions,
  productDetail,
};

export default stripeApi;

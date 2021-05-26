import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { StripeForm } from "./StripeForm";

const SANDBOX = false

const PUBLIC_KEY_TEST = "pk_test_51InSXCJ3U7h4NHwd3Nh0B0V9Z2kFcipnZDZ5OvP0Fuhm4zlUAe6mMh2yEnSytV64kkky6ahq663pmO48YtgboJjx000IK0vjNj";
const PUBLIC_KEY_LIVE = "pk_live_51InSXCJ3U7h4NHwdQSvc3ITNikQJRw0otzlcVnUXDKrS51Xu2drNoOIfOk3VRZyJEsVarVkGJOrLz2HywPdM8Qdl006sUXBTwX";

const PUBLIC_KEY = SANDBOX ? PUBLIC_KEY_TEST : PUBLIC_KEY_LIVE

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <StripeForm />
    </Elements>
  );
};

export default Stripe;
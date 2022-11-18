import "./sqpaymentform.css";
import React from "react";
import { Grid } from "@material-ui/core";
import PaymentService from "./services/PaymentService";

import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

export const SANDBOX = false;

const LIVE_APPLICATION_ID = "sq0idp-8-tRTRJuDMDeTBHxJq02xg"; // Live
const LIVE_LOCATION_ID = "L2SBNYPV0XWVJ"; //Live

const SANDBOX_APPLICATION_ID = "sandbox-sq0idb-HxCN0_lvfnlC15ZMFkUCdQ"; //SANDBOX
const SANDBOX_LOCATION_ID = "LBR8YPCPR878R"; // SANDBOX

export default class PaymentFormNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: props.personInfo,
      errorMessages: [],
    };

    this.cardNonceResponseReceived = this.cardNonceResponseReceived.bind(this);
    this.createVerificationDetails = this.createVerificationDetails.bind(this);
  }

  // cardNonceResponseReceived = async (
  //   errors,
  //   nonce,
  //   cardData,
  //   buyerVerificationToken
  // ) => {
  //   if (errors) {
  //     this.setState({ errorMessages: errors.map((error) => error.message) });
  //     return;
  //   }

  //   this.setState({ errorMessages: [] });

  //   try {
  //     this.props.onStart();
  //     const result = await PaymentService.doPayment({
  //       nonce: nonce,
  //       token: buyerVerificationToken,
  //       personInfo: this.state.personInfo,
  //     });
  //     console.log(result);
  //     this.props.onComplete(result);
  //   } catch (ex) {
  //     console.error(ex);
  //     this.props.onError(ex);
  //   }
  // };


  cardNonceResponseReceived = async (
    token,
    buyer
    ) => {
      console.log({ token, buyer });

        this.setState({ errorMessages: [] });

        try {
          this.props.onStart();
          const result = await PaymentService.doPayment({
            nonce: token.token,
            token: buyer.token,
            medexPaymentId: this.state.personInfo._id,
          });
          console.log(result);
          this.props.onComplete(result);
        } catch (ex) {
          console.error(ex);
          this.props.onError(ex);
        }
    };


  createVerificationDetails() {
    return {
      amount: `${this.state.personInfo.amount}`,
      currencyCode: "GBP",
      intent: "CHARGE",
      billingContact: {
        name: this.state.personInfo.fullname,
        email: this.state.personInfo.email,
        phone: this.state.personInfo.phone,
      },
    };
  }

  render() {
    return (
      <PaymentForm
        applicationId={SANDBOX ? SANDBOX_APPLICATION_ID : LIVE_APPLICATION_ID}
        locationId={SANDBOX ? SANDBOX_LOCATION_ID : LIVE_LOCATION_ID}
        overrides={{
          scriptSrc: SANDBOX
            ? "https://sandbox.web.squarecdn.com/v1/square.js"
            : "https://js.squareup.com/v2/paymentform", // this is an example, not real URL
        }}
        cardTokenizeResponseReceived={this.cardNonceResponseReceived}
        createVerificationDetails={this.createVerificationDetails}
      >
        <div style={{ padding: "20px 10px" }}>
          <CreditCard 
           buttonProps={{
            css: {
              backgroundColor: '#b30c1d',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#de071d',
              },
            },
          }}
          >
              <span style={{fontWeight:"600", fontSize:"1.2em"}}>Pay {`£${this.state.personInfo.amount}`}</span>
           </CreditCard>
        </div>
      </PaymentForm>
    );
  }
}

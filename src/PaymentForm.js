import "./sqpaymentform.css";
import React from "react";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import { Grid } from "@material-ui/core";
import PaymentService from "./services/PaymentService";


const SANDBOX = false

const LIVE_APPLICATION_ID = "sq0idp-8-tRTRJuDMDeTBHxJq02xg";  // Live
const LIVE_LOCATION_ID = "L2SBNYPV0XWVJ";                     //Live   

const SANDBOX_APPLICATION_ID = "sandbox-sq0idb-HxCN0_lvfnlC15ZMFkUCdQ";  //SANDBOX
const SANDBOX_LOCATION_ID = "LBR8YPCPR878R";                             // SANDBOX




export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: props.personInfo,
      errorMessages: [],
    };

    this.cardNonceResponseReceived = this.cardNonceResponseReceived.bind(this);
    this.createVerificationDetails = this.createVerificationDetails.bind(this);
  }

  cardNonceResponseReceived = async (
    errors,
    nonce,
    cardData,
    buyerVerificationToken
  ) => {
    if (errors) {
      this.setState({ errorMessages: errors.map((error) => error.message) });
      return;
    }

    this.setState({ errorMessages: [] });

    try{
        this.props.onStart()
        const result = await PaymentService.doPayment({nonce: nonce, token: buyerVerificationToken, personInfo: this.state.personInfo})
        console.log(result)
        this.props.onComplete(result)
    }
    catch(ex)
    {
        console.error(ex)
        this.props.onError(ex)
    }
  };

  createVerificationDetails() {
    return {
      amount: "100.00",
      currencyCode: "GBP",
      intent: "CHARGE",
      billingContact: {
        name: this.state.personInfo.fullname,
        email: this.state.personInfo.email,
        phone:  this.state.personInfo.phone,
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <SquarePaymentForm
              sandbox={SANDBOX}
              applicationId={SANDBOX ? SANDBOX_APPLICATION_ID : LIVE_APPLICATION_ID}
              locationId={SANDBOX ? SANDBOX_LOCATION_ID : LIVE_LOCATION_ID}
              cardNonceResponseReceived={this.cardNonceResponseReceived}
              createVerificationDetails={this.createVerificationDetails}
            >
              <fieldset className="sq-fieldset">

                <CreditCardNumberInput/>
             

                <div className="sq-form-third">
                  <CreditCardExpirationDateInput />
                </div>

                {/* <div className="sq-form-third">
                  <CreditCardPostalCodeInput />
                </div> */}

                <div className="sq-form-third">
                  <CreditCardCVVInput />
                </div>
              </fieldset>

              <CreditCardSubmitButton>Pay £100.00</CreditCardSubmitButton>

            </SquarePaymentForm>
          </Grid>
        </Grid>

        <div className="sq-error-message">
          {this.state.errorMessages.map((errorMessage) => (
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

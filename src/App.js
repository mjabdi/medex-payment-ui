import "./App.css";
import Checkout from "./checkout";
import WelcomeForm from "./WelcomeForm";
import AgreementForm from "./AgreementForm";
import GlobalState from "./GlobalState";
import React, { useEffect } from "react";
import PaymentService from "./services/PaymentService";
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import PayForm from "./PayForm";
import PaymentSuccessForm from "./PaymentSuccessForm";

const getPathId = () => {
  let urlElements = window.location.pathname.split("/");
  if (urlElements.length === 4 && urlElements[2] === "pay") {
    return urlElements[3]
  }
  return null;
};

function App() {
  const [state, setState] = React.useState({
    activeStep: 0,
    bookingDate: null,
    persons: [],
  });

  useEffect( () => {
    loadPaymentData()
  }, []);

  const loadPaymentData = async () =>
  {
    try{
      const paymentId = getPathId();    
      const res = await PaymentService.getPaymentById(paymentId)
      if (res && res.data && res.data.status === "OK" && res.data.result)
      {
        const payment = res.data.result

        let payment_method = null

        if (!payment.deleted && !payment.refund )
        {
          if (payment.paymentInfo)
          {
            const payment_info = JSON.parse(payment.paymentInfo)
            payment_method = payment_info.id
          }

          setState(state=>({...state, payment : payment, payment_method: payment_method, payment_already_done: true}))
        }
        else if (payment.deleted)
        {
          setState(state=>({...state, payment_invalid : true}))
        }else if (payment.refund)
        {
          setState(state=>({...state, payment_refund : true}))
        }
        else{
          setState(state=>({...state, payment_invalid : true}))
        }
      }
      else {
        setState(state => ({ ...state, payment_invalid: true }))

      }

    }catch(err)
    {
      console.error(err)
    }
  }

  return (
    <GlobalState.Provider value={[state, setState]}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <div className="App">

        {state.payment && !state.payment_method && (
          <PayForm/>
        )}

        {state.payment && state.payment_method && (
          <PaymentSuccessForm/>
        )}

        {state.payment_invalid && (
          `Invalid Payment Link!`
        )}

        {state.payment_refund && (
          `Payment Already Refunded!`
        )}

          
        </div>
      </MuiThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;

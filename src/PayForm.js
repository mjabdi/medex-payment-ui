import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GlobalState from "./GlobalState";
import PaymentForm from "./PaymentForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import dateformat from "dateformat";
import { Backdrop } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Stripe from "./StripeContainer";
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "justify",
  },

  FormTitle: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  pageTitle: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "15px",
    minWidth: "320px",
    padding: "15px"
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  boxTitle: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "10px",
    top: -20,
    left: 10,
    color: theme.palette.primary.main,
    fontWeight: "500",
  },

  boxTime: {
    backgroundColor: "#fff",
    border: `1px solid #ddd`,
    borderRadius: "5px",
    color: "#333",
    padding: "10px 5px",
    textAlign: "left",
    // marginTop: "30px",
    position: "relative",
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    position: "relative",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(0),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(0),
    },
  },

  itemLabel: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#777",
    marginRight: "10px"
  },
  itemData: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#333"
  }

}));

export default function PayForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [submiting, setSubmitting] = React.useState(false);


  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div
            className={classes.pageTitle}
          >
            <div style={{ fontSize: "0.9rem", color: "#fafafa" }}>
              Total to Pay :
        </div>
            <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              {`£${(
                state.payment.amount
              ).toLocaleString("en-GB")}`}
            </div>
          </div>

          <div style={{ padding: "10px 20px" }}>

            <div className={classes.boxTime}>
              <div className={classes.boxTitle}>Payment Info</div>
              <Grid container spacing={2} style={{ padding: "15px 5px 10px 15px" }}>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <span className={classes.itemLabel}>
                    Issued by :
                   </span>
                  <span className={classes.itemData}>
                    {'Museum Dental Suites'}
                  </span>
                </Grid>

                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <span className={classes.itemLabel}>
                    Issued for :
                   </span>
                  <span className={classes.itemData}>
                    {state.payment.fullname}
                  </span>
                </Grid>

                {state.payment.description && state.payment.description.length > 0 && (
                  <Grid item xs={12} style={{ textAlign: "left" }}>
                    <span className={classes.itemLabel}>
                      Description :
                   </span>
                    <span className={classes.itemData}>
                      {state.payment.description}
                    </span>
                  </Grid>
                )}
              </Grid>


            </div>


            <div className={classes.boxTime} style={{ marginTop: "30px" }}>
              <div className={classes.boxTitle}>Enter Your Card Info</div>
              <Stripe />
            </div>


            <div style={{ marginTop: "20px" }}>
              <div style={{ color: "#bf9b30", fontWeight: "500", marginBottom: "5px" }}>
                Powered and Secured by :
            </div>
              <a href="https://www.museumdentalsuites.co.uk/" target="_blank">
                <img src="https://www.museumdentalsuites.co.uk/uploads/1534511600822Museum-Dental-Suites-logo.png" alt="logo" style={{ width: "110px", height: "60px" }} />
              </a>
            </div>

          </div>

          <Backdrop className={classes.backdrop} open={submiting}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <CircularProgress color="inherit" />
              </Grid>
              <Grid item>
                <span style={{ textAlign: "center", color: "#fff" }}>
                  {" "}
                    Please wait ...{" "}
                </span>
              </Grid>
            </Grid>
          </Backdrop>

        </Paper>
      </main>
    </React.Fragment>
  );
}

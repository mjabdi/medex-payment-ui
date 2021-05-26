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

import Fade from "react-reveal/Fade";
import doneImage from './images/ok2.png';




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
  },

  doneImage: {
    width: "330px",
    height: "207px",
    margin: "20px"
  },

  thankText:{
    color: "#009c39",
    fontWeight:"500",
    lineHeight: "2.5rem"
  },

  bold: {
    fontWeight: "800",
    padding: "5px",
    color: theme.palette.primary.main
  },


}));

export default function PaymentSuccessForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [submiting, setSubmitting] = React.useState(false);


  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>

          <div style={{ padding: "10px 20px 30px" }}>

            <Fade down>

              <img
                className={classes.doneImage}
                src={doneImage}
                alt="Done image"
              />

              <Typography variant={state.payment_already_done ? "h5" : "h4"} gutterBottom className={classes.thankText}>
                {state.payment_already_done 
                    ? ('Your Payment is Already Done Successfully.' ) 
                    :
                     ('Thank you for your Payment.')
                  }
                
              </Typography>
              {/* <br />
              <Typography style={{fontSize:"1.1rem", color:"#333"}}>
                Your payment reference number is {" "}
                <span className={classes.bold}>{`"${state.payment_method}"`}</span> 
              </Typography> */}

            </Fade>


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

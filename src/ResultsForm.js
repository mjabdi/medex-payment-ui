

import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';
import doneImage from './images/ok2.png';
import errorImage from './images/error.png';
import * as dateformat from 'dateformat';
import Alert from '@material-ui/lab/Alert';

import Fade from "react-reveal/Fade";


const useStyles = makeStyles((theme) => ({

    bold: {
        fontWeight: "800",
        padding: "5px",
        color: theme.palette.secondary.main
      },

      doneImage: {
        width: "330px",
        height: "207px",
        margin: "20px"
      },

      errorImage: {
        width: "200px",
        height: "190px",
        margin: "20px"
      },
      thankText:{
        color: theme.palette.primary.main,
        fontWeight:"500"
      },

      error:{
        color: theme.palette.secondary.main
      }
    


}));


export default function ResultsForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const AllError = (results) =>
  {
      for (var i=0 ; i < results.length; i++)
      {
          if (results[i].data.status === 'OK')
          {
              return false;
          }
      }
      return true;
  }

  return (
    <React.Fragment>
      {state.finalResults.length === 1 &&
        state.finalResults[0].data.status === `OK` && (
          <React.Fragment>

          <Fade down>

            <img
              className={classes.doneImage}
              src={doneImage}
              alt="Done image"
            />

            <Typography variant="h5" gutterBottom className={classes.thankText}>
              Thank you for your Booking.
            </Typography>
            <br />
            <Typography variant="subtitle1">
              Your booking number is{" "}
              <span className={classes.bold}>{`"${state.bookingRef}"`}</span> . We have
              emailed your booking information, and will look forward to meet
              you at the clinic.
              <p>
                * If not received email confirmation in 10 min please check your spam folder
              </p>
            </Typography>

            </Fade>
          </React.Fragment>
        )}

      {state.finalResults.length === 1 &&
        state.finalResults[0].data.status === `FAILED` && (
          <React.Fragment>
            <img
              className={classes.errorImage}
              src={errorImage}
              alt="Error image"
            />

            <Typography variant="h5" gutterBottom className={classes.error}>
              Sorry, There is a Problem with your Booking.
            </Typography>
            <br />

            {state.finalResults[0].data.error === "FullTime" && (
              <Typography variant="subtitle1">
                Please check your system time, make sure your timezone is set to
                Europe/London.
              </Typography>
            )}

            {state.finalResults[0].data.error !== "FullTime" && (
              <Typography variant="subtitle1">
                You have already booked for{" "}
                {`'${dateformat(state.bookingDate, "dddd, mmmm dS, yyyy")}'`}.
                Every person can only book for one appointment per day. If you
                want to change your appointment time please follow the link we
                have emailed you before.
              </Typography>
            )}
          </React.Fragment>
        )}

      {state.finalResults.length > 1 && (
        <React.Fragment>
          {AllError(state.finalResults) && (
            <React.Fragment>
              <img
                className={classes.errorImage}
                src={errorImage}
                alt="Error image"
              />

              <Typography variant="h5" gutterBottom>
                Sorry, There is a Problem with your Booking.
              </Typography>
              <br />

              {state.finalResults[0].data.error === "FullTime" && (
                <Typography variant="subtitle1">
                  Please check your system time, make sure your timezone is set
                  to Europe/London.
                </Typography>
              )}

              {state.finalResults[0].data.error !== "FullTime" && (
                <Typography variant="subtitle1">
                  You have already booked for{" "}
                  {`'${dateformat(state.bookingDate, "dddd, mmmm dS, yyyy")}'`}.
                  Every person can only book for one appointment per day. If you
                  want to change your appointment time please follow the link we
                  have emailed you before.
                </Typography>
              )}

              
            </React.Fragment>
          )}

          {!AllError(state.finalResults) && (
            <React.Fragment>
              <img
                className={classes.doneImage}
                src={doneImage}
                alt="Done image"
              />

              <Typography variant="h5" gutterBottom>
                Thank you for your Booking.
              </Typography>
              <br />
              <Typography variant="subtitle1">
                Your booking number is{" "}
                <span className={classes.bold}>{`"${state.bookingRef}"`}</span> . We
                have emailed your booking information, and will look forward to
                meet you at the clinic.
              </Typography>
            </React.Fragment>
          )}

          {state.finalResults.map((item) => (
            <React.Fragment>
              {item.data.status === "OK" && (
                <React.Fragment>
                  <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Alert severity="success">
                      {`${item.data.person.forename} ${item.data.person.surname} - Successfully Booked!`}
                    </Alert>
                  </div>
                </React.Fragment>
              )}

              {item.data.status === "FAILED" && (
                <React.Fragment>
                  <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Alert severity="error">
                      {`${item.data.person.forename} ${item.data.person.surname} - Booking Failed! ( has already booked for that day!)`}
                    </Alert>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
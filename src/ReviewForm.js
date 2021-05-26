import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GlobalState from "./GlobalState";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { faPoundSign } from "@fortawesome/free-solid-svg-icons";

import dateFormat from "dateformat";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Icon from "@material-ui/core/Icon";
import dateformat from "dateformat";

import Fade from "react-reveal/Fade";

import { calculatePrice, calculateTotalPrice } from "./PriceCalculator";

import ValidateStep from "./Validation";
import { FormatDateFromString } from "./DateFormatter";

import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import BookService from "./services/BookService";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "#fff",
    border: `1px solid #ddd`,
    borderRadius: "5px",
    color: "#555",
    padding: "30px 0px 15px 20px",
    textAlign: "justify",
    marginTop: "20px",
    position: "relative",
  },

  boxTime: {
    backgroundColor: "#fff",
    border: `1px solid #ddd`,
    borderRadius: "5px",
    color: "#333",
    padding: "30px 0px 0px 20px",
    textAlign: "justify",
    marginTop: "20px",
    position: "relative",
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

  boxRed: {
    backgroundColor: "#dc2626",
    color: "#fff",
    padding: "1px",
    borderRadius: "4px",
    textAlign: "justify",
    paddingRight: "40px",
  },

  boxInfo: {
    textAlign: "justify",
    backgroundColor: "#fafafa",
    color: "#333",
    // padding : "1px",
    borderRadius: "4px",
    // paddingRight: "40px",
    border: "1px solid #eee",
  },

  ul: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },

  li: {
    marginBottom: "15px",
    fontSize: "0.95rem",
  },

  icon: {
    marginRight: "10px",
    fontSize: "1.2rem",
    color: theme.palette.secondary.main,
    float: "left",
  },

  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },

  infoDetails: {
    textAlign: "left",
  },

  infoTitle: {
    fontWeight: "800",
    float: "left",
    width: "120px",
  },

  infoData: {
    fontWeight: "400",
  },

  infoTitleTime: {
    fontWeight: "800",
    float: "left",
    marginRight: "10px",
  },

  infoDataTime: {
    fontWeight: "600",
  },

  title: {
    textAlign: "left",
    fontWeight: "500",
    // marginBottom: "5px",
    marginTop: "5px",
    padding: "10px",
    borderRadius: "4px",
  },

  Accordion: {
    backgroundColor: "#f5f5f5",
    color: "#111",
  },

  terms: {
    fontWeight: "500",
    textAlign: "justify",
    marginTop: "10px",
    padding: "10px",
  },

  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },

  AddAnother: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },

  infoDataPrice: {
    color: theme.palette.secondary.main,
    fontWeight: "600",
  },
}));

export default function ReviewForm() {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  const [totalPrice, setTotalPrice] = React.useState(0);

  const [expanded, setExpanded] = React.useState("panel10");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dataConfirmedChanged = (event) => {
    setState((state) => ({ ...state, dataConfirmed: event.target.checked }));
    if (event.target.checked) {
      setState((state) => ({ ...state, dataConfirmedError: false }));
    }
  };

  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.pageTitle}>
        Review Your Data
      </Typography>
  
       <Grid
          container
          direction="column"
          spacing={1}
          justify="flex-start"
          alignItems="stretch"
        >
          <Fade up>
            <div className={classes.boxTime}>
              <div className={classes.boxTitle}>Appoinment Info</div>

              <Grid item xs={12} md={12}>
                <div>
                  <ul className={classes.ul}>
                    <li className={classes.li}>
                      <span className={classes.infoTitleTime}>
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className={classes.icon}
                        />
                        Date:
                      </span>

                      <span className={classes.infoDataTime}>
                        {dateformat(
                          new Date(
                            state.bookingDate.toUTCString().slice(0, -4)
                          ),
                          "dddd, mmmm dS, yyyy"
                        )}
                      </span>
                    </li>
                    <li className={classes.li}>
                      <span className={classes.infoTitleTime}>
                        <FontAwesomeIcon
                          icon={faClock}
                          className={classes.icon}
                        />
                        Time:
                      </span>
                      <span className={classes.infoDataTime}>
                        {state.bookingTime}
                      </span>
                    </li>
                    <li className={classes.li}>
                      <span className={classes.infoTitleTime}>
                        <FontAwesomeIcon
                          icon={faHourglassHalf}
                          className={classes.icon}
                        />
                        Check-up Duration:
                      </span>
                      Up-to 45 minutes
                    </li>

                    <li className={classes.li}>
                      <span className={classes.infoTitleTime}>
                        <FontAwesomeIcon
                          icon={faNotesMedical}
                          className={classes.icon}
                        />
                        Package:
                      </span>
                      <span className={classes.infoData}>
                        {" "}
                        {state.package}{" "}
                      </span>
                    </li>
                    <li className={classes.li}>
                      <span className={classes.infoTitleTime}>
                        <FontAwesomeIcon
                          icon={faPoundSign}
                          className={classes.icon}
                        />
                        Deposit:
                      </span>
                      <span className={classes.infoDataPrice}> £95.00 </span>
                    </li>
                  </ul>
                </div>
              </Grid>
            </div>
          </Fade>

          <Fade up>
            <div className={classes.box}>
              <div className={classes.boxTitle}>Your Info</div>

              <Grid item xs={12} md={12}>
                <div>
                  <ul className={classes.ul}>
                    <li className={classes.li}>
                      <span className={classes.infoTitle}>Full Name</span>
                      <span className={classes.infoData}>
                        {" "}
                        {state.fullname}{" "}
                      </span>
                    </li>
                    <li className={classes.li}>
                      <span className={classes.infoTitle}>Telephone</span>
                      <span className={classes.infoData}> {state.phone} </span>
                    </li>
                    <li className={classes.li}>
                      <span className={classes.infoTitle}>Email Address</span>
                      <span className={classes.infoData}> {state.email} </span>
                    </li>

                    <li className={classes.li}>
                      <span className={classes.infoTitle}>Notes</span>
                      <span className={classes.infoData}> {state.notes} </span>
                    </li>
                  </ul>
                </div>
              </Grid>
            </div>
          </Fade>
          <div className={classes.terms}>
            By clicking on submit button you are agreeing with our{" "}
            <a
              className={classes.link}
              target="_blank"
              href="https://www.medicalexpressclinic.co.uk/terms-and-conditions"
            >
              terms and condition.
            </a>
          </div>

          {/* <div style={{textAlign:"left", color: "#111", marginLeft:"10px"}}>
<FormControlLabel className={classes.formControl}  style={ {color: state.dataConfirmedError ? "red" : ''}} 
    control={<Checkbox className={classes.formControl} style={ {color: state.dataConfirmedError ? "red" : ''}} 
     color="secondary" name="emailConfirmCheckBox" checked={state.dataConfirmed} onChange={dataConfirmedChanged} />}
     label={<span style={{ fontSize: '0.9rem' , fontWeight:"500"}}>{`I confirm that the details in this form are correct, and I am happy for them to appear as written above on my results and certificate if ordered.`} </span>}
     />
</div> */}
        </Grid>
  
    </React.Fragment>
  );
}

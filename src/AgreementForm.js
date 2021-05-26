import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DateForm from './DateForm';
import TimeForm from './TimeForm';
import InformationForm from './InformationForm';
import ReviewForm from './ReviewForm';
import GlobalState from './GlobalState';
import AddressForm from './PackageForm';
import BookService from './services/BookService';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

import HttpsIcon from '@material-ui/icons/Https';

import {BrowserView, MobileView, isMobile} from 'react-device-detect';

import logoImage from './images/logo.png';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import faq from './FAQ';
import { useEffect } from 'react';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
           <strong> Medical Express Clinic </strong> 
      </Link>{isMobile ? ' ' : ' All rights reserved.' }
   
       
 
     
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: 'center',
  },

  logo: {
    maxWidth: 160,
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px"
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px"
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
    
  },
  privacyButton: {
    marginBottom : "20px",
    width: "115px",
    color:"#fff",
    backgroundColor : "#444",
    "&:hover": {
      background: "#000",
      color: "#fff"
    },
  },

  faqButton: {
    marginBottom : "20px",
    marginLeft : "10px",
    backgroundColor : "#444",
    "&:hover": {
      background: "#000",
      color: "#fff"
    },
    width: "115px",
    color:"#fff"
  },

  getStartedButton: {
    marginTop : "30px",
    marginBottom : "10px",

},
textContent : {
    color : "#666f77",
    fontSize : "1.1rem",
    textAlign: "justify",
    paddingLeft: "8px",
    paddingRight: "20px",
    lineHeight: "2.2em",
    fontWeight : "400"
},

textContentMobile : {
  color : "#666f77",
  fontSize : "0.9rem",
  textAlign: "justify",
  paddingLeft: "8px",
  paddingRight: "20px",
  lineHeight: "2.2em",
  fontWeight : "400"
},

}));




export default function AgreementForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();


  //// ** Dialog

  const [check, setCheck] = React.useState({});

  const [error, setError] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [scrollFAQ, setScrollFAQ] = React.useState('paper');


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const descriptionElementRefFAQ = React.useRef(null);
  React.useEffect(() => {
    if (openFAQ) {
      const { current: descriptionElementFAQ } = descriptionElementRefFAQ;
      if (descriptionElementFAQ !== null) {
        descriptionElementFAQ.focus();
      }
    }
  }, [openFAQ]);


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClickOpenFAQ = (scrollType) => () => {
    setOpenFAQ(true);
    setScrollFAQ(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFAQ = () => {
    setOpenFAQ(false);
  };


  const checkClicked = (event, id) =>
  {
    switch (id)
    {
        case 1: 
            setCheck({...check, check1:event.target.checked});
            break;
        case 2: 
            setCheck({...check, check2:event.target.checked});
            break;
        case 3: 
            setCheck({...check, check3:event.target.checked});
            break;
        case 4: 
            setCheck({...check, check4:event.target.checked});
            break;
        case 5: 
            setCheck({...check, check5:event.target.checked});
        break;    
        default:
                break;

    }

  }

 const backButtonClicked = (event) =>
 {
     setState(state => ({...state, getStarted:false}));
 }


const getAgreeClicked = (event) => {
    if (check.check1 && check.check2 && check.check3 && check.check4 && check.check5)
    {
        setState(state => ({...state, agreed: true}));
    }
    else
    {
        setError(true);
    }
}

useEffect( () => {
  if (check.check1 && check.check2 && check.check3 && check.check4 && check.check5)
  {
    setError(false);
  }
}, [check]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>


        <Grid
            container
            direction="row"
            spacing= {1}
            justify="center"
            alignItems="center"
        >


            <Grid item item xs={10}>
                  <Typography  style={{fontWeight: "400"}} variant="h6" color="inherit" noWrap>
                    Medical Express Clinic
                  </Typography>
            </Grid>

            <Grid item xs={2}>
                    <img className={classes.logoImage} src={logoImage} alt="logo image"/> 
            </Grid>


        
        </Grid>  
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>


          <Typography style={{ marginBottom: "30px"}} component="h1" variant="h6" align="left">
              Patients wishing to book an appointment must confirm that:
          </Typography>


                <Grid container  direction="column"  justify="flex-start" alignItems="flex-start" spacing={3}>

                <Grid item xs={12}  >

                        <FormControlLabel 
                            control={<Checkbox  color="secondary" name="check1" checked={check.check1} onChange={(event => checkClicked(event,1))} />}
                            label={<span style={{ fontSize: '1rem' }}>{`I do not have a fever`} 
                            </span>}
                        />
                </Grid>

                <Grid item xs={12}  >

                        <FormControlLabel
                                    control={<Checkbox color="secondary" name="check2"checked={check.check2} onChange={(event => checkClicked(event,2))} />}
                                    label={<span style={{ fontSize: '1rem' }}>{`I do not have a new, continuous cough`} 
                                    </span>}
                                />
                </Grid>

                <Grid item xs={12}  >

                    <FormControlLabel
                                control={<Checkbox color="secondary" name="check3" checked={check.check3} onChange={(event => checkClicked(event,3))} />}
                                label={<span style={{ fontSize: '1rem' }}>{`I do not have shortness of breath`} 
                                </span>}
                            />
                    </Grid>

                
                <Grid item xs={12}  >

                    <FormControlLabel style={{ fontSize: '1rem', textAlign:"justify" }}
                                control={<Checkbox color="secondary" name="check4" checked={check.check4} onChange={(event => checkClicked(event,4))}  />}
                                label={<span style={{ fontSize: '1rem', textAlign:"left" }}>{`I have not been in contact with someone suspected or known to have coronavirus`} 
                                </span>}
                            />
                    </Grid>

                    <Grid item xs={12}  >

                        <FormControlLabel style={{ fontSize: '1rem', textAlign:"justify" }}
                                    control={<Checkbox color="secondary" name="check5" checked={check.check5} onChange={(event => checkClicked(event,5))}  />}
                                    label={<span style={{ fontSize: '1rem', textAlign:"left" }}>{`I confirm that this appointment is for a Fit to Fly PCR Test, not for the Test to Release scheme.`} 
                                    </span>}
                                />
                        </Grid>

                </Grid>

             

                

               

            <p className={isMobile ? classes.textContentMobile : classes.textContent}>
                 If you cannot confirm all the points stated above, you must not proceed any further and must self-isolate for the next 14 days. Please click the box to agree to these terms.
            </p>

            {error && (
                <Alert severity="error">You need to check all the terms to proceed! </Alert>
            )}
            

        <Button 
                // variant="contained" 
                className={classes.getStartedButton} 
                style = {{marginRight : "20px"}}
                color="default"
                onClick={backButtonClicked}
                onTouchTap={backButtonClicked} 
                >
        Back
        </Button>

          <Button 
                  variant="contained" 
                  className={classes.getStartedButton} 
                  color="primary"
                  onClick={getAgreeClicked}
                  onTouchTap={getAgreeClicked} 
                  >
            Agree
         </Button>
      

        </Paper>

        <Button 
                  variant="contained" 
                  className={classes.privacyButton} 
                  color="secondary"
                  startIcon={<HttpsIcon/>}
                  onClick={handleClickOpen('paper')}
                  onTouchTap={handleClickOpen('paper')} 
                  >
             Privacy
         </Button>

         <Button 
                  variant="contained" 
                  className={classes.faqButton} 
                  color="secondary"
                  startIcon={<LiveHelpIcon/>}
                  onClick={handleClickOpenFAQ('paper')}
                  onTouchTap={handleClickOpenFAQ('paper')} 
                  >
             FAQ
         </Button>

         <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                      >
                        <DialogTitle id="scroll-dialog-title">Application Disclaimer</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                          <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                          >
                            <div style={{textAlign:"justify", padding:"10px"}}>
                              Medical Express Clinic will not contact you for any other reason than to share your test results, and certificate if selected, via the email address provided. The information provided to us via this registration form is never shared with any other organisations, except when this is required by law. 

                                Information provided will never be used for marketing purposes, you cannot opt in.

                                In the case of a positive swab result, our doctor will call on the telephone number provided to inform you of your result and provide additional advice or guidance.
                          </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Close
                          </Button>
                      
                        </DialogActions>
      </Dialog>

      <Dialog
                        open={openFAQ}
                        onClose={handleCloseFAQ}
                        scroll={scrollFAQ}
                        aria-labelledby="scroll-dialog-title-FAQ"
                        aria-describedby="scroll-dialog-description-FAQ"
                      >
                        <DialogTitle id="scroll-dialog-title">FAQ</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                          <DialogContentText
                            id="scroll-dialog-description-FAQ"
                            ref={descriptionElementRefFAQ}
                            tabIndex={-1}
                          >
                            <div style={{textAlign:"justify", padding:"10px"}}>
                             
                            {faq.map(element => (
                              <React.Fragment>
                                <p style={{borderLeft: "4px solid red", background: "#eee", fontWeight: "600", paddingLeft: "10px",paddingRight: "10px", lineHeight: "30px"}}>
                                  <span style={{color: "red" , fontSize:"24px"}}> Q. </span>
                                    {element.question} 
                                </p>

                                <p style={{borderLeft: "4px solid #999", background: "#fff", fontWeight: "400", color: "#555" ,paddingLeft: "10px",paddingRight: "30px", lineHeight: "50px"}}>
                                  <span style={{color: "#555" , fontSize:"24px"}}> A. </span>
                                    {element.answer} 
                                </p>

                              </React.Fragment>

                            ))}

                          </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseFAQ} color="primary">
                            Close
                          </Button>
                      
                        </DialogActions>
          </Dialog>




        <Copyright />
      </main>
    </React.Fragment>
  );
}
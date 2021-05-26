import React from 'react';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';
import {BrowserView, MobileView} from 'react-device-detect';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  formControl: {
    // marginTop : theme.spacing(1),
    // marginBottom : theme.spacing(1),
    // padding: theme.spacing(1),
    
  },

  Box:{
    backgroundColor : "#f1f1f1",
    padding: "10px",
    //maxWidth: "300px",
    borderRadius  : "10px",
    boxShadow: "2px 4px #ddd",
    marginTop: "5px",
    marginBottom : "15px",
    textAlign: "left"
    
  
  },

  Label: {

  },

  CheckBox: {

  }



}));


export default function AntiBodyComponent() {
   const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);
    const [antiBodyCheck, setAntiBodyCheck] = React.useState(state.antiBodyTest ?? false);

    const antiBodyCheckChanged = (event) =>
    {
      setAntiBodyCheck(event.target.checked);
      setState(state => ({...state, antiBodyTest : event.target.checked}));
    }

  return (

    <React.Fragment>

      <div className={classes.Box}>

         <div className= {classes.Label}>
              Add to your Appointment...
         </div>

        <div className= {classes.CheckBox}>
           <FormControlLabel className={classes.formControl} 
                  control={<Checkbox className={classes.formControl}  color="secondary" name="emailConfirmCheckBox" checked={antiBodyCheck} onChange={antiBodyCheckChanged} />}
                  label={<span style={{ fontSize: '0.8rem' }}>{`COVID-19 Antibody Test `} 
                  <span  style={{ fontSize: '0.8rem', textDecoration: "italic" ,fontWeight:"600" ,color:"#333" }}> £99.00 </span> </span> } />
           <div hidden={!antiBodyCheck} style={{paddingLeft: "30px", fontWeight: "400", fontSize:"0.8"}}>* <strong> £50 </strong>phlebotomy charges apply</div>       
        </div>


      </div>
               


        
          
{/* 
        <Grid container spacing={1} alignItems="baseline">

            <Grid item xs={12} className={classes.formControl} > */}
                {/* <FormControlLabel className={classes.formControl} 
                  control={<Checkbox className={classes.formControl}  color="secondary" name="emailConfirmCheckBox" checked={antiBodyCheck} onChange={antiBodyCheckChanged} />}
                  label={<span style={{ fontSize: '0.7rem' }}>{`COVID-19 Antibody Test (IgM & IgG)`} 
                  <span  style={{ fontSize: '0.8rem', textDecoration: "italic" ,fontWeight:"600" ,color:"#333" }}> £99.00 </span> </span> } */}
                  
                
                {/* /> */}
            {/* </Grid>

        </Grid> */}


     
    </React.Fragment>
  );
}




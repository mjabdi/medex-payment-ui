import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import GlobalState from './GlobalState';
import { BrowserView, MobileView } from 'react-device-detect';

import TimeService from './services/TimeService';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import PhoneIcon from '@material-ui/icons/Phone';



import { format, addMinutes, isWeekend, getDay } from 'date-fns';


import { enGB, } from 'date-fns/locale'


import dateformat from 'dateformat';

class UTCUtils extends DateFnsUtils {

  locale = enGB;
  // format(date, formatString) {
  //   return format(new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 ), formatString,enGB);
  // }

  // getCalendarHeaderText(date){
  //   return dateformat(date, 'mmmm yyyy');
  // }

  // getDayText(date)
  // {
  //   return dateformat(date, 'd');
  // }



}


const useStyles = makeStyles((theme) => ({

  loadingBox: {

  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px"
  }

}));




export default function DateForm() {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  const [firstAvailableDay, setFirstAvailableDay] = React.useState(null);
  const [fullyBookedDays, setFullyBookedDays] = React.useState(null);

  const [bookingDate, setBookingDate] = React.useState(state.bookingDate);


  const [dataLoaded, setDataLoaded] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const LoadData = () => {

    const promise1 = TimeService.getFirstAvailableDate();
    const promise2 = TimeService.getFullyBookedDates();

    Promise.all([promise1, promise2]).then((values) => {
      let firstday = new Date((values[0].data).date);
      firstday.setHours(0, 0, 0, 0);

      firstday = new Date(firstday.getTime() - firstday.getTimezoneOffset() * 60 * 1000);

      setFirstAvailableDay(firstday);
      if (!state.bookingDate) {
        dateChanged(firstday);
      }

      setFullyBookedDays(values[1].data);

      setDataLoaded(true);

    }).catch((err) => {
      console.log(err);
    });
  }



  useEffect(() => {
    LoadData();

  }, []);



  const dateChanged = (date) => {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    // const offset = parseInt(date.getTimezoneOffset());
    // console.log(offset);

    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
    // date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0);

    // date = format(date, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/London' }) ; // 2014-10-25 10:46:20 GMT 00
    // date = toDate(date);
    console.log(date);
    setBookingDate(date);
    setState(state => ({ ...state, bookingDate: date }));
  }

  const checkFullyBooked = (date) => {
    var result = false;

    // if (isWeekend(date))
    //   return true

    // console.log(getDay(date))

    if (getDay(date) === 0 || getDay(date) === 1 || getDay(date) === 4 || getDay(date) === 6)
      return true

    if (dateformat(date, 'yyyy-mm-dd') < dateformat(firstAvailableDay, 'yyyy-mm-dd')) {
      return true;
    }

    else if (fullyBookedDays && fullyBookedDays.length > 0) {
      for (var i = 0; i < fullyBookedDays.length; i++) {
        if (dateformat(new Date(fullyBookedDays[i]), 'yyyy-mm-dd') === dateformat(date, 'yyyy-mm-dd')) {
          result = true;
        }
      }

      return result;
    }
    else {
      return false;
    }
  }

  return (

    <React.Fragment>

      <Typography variant="h6" gutterBottom className={classes.pageTitle}>
        Pick a Date
                </Typography>

      {(dataLoaded && firstAvailableDay) ? (

        <React.Fragment>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >

            <BrowserView>
              <MuiPickersUtilsProvider utils={UTCUtils} locale={enGB}>
                <DatePicker autoOk
                  disablePast={true}
                  openTo="date"
                  orientation="landscape"
                  variant="static"
                  fullWidth
                  value={bookingDate}
                  onChange={dateChanged}
                  shouldDisableDate={checkFullyBooked}
                />
              </MuiPickersUtilsProvider>
            </BrowserView>

            <MobileView>
              <MuiPickersUtilsProvider utils={UTCUtils} locale={enGB}>
                <DatePicker autoOk
                  disablePast={true}
                  openTo="date"
                  variant="static"
                  fullWidth
                  value={bookingDate}
                  onChange={dateChanged}
                  shouldDisableDate={checkFullyBooked}
                />
              </MuiPickersUtilsProvider>
            </MobileView>
          </Grid>

        </React.Fragment>
      )
        :
        (
          <React.Fragment>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >

              <Skeleton variant="text" width={'80%'} />
              <Skeleton variant="text" width={'80%'} />
              <Skeleton variant="rect" width={'80%'} height={220} />

            </Grid>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}





function EquallDates(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

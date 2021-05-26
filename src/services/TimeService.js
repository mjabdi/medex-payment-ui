
import API from './api';
import axiosRetry from 'axios-retry';
import dateformat from 'dateformat';

export default class TimeService{

     static getFirstAvailableDate =  () =>
    {
        axiosRetry( API, { retries: 3,  retryDelay: (retryCount) => {
            return retryCount * 1000;
          } });
        return API.get('/api/dentist/time/getfirstavaiabledate');
    }

    static getFullyBookedDates = () =>
    {        
        axiosRetry( API, { retries: 3,  retryDelay: (retryCount) => {
            return retryCount * 1000;
          } });
       return API.get('/api/dentist/time/getfullybookeddays');
    }

    static getTimeSlots = (date) =>
    {
        axiosRetry( API, { retries: 3,  retryDelay: (retryCount) => {
            return retryCount * 1000;
          } });

        const date_utc =  dateformat(new Date(date.toUTCString().slice(0, -4)),'yyyy-mm-dd');
        return API.get(`/api/dentist/time/gettimeslots?date=${date_utc}`);
    }


}
import API from './api';
import axiosRetry from 'axios-retry';

export default class PaymentService {

   static doPayment = (paymentId, museumPaymentId) =>
   {
      return API.post(`/api/museumdental/payment/dopayment`, {paymentId: paymentId  , museumPaymentId : museumPaymentId});
   }

   static refundPayment = (paymentId) =>
   {
      return API.post(`/api/museumdental/payment/refundpayment`, {museumPaymentId : paymentId});
   }

   static createNewPaymentLink = (paymentRecord) =>
   {
      return API.post(`/api/museumdental/payment/createpayment`, {paymentRecord : paymentRecord});
   }

   static deletePaymentLink = (paymentId) =>
   {
      return API.post(`/api/museumdental/payment/deletepayment`, {museumPaymentId : paymentId});
   }

   static getAllPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getallpayments`);
   }

   static getDeletedPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getdeletedpayments`);
   }

   static getPaidPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getpaidpayments`);
   }

   static getRefundPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getrefundpayments`);
   }

   static getPaymentById = (paymentId) =>
   {
      return API.get(`/api/museumdental/payment/getpaymentbyid?id=${paymentId}`);
   }


}
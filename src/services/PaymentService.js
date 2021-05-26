import API from './api';
import axiosRetry from 'axios-retry';

export default class PaymentService {

   static doPayment = (payload) =>
   {
      return API.post(`/api/medex/payment/dopayment`, payload);
   }

   static refundPayment = (paymentId) =>
   {
      return API.post(`/api/medex/payment/refundpayment`, {medexPaymentId : paymentId});
   }

   static createNewPaymentLink = (paymentRecord) =>
   {
      return API.post(`/api/medex/payment/createpayment`, {paymentRecord : paymentRecord});
   }

   static deletePaymentLink = (paymentId) =>
   {
      return API.post(`/api/medex/payment/deletepayment`, {medexPaymentId : paymentId});
   }

   static getAllPayments = () =>
   {
      return API.get(`/api/medex/payment/getallpayments`);
   }

   static getDeletedPayments = () =>
   {
      return API.get(`/api/medex/payment/getdeletedpayments`);
   }

   static getPaidPayments = () =>
   {
      return API.get(`/api/medex/payment/getpaidpayments`);
   }

   static getRefundPayments = () =>
   {
      return API.get(`/api/medex/payment/getrefundpayments`);
   }

   static getPaymentById = (paymentId) =>
   {
      return API.get(`/api/medex/payment/getpaymentbyid?id=${paymentId}`);
   }


}
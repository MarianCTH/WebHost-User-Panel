import axios from "axios";
import { InvoiceModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;
export const GET_SERVICES = `${API_URL}/get_invoices`;
export const CREATE_PAYMENT = `${API_URL}/create-payment`;
export const GET_WALLET = `${API_URL}/get-wallet`;
export const MAKE_PAYMENT = `${API_URL}/make-payment`;

export function requestInvoices(user_id: number) {
  return axios.post<InvoiceModel[]>(GET_SERVICES, {user_id});
}

export function requestPaypalPayment(amount: number, userId: number) {
  return axios.post<string>(CREATE_PAYMENT, {
    amount,
    userId,
  });
}

export function requestGetWalletBalance(userId: number) {
  return axios.post<number>(GET_WALLET, {
    userId
  });
}

export function requestMakePayment(userId: number, amount: number) {
  return axios.post(MAKE_PAYMENT, {
    userId,
    amount
  });
}

export function requestSetInvoiceStatus(invoiceId: number, status: string) {
  return axios.post(`${API_URL}/set-invoice-status`, {
    invoiceId,
    status,
  });
}
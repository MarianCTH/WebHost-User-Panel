import { useEffect, useState } from 'react';
import { InvoiceModel } from './_models';
import { requestInvoices, requestPaypalPayment, requestGetWalletBalance, requestMakePayment, requestSetInvoiceStatus } from './_requests';
import {useAuth} from '../../../../app/modules/auth';

async function fetchInvoices(user_id: number): Promise<InvoiceModel[]> {
  try {
    const response = await requestInvoices(user_id);

    if (response && response.data) {
      const invoices: InvoiceModel[] = response.data;

      return invoices;
    } 
    else {
      console.error("No data received from the server.");
      return [];
    }
  } 
  catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export const useUserInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserInvoices = async () => {
      try {
        if (currentUser) {
          const fetchedInvoices = await fetchInvoices(currentUser.userId);
          setInvoices(fetchedInvoices);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchUserInvoices();
  }, [currentUser]);

  return invoices;
};

async function fetchPaypalPayment(amount: number, user_id: number): Promise<string> {
  try {
    const response = await requestPaypalPayment(amount, user_id);

    if (response && response.data) {
      const paymentURL: string = response.data;

      return paymentURL;
    } 
    else {
      console.error("No data received from the server.");
      return '';
    }
  } 
  catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export const usePaypalPaymentURL = (userID: number, amount: number) => {
  const [paymentURL, setPaymentURL] = useState<string>();

  const fetchUserPaymentURL = async () => {
    try {
      if (userID && amount) {
        const fetchedURL = await fetchPaypalPayment(amount, userID);
        setPaymentURL(fetchedURL);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  fetchUserPaymentURL();
  return paymentURL;
};

async function fetchWalletBalance(user_id: number): Promise<number> {
  try {
    const response = await requestGetWalletBalance(user_id);

    if (response && response.data) {
      const balance: number = response.data;

      return balance;
    } 
    else {
      console.error("No data received from the server.");
      return 0;
    }
  } 
  catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export const useWalletBalance = (userID: number) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        if (userID) {
          const fetchedBalance = await fetchWalletBalance(userID);
          setBalance(fetchedBalance);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchUserBalance();
  }, [userID]);
  return balance;
}

async function fetchMakePayment(user_id: number, amount: number): Promise<void> {
  try {
    const response = await requestMakePayment(user_id, amount);

    if (response && response.data) {
      return response.data;
    } 
    else {
      console.error("No data received from the server.");
      return ;
    }
  } 
  catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export const useMakePayment = (userID: number, amount: number) => {
  const makePayment = async () => {
    try {
      if (userID && amount) {
        await fetchMakePayment(userID, amount);
        return 'success';
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      return 'error';
    }
  };
  
  return { makePayment };
}

export const useSetInvoiceStatus = () => {
  const setInvoiceStatus = async (invoiceId: number, status: string) => {
    try {
      if (invoiceId && status) {
        await requestSetInvoiceStatus(invoiceId, status);
        return 'success';
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      return 'error';
    }
  };
  
  return { setInvoiceStatus };
}
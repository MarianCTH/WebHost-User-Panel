import { useEffect, useState } from 'react';
import { TicketModel, MessageModel, AnnouncementModel } from './_models';
import { requestTickets, requestTicketData, requestCreateTicket, requestCreateTicketMessage, requestAnnouncements } from './_requests';
import { ICreateMessage, ICreateTicket } from '../components/CreateTicketHelper';
import {useAuth} from '../../../../app/modules/auth';

async function fetchTickets(user_id: number): Promise<TicketModel[]> {
  try {
    const response = await requestTickets(user_id);

    if (response && response.data) {
      const tickets: TicketModel[] = response.data;

      return tickets;
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
export const useUserTickets = () => {
  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        if (currentUser) {
          const fetchedTickets = await fetchTickets(currentUser.userId);
          setTickets(fetchedTickets);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchUserTickets();
  }, [currentUser]);

  return tickets;
};

export async function createTicket(ticket: ICreateTicket) {
  try {
    const response = await requestCreateTicket(ticket);

    if (response && response.data) {
      return response.data;
    } 
    else {
      console.error("No data received from the server.");
      return [];
    }
  } 
  catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}
export async function createMessage(message: ICreateMessage) {
  try {
    const response = await requestCreateTicketMessage(message);

    if (response && response.data) {
      return response.data;
    } 
    else {
      console.error("No data received from the server.");
      return [];
    }
  } 
  catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}

async function fetchTicketData(ticket_id: number): Promise<TicketModel> {
  try {
    const response = await requestTicketData(ticket_id);

    if (response && response.data) {
      const ticket: TicketModel= response.data;

      return ticket;
    } 
    else {
      console.error("No data received from the server.");
      return {} as TicketModel;
    }
  } 
  catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}
export const useTicketData = (ticket_id: number) => {
  const [ticket, setTicket] = useState<TicketModel>();

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        if (ticket_id) {
          const fetchedTicket = await fetchTicketData(ticket_id);
          setTicket(fetchedTicket);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchUserTickets();
  });

  return ticket;
};

async function fetchAnnoucements(): Promise<AnnouncementModel[]> {
  try {
    const response = await requestAnnouncements();

    if (response && response.data) {
      const announcement: AnnouncementModel[]= response.data;

      return announcement;
    } 
    else {
      console.error("No data received from the server.");
      return {} as AnnouncementModel[];
    }
  } 
  catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}
export const useAnnouncementsData = () => {
  const [fetchedAnnoucements, setfetchedAnnoucements] = useState<AnnouncementModel[]>([]);

  useEffect(() => {
    const fetchAnnounce = async () => {
      try {
        const fetchedAnnoucements = await fetchAnnoucements();
        setfetchedAnnoucements(fetchedAnnoucements);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchAnnounce();
  });

  return fetchedAnnoucements;
};
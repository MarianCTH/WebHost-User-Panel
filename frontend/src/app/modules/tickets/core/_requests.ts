import axios from "axios";
import { TicketModel } from "./_models";
import { ICreateTicket, ICreateMessage } from "../components/CreateTicketHelper";

const API_URL = import.meta.env.VITE_APP_API_URL;
export const GET_TICKETS = `${API_URL}/get_tickets`;
export const GET_TICKET_DATA = `${API_URL}/get_ticket_data`;
export const CREATE_TICKET_URL = `${API_URL}/create_ticket`;
export const GET_MESSAGES = `${API_URL}/get_messages`;
export const CREATE_TICKET_MESSAGE_URL = `${API_URL}/create_ticket_message`;
export const GET_ANNOUNCEMENTS = `${API_URL}/get_announcements`;

export function requestTickets(user_id: number) {
  return axios.post<TicketModel[]>(GET_TICKETS, {user_id});
}

export function requestTicketData(ticket_id: number) {
  return axios.post<TicketModel>(GET_TICKET_DATA, {ticket_id});
}

export function requestCreateTicket(ticket: ICreateTicket) {
  return axios.post(CREATE_TICKET_URL, {
    user_id: ticket.userID,
    title: ticket.ticketTitle,
    message: ticket.ticketDescription,
    email: ticket.ticketEmail,
    status: ticket.ticketStatus,
  });
}

export function requestCreateTicketMessage(message: ICreateMessage) {
  return axios.post(CREATE_TICKET_MESSAGE_URL, {
    user_id: message.userID,
    message: message.messageDescription,
    ticket_id: message.ticketID,
  });
}

export function requestAnnouncements() {
  return axios.get(GET_ANNOUNCEMENTS);
}
import * as Yup from 'yup'

export interface ICreateTicket {
  userID: number
  ticketTitle: string
  ticketDescription: string
  ticketEmail: string
  ticketStatus: string
}

export interface ICreateMessage {
  ticketID: number
  userID: number
  messageDescription: string
}

const createTicketSchemas = [
  Yup.object({
    ticketTitle: Yup.string().required('Subiectul este obligatoriu !'),
    ticketDescription: Yup.string().required('Descrierea este obligatorie !'),
  }),
]

const createMessageSchemas = [
  Yup.object({
    messageDescription: Yup.string().required('Mesajul este obligatoriu !'),
  }),
]

export {createTicketSchemas, createMessageSchemas}

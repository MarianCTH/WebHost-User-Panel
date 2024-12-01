import {UserModel} from '../../auth/core/_models';

export interface TicketModel {
  id: number
  user_id: number
  title: string
  created_date: Date
  status: string
  messages: MessageModel[]
}

export interface MessageModel {
  id: number
  ticket_id: number
  user_id: number
  user: UserModel
  message: string
  created_at: Date
}

export interface AnnouncementModel {
  id: number
  user: UserModel
  title: string
  description: string
  created_at: Date
}
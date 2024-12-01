import { PackModel, ServiceModel } from '../../services/core/_models'

export interface InvoiceModel {
  id: number
  user_id: number
  service: ServiceModel
  pack: PackModel
  date_of_issue: Date 
  due_date: Date
  status: string
}

export interface Wallet{
  balance: number
}
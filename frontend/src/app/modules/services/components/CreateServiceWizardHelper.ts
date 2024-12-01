import * as Yup from 'yup'

export interface ICreateService {
  userID: number
  serviceType: string
  serviceName: string
  serviceSize: string
  serviceStatus: string
  servicePlan: string
  serviceEndDate: Date
  billingAddress: string
  billingCity: string
  billingPostalCode: string
  billingEmail: string
  servicePaymentMethod: string
  saveCard: string
  usedPromocode: string
}

const createServiceSchemas = [
  Yup.object({
    serviceType: Yup.string().required().label('Tipul serviciului'),
  }),
  Yup.object({
    serviceName: Yup.string().required().label('Numele serviciului'),
    servicePlan: Yup.string().required().label('Planul serviciului'),
  }),
  Yup.object({
    billingAddress: Yup.string().required('Adresa este obligatorie'),
    billingCity: Yup.string().required('Orașul este obligatoriu'),
    billingPostalCode: Yup.string().required('Codul poștal este obligatoriu'),
    billingEmail: Yup.string().required('Email-ul este obligatoriu'),
  }),
  Yup.object({
    servicePaymentMethod: Yup.string().required().label('Metoda de plată'),
  }),
]

export {createServiceSchemas}

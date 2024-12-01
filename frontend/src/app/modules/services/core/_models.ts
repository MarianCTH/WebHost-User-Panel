export interface ServiceModel {
  service_id: number
  name: string
  username: string
  status: string
  created_date: Date
  end_date: Date
  pack: PackModel
}

export interface PackModel {
  pack_id: number,
  name: string,
  description: string,
  price: number,
}

export interface IChangePassword {
  username: string
  newPassword: string
  newPasswordConfirm: string
}

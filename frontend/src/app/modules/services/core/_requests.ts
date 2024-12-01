import axios from "axios";
import { ServiceModel, PackModel } from "./_models";
import { ICreateService } from "../components/CreateServiceWizardHelper"

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_SERVICES = `${API_URL}/get_services`;
export const GET_SERVICE = `${API_URL}/get_one_service`;
export const GET_PACKS = `${API_URL}/get_packs`;
export const CREATE_SERVICE_URL = `${API_URL}/create_service`;
export const GET_CPANEL_URL = `${API_URL}/get_cpanel_url`;
export const GET_CPANEL_DISK_USAGE = `${API_URL}/get_cpanel_disk_usage`;
export const CPANEL = `${API_URL}/get_cpanel_data`;

export function requestServices(id: number) {
  return axios.post<ServiceModel[]>(GET_SERVICES, {id});
}

export function requestAllPacks() {
  return axios.post<PackModel[]>(GET_PACKS);
}

export function requestCreateService(
service: ICreateService,
username: string
) {
  return axios.post(CREATE_SERVICE_URL, {
    name: service.serviceName,
    username: username,
    status: service.serviceStatus,
    type: service.serviceType,
    user_id: service.userID,
    pack_id: service.servicePlan,
    end_date: service.serviceEndDate,
    used_promocode: service.usedPromocode,

    billing_address: service.billingAddress,
    billing_city: service.billingCity,
    billing_postal_code: service.billingPostalCode,
  });
}

export function requestOneService(service_id: number) {
  return axios.post<ServiceModel>(GET_SERVICE, {service_id});
}

export function requestCpanelURL(username: string, app:string) {
  return axios.post(GET_CPANEL_URL, {app, username});
}

export function requestCpanelDiskUsage(username: string) {
  return axios.post(GET_CPANEL_DISK_USAGE, {username});
}

export function requestCpanelMethod(method: string, parameters: object) {
  return axios.post(CPANEL, {method, parameters});
}
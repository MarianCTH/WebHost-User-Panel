import axios from "axios";
import { IProfileDetails } from "./../components/settings/SettingsModel";

const API_URL = import.meta.env.VITE_APP_API_URL;
export const UPDATE_USER_PROFILE = `${API_URL}/update_user_profile`;
export const UPDATE_USER_PASSWORD = `${API_URL}/update_user_password`;
export const CHECK_USER_PASSWORD = `${API_URL}/check_user_password`;
export const UPDATE_USER_EMAIL = `${API_URL}/update_user_email`;

export function requestUpdateUserProfile(data: IProfileDetails) {
    return axios.post(UPDATE_USER_PROFILE, {
        id: data.userID,
        first_name: data.fName,
        last_name: data.lName,
        picture: data.avatar,
        phone: data.contactPhone,
        company_name: data.company,
        website: data.companySite,
        timezone: data.timeZone,
        country: data.country,
    });
}

export function requestUpdateUserPassword(data: any) {
    return axios.post(UPDATE_USER_PASSWORD, {
        id: data.userID,
        password: data.password,
    });
}

export function requestUpdateUserEmail(data: any) {
    return axios.post(UPDATE_USER_EMAIL, {
        id: data.userID,
        email: data.email,
    });
}

//return 1 if password matches, 0 if not
export function requestCheckUserPassword(data: any) {
    return axios.post(CHECK_USER_PASSWORD, {
        id: data.userID,
        password: data.password,
    });
}
import { IProfileDetails } from "./../components/settings/SettingsModel";
import { requestUpdateUserPassword, requestUpdateUserProfile, requestCheckUserPassword, requestUpdateUserEmail } from "./_requests";

export async function UpdateProfileDetails(data: IProfileDetails) {
    try {
      const response = await requestUpdateUserProfile(data);
  
      if (response && response.data) {
        return response.data;
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
  
export async function UpdateDatabasePassword(data: Object) {
    try {
      const response = await requestUpdateUserPassword(data);
  
      if (response && response.data) {
        return response.data;
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

export async function UpdateDatabaseEmail(data: Object) {
  try {
    const response = await requestUpdateUserEmail(data);

    if (response && response.data) {
      return response.data;
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

export async function checkUserPassword(data: Object) {
  try {
    const response = await requestCheckUserPassword(data);

    if (response && response.data) {
      return response.data;
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

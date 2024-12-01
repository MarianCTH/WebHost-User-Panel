import { useEffect, useState } from 'react';
import { ServiceModel, PackModel, IChangePassword } from './_models';
import { ICreateService } from '../components/CreateServiceWizardHelper';
import { requestCreateService, requestAllPacks, requestServices, requestOneService, requestCpanelURL, requestCpanelDiskUsage, requestCpanelMethod } from './_requests';
import {useAuth} from '../../../../app/modules/auth';

async function fetchServices(id: number): Promise<ServiceModel[]> {
  try {
    const response = await requestServices(id);

    if (response && response.data) {
      const services: ServiceModel[] = response.data;

      return services;
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

export const useUserServices = () => {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        if (currentUser) {
          const fetchedServices = await fetchServices(currentUser.userId);
          setServices(fetchedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchUserServices();
  }, [currentUser]);

  return services;
};

async function fetchPacks(): Promise<PackModel[]> {
  try {
    const response = await requestAllPacks();

    if (response && response.data) {
      const packs: PackModel[] = response.data;

      return packs;
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

export const usePacks = () => {
  const [packs, setPacks] = useState<PackModel[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAllPacks = async () => {
      try {
        const fetchedPacks = await fetchPacks();
        setPacks(fetchedPacks);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchAllPacks();
  }), [currentUser];

  return packs;
};

export async function createService(service: ICreateService, username: string) {
  try {
    const response = await requestCreateService(service, username);

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

async function fetchOneService(service_id: number): Promise<ServiceModel> {
  try {
    const response = await requestOneService(service_id);

    if (response && response.data) {
      const service: ServiceModel = response.data;

      return service;
    } 
    else {
      console.error("No data received from the server.");
      return {} as ServiceModel;
    }
  } 
  catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}

export const useUserOneService = (service_id: number) => {
  const [service, setService] = useState<ServiceModel>();

  useEffect(() => {
    const fetchUserService = async () => {
      try {
        if (service_id) {
          const fetchedService = await fetchOneService(service_id);
          setService(fetchedService);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchUserService();
  }, [service_id]);

  return service;
};


async function fetchCpanelURL(username: string, app: string): Promise<string> {
  try {
    const response = await requestCpanelURL(username, app);

    if (response && response.data) {
      const url: string = response.data;

      return url;
    } 
    else {
      console.error("No data received from the server.");
      return '';
    }
  } 
  catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}

export const useUserCpanelLink = (username: string, app: string) => {
  const [cpanelURL, setCpanelURL] = useState<string>();
  useEffect(() => {
    const fetchUserCpanelURL = async () => {
      try {
        if (username && app) {
          const fetchedURL = await fetchCpanelURL(username, app);
          setCpanelURL(fetchedURL);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchUserCpanelURL();
  }, [username, app]);

  return cpanelURL;
}

async function fetchCpanelDiskUsage(username: string): Promise<string> {
  try {
    const response = await requestCpanelDiskUsage(username);

    if (response && response.data) {
      const diskUsage: string = response.data;

      return diskUsage;
    } 
    else {
      console.error("No data received from the server.");
      return '';
    }
  } 
  catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}
export const useUserCpanelDiskUsage = (username: string) => {
  const [diskUsage, setDiskUsage] = useState<string>();
  useEffect(() => {
    const fetchUserCpanelDiskUsage = async () => {
      try {
        if (username) {
          const fetchedDiskUsage = await fetchCpanelDiskUsage(username);
          setDiskUsage(fetchedDiskUsage);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchUserCpanelDiskUsage();
  }, [username]);

  return diskUsage;
}

export async function changeServicePassword(newData: IChangePassword) {
  try {
    const response = await requestCpanelMethod("passwd", {"api.version":1, "user": newData.username, "password": newData.newPassword});

    if (response && response.data) {
      return response.data;
    } 
    else {
      console.error("No data received from the server.");
      return "";
    }
  } 
  catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
} 

async function fetchCpanelData(method: string, parameters: object): Promise<string> {
  try {
    const response = await requestCpanelMethod(method, parameters);

    if (response && response.data) {
      const cpanelData: string = response.data;

      return cpanelData;
    } 
    else {
      console.error("No data received from the server.");
      return '';
    }
  } 
  catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}
export const getCpanelData = (method: string, parameters: object, service_id: number) => {
  const [cpanelData, setCpanelData] = useState<string>();
  useEffect(() => {
    const fetchUserCpanelDiskUsage = async () => {
      try {
        if (method && parameters) {
          const fetchedcpanelData = await fetchCpanelData(method, parameters);
          setCpanelData(fetchedcpanelData);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchUserCpanelDiskUsage();
  }, [service_id]);

  return cpanelData;
}

export function calculateTotalPrice(packPrice: number, extraSpace: string): number {
  if(!extraSpace) return packPrice;
  if(extraSpace == "unlimited") return packPrice + 10;
  if(Number(extraSpace) > 5) return packPrice + (Number(extraSpace) * 0.15);
  return packPrice;
}

export const getCpanelResponse = (method: string, parameters: object) => {
    const fetchUserCpanelData = async () => {
      try {
        if (method && parameters) {
          const fetchedcpanelData = await fetchCpanelData(method, parameters);
          return fetchedcpanelData;
        }
      } catch (error) {
        return "error"
      }
    };

  return { fetchUserCpanelData };
}
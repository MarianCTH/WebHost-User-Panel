

export interface IProfileDetails {
  userID: number,
  avatar: string;
  fName: string;
  lName: string;
  company: string;
  contactPhone: string;
  companySite: string;
  country: string;
  timeZone: string;
  communications: {
    email: boolean;
    phone: boolean;
  };
}

export interface IConnectedAccounts {
  google: boolean;
  github: boolean;
  stack: boolean;
}

export interface IEmailPreferences {
  successfulPayments: boolean;
  payouts: boolean;
  freeCollections: boolean;
  customerPaymentDispute: boolean;
  refundAlert: boolean;
  invoicePayments: boolean;
  webhookAPIEndpoints: boolean;
}

export interface INotifications {
  notifications: {
    email: boolean;
    phone: boolean;
  };
  billingUpdates: {
    email: boolean;
    phone: boolean;
  };
  newTeamMembers: {
    email: boolean;
    phone: boolean;
  };
  completeProjects: {
    email: boolean;
    phone: boolean;
  };
  newsletters: {
    email: boolean;
    phone: boolean;
  };
}

export interface IDeactivateAccount {
  confirm: boolean;
}

export const connectedAccounts: IConnectedAccounts = {
  google: true,
  github: true,
  stack: false,
};

export const emailPreferences: IEmailPreferences = {
  successfulPayments: false,
  payouts: true,
  freeCollections: false,
  customerPaymentDispute: true,
  refundAlert: false,
  invoicePayments: true,
  webhookAPIEndpoints: false,
};

export const notifications: INotifications = {
  notifications: {
    email: true,
    phone: true,
  },
  billingUpdates: {
    email: true,
    phone: true,
  },
  newTeamMembers: {
    email: true,
    phone: false,
  },
  completeProjects: {
    email: false,
    phone: true,
  },
  newsletters: {
    email: false,
    phone: false,
  },
};

export const deactivateAccount: IDeactivateAccount = {
  confirm: false,
};

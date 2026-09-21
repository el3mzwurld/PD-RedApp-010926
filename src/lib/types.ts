export type Merchant = {
  ID: string;
  businessName: string;
  businessNumber: number;
  emails: {
    contactEmail: string | null;
    supportEmail: string | null;
    disputeEmail: string | null;
    businessEmail: string;
    personalEmail: string | null;
  };
  phone: number;
  website: string | null;
  bank: string | null;
  accountNumber: number | null;
  address: {
    address1: string | null;
    address2: string | null;
  };
  sector: string | null;
  state: string | null;
  lga: string | null;
  city: string | null;
  country: string | null;
  fName: string;
  lName: string;
  personalPhone: number | null;
  altPersonalPhone: number | null;
  companyLogo: string | null;
  keys: {
    test: number;
    life: number;
  };
  status: "Active" | "Inactive" | "New";
  createdAt: string;
  isKYCComplete: boolean;
  isActive: boolean;
};

type Permission = {
  permission: string;
  description: string;
};

type AdminRole = {
  name: string;
  permissions: Permission[];
  createdAt: string;
};
export type Administrator = {
  fName: string;
  lName: string;
  role: AdminRole;
  createdAt: string;
};
export type MerchantProfile = {
  role: "merchant";
  profile: Merchant;
  email: string;
  password: string;
  isComplete: boolean;
};

type AdminProfile = {
  role: "admin";
  profile: Administrator;
  email: string;
  password: string;
  isComplete: boolean;
};

export type Profile = MerchantProfile | AdminProfile;
export type Dispute = {
  merchant: LinkedMerchant;
  createdAt: string;
  due: string;
  paymentRef: string;
  amount: number;
  paymentMtd: string;
  cardScheme: string;
  customerEmail: string;
  transactionStatus: TransactionStatus;
};

type LinkedMerchant = Pick<Merchant, "ID" | "fName" | "lName">;

// export type TransactionStatus =
//   | "Open"
//   | "Accepted"
//   | "Declined"
//   | "Fully Accepted"
//   | "Fully Declined";

export type DisputeStatus = "open" | "pending" | "closed";

export type SettlementStatus = "successful" | "failed" | "pending";

export type TransactionStatus = "pending" | "settled" | "disputed";

export type Settlement = {
  merchant: LinkedMerchant;
  accountName: string;
  accountNumber: number;
  batchCode: string;
  currency: string;
  reference: string;
  status: SettlementStatus;
};

export type Customer = {
  merchant: LinkedMerchant;
  fName: string;
  lName: string;
  phones: {
    main: number;
    alternate: number | null;
  };
  active: boolean;
  email: string;
  address: {
    address1: string;
    address2: string | null;
  };
};

export type Transaction = {};

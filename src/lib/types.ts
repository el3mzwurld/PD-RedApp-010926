export type Merchant = {
  ID: string;
  businessName: string;
  businessNumber: number;
  emails: {
    contactEmail?: string;
    supportEmail?: string;
    disputeEmail?: string;
    businessEmail: string;
    personalEmail?: string;
  };
  phone: number;
  website?: string;
  bank?: string;
  accountNumber?: number;
  address: {
    address1?: string;
    address2?: string;
  };
  sector?: string;
  state?: string;
  lga?: string;
  city?: string;
  country?: string;
  fName: string;
  lName: string;
  personalPhone?: number;
  altPersonalPhone?: number;
  companyLogo?: string;
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
};
export type Profile = {
  profile: Merchant | Administrator;
  role: "merchant" | "admin";
  email: string;
  password: string;
  isComplete: boolean;
};

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

export type User = {
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

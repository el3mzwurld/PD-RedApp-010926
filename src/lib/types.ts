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
  status: DisputeStatus;
};

export function isDispute(data: unknown): data is Dispute {
  if (typeof data !== "object" || data === null) return false;

  const dispute = data as Record<string, any>;
  const merchant = dispute.merchant;

  if (typeof merchant !== "object" || merchant === null) {
    console.log("❌ Failed at: merchant object check");
    return false;
  }

  const checks: Record<string, boolean> = {
    "merchant.ID": typeof merchant.ID === "string",
    "merchant.fName": typeof merchant.fName === "string",
    "merchant.lName": typeof merchant.lName === "string",
    "dispute.createdAt": typeof dispute.createdAt === "string",
    "dispute.due": typeof dispute.due === "string",
    "dispute.paymentRef": typeof dispute.paymentRef === "string",
    "dispute.amount": typeof dispute.amount === "number",
    "dispute.paymentMtd": typeof dispute.paymentMtd === "string",
    "dispute.cardScheme": typeof dispute.cardScheme === "string",
    "dispute.customerEmail": typeof dispute.customerEmail === "string",
    transactionStatus: ["successful", "failed", "pending"].includes(
      dispute.transactionStatus,
    ),
    disputeStatus: [
      "Open",
      "Accepted",
      "Declined",
      "Fully Accepted",
      "Fully Declined",
    ].includes(dispute.status),
  };

  // Find and log the first property that evaluates to false
  const failedCheck = Object.keys(checks).find((key) => !checks[key]);
  if (failedCheck) {
    console.log(
      `❌ Type guard failed at key: [${failedCheck}]. Value received:`,
      failedCheck.startsWith("merchant.")
        ? merchant[failedCheck.split(".")[1]]
        : dispute[failedCheck],
    );
    return false;
  }

  return true;
}

type LinkedMerchant = Pick<Merchant, "ID" | "fName" | "lName">;

export type DisputeStatus =
  | "Open"
  | "Accepted"
  | "Declined"
  | "Fully Accepted"
  | "Fully Declined";

export type SettlementStatus = "open" | "successful" | "disputed" | "failed";

export type TransactionStatus = "successful" | "failed" | "pending";

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

export type Transaction = {
  merchant: LinkedMerchant;
  paymentRef: string;
  amount: string;
  paymentMethod: string;
  cardScheme: string;
  status: TransactionStatus;
};
export function isMerchant(data: unknown): data is Merchant {
  if (typeof data !== "object" || data === null) {
    console.log("❌ isMerchant failed: data is not a non-null object");
    return false;
  }

  const merchant = data as Record<string, any>;
  const emails = merchant.emails;
  const address = merchant.address;
  const keys = merchant.keys;

  if (
    typeof emails !== "object" ||
    emails === null ||
    typeof address !== "object" ||
    address === null ||
    typeof keys !== "object" ||
    keys === null
  ) {
    console.log(
      "❌ isMerchant failed: Missing or invalid sub-objects (emails, address, or keys)",
    );
    return false;
  }

  const checks: Record<string, boolean> = {
    "merchant.ID": typeof merchant.ID === "string",
    "merchant.businessName": typeof merchant.businessName === "string",
    "merchant.businessNumber": typeof merchant.businessNumber === "number",
    "merchant.emails sub-keys": [
      "contactEmail",
      "supportEmail",
      "disputeEmail",
      "personalEmail",
    ].every((key) => typeof emails[key] === "string" || emails[key] === null),
    "merchant.emails.businessEmail": typeof emails.businessEmail === "string",
    "merchant.phone": typeof merchant.phone === "number",
    "merchant.website":
      typeof merchant.website === "string" || merchant.website === null,
    "merchant.bank":
      typeof merchant.bank === "string" || merchant.bank === null,
    "merchant.accountNumber":
      typeof merchant.accountNumber === "number" ||
      merchant.accountNumber === null,
    "merchant.address.address1":
      typeof address.address1 === "string" || address.address1 === null,
    "merchant.address.address2":
      typeof address.address2 === "string" || address.address2 === null,
    "merchant.sector":
      typeof merchant.sector === "string" || merchant.sector === null,
    "merchant.state":
      typeof merchant.state === "string" || merchant.state === null,
    "merchant.lga": typeof merchant.lga === "string" || merchant.lga === null,
    "merchant.city":
      typeof merchant.city === "string" || merchant.city === null,
    "merchant.country":
      typeof merchant.country === "string" || merchant.country === null,
    "merchant.fName": typeof merchant.fName === "string",
    "merchant.lName": typeof merchant.lName === "string",
    "merchant.personalPhone":
      typeof merchant.personalPhone === "number" ||
      merchant.personalPhone === null,
    "merchant.altPersonalPhone":
      typeof merchant.altPersonalPhone === "number" ||
      merchant.altPersonalPhone === null,
    "merchant.companyLogo":
      typeof merchant.companyLogo === "string" || merchant.companyLogo === null,
    "merchant.keys.test": typeof keys.test === "number",
    "merchant.keys.life": typeof keys.life === "number",
    "merchant.status": ["Active", "Inactive", "New"].includes(merchant.status),
    "merchant.createdAt": typeof merchant.createdAt === "string",
    "merchant.isKYCComplete": typeof merchant.isKYCComplete === "boolean",
    "merchant.isActive": typeof merchant.isActive === "boolean",
  };

  // Find and log the first property that evaluates to false
  const failedCheck = Object.keys(checks).find((key) => !checks[key]);

  if (failedCheck) {
    let receivedValue: any;
    if (failedCheck.startsWith("merchant.emails.")) {
      receivedValue = emails[failedCheck.replace("merchant.emails.", "")];
    } else if (failedCheck.startsWith("merchant.address.")) {
      receivedValue = address[failedCheck.replace("merchant.address.", "")];
    } else if (failedCheck.startsWith("merchant.keys.")) {
      receivedValue = keys[failedCheck.replace("merchant.keys.", "")];
    } else {
      receivedValue = merchant[failedCheck.replace("merchant.", "")];
    }

    console.log(
      `❌ isMerchant failed at: [${failedCheck}]. Value received:`,
      receivedValue,
    );
    return false;
  }

  return true;
}
export function isCustomer(data: unknown): data is Customer {
  if (typeof data !== "object" || data === null) {
    console.log("❌ Failed at: root object check");
    return false;
  }

  const customer = data as Record<string, any>;
  const merchant = customer.merchant;
  const phones = customer.phones;
  const address = customer.address;

  if (typeof phones !== "object" || phones === null) {
    console.log("❌ Failed at: phones object check");
    return false;
  }

  if (typeof address !== "object" || address === null) {
    console.log("❌ Failed at: address object check");
    return false;
  }

  const checks: Record<string, boolean> = {
    fName: typeof customer.fName === "string",
    lName: typeof customer.lName === "string",
    email: typeof customer.email === "string",
    active: typeof customer.active === "boolean",
    merchant: isLinkedMerchant(merchant),
    "phones.main": typeof phones.main === "number",
    "phones.alternate":
      typeof phones.alternate === "number" || phones.alternate === null,
    "address.address1": typeof address.address1 === "string",
    "address.address2":
      typeof address.address2 === "string" || address.address2 === null,
  };

  const failedCheck = Object.keys(checks).find((key) => !checks[key]);
  if (failedCheck) {
    let valueReceived: any;

    if (failedCheck.startsWith("phones.")) {
      valueReceived = phones[failedCheck.split(".")[1]];
    } else if (failedCheck.startsWith("address.")) {
      valueReceived = address[failedCheck.split(".")[1]];
    } else {
      valueReceived = customer[failedCheck];
    }

    console.log(
      `❌ Type guard failed at key: [${failedCheck}]. Value received:`,
      valueReceived,
    );
    return false;
  }

  return true;
}
export function isTransaction(data: unknown): data is Transaction {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const transaction = data as Record<string, unknown>;

  return (
    isLinkedMerchant(transaction.merchant) &&
    typeof transaction.paymentRef === "string" &&
    typeof transaction.amount === "string" &&
    typeof transaction.paymentMethod === "string" &&
    typeof transaction.cardScheme === "string" &&
    ["successful", "failed", "pending"].includes(transaction.status as string)
  );
}

function isLinkedMerchant(data: unknown): data is LinkedMerchant {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const merchant = data as Record<string, unknown>;

  return (
    typeof merchant.ID === "string" &&
    typeof merchant.fName === "string" &&
    typeof merchant.lName === "string"
  );
}

export type DisputeFilter = Pick<
  Dispute,
  | "status"
  | "createdAt"
  | "due"
  | "customerEmail"
  | "paymentRef"
  | "transactionStatus"
>;

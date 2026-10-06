// "JAZ-688E62"
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Customer,
  Dispute,
  DisputeFilter,
  Settlement,
  SettlementFilter,
  Transaction,
  TransactionFilter,
  UserCreationData,
} from "../lib/types";
import { useUser } from "../context/user";
export const useMerchant = (id: string) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerCount, setCustomerCount] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    async function loadCustomer() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/assets/data/customers.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: Customer[] = await response.json();
        setCustomers(data.filter((cus) => cus.merchant.ID === id));
        setCustomerCount(data.filter((cus) => cus.merchant.ID === id).length);
      } catch (error) {
        console.error(error);
        setError(
          `We encountered a bit of a snuggle fetching customer data for you...${error}`,
        );
      } finally {
        setLoading(false);
      }
    }
    async function loadDisputes() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/assets/data/disputes.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: Dispute[] = await response.json();
        setDisputes(data.filter((cus) => cus.merchant.ID === id));
      } catch (error) {
        console.error(error);
        setError(
          `We encountered a bit of a snuggle fetching customer data for you...${error}`,
        );
      } finally {
        setLoading(false);
      }
    }
    async function loadSettlements() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/assets/data/settlements.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: Settlement[] = await response.json();
        setSettlements(data.filter((cus) => cus.merchant.ID === id));
      } catch (error) {
        console.error(error);
        setError(
          `We encountered a bit of a snuggle fetching customer data for you...${error}`,
        );
      } finally {
        setLoading(false);
      }
    }
    async function loadTransactions() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/assets/data/transaction.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: Transaction[] = await response.json();
        setTransactions(data.filter((cus) => cus.merchant.ID === id));
      } catch (error) {
        console.error(error);
        setError(
          `We encountered a bit of a snuggle fetching customer data for you...${error}`,
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
    loadDisputes();
    loadSettlements();
    loadTransactions();
  }, [id]);

  const handleCustomerSearch = (query: string): Customer[] => {
    if (query.trim().length === 0) return customers;

    // search by name
    const results = customers.filter(
      (cus) => cus.fName.includes(query) || cus.lName.includes(query),
    );

    if (results.length === 0) {
      const byMail = customers.filter((cus) => cus.email.includes(query));

      if (byMail.length === 0) {
        setError("No results were found for this query");
        return [];
      }
      return byMail;
    } else {
      return results;
    }
  };

  const handleDisputeSearch = useCallback(
    (filter: DisputeFilter): Dispute[] => {
      return disputes.filter((dispute) => {
        if (id !== dispute.merchant.ID) return false;

        if (filter.status && dispute.status !== filter.status) return false;
        if (
          filter.transactionStatus &&
          dispute.transactionStatus !== filter.transactionStatus
        )
          return false;

        if (filter.paymentRef) {
          const query = filter.paymentRef.trim().toLowerCase();
          if (!dispute.paymentRef.trim().toLowerCase().includes(query))
            return false;
        }
        if (filter.start) {
          if (
            new Date(dispute.createdAt).getTime() <
            new Date(filter.start).getTime()
          )
            return false;
        }

        if (filter.due) {
          if (new Date(dispute.due).getTime() > new Date(filter.due).getTime())
            return false;
        }

        return true;
      });
    },
    [disputes, id],
  );

  const handleSettlementSearch = useCallback(
    (query: SettlementFilter): Settlement[] => {
      return settlements.filter((settlement) => {
        // you're trying to search for something that's not there
        if (id !== settlement.merchant.ID) return false;
        if (query.name) {
          const search = query.name.trim().toLowerCase();
          if (!settlement.accountName.trim().toLowerCase().includes(search))
            return false;
        }
        if (query.from) {
          if (
            new Date(settlement.createdAt).getTime() <
            new Date(query.from).getTime()
          )
            return false;
        }

        if (query.to) {
          if (new Date(settlement.due).getTime() > new Date(query.to).getTime())
            return false;
        }

        return true;
      });
    },
    [settlements, id],
  );
  const handleTransactionSearch = (
    filter: TransactionFilter,
  ): Transaction[] => {
    return transactions.filter((transaction) => {
      if (id !== transaction.merchant.ID) return false;

      // payment method
      if (filter.paymentMtd) {
        const query = filter.paymentMtd.trim().toLowerCase();
        if (!transaction.paymentMethod.trim().toLowerCase().includes(query))
          return false;
      }
      // payment reference
      if (filter.paymentRef) {
        const query = filter.paymentRef.trim().toLowerCase();
        if (!transaction.paymentRef.trim().toLowerCase().includes(query))
          return false;
      }
      // check if start range started before transaction date
      if (filter.start) {
        if (
          new Date(transaction.createdAt).getTime() <
          new Date(filter.start).getTime()
        )
          return false;
      }
      // check if end range ended after transaction date
      if (filter.due) {
        if (
          new Date(transaction.due).getTime() > new Date(filter.due).getTime()
        )
          return false;
      }
    });
  };
  const createUser = (userData: UserCreationData): boolean => {
    if (user!.role === "admin") return false;
    const customer: Customer = {
      merchant: {
        ID: user!.profile.ID,
        fName: user!.profile.fName,
        lName: user!.profile.lName,
      },
      fName: userData.fName,
      lName: userData.lName,
      email: userData.email,
      phones: {
        main: userData.phone.main,
        alternate: userData.phone.alt ?? null,
      },
      active: false,
      address: {
        address1: "",
        address2: null,
      },
    };
    setCustomers((prev) => [...prev, customer]);
    return true;
  };
  return {
    customers,
    error,
    loading,
    customerCount,
    handleCustomerSearch,
    handleDisputeSearch,
    disputes,
    settlements,
    transactions,
    handleSettlementSearch,
    handleTransactionSearch,
    createUser,
  };
};

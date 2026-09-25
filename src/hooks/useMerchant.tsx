// "JAZ-688E62"
import { useEffect, useState } from "react";
import type {
  Customer,
  Dispute,
  DisputeFilter,
  Settlement,
  Transaction,
} from "../lib/types";
export const useMerchant = (id: string) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerCount, setCustomerCount] = useState(0);

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
        console.log(data);
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

  const handleDisputeSearch = (query: DisputeFilter): Dispute[] => {
    return disputes.filter((dispute) => {
      const matchesPaymentReference =
        query.paymentRef.length === 0 ||
        dispute.paymentRef
          .toLowerCase()
          .includes(query.paymentRef.toLowerCase());
      const matchesCustomerEmail =
        query.customerEmail.length === 0 ||
        dispute.customerEmail
          .toLowerCase()
          .includes(query.customerEmail.toLowerCase());
      const matchesStatus =
        query.status.length === 0 || dispute.status === query.status;
      const matchesTransactionStatus =
        query.transactionStatus.length === 0 ||
        dispute.transactionStatus === query.transactionStatus;
      const matchesCreatedAt =
        query.createdAt.length === 0 || dispute.createdAt >= query.createdAt;
      const matchesDue = query.due.length === 0 || dispute.due <= query.due;

      return (
        matchesPaymentReference &&
        matchesCustomerEmail &&
        matchesStatus &&
        matchesTransactionStatus &&
        matchesCreatedAt &&
        matchesDue
      );
    });
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
  };
};

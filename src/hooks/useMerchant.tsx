// "JAZ-688E62"
import { useEffect, useState } from "react";
import type { Customer, Dispute, Settlement, Transaction } from "../lib/types";
import { useUser } from "../context/user";
import { Profile } from "./../components/profile/profile";
export const useMerchant = (id: string) => {
  const { user } = useUser();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerCount, setCustomerCount] = useState(0);
  const [searchResult, setSearchResult] = useState<
    Customer[] | Dispute[] | Settlement[] | Transaction[]
  >([]);
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
        console.log(data);
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
    loadCustomer();
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
  return { customers, error, loading, customerCount, handleCustomerSearch };
};

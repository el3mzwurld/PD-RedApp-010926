import { useEffect, useState } from "react";
import type {
  Dispute,
  DisputeFilter,
  Merchant,
  Settlement,
  Transaction,
} from "../lib/types";

export function useAdmin(role: "merchant" | "admin", id?: string) {
  const [adminDisputes, setAdminDisputes] = useState<Dispute[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [adminSettlements, setAdminSettlements] = useState<Settlement[]>([]);
  const [adminTransactions, setAdminTransactions] = useState<Transaction[]>([]);
  const [myMerchants, setMyMerchants] = useState<Merchant["ID"][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (role === "merchant") return;

    async function loadDisputes() {
      setError(null);
      try {
        const response = await fetch("/assets/data/disputes.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: typeof adminDisputes = await response.json();
        setAdminDisputes(data);
      } catch (error) {
        console.error(error);
        setError(
          `We were unable to fetch this resource due to server downtime...we're trying to resolve this.`,
        );
      }
    }
    async function loadMerchants() {
      setError(null);
      try {
        const response = await fetch("/assets/data/merchants.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: Merchant[] = await response.json();
        setMerchants(data);
      } catch (error) {
        console.error(error);
        setError(
          `We were unable to fetch this resource due to server downtime...we're trying to resolve this.`,
        );
      }
    }
    async function loadSettlements() {
      setError(null);
      try {
        const response = await fetch("/assets/data/settlements.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: Settlement[] = await response.json();
        setAdminSettlements(data);
      } catch (error) {
        console.error(error);
        setError(
          `We were unable to fetch this resource due to server downtime...we're trying to resolve this.`,
        );
      }
    }
    async function loadTransactions() {
      setError(null);
      try {
        const response = await fetch("/assets/data/transaction.json");
        if (!response.ok)
          throw new Error(
            `Failed to fetch data, status code: ${response.status}`,
          );

        const data: Transaction[] = await response.json();
        setAdminTransactions(data);
      } catch (error) {
        console.error(error);
        setError(
          `We were unable to fetch this resource due to server downtime...we're trying to resolve this.`,
        );
      }
    }
    loadDisputes();
    loadMerchants();
    loadSettlements();
    loadTransactions();
  }, [role]);

  useEffect(() => {
    if (merchants.length === 0) return;

    const loadMyMerchants = () => {
      const IDs = merchants.map((m) => m.ID);

      setMyMerchants(IDs);
    };

    loadMyMerchants();
  }, [merchants]);

  const searchDisputes = (dispute: DisputeFilter) => {};
  return {
    adminDisputes,
    error,
    merchants,
    adminSettlements,
    adminTransactions,
    myMerchants,
  };
}

import { useEffect, useState } from "react";
import type { Dispute, Merchant } from "../lib/types";

export function useAdmin(role: "merchant" | "admin", id?: string) {
  const [adminDisputes, setAdminDisputes] = useState<Dispute[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
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
    loadDisputes();
    loadMerchants();
  }, [role]);

  return {
    adminDisputes,
    error,
    merchants,
  };
}

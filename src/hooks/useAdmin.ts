import { useCallback, useEffect, useState } from "react";
import type {
  AdminRole,
  Dispute,
  DisputeFilter,
  Merchant,
  Settlement,
  SettlementFilter,
  Transaction,
  TransactionFilter,
} from "../lib/types";
import axios from "axios";
export function useAdmin(role: "merchant" | "admin") {
  const [adminDisputes, setAdminDisputes] = useState<Dispute[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [adminSettlements, setAdminSettlements] = useState<Settlement[]>([]);
  const [adminTransactions, setAdminTransactions] = useState<Transaction[]>([]);
  const [myMerchants, setMyMerchants] = useState<Merchant["ID"][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<AdminRole["permission"][]>([]);
  const [roles, setRoles] = useState<AdminRole[]>([]);
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

  useEffect(() => {
    const loadPermissions = async () => {
      if (role !== "admin") return;
      setError(null);
      try {
        const { data } = await axios.get<Array<AdminRole["permission"]>>(
          "/assets/data/permissions.json",
        );
        console.log(data);
        setPermissions(data);
      } catch (error) {
        setError(`${error}`);
      }
    };

    void loadPermissions();
  }, [role]);

  const handleDisputeSearch = useCallback(
    (filter: DisputeFilter): Dispute[] => {
      if (!filter.merchantID) return adminDisputes;
      return adminDisputes.filter((dispute) => {
        if (filter.merchantID !== dispute.merchant.ID) return false;

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
    [adminDisputes],
  );
  const handleSettlementSearch = useCallback(
    (filter: SettlementFilter): Settlement[] => {
      if (!filter.merchantID) return adminSettlements;

      return adminSettlements.filter((settlement) => {
        if (filter.merchantID !== settlement.merchant.ID) return false;

        if (filter.name) {
          const search = filter.name.trim().toLowerCase();
          if (!settlement.accountName.trim().toLowerCase().includes(search))
            return false;
        }
        if (filter.from) {
          if (
            new Date(settlement.createdAt).getTime() <
            new Date(filter.from).getTime()
          )
            return false;
        }

        if (filter.to) {
          if (
            new Date(settlement.due).getTime() > new Date(filter.to).getTime()
          )
            return false;
        }

        return true;
      });
    },
    [adminSettlements],
  );
  const handleTransactionSearch = useCallback(
    (filter: TransactionFilter): Transaction[] => {
      if (!filter.merchantID) return adminTransactions;

      return adminTransactions.filter((transaction) => {
        if (filter.merchantID !== transaction.merchant.ID) return false;

        if (filter.paymentMtd) {
          const query = filter.paymentMtd.trim().toLowerCase();
          if (!transaction.paymentMethod.trim().toLowerCase().includes(query))
            return false;
        }
        if (filter.paymentRef) {
          const query = filter.paymentRef.trim().toLowerCase();
          if (!transaction.paymentRef.trim().toLowerCase().includes(query))
            return false;
        }
        if (
          filter.start &&
          new Date(transaction.createdAt).getTime() <
            new Date(filter.start).getTime()
        )
          return false;
        if (
          filter.due &&
          new Date(transaction.due).getTime() > new Date(filter.due).getTime()
        )
          return false;

        return true;
      });
    },
    [adminTransactions],
  );
  const handleMerchantSearch = (filter: {
    merchantID: string;
    status?: Merchant["status"];
  }): Merchant[] => {
    return merchants.filter((merchant) => {
      if (filter.merchantID !== merchant.ID) return false;
      if (filter.status && merchant.status !== filter.status) return false;

      return true;
    });
  };

  const createRole = (permission: (typeof permissions)[0], name: string) => {
    const date = new Date().toUTCString();
    const role: AdminRole = {
      name: name,
      permission,
      createdAt: date,
    };

    setRoles((prev) => [...prev, role]);
  };

  return {
    adminDisputes,
    error,
    merchants,
    adminSettlements,
    adminTransactions,
    myMerchants,
    handleDisputeSearch,
    handleSettlementSearch,
    handleTransactionSearch,
    handleMerchantSearch,
    permissions,
    createRole,
    roles,
  };
}

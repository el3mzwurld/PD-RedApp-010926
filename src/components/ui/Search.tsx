import { Button, Stack } from "@mui/material";
import type React from "react";
import { useState } from "react";
import type {
  Dispute,
  DisputeFilter,
  SettlementStatus,
  Transaction,
  TransactionStatus,
} from "../../lib/types";
import { useAdmin } from "../../hooks/useAdmin";

interface SearchProps {
  onSubmit: (filter: string) => void;
  mode:
    | "default"
    | "settlement"
    | "disputes"
    | "transaction"
    | "users"
    | "merchant management"
    | "settings";
  role: "merchant" | "admin";
}

interface AdminDisputeFilter {
  merchantID: string;
  transactionStatus: TransactionStatus;
  paymentRef: string;
  startDate: string;
  endDate: string;
}
type UserStatus = "new" | "inactive" | "active";

type PaymentMtd = "Card" | "Bank Transfer";
export const Search = ({ onSubmit, mode, role }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [disputeStatus, setDisputeStatus] = useState<Dispute["status"] | null>(
    null,
  );
  const [status, setStatus] = useState<SettlementStatus | null>(null);
  const [settlementSearchParams, setSettlementSearchParams] = useState("");
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMtd | null>(null);
  const [refNumber, setRefNumber] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [email, setEmail] = useState("");
  const [merchantID, setMerchantID] = useState<string>("");
  const [userStatus, setUserStatus] = useState<UserStatus | null>();
  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    onSubmit(query);
  };
  const submitDispute = () => {
    const disputeFilter: DisputeFilter = {
      paymentRef: paymentRef,
      customerEmail,
      status: disputeStatus ?? "Open",
      createdAt: startDate,
      due: endDate,
      transactionStatus: transactionStatus ?? "pending",
    };

    const filter = JSON.stringify(disputeFilter);

    onSubmit(filter);
  };
  const submitTransaction = () => {
    const transactionFilter: Partial<Transaction> = {
      paymentRef: refNumber ?? undefined,
      paymentMethod: paymentMethod ?? "Card",
      status: transactionStatus ?? "pending",
      customerEmail: customerEmail,
    };

    const filter = JSON.stringify(transactionFilter);
    onSubmit(filter);
  };
  const adminSubmitDispute = () => {
    const dispute: AdminDisputeFilter = {
      startDate,
      endDate,
      merchantID: merchantID,
      paymentRef: paymentRef,
      transactionStatus: transactionStatus ?? "pending",
    };

    const filter = JSON.stringify(dispute);

    onSubmit(filter);
  };

  const { myMerchants } = useAdmin(role);
  return (
    <>
      {mode === "default" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{ width: "auto", height: 55, gap: 3.5, alignItems: "end" }}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 10,
            }}
          >
            <label>Customer Name/Email</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 5.5,
                paddingRight: 2.2,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
              }}
              type="text"
              placeholder="Customer name/Email"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSubmit(e);
              }}
            ></input>
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 150,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 25,
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "disputes" && role === "merchant" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Start Date</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={startDate}
              required
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          {/* end date */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>End Date</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={endDate}
              required
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>
          {/* payment reference */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Payment Reference</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="text"
              value={paymentRef}
              required
              onChange={(e) => setPaymentRef(e.target.value)}
            ></input>
          </div>
          {/* email */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Customer Email</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="email"
              value={customerEmail}
              required
              onChange={(e) => setCustomerEmail(e.target.value)}
            ></input>
          </div>
          {/* dispute status */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Dispute Status</label>
            <select
              value={disputeStatus}
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              onChange={(e) => {
                setDisputeStatus(e.target.value as typeof disputeStatus);
              }}
            >
              <option value={"Open"}>All</option>
              <option value={"Accepted"}>Accepted</option>
              <option value={"Declined"}>Rejected</option>
              <option value={"Fully Declined"}>Fully Rejected</option>
              <option value={"Fully Accepted"}>Fully Accepted</option>
            </select>
          </div>
          {/* status */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Status</label>
            <select
              value={status}
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              onChange={(e) => {
                setStatus(e.target.value as typeof status);
              }}
            >
              <option selected hidden>
                All
              </option>
              <option value={"open"}>Open</option>
              <option value={"successful"}>Successful</option>
              <option value={"disputed"}>Disputes</option>
              <option value={"failed"}>Failed</option>
            </select>
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 150,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 25,
            }}
            onClick={(e) => {
              e.preventDefault();
              submitDispute();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "settlement" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          {/* settlement search parameters*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Search By</label>
            <input
              style={{
                width: 250,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid gray",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="text"
              value={settlementSearchParams}
              required
              onChange={(e) => setSettlementSearchParams(e.target.value)}
            ></input>
          </div>
          {/* from  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>From</label>
            <input
              className="blank-date"
              style={{
                width: 250,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid gray",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={startDate}
              required
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          {/* end date */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>End Date</label>
            <input
              className="blank-date"
              style={{
                width: 180,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid gray",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={endDate}
              required
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 150,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 25,
            }}
            onClick={(e) => {
              e.preventDefault();
              submitDispute();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "transaction" && role !== "admin" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          {/* transaction status */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Transaction Status</label>
            <select
              value={transactionStatus}
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              onChange={(e) => {
                setTransactionStatus(e.target.value as TransactionStatus);
              }}
            >
              <option value={"Successful"}>Successful</option>
              <option value={"Failed"}>Failed</option>
              <option value={"Pending"}>Pending</option>
              <option value={"Processing"}>Processing</option>
            </select>
          </div>
          {/* Payment Method */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              onChange={(e) => {
                setPaymentMethod(e.target.value as PaymentMethod);
              }}
            >
              <option value={"Card"}>Card</option>
              <option value={"Bank Transfer"}>Bank Transfer</option>
            </select>
          </div>
          {/* Reference Number*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Reference Number</label>
            <input
              style={{
                width: 290,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid gray",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="text"
              value={refNumber}
              required
              onChange={(e) => setRefNumber(e.target.value)}
            ></input>
          </div>
          {/* from  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>From</label>
            <input
              className="blank-date"
              style={{
                width: 230,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid gray",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={startDate}
              required
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          {/* end date */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>End Date</label>
            <input
              className="blank-date"
              style={{
                width: 230,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid gray",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={endDate}
              required
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 150,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 25,
            }}
            onClick={(e) => {
              e.preventDefault();
              submitTransaction();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "users" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 15,
            }}
          >
            <label>First Name</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 12.5,
                paddingRight: 2.2,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
              }}
              type="text"
              placeholder="First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            ></input>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 15,
            }}
          >
            <label>Last Name</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 12.5,
                paddingRight: 2.2,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
              }}
              type="text"
              placeholder="Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            ></input>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 15,
            }}
          >
            <label>Mobile Number</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 12.5,
                paddingRight: 2.2,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
              }}
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 15,
            }}
          >
            <label>Alternate Mobile Number</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 12.5,
                paddingRight: 2.2,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
              }}
              type="tel"
              placeholder="Alternate Mobile Phone"
              value={altPhone}
              onChange={(e) => setAltPhone(e.target.value)}
            ></input>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 15,
            }}
          >
            <label>Email Address</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 12.5,
                paddingRight: 2.2,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
              }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 150,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 25,
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "disputes" && role === "admin" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          {/* merchant ID */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Filter by</label>
            <select
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              value={merchantID}
              onChange={(e) => setMerchantID(e.target.value)}
            >
              <option defaultChecked>Merchant ID</option>
              {myMerchants.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          {/* payment reference */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Payment Reference</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="text"
              value={paymentRef}
              onChange={(e) => setPaymentRef(e.target.value)}
            ></input>
          </div>
          {/* transaction status */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Transaction Status</label>
            <select
              value={transactionStatus}
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              onChange={(e) => {
                setTransactionStatus(e.target.value as TransactionStatus);
              }}
            >
              <option disabled hidden selected>
                Transaction Status
              </option>
              <option value={"Successful"}>Successful</option>
              <option value={"Failed"}>Failed</option>
              <option value={"Pending"}>Pending</option>
              <option value={"Processing"}>Processing</option>
            </select>
          </div>
          {/* start date */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Start Date</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={startDate}
              required
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          {/* end date */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>End Date</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              type="date"
              value={endDate}
              required
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 180,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 20,
            }}
            onClick={(e) => {
              e.preventDefault();
              adminSubmitDispute();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "merchant management" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          {/* merchant ID */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Merchant</label>
            <select
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
                color: "gray",
              }}
              value={merchantID}
              onChange={(e) => setMerchantID(e.target.value)}
            >
              <option disabled selected hidden>
                Search by merchant ID
              </option>
              {myMerchants.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          {/* User status */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Status</label>
            <select
              value={userStatus ?? ""}
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              onChange={(e) => {
                setUserStatus(e.target.value as UserStatus);
              }}
            >
              <option disabled hidden selected>
                Please select an option...
              </option>
              <option value={"Successful"}>New</option>
              <option value={"Failed"}>Active</option>
              <option value={"Pending"}>Inactive</option>
            </select>
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 180,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 20,
            }}
            onClick={(e) => {
              e.preventDefault();
              adminSubmitDispute();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "transaction" && role === "admin" && (
        <Stack
          component={"form"}
          direction={"column"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "auto",
              height: "auto",
              gap: 3.5,
              alignItems: "end",
              flexWrap: "wrap",
              display: "flex",
              justifyContent: "space-between",
              rowGap: 30,
              padding: 10,
            }}
          >
            {/* merchant ID */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 12,
                gap: 5,
              }}
            >
              <label>Merchant ID</label>
              <select
                style={{
                  width: 200,
                  height: 55,
                  padding: 1.8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  borderRadius: 10,
                  border: "2px solid lightgrey",
                  cursor: "pointer",
                  fontFamily: "poppins",
                }}
                value={merchantID}
                onChange={(e) => setMerchantID(e.target.value)}
              >
                <option disabled selected hidden>
                  Merchant ID
                </option>
              </select>
            </div>
            {/* transaction status */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 12,
                gap: 5,
              }}
            >
              <label>Transaction Status</label>
              <select
                value={transactionStatus}
                style={{
                  width: 200,
                  height: 55,
                  padding: 1.8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  borderRadius: 10,
                  border: "2px solid lightgrey",
                  cursor: "pointer",
                  fontFamily: "poppins",
                }}
                onChange={(e) => {
                  setTransactionStatus(e.target.value as TransactionStatus);
                }}
              >
                <option value={"Successful"}>Successful</option>
                <option value={"Failed"}>Failed</option>
                <option value={"Pending"}>Pending</option>
                <option value={"Processing"}>Processing</option>
              </select>
            </div>
            {/* Payment Method */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 12,
                gap: 5,
              }}
            >
              <label>Payment Method</label>
              <select
                value={paymentMethod}
                style={{
                  width: 190,
                  height: 55,
                  padding: 1.8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  borderRadius: 10,
                  border: "2px solid lightgrey",
                  cursor: "pointer",
                  fontFamily: "poppins",
                }}
                onChange={(e) => {
                  setPaymentMethod(e.target.value as PaymentMethod);
                }}
              >
                <option value={"Card"}>Card</option>
                <option value={"Bank Transfer"}>Bank Transfer</option>
              </select>
            </div>
            {/* Reference Number*/}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 12,
                gap: 5,
              }}
            >
              <label>Payment Reference</label>
              <input
                style={{
                  width: 190,
                  height: 55,
                  padding: 1.8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  borderRadius: 10,
                  border: "2px solid gray",
                  cursor: "pointer",
                  fontFamily: "poppins",
                }}
                type="text"
                value={refNumber}
                required
                onChange={(e) => setRefNumber(e.target.value)}
              ></input>
            </div>
            {/* from  */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 12,
                gap: 5,
              }}
            >
              <label>From</label>
              <input
                className="blank-date"
                style={{
                  width: 230,
                  height: 55,
                  padding: 1.8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  borderRadius: 10,
                  border: "2px solid gray",
                  cursor: "pointer",
                  fontFamily: "poppins",
                }}
                type="date"
                value={startDate}
                required
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
            {/* end date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 12,
                gap: 5,
              }}
            >
              <label>End Date</label>
              <input
                className="blank-date"
                style={{
                  width: 230,
                  height: 55,
                  padding: 1.8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  borderRadius: 10,
                  border: "2px solid gray",
                  cursor: "pointer",
                  fontFamily: "poppins",
                }}
                type="date"
                value={endDate}
                required
                onChange={(e) => setEndDate(e.target.value)}
              ></input>
            </div>
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 150,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 25,
            }}
            onClick={(e) => {
              e.preventDefault();
              submitTransaction();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
      {mode === "settings" && (
        <Stack
          component={"form"}
          direction={"row"}
          sx={{
            width: "auto",
            height: "auto",
            gap: 3.5,
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          {/* merchant ID */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Email</label>
            <input
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
                color: "lightgray",
              }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          {/* User status */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
              gap: 5,
            }}
          >
            <label>Roles</label>
            <select
              value={""}
              style={{
                width: 270,
                height: 55,
                padding: 1.8,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "2px solid lightgrey",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
            >
              <option hidden selected>
                Please select an option
              </option>
              <option value={"admin-1"}>Admin-1</option>
              <option value={"admin-1"}>Admin-2</option>
              <option value={"admin-3"}>Admin-3</option>
              <option value={"admin-4"}>Admin-4</option>
            </select>
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 180,
              p: 1.25,
              px: 5,
              fontSize: 12,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 20,
            }}
            onClick={(e) => {
              e.preventDefault();
              adminSubmitDispute();
            }}
          >
            Search
          </Button>
        </Stack>
      )}
    </>
  );
};

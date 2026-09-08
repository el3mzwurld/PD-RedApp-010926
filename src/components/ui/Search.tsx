import { Button, Stack } from "@mui/material";
import type React from "react";
import { useState } from "react";

interface SearchProps {
  onSubmit: (filter: string) => void;
  mode: "default" | "settlement" | "disputes";
}

type Dispute = {
  start: string;
  due: string;
  paymentRef?: string;
  customerEmail?: string;
  disputeStatus: "all" | "accepted" | "declined";
  resolutionStatus: "all" | "resolved" | "unresolved";
};
export const Search = ({ onSubmit, mode }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [disputeStatus, setDisputeStatus] = useState<
    "all" | "accepted" | "declined"
  >("all");
  const [status, setStatus] = useState<"all" | "resolved" | "unresolved">(
    "all",
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(query);
  };

  const submitDispute = () => {
    const disputeFilter: Dispute = {
      start: startDate,
      due: endDate,
      paymentRef: paymentRef ?? undefined,
      customerEmail: customerEmail ?? undefined,
      disputeStatus,
      resolutionStatus: status,
    };

    const filter = JSON.stringify(disputeFilter);

    onSubmit(filter);
  };
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
              gap: 5,
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
              onChange={(e) => setQuery(e.target.value)}
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
      {mode === "disputes" && (
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
                setDisputeStatus(
                  e.target.value as "all" | "declined" | "accepted",
                );
              }}
            >
              <option value={"all"}>All</option>
              <option value={"accepted"}>Accepted</option>
              <option value={"declined"}>Rejected</option>
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
              <option value={"all"}>All</option>
              <option value={"resolved"}>Resolved</option>
              <option value={"unresolved"}>Unresolved</option>
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
    </>
  );
};

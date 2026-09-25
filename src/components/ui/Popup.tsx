import React, { useState } from "react";
import {
  isCustomer,
  isDispute,
  isMerchant,
  isTransaction,
  type Administrator,
  type Customer,
  type Dispute,
  type Merchant,
  type Transaction,
} from "../../lib/types";
import { Box, Button, Modal, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";
import { InformationContainer } from "./InformationContainer";
import { formatDate } from "../../lib/utils";
import { AcceptanceModal } from "./acceptanceModal";

export const PopupModal = ({
  open,
  data,
  title,
  buttonTitle1,
  options,
  buttonTitle2,
  setOpen,
  mode,
}: {
  open: boolean;
  data: Merchant | Customer | Transaction | Administrator | Dispute;
  buttonTitle1: string;
  title: string;
  options: number;
  buttonTitle2?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode:
    | "disputes"
    | "merchants"
    | "role"
    | "transaction"
    | "role linkage"
    | "customers";
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState<"confirmation" | "success">("confirmation");
  const closeModal = () => {
    setOpenModal(false);
  };

  function handleConfirmation(action: "accept" | "reject") {
    if (action === "reject") {
      closeModal();
      return;
    }

    setStep("success");
  }
  return (
    <div style={{ background: "none" }}>
      <Modal
        open={open}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: "rgba(0, 0, 0, 0.27)" },
          },
        }}
        sx={{ background: "none" }}
      >
        <Box
          sx={{
            width: "70%",
            position: "absolute",
            height: "auto",
            maxHeight: "calc(100vh - 32px)",
            minHeight: 350,
            top: mode !== "merchants" ? "50%" : "30%",
            left: "50%",
            transform:
              mode === "merchants"
                ? "translate(-50%, -30%)"
                : "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxSizing: "border-box",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.5,
            overflowY: "auto",
          }}
        >
          {/* header */}
          <div
            style={{
              width: "100%",
              height: 80,
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              padding: "0px 0px",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "red" }}>{title}</h2>

            {mode === "merchants" && (
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ width: "auto", height: 40 }}
              >
                <Button
                  sx={{
                    width: "auto",
                    px: 3.25,
                    backgroundColor: "primary.main",
                    color: "white",
                    height: "100%",
                    borderRadius: 25,
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  Activate Merchant
                </Button>
                <Button
                  sx={{
                    width: "auto",
                    px: 3.25,
                    backgroundColor: "primary.main",
                    color: "white",
                    height: "100%",
                    borderRadius: 25,
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  De-Activate Merchant
                </Button>
              </Stack>
            )}
            {mode !== "merchants" && (
              <Close
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              />
            )}
            <AcceptanceModal
              onClose={closeModal}
              open={openModal}
              message="Merchant Actioned successfully"
            />
          </div>
          {/* body */}
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "start",
              flexWrap: "wrap",
              gap: 5,
            }}
          >
            {mode === "disputes" && isDispute(data) && (
              <>
                <InformationContainer
                  mode="read"
                  name="Merchant ID"
                  content={data.merchant.ID}
                ></InformationContainer>
                <InformationContainer
                  mode="read"
                  name="Merchant Name"
                  content={data.merchant.fName + " " + data.merchant.lName}
                />
                <InformationContainer
                  mode="read"
                  name="Payment Reference"
                  content={data.paymentRef}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Transaction Amount"
                  content={data.amount}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Payment Method"
                  content={data.paymentMtd}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Card Scheme"
                  content={data.cardScheme}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Date Created"
                  content={formatDate(data.createdAt)}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Due date"
                  content={formatDate(data.due)}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Transaction Status"
                  content={
                    data.transactionStatus.charAt(0).toUpperCase() +
                    data.transactionStatus.slice(1)
                  }
                />
              </>
            )}
            {mode === "merchants" && isMerchant(data) && (
              <Stack spacing={4.5} sx={{ width: "100%", alignItems: "start" }}>
                <div
                  style={{
                    width: "auto",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 15,
                    color: "red",
                  }}
                >
                  <h3>Company Logo</h3>
                  {/* profile img */}
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: "#A09D9D",
                      borderRadius: "100%",
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: 15,
                    color: "red",
                    fontWeight: 500,
                  }}
                >
                  <h3>Business Information</h3>

                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                      flexWrap: "wrap",
                      flex: 1,
                      height: "auto",
                      rowGap: 4.5,
                      alignItems: "start",
                      justifyContent: "start",
                      columnGap: 2.5,
                      width: "100%",
                    }}
                  >
                    <InformationContainer
                      mode="read"
                      name="Business Name"
                      content={data.businessName}
                    />
                    <InformationContainer
                      mode="read"
                      name="Business Number"
                      content={data.ID}
                    />
                    <InformationContainer
                      mode="read"
                      name="Support Email"
                      content={data.emails.supportEmail ?? ""}
                    />
                    <InformationContainer
                      mode="read"
                      name="Dispute Email"
                      content={data.emails.disputeEmail ?? ""}
                    />
                    <InformationContainer
                      mode="read"
                      name="Business Email"
                      content={data.emails.businessEmail}
                    />
                    <InformationContainer
                      mode="read"
                      name="Phone Number"
                      content={String(data.phone)}
                    />
                    <InformationContainer
                      mode="read"
                      name="Website"
                      content={data.website ?? ""}
                    />
                    <InformationContainer
                      mode="read"
                      name="Bank Name"
                      content={data.bank ?? ""}
                    />
                    <InformationContainer
                      mode="read"
                      name="Account Number"
                      content={String(data.accountNumber ?? "")}
                    />
                    <InformationContainer
                      mode="read"
                      name="Address 1"
                      content={data.address.address1 ?? ""}
                    />
                    <InformationContainer
                      mode="read"
                      name="Address 2"
                      content={data.address.address2 ?? ""}
                    />
                    <InformationContainer
                      mode="read"
                      name="Sector/Industry"
                      content={data.sector ?? ""}
                    />
                  </Stack>
                  <InformationContainer
                    mode="read"
                    name="Country"
                    content="Nigeria"
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: 15,
                    color: "red",
                    fontWeight: 500,
                  }}
                >
                  <h3>Contact Information</h3>

                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                      flexWrap: "wrap",
                      flex: 1,
                      height: "auto",
                      rowGap: 4.5,
                      alignItems: "start",
                      justifyContent: "start",
                      columnGap: 2.5,
                      width: "100%",
                    }}
                  >
                    <InformationContainer
                      mode="read"
                      name="First Name"
                      content={data.fName}
                    />
                    <InformationContainer
                      mode="read"
                      name="Last Name"
                      content={data.lName}
                    />
                    <InformationContainer
                      mode="read"
                      name="Mobile Number"
                      content={String(data.personalPhone ?? "")}
                    />
                    <InformationContainer
                      mode="read"
                      name="Alternate Mobile Number"
                      content={String(data.altPersonalPhone ?? "")}
                    />
                    <InformationContainer
                      mode="read"
                      name="Email Address"
                      content={data.emails.personalEmail ?? ""}
                    />
                  </Stack>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: 15,
                    color: "red",
                    fontWeight: 500,
                  }}
                >
                  <h3>KYC Documents</h3>

                  <Stack spacing={2.5} sx={{ width: "100%" }}>
                    {["jumia-cac-documents.pdf", "jumia-mandate.png"].map(
                      (documentName) => (
                        <Stack
                          key={documentName}
                          direction="row"
                          spacing={3}
                          sx={{
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: "50%",
                              minHeight: 56,
                              px: 3.5,
                              display: "flex",
                              alignItems: "center",
                              bgcolor: "#d1d1d1",
                              borderRadius: 1,
                              color: "#888",
                              fontSize: 12,
                            }}
                          >
                            {documentName}
                          </Box>
                          <Button
                            variant="outlined"
                            sx={{
                              minWidth: 102,
                              borderColor: "red",
                              borderRadius: 8,
                              color: "red",
                              fontSize: 10,
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="text"
                            sx={{
                              color: "red",
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            Download
                          </Button>
                        </Stack>
                      ),
                    )}
                  </Stack>
                </div>
              </Stack>
            )}
            {mode === "transaction" && isTransaction(data) && (
              <>
                <InformationContainer
                  mode="read"
                  name="Merchant ID"
                  content={data.merchant.ID}
                />
                <InformationContainer
                  mode="read"
                  name="Payment Reference"
                  content={data.paymentRef}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Amount"
                  content={data.amount}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Payment Method"
                  content={data.paymentMethod}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Card Scheme"
                  content={data.cardScheme}
                />{" "}
                <InformationContainer
                  mode="read"
                  name="Status"
                  content={data.status}
                />{" "}
              </>
            )}
            {mode === "customers" && isCustomer(data) && (
              <>
                <InformationContainer
                  mode="read"
                  name="First Name"
                  content={data.fName}
                />
                <InformationContainer
                  mode="read"
                  name="Last Name"
                  content={data.lName}
                />
                <InformationContainer
                  mode="read"
                  name="Email Address"
                  content={data.email}
                />
                <InformationContainer
                  mode="read"
                  name="Phone Number"
                  content={data.phones.main}
                />{" "}
                {data.phones.alternate && (
                  <InformationContainer
                    mode="read"
                    name="Alternate Phone"
                    content={data.phones.alternate}
                  />
                )}
                <InformationContainer
                  mode="read"
                  name="Address 1"
                  content={data.address.address1}
                />
                {data.address.address2 && (
                  <InformationContainer
                    mode="read"
                    name="Address 2"
                    content={data.address.address2}
                  />
                )}
              </>
            )}
          </Stack>
          {/* button group */}
          <Stack direction={"row"} spacing={2}>
            {mode === "disputes" && (
              <>
                {" "}
                <Button
                  variant="contained"
                  sx={{
                    px: 3.5,
                    py: 1.25,
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: 25,
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  {buttonTitle1}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    px: 3.5,
                    py: 1.25,
                    color: "red",
                    backgroundColor: "white",
                    borderRadius: 25,
                  }}
                  onClick={() => setOpen(false)}
                >
                  {buttonTitle2}
                </Button>
                <AcceptanceModal
                  onClose={closeModal}
                  open={openModal}
                  message="Accepted successfully"
                />
              </>
            )}
            {mode === "transaction" && (
              <>
                <Button
                  variant="contained"
                  sx={{
                    px: 3.5,
                    py: 1.25,
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: 25,
                  }}
                  onClick={() => {
                    if (buttonTitle1.toLowerCase() === "close") {
                      setOpen(false);
                      return;
                    }

                    setOpenModal(true);
                    return;
                  }}
                >
                  {buttonTitle1}
                </Button>

                <AcceptanceModal
                  onClose={closeModal}
                  open={openModal}
                  message="Disputed successfully"
                />
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

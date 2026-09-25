import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { NavBar } from "../ui/navbar";
import { motion } from "motion/react";
import { InformationContainer } from "../ui/InformationContainer";
import { Search } from "../ui/Search";
import { ArrowDownward } from "@mui/icons-material";
import { useState } from "react";
import { useUser } from "../../context/user";
import { useMerchant } from "../../hooks/useMerchant";
import { useAdmin } from "../../hooks/useAdmin";
import { PopupModal } from "../ui/Popup";

export const Transaction = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const role = user!.role;
  const id = role === "merchant" ? user!.profile.ID : "";
  const { transactions } = useMerchant(id);
  const { adminTransactions } = useAdmin(role);
  const theme = useTheme();
  const handleSubmit = (filter: string) => {};
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        px: { lg: 1 },
        paddingTop: 1.8,
        flex: 1,
        gap: 2.5,
      }}
    >
      <NavBar />
      <Box
        component={"main"}
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 0,
          gap: 2.5,
        }}
      >
        <motion.div
          style={{
            width: "100%",
            justifyContent: "start",
            alignItems: "center",
            padding: "5px 0px",
            gap: "60px",
            display: "flex",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeIn" }}
        >
          <p
            style={{
              cursor: "pointer",
              color: "red",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            Transactions
          </p>
        </motion.div>
        <section
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "lightgray",
            borderRadius: 12,
            padding: "45px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 40,
          }}
        >
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              height: "auto",
              alignItems: "center",
              justifyContent: "start",
              gap: 4.5,
              width: "100%",
              backgroundColor: role === "admin" ? "white" : "none",
              padding: 5,
              borderRadius: 1.5,
            }}
          >
            <Search mode="transaction" onSubmit={handleSubmit} role={role} />
          </Stack>

          <motion.div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 15,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeIn" }}
          >
            {/* list container */}
            <div
              style={{
                width: "100%",
                height: "auto",
                paddingLeft: 22.5,
                paddingRight: 22.5,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: "white",
              }}
            >
              {/* download button */}
              <div
                style={{
                  height: 40,
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <motion.button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: 130,
                    justifyContent: "center",
                    gap: 10,
                    height: "95%",
                    backgroundColor: theme.palette.primary.main,
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: 5,
                    fontWeight: 500,
                  }}
                >
                  <ArrowDownward sx={{ width: 20 }} />
                  Download
                </motion.button>
              </div>

              {/* container */}
              {role === "merchant" && (
                <TableContainer>
                  <Table
                    sx={{
                      width: "100%",
                      height: "auto",
                      padding: { lg: 1.5, xl: 2.5 },
                      borderCollapse: "separate",
                      borderSpacing: "0px 10px",
                    }}
                    aria-description="customers-table"
                  >
                    <TableHead>
                      <TableRow sx={{ border: "none" }}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          S/N
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Merchant ID
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Payment Reference
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Payment Method
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Card Scheme
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Date Created
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Transaction Date
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                          <TableRow
                            key={`${transaction.paymentRef}-${index}`}
                            sx={{ backgroundColor: "#F4F4F4" }}
                          >
                            <TableCell sx={{ textAlign: "center" }}>
                              {index + 1}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.merchant.ID}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.paymentRef}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.amount}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.paymentMethod}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.cardScheme}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              N/A
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              N/A
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <Button
                                variant="text"
                                onClick={() => setOpen((prev) => !prev)}
                              >
                                VIEW
                              </Button>
                            </TableCell>
                            <PopupModal
                              open={open}
                              setOpen={setOpen}
                              data={transaction}
                              buttonTitle1="Dispute"
                              title="Transactions"
                              options={1}
                              key={index}
                              mode="transaction"
                            />
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                          <TableCell colSpan={10} sx={{ textAlign: "center" }}>
                            No transactions available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {role === "admin" && (
                <TableContainer>
                  <Table
                    sx={{
                      width: "100%",
                      height: "auto",
                      padding: { lg: 1.5, xl: 2.5 },
                      borderCollapse: "separate",
                      borderSpacing: "0px 10px",
                    }}
                    aria-description="customers-table"
                  >
                    <TableHead>
                      <TableRow sx={{ border: "none" }}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          S/N
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Merchant ID
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Payment Reference
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Payment Method
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Card Scheme
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Date Created
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Transaction Date
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminTransactions.length > 0 ? (
                        adminTransactions.map((transaction, index) => (
                          <TableRow
                            key={`${transaction.paymentRef}-${index}`}
                            sx={{ backgroundColor: "#F4F4F4" }}
                          >
                            <TableCell sx={{ textAlign: "center" }}>
                              {index + 1}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.merchant.ID}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.paymentRef}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.amount}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.paymentMethod}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.cardScheme}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              N/A
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              N/A
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <Button
                                variant="text"
                                onClick={() => setOpen((prev) => !prev)}
                              >
                                VIEW
                              </Button>
                            </TableCell>

                            <PopupModal
                              open={open}
                              setOpen={setOpen}
                              data={transaction}
                              buttonTitle1="Dispute"
                              title="Dispute"
                              options={1}
                              key={index}
                              mode="transaction"
                            />
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                          <TableCell colSpan={10} sx={{ textAlign: "center" }}>
                            No transactions available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </motion.div>
        </section>
      </Box>{" "}
    </Box>
  );
};

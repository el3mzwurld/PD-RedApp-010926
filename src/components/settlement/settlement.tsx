import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavBar } from "../ui/navbar";
import { motion } from "motion/react";
import { InformationContainer } from "../ui/InformationContainer";
import { Search } from "../ui/Search";
import { useState } from "react";
import { useUser } from "../../context/user";
import { useMerchant } from "../../hooks/useMerchant";
import { useAdmin } from "../../hooks/useAdmin";

export const Settlement = () => {
  const { user } = useUser();
  const role = user!.role;
  const id = role === "merchant" ? user!.profile.ID : "";
  const { settlements } = useMerchant(id);
  const { adminSettlements } = useAdmin(role);
  const handleSettlementSearch = (query: string) => {};
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
              fontSize: 16,
            }}
          >
            Settlement
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
              flexWrap: "wrap",
              height: "auto",
              rowGap: 4.5,
              alignItems: "start",
              justifyContent: "start",
              columnGap: 2.5,
              width: "100%",
            }}
          >
            {role === "merchant" ? (
              <InformationContainer
                mode="read"
                name="Merchant ID"
                content={user!.profile.ID}
              />
            ) : (
              <InformationContainer mode="edit" name="Merchant ID" content="" />
            )}
          </Stack>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              height: 120,
              alignItems: "center",
              justifyContent: "start",
              gap: 4.5,
              width: "100%",
              px: 5,
              backgroundColor: "white",
              py: { md: 15, xl: 10 },
              boxShadow: "1.5px 1.5px 10px #7876769f",
            }}
          >
            <Search
              mode="settlement"
              role={role}
              onSubmit={handleSettlementSearch}
            />
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
                            textAlign: "left",
                          }}
                        >
                          S/N
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Account Name
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Account Number
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Batch Code
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Currency
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Reference
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {settlements.length !== 0 ? (
                        settlements.map((s, index) => (
                          <TableRow
                            sx={{ backgroundColor: "#F4F4F4" }}
                            key={index}
                          >
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.accountName}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.accountNumber}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.batchCode}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.currency}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.reference}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.status}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                          <TableCell
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            -{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            -
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
                            textAlign: "left",
                          }}
                        >
                          S/N
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Account Name
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Account Number
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Batch Code
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Currency
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Reference
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                          }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminSettlements.length !== 0 ? (
                        adminSettlements.map((s, index) => (
                          <TableRow
                            sx={{ backgroundColor: "#F4F4F4" }}
                            key={index}
                          >
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.accountName}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.accountNumber}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.batchCode}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.currency}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.reference}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "left",
                              }}
                            >
                              {s.status.charAt(0).toUpperCase() +
                                s.status.slice(1)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                          <TableCell
                            colSpan={10}
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            There's no settlement data to show here.
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

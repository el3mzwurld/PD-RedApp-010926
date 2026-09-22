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

export const Disputes = () => {
  const theme = useTheme();
  const handleSubmit = (filter: string) => {};
  const { user } = useUser();
  const role = user!.role;
  const id = user!.role === "merchant" ? user!.profile.ID : "";
  const { disputes } = useMerchant(id);
  const { adminDisputes } = useAdmin(role);
  const formatDate = (query: string): string => {
    const date = new Date(query);
    const formatted = date.toLocaleDateString();
    return formatted;
  };
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
            Disputes
          </p>
        </motion.div>
        <section
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "lightgray",
            borderRadius: 12,
            padding: 45,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 40,
            paddingLeft: role === "admin" ? 65 : 45,
            paddingRight: role === "admin" ? 65 : 45,
          }}
        >
          {role === "merchant" && (
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
              <InformationContainer
                mode="read"
                name="Merchant ID"
                content="Fresh Farms"
              />
            </Stack>
          )}

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
              padding: role === "admin" ? 5 : 0,
              boxShadow: role === "admin" ? "2px 2.5px 10px gray" : "none",
            }}
          >
            <Search mode="disputes" onSubmit={handleSubmit} role={role} />
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
            {/* title */}
            <p
              style={{
                cursor: "pointer",
                color: "red",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              List of Disputes
            </p>
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
                          Date Created
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Due Date
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
                      {disputes.length !== 0 ? (
                        disputes.map((d, index) => (
                          <TableRow
                            sx={{ backgroundColor: "#F4F4F4" }}
                            key={index}
                          >
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {d.merchant.ID}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {d.paymentRef}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              NGN {d.amount}.00
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {d.paymentMtd}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              MPGS
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {formatDate(d.createdAt)}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {formatDate(d.due)}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {" "}
                              <Button variant="text">VIEW</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            <Button variant="text">VIEW</Button>
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
                          Date Created
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Due Date
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
                      {adminDisputes.length !== 0 ? (
                        adminDisputes.map((d, index) => (
                          <TableRow
                            sx={{ backgroundColor: "#F4F4F4" }}
                            key={index}
                          >
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {d.merchant.ID}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {d.paymentRef}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              NGN {d.amount}.00
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {d.paymentMtd}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              MPGS
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {formatDate(d.createdAt)}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {formatDate(d.due)}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              {" "}
                              <Button variant="text">VIEW</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            -
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            <Button variant="text">VIEW</Button>
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

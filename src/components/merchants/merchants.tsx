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
import { Search } from "../ui/Search";
import { ArrowDownward } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/user";
import { useAdmin } from "../../hooks/useAdmin";
import { formatDate } from "../../lib/utils";

export const Merchants = ({ role }: { role: "merchant" | "admin" }) => {
  const handleSubmit = (filter: string) => {};
  const theme = useTheme();
  const { mode = "manage" } = useParams<{ mode: "manage" | "commercials" }>();
  const { user } = useUser();
  const { merchants } = useAdmin(role);
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
            gap: "12px",
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
            {mode === "manage"
              ? "Manage Merchants"
              : "Commercials Configuration"}
          </p>
        </motion.div>
        <section
          style={{
            width: "100%",
            minHeight: "80vh",
            backgroundColor: "lightgray",
            borderRadius: 12,
            padding: "45px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            justifyContent: "start",
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
              padding: role === "admin" ? 5 : 0,
              boxShadow: role === "admin" ? "2px 2.5px 10px gray" : "none",
            }}
          >
            <Search
              mode="merchant management"
              onSubmit={handleSubmit}
              role="admin"
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

              {merchants && (
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
                          Merchant Name
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
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {merchants.map((m, index) => (
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
                            {m.ID}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {m.fName + " " + m.lName}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {m.isActive ? "Active" : "Inactive"}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {formatDate(m.createdAt)}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Button variant="text">VIEW</Button>
                          </TableCell>
                        </TableRow>
                      ))}
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

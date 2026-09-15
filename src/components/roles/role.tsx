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
import { useState } from "react";

export const Role = () => {
  const theme = useTheme();
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
            Roles
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
            direction={"column"}
            spacing={3}
            sx={{
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
              gap: 4.5,
              width: "100%",
              backgroundColor: "none",
              padding: 1,
            }}
          >
            {/* role creation container */}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                alignItems: "end",
                flexWrap: "wrap",
                justifyContent: "start",
                width: "100%",
                rowGap: 20,
              }}
            >
              {/* role name */}
              <Stack spacing={1}>
                <label style={{ fontSize: 14 }}>Role Name</label>
                <input
                  type="text"
                  placeholder="Enter role name"
                  style={{
                    width: 220,
                    height: 48,
                    backgroundColor: "white",
                    border: "none",
                    padding: 10,
                    fontFamily: "poppins",
                  }}
                ></input>
              </Stack>
              {/* role description */}
              <Stack spacing={1}>
                <label style={{ fontSize: 14 }}>Role Description</label>
                <input
                  type="text"
                  placeholder="Enter role description"
                  style={{
                    width: 700,
                    height: 48,
                    backgroundColor: "white",
                    border: "none",
                    padding: 10,
                    fontFamily: "poppins",
                  }}
                ></input>
              </Stack>
              {/* select permission */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  height: 45,
                  fontSize: 14,
                  width: 300,
                }}
              >
                Select Permissions
              </Button>
            </div>

            {/* action button */}

            <Button
              variant="contained"
              sx={{
                width: 150,
                height: 48,
                fontSize: 14,
                color: "white",
                borderRadius: 25,
              }}
            >
              Submit
            </Button>
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
                borderRadius: 12,
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
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Description
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
                    <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        1
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Admin
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Full access to manage users and settings
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        12/09/2026
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Button variant="text">VIEW</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </motion.div>
        </section>
      </Box>{" "}
    </Box>
  );
};

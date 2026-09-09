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

export const Settlement = () => {
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
            <InformationContainer
              mode="read"
              name="Merchant ID"
              content="Fresh Farms"
            />
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
              py: 10,
              boxShadow: "1.5px 1.5px 10px #7876769f",
            }}
          >
            <Search mode="settlement" />
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
                    <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        1
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        Oluwanimofe Bankole
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        098777453
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        001
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        NGN
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        RT001
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        Open
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

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

export const Disputes = () => {
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
              height: "auto",
              alignItems: "center",
              justifyContent: "start",
              gap: 4.5,
              width: "100%",
            }}
          >
            <Search mode="disputes" onSubmit={handleSubmit} />
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
                        RED100023-JUMIA
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        09877654gdhjm
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        2,100.00
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Card
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
                        2022/08/11
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        2022/08/12
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

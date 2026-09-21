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
import { useUser } from "../../context/user";
import { useMerchant } from "../../hooks/useMerchant";

const Users = () => {
  const theme = useTheme();
  const handleSubmit = (filter: string) => {};
  const { user } = useUser();
  const id = user!.role === "merchant" ? user!.profile.ID : " ";
  const { customers } = useMerchant(id);
  const role = user!.role;
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
            Users
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
            <Search mode="users" onSubmit={handleSubmit} role={role} />
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
              List of Users
            </p>
            {/* list container */}
            <div
              style={{
                width: "100%",
                height: "auto",
                paddingLeft: 22.5,
                paddingRight: 22.5,
                paddingTop: 15,
                paddingBottom: 15,
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
                        First Name
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Last Name
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Phone Number
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Email Address
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Active
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
                    {customers.length !== 0 ? (
                      customers.map((c, index) => (
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
                            {c.fName}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {c.lName}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {c.phones.main}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {c.email}
                          </TableCell>

                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {c.active ? "Yes" : "No"}
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
                          colSpan={10}
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          There's nothing to see here for now...
                        </TableCell>
                      </TableRow>
                    )}
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

export default Users;

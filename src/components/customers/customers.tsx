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
} from "@mui/material";
import { NavBar } from "../ui/navbar";
import { motion } from "motion/react";
import { InformationContainer } from "../ui/InformationContainer";
import { Search } from "../ui/Search";

export const Customers = () => {
  const handleSubmit = (query: string) => {};
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
            Customers
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
            gap: 25,
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
            <InformationContainer
              mode="edit"
              name="Total number of Customers"
              content="20"
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
              px: 8,
              backgroundColor: "white",
              py: 10,
              boxShadow: "1.5px 1.5px 10px #7876769f",
            }}
          >
            <Search mode="default" onSubmit={handleSubmit} />
          </Stack>

          <TableContainer>
            <Table
              sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "white",
                padding: { lg: 1.5, xl: 2.5 },
              }}
              aria-description="customers-table"
            >
              <TableHead>
                <TableRow sx={{ border: "none" }}>
                  <TableCell>S/N</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody
                component={Stack}
                sx={{ width: "100%", padding: 1.8, gap: 2, px: 3 }}
              >
                <TableRow component={Stack} sx={{ padding: 2.5 }}>
                  <TableCell>1</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>
                    <Button variant="text">VIEW</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </Box>{" "}
    </Box>
  );
};

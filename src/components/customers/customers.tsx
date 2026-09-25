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
import { useUser } from "../../context/user";
import { Navigate } from "react-router-dom";
import { useMerchant } from "../../hooks/useMerchant";
import { useState } from "react";
import { PopupModal } from "../ui/Popup";
import type { Customer } from "../../lib/types";
import { Paginate } from "../ui/paginate";

export const Customers = () => {
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<Customer[]>([]);
  const [paginated, setPaginated] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const handleSubmit = (query: string) => {
    const result = handleCustomerSearch(query);
    setSearchResult(result);
  };
  const getPaginated = (array: unknown[]) => {
    setPaginated(array as Customer[]);
  };
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  const { user } = useUser();
  const userID = user!.role === "merchant" ? user!.profile.ID : "";
  const { customers, customerCount, handleCustomerSearch } =
    useMerchant(userID);

  if (user!.role === "admin") {
    return <Navigate to={"/login"} />;
  }

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
              content={user!.profile.ID}
            />
            <InformationContainer
              mode="read"
              name="Total number of Customers"
              content={customerCount}
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
            <Search mode="default" onSubmit={handleSubmit} role={user!.role} />
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

              <TableBody sx={{ width: "100%", padding: 1.8, gap: 2, px: 3 }}>
                {customers.length !== 0 ? (
                  searchResult.length === 0 ? (
                    searchResult.map((cus, index) => (
                      <TableRow sx={{ padding: 2.5 }} key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {cus.fName.charAt(0).toUpperCase() +
                            cus.fName.slice(1)}
                        </TableCell>
                        <TableCell>
                          {cus.lName.charAt(0).toUpperCase() +
                            cus.lName.slice(1)}
                        </TableCell>
                        <TableCell>{cus.phones.main}</TableCell>
                        <TableCell>{cus.email}</TableCell>
                        <TableCell>
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
                          title="Details"
                          buttonTitle1="close"
                          data={cus}
                          options={1}
                          mode="customers"
                        />
                      </TableRow>
                    ))
                  ) : (
                    searchResult.map((cus, index) => (
                      <TableRow sx={{ padding: 2.5 }} key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {cus.fName.charAt(0).toUpperCase() +
                            cus.fName.slice(1)}
                        </TableCell>
                        <TableCell>
                          {cus.lName.charAt(0).toUpperCase() +
                            cus.lName.slice(1)}
                        </TableCell>
                        <TableCell>{cus.phones.main}</TableCell>
                        <TableCell>{cus.email}</TableCell>
                        <TableCell>
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
                          title="Details"
                          buttonTitle1="close"
                          data={cus}
                          options={1}
                          mode="customers"
                        />
                      </TableRow>
                    ))
                  )
                ) : (
                  <TableRow sx={{ padding: 2.5 }}>
                    <TableCell>1</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email Address</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => {
                          setOpen((prev) => !prev);
                        }}
                      >
                        VIEW
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </Box>
    </Box>
  );
};

import { Box } from "@mui/material";
import "../assets/styles/global.css";
import { Sidebar } from "../components/ui/sidebar";
import { useState } from "react";
import { Dashboard } from "../components/dashboard/dashoard";
import { Container } from "../components/ui/Container";
import { Profile } from "../components/profile/profile";
import { Customers } from "../components/customers/customers";
import { Disputes } from "../components/disputes/disputes";
import { Settlement } from "../components/settlement/settlement";
import { Transaction } from "../components/transaction/transaction";
import Users from "../components/users/Users";
import { PaymentLink } from "../components/link/PaymentLink";
import { Merchants } from "../components/merchants/merchants";
import { Role } from "../components/roles/role";
import { NotFound } from "../components/not-found/notfound";
import { Settings } from "./../components/settings/settings";
import { useUser } from "../context/user";
import { Navigate, Outlet } from "react-router-dom";
export type RenderedPage =
  | "dashboard"
  | "profile"
  | "customers"
  | "disputes"
  | "settlement"
  | "transaction"
  | "users"
  | "payment link";

export type AdminPages =
  | "dashboard"
  | "disputes"
  | "merchant"
  | "role"
  | "settlement"
  | "transaction"
  | "wallet"
  | "settings";

export const Home = () => {
  const { user } = useUser();

  return (
    <>
      <Box sx={{ width: "100%", height: "100vh", display: "flex" }}>
        <Sidebar role={user!.role} />

        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

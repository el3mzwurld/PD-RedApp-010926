import { Box } from "@mui/material";
import "../assets/styles/global.css";
import { Sidebar } from "../components/ui/sidebar";

import { Container } from "../components/ui/Container";

import { useUser } from "../context/user";
import { Outlet } from "react-router-dom";
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

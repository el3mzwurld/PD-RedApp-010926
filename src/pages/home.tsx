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
  const [page, setPage] = useState<RenderedPage | AdminPages>("dashboard");
  const [subLink, setSubLink] = useState<string>("");
  const { user } = useUser();
  const role = "admin";
  const handlePageChange = (
    page: RenderedPage | AdminPages,
    subLink?: string,
  ) => {
    setPage(page);

    if (subLink) {
      setSubLink(subLink);
      return;
    }
  };

  const renderPage = () => {
    if (page === "dashboard") {
      return <Dashboard pageChange={handlePageChange} />;
    }
    if (page === "profile") {
      return <Profile />;
    }
    if (page === "customers") {
      return <Customers />;
    }
    if (page === "disputes") {
      return <Disputes />;
    }
    if (page === "settlement") {
      return <Settlement />;
    }
    if (page === "transaction") {
      return <Transaction />;
    }
    if (page === "users") {
      return <Users />;
    }
    if (page === "payment link") {
      return <PaymentLink />;
    }
    if (page === "merchant") {
      return (
        <Merchants role={role} mode={subLink as "manage" | "commercials"} />
      );
    }
    if (page === "settings") {
      return <Settings />;
    }
    if (page === "role") {
      return <Role />;
    }

    return <NotFound handlePageChange={handlePageChange} />;
  };
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex" }}>
      <Sidebar pageChange={handlePageChange} role={role} />

      <Container>{renderPage()}</Container>
    </Box>
  );
};

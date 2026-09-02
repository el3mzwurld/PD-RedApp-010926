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

export type RenderedPage =
  | "dashboard"
  | "profile"
  | "customers"
  | "disputes"
  | "settlement"
  | "transaction"
  | "Users"
  | "Payment Link";

export const Home = () => {
  const [page, setPage] = useState<RenderedPage>("dashboard");

  const handlePageChange = (page: RenderedPage) => {
    setPage(page);
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
  };
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex" }}>
      <Sidebar pageChange={handlePageChange} />

      <Container>{renderPage()}</Container>
    </Box>
  );
};

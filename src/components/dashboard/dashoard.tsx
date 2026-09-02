import { Box, useTheme } from "@mui/material";
import { NavBar } from "../ui/navbar";
import { Modal } from "./modal";
import { Card } from "./card";
import type { RenderedPage } from "../../pages/home";

export const Dashboard = ({
  pageChange,
}: {
  pageChange: (page: RenderedPage) => void;
}) => {
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
        <h4>Dashboard</h4>
        <section
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              width: "50%",
            }}
          >
            <Modal mode="line" />
            <Modal mode="bar" />
          </div>

          <div
            className="dash-card--grid"
            style={{
              display: "grid",
              alignItems: "center",
              width: "45%",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "210.25px 209.25px",
              columnGap: 30,
              rowGap: 20,
              height: "100%",
            }}
          >
            <Card mode="customer count" />
            <Card mode="quick links" pageChange={pageChange} />
            <Card mode="customer count" />
          </div>
        </section>
      </Box>
    </Box>
  );
};

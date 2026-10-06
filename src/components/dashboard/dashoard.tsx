import { Box, Stack, useTheme } from "@mui/material";
import { NavBar } from "../ui/navbar";
import { Modal, type Range } from "./modal";
import { Card } from "./card";
import { motion } from "motion/react";
import { useState } from "react";
import { useUser } from "../../context/user";
import { useAdmin } from "../../hooks/useAdmin";
export const Dashboard = () => {
  const [range, setRange] = useState<Range>("daily");
  const { user } = useUser();
  const role = user!.role;
  const setTimeRange = (time: Range) => {
    setRange(time);
  };
  const { myMerchants } = useAdmin(role);
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
            Dashboard
          </p>
        </motion.div>{" "}
        <Box
          sx={{
            width: "100%",
            height: "auto",
            backgroundColor: theme.palette.background.paper,
            padding: { xs: 2.5, lg: "20px" },
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            borderRadius: { xs: 0.8, md: 3.5 },
            gap: "20px",
            flexDirection: "column",
            [theme.breakpoints.down("sm")]: {
              py: 3,
              gap: 3.25,
            },
          }}
        >
          {role === "admin" && (
            <Box
              sx={{
                width: { xs: "100%", md: "auto" },
                height: 48,
                display: "flex",
                justifyContent: { xs: "center" },
                gap: 2.5,
              }}
            >
              <select
                style={{
                  width: "auto",
                  height: "100%",
                  color: "gray",
                  backgroundColor: "lightgray",
                  padding: 10,
                  fontSize: 14,
                  fontFamily: "poppins",
                }}
              >
                {myMerchants.length !== 0 ? (
                  myMerchants.map((m, index) => (
                    <option key={index}>{m}</option>
                  ))
                ) : (
                  <option>RED100023-JUMIA</option>
                )}
              </select>
              <select
                style={{
                  width: 220,
                  height: "100%",
                  color: "gray",
                  backgroundColor: "lightgray",
                  padding: 10,
                  fontSize: 14,
                  fontFamily: "poppins",
                }}
                onChange={(e) => {
                  e.preventDefault();

                  setTimeRange(e.target.value.toLowerCase() as Range);
                }}
              >
                <option value={"daily"}>Today</option>
                <option value={"weekly"}>Daily</option>
                <option value={"monthly"}>Year</option>
              </select>
            </Box>
          )}

          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              alignItems: "center",
              justifyContent: "space-evenly",
              borderRadius: 10,
              gap: "20px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gap: "15px",
                width: { xs: "100%", lg: "50%" },
                gridTemplateColumns: "1fr",
                gridTemplateRows: "260px 260px",
                justifyContent: { lg: "space-between" },
              }}
            >
              <Modal
                mode="line"
                timeRange={range}
                setTimeRange={setTimeRange}
              />
              <Modal mode="bar" timeRange={range} setTimeRange={setTimeRange} />
            </Box>

            <Box
              className="dash-card--grid"
              sx={{
                display: "grid",
                alignItems: "center",
                width: { xs: "100%", md: "45%" },
                gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr" },
                gridTemplateRows:
                  role === "admin"
                    ? { xs: "250px 300px", md: "250px 300px" }
                    : { xs: "250px 300px", md: "250px 300px" },
                columnGap: { xs: 5, md: 2.5 },
                rowGap: { xs: 5, md: 2.5 },
                height: "100%",
                [theme.breakpoints.down("md")]: {
                  justifyContent: "center",
                },
              }}
            >
              {role === "merchant" && (
                <>
                  {" "}
                  <Card mode="customer count" />
                  <Card mode="quick links" />
                  <Card mode="transaction volume" />
                  <Card mode="transaction count" />
                </>
              )}
              {role === "admin" && (
                <>
                  <div
                    style={{
                      gridArea: "1/1/ span 1 /span 2",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Modal mode="merchant count" setTimeRange={setTimeRange} />
                  </div>
                  <Card mode="transaction volume" />
                  <Card mode="transaction count" />
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

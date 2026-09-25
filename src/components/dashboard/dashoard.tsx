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
        <section
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            borderRadius: 10,
            gap: "20px",
            flexDirection: "column",
          }}
        >
          {role === "admin" && (
            <div
              style={{ width: "auto", height: 48, display: "flex", gap: 25 }}
            >
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
            </div>
          )}

          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-evenly",
              borderRadius: 10,
              gap: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "grid",
                alignItems: "center",
                gap: "15px",
                width: "50%",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "260px 260px",
              }}
            >
              <Modal
                mode="line"
                timeRange={range}
                setTimeRange={setTimeRange}
              />
              <Modal mode="bar" timeRange={range} setTimeRange={setTimeRange} />
            </div>

            <div
              className="dash-card--grid"
              style={{
                display: "grid",
                alignItems: "center",
                width: "45%",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows:
                  role === "admin" ? "250px 300px" : "290px 290px",
                columnGap: 30,
                rowGap: 20,
                height: "100%",
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
            </div>
          </Stack>
        </section>
      </Box>
    </Box>
  );
};

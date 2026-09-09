import { Box, Button, Stack, useTheme } from "@mui/material";
import { NavBar } from "../ui/navbar";
import { motion } from "motion/react";
import { InformationContainer } from "../ui/InformationContainer";
import { Search } from "../ui/Search";

export const PaymentLink = () => {
  const theme = useTheme();
  const handleSubmit = (filter: string) => {};
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
            Payment Link
          </p>
        </motion.div>
        <section
          style={{
            width: "100%",
            minHeight: "80vh",
            backgroundColor: "lightgray",
            borderRadius: 12,
            padding: "45px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            justifyContent: "center",
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
              paddingX: 5,
              paddingY: 10,
            }}
          >
            <InformationContainer
              mode="edit"
              name="Merchant ID"
              content="RED00000"
            />
            <InformationContainer
              mode="edit"
              name="Business Name"
              content="Mammodu Stores"
            />{" "}
            <InformationContainer
              mode="edit"
              name="Business Email"
              content="iamalberto777@gmail.com"
            />{" "}
            <InformationContainer
              mode="edit"
              name="Customer Email"
              content="iamalberto777@gmail.com"
            />{" "}
            <InformationContainer mode="edit" name="Amount" content="4000" />
          </Stack>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: 270,
              p: 1.25,
              px: 5,
              fontSize: 14,
              backgroundColor: "primary.main",
              height: 50,
              borderRadius: 25,
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            GENERATE PAYMENT LINK
          </Button>
        </section>
      </Box>{" "}
    </Box>
  );
};

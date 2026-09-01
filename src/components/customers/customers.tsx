import { Box } from "@mui/material";
import { NavBar } from "../ui/navbar";

export const Customers = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        px: { lg: 1.8 },
        paddingTop: 1.8,
      }}
    >
      <NavBar />
      <Box
        component={"main"}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        Customers
      </Box>{" "}
    </Box>
  );
};

import { Box } from "@mui/material";
import { NavBar } from "../ui/navbar";

export const Dashboard = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        px: { lg: 1.8 },
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
          alignItems: "center",
        }}
      >
        dashboard
      </Box>
    </Box>
  );
};

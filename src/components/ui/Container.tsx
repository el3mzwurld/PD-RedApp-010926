import React from "react";
import { Box } from "@mui/material";
export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
        width: "100%",
        px: { xs: 0, lg: 2.5 },
        py: { xs: 1.5, lg: 2.5 },
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
};

import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        px: 3,
      }}
    >
      <Box sx={{ textAlign: "center", maxWidth: 520 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 72, md: 120 },
            fontWeight: 700,
            color: "primary.main",
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Page not found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The page you are looking for does not exist or may have been moved.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            borderRadius: 999,
            px: 4,
            py: 1.2,
            fontWeight: 600,
          }}
        >
          Go back home
        </Button>
      </Box>
    </Box>
  );
};

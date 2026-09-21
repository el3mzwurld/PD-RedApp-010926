import { ArrowBack, Block } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 3,
        backgroundColor: "background.default",
      }}
    >
      <Stack
        spacing={2}
        sx={{ maxWidth: 440, textAlign: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            color: "primary.main",
            backgroundColor: "primary.light",
          }}
        >
          <Block />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Access denied
        </Typography>
        <Typography color="text.secondary">
          You do not have permission to view this page. Please return to your
          dashboard or contact an administrator.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBack />}
          sx={{ mt: 1, textTransform: "none", fontWeight: 700 }}
        >
          Back to dashboard
        </Button>
      </Stack>
    </Box>
  );
};

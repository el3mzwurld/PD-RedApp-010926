import { Box, Stack, Typography, useTheme } from "@mui/material";
import { getDate } from "../../lib/utils";
import { Notifications, ExitToApp } from "@mui/icons-material";
export const NavBar = ({
  role = "merchant",
}: {
  role: "merchant" | "admin";
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        justifyContent: "space-evenly",
        height: { lg: 65, xl: 70 },
        width: "100%",
        gap: 1.5,
      }}
    >
      {/* welcome = 25%*/}
      <div style={{ width: "25%", textAlign: "left" }}>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          Welcome, <span style={{ color: "red" }}>Samuel!</span>
        </Typography>
      </div>
      {/* date/role = 30%*/}
      <div
        style={{
          width: "35%",
          textAlign: "left",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 400, marginRight: 3.5 }}>
          {getDate()}
        </Typography>

        {/* separator */}

        <span
          style={{
            width: 2,
            height: 15,
            backgroundColor: theme.palette.secondary.light,
            opacity: 0.8,
            borderRadius: 1000,
          }}
        />

        <Typography variant="body2" sx={{ fontWeight: 400, marginLeft: 3.5 }}>
          Role :
          <span style={{ fontWeight: 600 }}>
            {role === "merchant" ? "Merchant" : "Admin"}
          </span>
        </Typography>
      </div>

      {/* controls : notifications + profile pic + name + logout */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Notifications />

        <div
          style={{
            width: 37.5,
            height: 37.5,
            backgroundColor: "gray",
            borderRadius: "100%",
          }}
        ></div>
        {/* name = width 30% */}
        <div
          style={{ width: "30%", display: "flex", justifyContent: "center" }}
        >
          <Typography variant="body2" sx={{ fontWeight: 400 }}>
            Samuel Elemi
          </Typography>
        </div>
        {/* logout = width 30% */}
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            alignItems: "center",
            gap: 2.5,
          }}
        >
          <ExitToApp sx={{ color: "primary.main" }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "primary.main" }}
          >
            Logout
          </Typography>
        </div>
      </Box>
    </Stack>
  );
};

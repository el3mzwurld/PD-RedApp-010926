import { Box, Stack, Typography, useTheme } from "@mui/material";
import { getDate } from "../../lib/utils";
import { Notifications, ExitToApp } from "@mui/icons-material";
import { useUser } from "../../context/user";
export const NavBar = () => {
  const theme = useTheme();
  const { user, logout } = useUser();
  const role = user!.role;
  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        justifyContent: { xs: "space-between", md: "space-evenly" },
        height: { xs: "auto", lg: 65, xl: 70 },
        minHeight: { xs: 48, lg: 65, xl: 70 },
        width: "100%",
        gap: { xs: 1, md: 1.5 },
        [theme.breakpoints.down("md")]: {
          px: 2.2,
        },
      }}
    >
      {/* welcome = 25%*/}
      <Box
        sx={{
          width: "25%",
          textAlign: "left",
          display: { xs: "none", md: "block" },
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          Welcome, <span style={{ color: "red" }}>{user!.profile.fName}</span>
        </Typography>
      </Box>
      {/* date/role = 30%*/}
      <Box
        sx={{
          width: { xs: "auto", md: "35%" },
          textAlign: "left",
          display: "flex",
          gap: { xs: 0.75, md: 2 },
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            marginRight: { xs: 0, md: 3.5 },
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            whiteSpace: "nowrap",
          }}
        >
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

        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            marginLeft: { xs: 0, md: 3.5 },
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            whiteSpace: "nowrap",
          }}
        >
          Role :
          <span style={{ fontWeight: 600, marginLeft: 2.5 }}>
            {role === "merchant" ? "Merchant" : "Admin"}
          </span>
        </Typography>
      </Box>

      {/* controls : notifications + profile pic + name + logout */}
      <Box
        sx={{
          flex: { xs: "0 0 auto", md: 1 },
          display: "flex",
          justifyContent: { xs: "flex-end", md: "space-evenly" },
          width: { xs: "auto", md: "100%" },
          alignItems: "center",
          gap: { xs: 1, md: 2.5 },
        }}
      >
        <Notifications sx={{ display: { xs: "none", md: "block" } }} />

        <div
          style={{
            width: 37.5,
            height: 37.5,
            backgroundColor: "gray",
            borderRadius: "100%",
          }}
          aria-hidden="true"
        ></div>
        {/* name = width 30% */}
        <Box
          sx={{
            width: { xs: "auto", md: "30%" },
            minWidth: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "0.75rem", md: "0.875rem" },
              maxWidth: { xs: 100, md: "none" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user!.profile.fName + " " + user!.profile.lName}
          </Typography>
        </Box>
        {/* logout = width 30% */}
        <Box
          sx={{
            width: "30%",
            justifyContent: "center",
            cursor: "pointer",
            alignItems: "center",
            gap: 2.5,
            display: "flex",
          }}
          onClick={logout}
        >
          <ExitToApp sx={{ color: "primary.main" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "primary.main",
              display: { xs: "none", md: "block" },
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

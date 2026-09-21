import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";
import { useState } from "react";
import type { Profile } from "../../lib/types";
import { motion } from "motion/react";
const BrandMark = () => (
  <Box
    sx={{
      width: 42,
      height: 42,
      display: "grid",
      placeItems: "center",
      borderRadius: 2,
      color: "common.white",
      backgroundColor: "primary.main",
      fontSize: 20,
      fontWeight: 800,
    }}
  >
    R
  </Box>
);

export const Login = () => {
  const { login, authError } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState<Profile["role"]>("merchant");
  const isAdminMode = loginMode === "admin";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (login(email, password, loginMode)) {
      navigate("/");
    }
  };

  const switchLoginMode = () => {
    setLoginMode((mode) => (mode === "admin" ? "merchant" : "admin"));
    setPassword("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.2fr minmax(340px, 0.8fr)" },
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { md: 5, lg: 8 },
          color: "common.white",
          backgroundColor: "primary.main",
          "&::after": {
            content: '""',
            position: "absolute",
            width: 440,
            height: 440,
            left: -220,
            bottom: -170,
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "50%",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <BrandMark />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            red
          </Typography>
        </Box>
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 460 }}>
          <Typography
            variant="overline"
            sx={{ opacity: 0.75, letterSpacing: 2 }}
          >
            Payments, simplified
          </Typography>
          <Typography
            variant="h3"
            sx={{ mt: 1.5, fontWeight: 700, lineHeight: 1.12 }}
          >
            Move your business forward.
          </Typography>
          <Typography
            sx={{ mt: 2, color: "rgba(255,255,255,0.78)", lineHeight: 1.8 }}
          >
            A clear view of every payment, customer, and settlement in one calm
            workspace.
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ opacity: 0.65 }}>
          Secure payments for ambitious businesses.
        </Typography>
      </Box>

      <Box
        sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        <Button
          onClick={switchLoginMode}
          startIcon={<Autorenew sx={{ fontSize: "1.25rem !important" }} />}
          sx={{
            position: "absolute",
            top: { xs: 28, sm: 54 },
            left: { xs: 24, sm: 42 },
            zIndex: 1,
            minWidth: 0,
            padding: 0,
            color: "#ee1721",
            fontSize: { xs: 13, sm: 16 },
            fontWeight: 700,
            textTransform: "uppercase",
            "&:hover": { backgroundColor: "transparent", color: "#c81019" },
          }}
        >
          {isAdminMode ? "Switch to merchant" : "Switch to administrator"}
        </Button>

        <Box
          sx={{
            width: { xs: "calc(100% - 48px)", sm: 440 },
            maxWidth: "100%",
            position: "absolute",
            top: { xs: 136, sm: 137 },
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <Typography
            component="div"
            sx={{
              color: "#f21620",
              fontSize: { xs: 62, sm: 72 },
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -4,
            }}
          >
            <Box component="span" sx={{ letterSpacing: -2 }}>
              .
            </Box>
            red
          </Typography>
          <Typography
            sx={{
              mt: 1.4,
              color: "#f21620",
              fontSize: { xs: 15, sm: 17 },
              fontWeight: 700,
            }}
          >
            Payment solution
          </Typography>
        </Box>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Stack
            component="form"
            onSubmit={handleSubmit}
            spacing={2.6}
            sx={{
              width: { xs: "calc(100% - 48px)", sm: 440 },
              maxWidth: "100%",
              position: "absolute",
              top: { xs: 292, sm: 295 },
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Box>
              <Typography
                component="label"
                htmlFor="login-email"
                sx={{ color: "#aaa", fontSize: 12, fontWeight: 400 }}
              >
                {isAdminMode ? "ADMIN EMAIL" : "EMAIL"}
              </Typography>
              <Input
                id="login-email"
                type="email"
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{
                  mt: 1.8,
                  color: "#222",
                  fontSize: 14,
                  "&:before": { borderBottomColor: "#333" },
                  "&:after": { borderBottomColor: "#ee1721" },
                }}
              />
            </Box>

            <Box>
              <Typography
                component="label"
                htmlFor="login-password"
                sx={{ color: "#aaa", fontSize: 12, fontWeight: 400 }}
              >
                {isAdminMode ? "ADMIN PASSWORD" : "PASSWORD"}
              </Typography>
              <Input
                id="login-password"
                type="password"
                fullWidth
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{
                  mt: 1.8,
                  color: "#222",
                  fontSize: 14,
                  "&:before": { borderBottomColor: "#333" },
                  "&:after": { borderBottomColor: "#ee1721" },
                }}
              />
            </Box>

            {authError && <Alert severity="error">{authError}</Alert>}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "1.25rem !important",
              }}
            >
              <FormControlLabel
                sx={{ m: 0, color: "#c6c6c6" }}
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      p: 0,
                      mr: 1,
                      color: "#c6c6c6",
                      "&.Mui-checked": { color: "#ee1721" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 12 }}>Remember Me</Typography>
                }
              />
              <MuiLink
                component={Link}
                to="/login"
                underline="none"
                sx={{ color: "#c6c6c6", fontSize: 11 }}
              >
                Forgot Password?{" "}
                <Box
                  component="span"
                  sx={{ color: "#ee1721", fontWeight: 700 }}
                >
                  Click Here
                </Box>
              </MuiLink>
            </Box>

            <Box sx={{ display: "flex", gap: 2, pt: 5 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  height: 54,
                  borderRadius: 8,
                  backgroundColor: "#f21620",
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#d90f18", boxShadow: "none" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                fullWidth
                variant="outlined"
                sx={{
                  height: 54,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: "#f21620",
                  color: "#f21620",
                  fontSize: 13,
                  fontWeight: 700,
                  display: loginMode === "admin" && "none",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "#d90f18",
                    color: "#d90f18",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
};

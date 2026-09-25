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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";
import { useEffect, useState } from "react";
import type { Profile } from "../../lib/types";
import { motion } from "motion/react";
import authIllustration from "../../assets/img/auth illustration.png";

export const Login = () => {
  const { login, authError, user } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState<Profile["role"]>("merchant");
  const isAdminMode = loginMode === "admin";

  useEffect(() => {
    if (!user) return;

    navigate("/");
  }, [user, navigate]);

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
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          backgroundColor: "#f21620",
        }}
      >
        <Box
          component="img"
          src={authIllustration}
          alt="Welcome to red payment illustration"
          sx={{ width: "auto", height: "60%", objectFit: "contain" }}
        />
        <Box
          sx={{ width: "min(82%, 420px)", textAlign: "center", color: "white" }}
        >
          <Typography sx={{ fontSize: { md: 20, lg: 24 }, fontWeight: 700 }}>
            Welcome to red
          </Typography>
          <Typography sx={{ mt: 0.75, fontSize: { md: 10, lg: 12 } }}>
            Providing a very fast and efficient payment experience for
            individuals across the world to make life easier
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}
          >
            {[0, 1, 2, 3].map((dot) => (
              <Box
                key={dot}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              />
            ))}
          </Box>
        </Box>
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
                  display: loginMode === "admin" ? "none" : undefined,
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

import {
  Alert,
  Box,
  Button,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";
import { useState } from "react";

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

export const Signup = () => {
  const { createUser, authError } = useUser();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bName, setBName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      createUser(bName, email, firstName, lastName, Number(phone), password)
    ) {
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.2fr minmax(340px, 0.8fr)" },
        backgroundColor: "background.default",
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
            Your business, in focus
          </Typography>
          <Typography
            variant="h3"
            sx={{ mt: 1.5, fontWeight: 700, lineHeight: 1.12 }}
          >
            Everything you need to grow with confidence.
          </Typography>
          <Stack spacing={2} sx={{ mt: 4 }}>
            {[
              [
                "01",
                "See the full picture",
                "Track money moving through your business.",
              ],
              [
                "02",
                "Work with clarity",
                "Keep customers and operations in sync.",
              ],
              [
                "03",
                "Build momentum",
                "Turn every transaction into a next step.",
              ],
            ].map(([number, title, detail]) => (
              <Box key={number} sx={{ display: "flex", gap: 2 }}>
                <Typography sx={{ opacity: 0.65, fontWeight: 700 }}>
                  {number}
                </Typography>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.25, color: "rgba(255,255,255,0.72)" }}
                  >
                    {detail}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        <Typography variant="caption" sx={{ opacity: 0.65 }}>
          Secure payments for ambitious businesses.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", placeItems: "center", p: { xs: 3, sm: 5 } }}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: { xs: 0, sm: 2 },
            backgroundColor: "transparent",
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1.5,
              mb: 7,
            }}
          >
            <BrandMark />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              red
            </Typography>
          </Box>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Create your account
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary" }}>
                Start managing your business with red.
              </Typography>
            </Box>
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              <TextField
                label="Business name"
                placeholder="Your business name"
                fullWidth
                value={bName}
                onChange={(e) => {
                  setBName(e.target.value);
                }}
              />
              <TextField
                label="Business email"
                type="email"
                placeholder="you@business.com"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  label="First name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <TextField
                  label="Last name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Box>
              <TextField
                label="Phone"
                type="tel"
                placeholder="Phone number"
                fullWidth
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <TextField
                label="Password"
                type="password"
                placeholder="Create a password"
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {authError && <Alert severity="error">{authError}</Alert>}
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  mt: 1,
                  py: 1.6,
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Create account
              </Button>
            </Stack>
            <Typography align="center" variant="body2" color="text.secondary">
              Already have an account?{" "}
              <MuiLink
                component={Link}
                to="/login"
                underline="hover"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

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
import authIllustration from "../../assets/img/auth illustration.png";

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

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#EE1721",
      light: "#FDE3DF",
    },
    secondary: {
      main: "#9c27b0",
      light: "black",
    },
    background: {
      default: "#f5f5f5",
      paper: "#EBE7E7",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;

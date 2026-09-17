import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme.ts";
import { UserProvider } from "./context/user.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

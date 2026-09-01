import { Box, Stack, Typography, useTheme } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { useState } from "react";
import {
  Dashboard,
  People,
  FrontHand,
  Person4,
  Handshake,
  AttachMoney,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";
import logo from "../img/logo.png";
import type { RenderedPage } from "../../pages/home";

type SidebarItem = {
  Icon: SvgIconComponent;
  label: string;
};

interface SidebarProps {
  pageChange: (page: RenderedPage) => void;
}

export const Sidebar = ({ pageChange }: SidebarProps) => {
  const [collapse, setCollapse] = useState(false);
  const theme = useTheme();

  const handleNavToggle = () => {
    setCollapse((prev) => !prev);
  };

  const navLinks: SidebarItem[] = [
    {
      Icon: Dashboard,
      label: "Dashboard",
    },
    {
      Icon: Person4,
      label: "Profile",
    },
    {
      Icon: People,
      label: "Customers",
    },
    {
      Icon: FrontHand,
      label: "Disputes",
    },
    {
      Icon: Handshake,
      label: "Settlement",
    },
    {
      Icon: AttachMoney,
      label: "Transaction",
    },
  ];

  return (
    <aside
      className={`sidebar ${collapse ? "collapsed" : ""}`}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <Box
        className="sidebar--header"
        sx={{
          height: 120,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          aria-description="red app logo"
          style={{
            width: "auto",
            height: "80%",
            objectFit: "cover",
            display: collapse ? "none" : "block",
          }}
        />
      </Box>
      <Stack
        direction={"column"}
        component={"nav"}
        aria-description="navigation pane for sidebar"
        spacing={2.5}
        sx={{
          height: "auto",
          flex: 1,
          width: "100%",
          px: 1,
          justifyContent: "start",
        }}
      >
        {navLinks.map((link, index) => (
          <SidebarItem
            Icon={link.Icon}
            label={link.label}
            key={index}
            click={pageChange}
            active={collapse}
          />
        ))}
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {collapse ? (
            <Box
              sx={{
                height: 40,
                width: 40,
                borderRadius: 100,
                ":hover": { opacity: 0.8 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "white",
              }}
              onClick={handleNavToggle}
            >
              <ChevronRight sx={{ width: 40 }} />
            </Box>
          ) : (
            <Box
              sx={{
                height: 40,
                width: 40,
                borderRadius: 100,
                ":hover": { opacity: 0.8 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "white",
              }}
              onClick={handleNavToggle}
            >
              <ChevronLeft sx={{ width: 40 }} />
            </Box>
          )}
        </div>
      </Stack>
    </aside>
  );
};

interface SidebarItemProps {
  Icon: SvgIconComponent;
  label: string;
  click: (page: RenderedPage) => void;
  active: boolean;
}

const SidebarItem = ({ Icon, label, click, active }: SidebarItemProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 0.5,
        gap: 2,
        cursor: "pointer",
      }}
      title={label}
      onClick={() => click(label.toLowerCase() as RenderedPage)}
      aria-description={`${label}`}
    >
      <Icon
        sx={{
          width: 20,
          color: "white",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          width: "70%",
          color: "white",
          fontWeight: 550,
          display: active ? "none" : "block",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

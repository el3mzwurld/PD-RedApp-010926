import { Box, Stack, Typography, useTheme } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  Dashboard,
  People,
  FrontHand,
  Person4,
  Handshake,
  AttachMoney,
  ChevronRight,
  ChevronLeft,
  Link,
  Group,
  Person2,
  GroupWork,
  Wallet,
  Settings,
} from "@mui/icons-material";
import logo from "../img/logo.png";
import type { AdminPages, RenderedPage } from "../../pages/home";
import { useLocation, useNavigate } from "react-router-dom";

type SidebarItem = {
  Icon: SvgIconComponent;
  label: string;
};

type AdminSidebarItem = {
  Icon: SvgIconComponent;
  label: {
    main: AdminPages;
    sublinks?: string[];
  };
};

interface SidebarProps {
  role: "merchant" | "admin";
}

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
  {
    Icon: Group,
    label: "Users",
  },
  {
    Icon: Link,
    label: "Payment Link",
  },
];
const adminLinks: AdminSidebarItem[] = [
  {
    Icon: Dashboard,
    label: {
      main: "dashboard",
    },
  },
  {
    Icon: FrontHand,
    label: {
      main: "disputes",
    },
  },
  {
    Icon: Person2,
    label: {
      main: "merchant",
      sublinks: ["manage", "commercials"],
    },
  },
  {
    Icon: GroupWork,
    label: {
      main: "role",
    },
  },
  {
    Icon: Handshake,
    label: {
      main: "settlement",
    },
  },
  {
    Icon: AttachMoney,
    label: {
      main: "transaction",
    },
  },
  {
    Icon: Wallet,
    label: {
      main: "wallet",
    },
  },
  {
    Icon: Settings,
    label: {
      main: "settings",
      sublinks: ["admins role linkage"],
    },
  },
];
export const Sidebar = ({ role = "admin" }: SidebarProps) => {
  const [collapse, setCollapse] = useState(false);
  const theme = useTheme();
  const handleNavToggle = () => {
    setCollapse((prev) => !prev);
  };

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
        spacing={0.8}
        sx={{
          height: "auto",
          flex: 1,
          width: "100%",
          justifyContent: "start",
          marginBottom: 2.5,
        }}
      >
        {role === "merchant" ? (
          <>
            {" "}
            {navLinks.map((link, index) => (
              <SidebarItem
                Icon={link.Icon}
                label={link.label}
                key={index}
                active={collapse}
              />
            ))}
          </>
        ) : (
          <>
            {" "}
            {adminLinks.map((link, index) => (
              <AdminSidebarItem
                Icon={link.Icon}
                label={link.label.main}
                key={index}
                active={collapse}
                sublinks={link.label.sublinks}
              />
            ))}
          </>
        )}
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
  active: boolean;
}

const SidebarItem = ({ Icon, label, active }: SidebarItemProps) => {
  const nav = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isPage = () => {
    const pathname = path.split("/")[1];
    if (label.toLowerCase() === "dashboard" && path === "/") {
      return true;
    }
    if (label.toLowerCase() === "payment link" && pathname === "payment-link") {
      return true;
    }
    if (label.toLowerCase() === pathname.toLowerCase()) {
      return true;
    }
    return false;
  };

  console.log(path, isPage(), label);

  return (
    <Box
      sx={{
        width: "100%",
        height: active ? { md: 45, xl: 55 } : { md: 50 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        cursor: "pointer",
        backgroundColor: isPage() ? "white" : "none",
        borderRadius: active && 25,
      }}
      title={label}
      aria-description={`${label}`}
      onClick={() => {
        if (label.toLowerCase() === "dashboard") {
          nav("/");
          return;
        }
        if (label.toLowerCase() === "payment link") {
          nav("payment-link");
          return;
        }
        nav(label.toLowerCase());
      }}
    >
      <Icon
        sx={{
          width: 20,
          color: isPage() ? "red" : "white",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          width: "70%",
          fontWeight: 550,
          display: active ? "none" : "block",
          color: isPage() ? "red" : "white",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

interface AdminSidebarItemProps {
  Icon: SvgIconComponent;
  label: AdminPages;
  active: boolean;
  sublinks?: string[];
}
const AdminSidebarItem = ({
  Icon,
  label,
  active,
  sublinks,
}: AdminSidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isPage = () => {
    if (label === "dashboard" && path === "/") {
      return true;
    }
    if (label.toLowerCase() === path.toLowerCase()) {
      return true;
    }
    return false;
  };

  console.log(path, isPage);
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexDirection: "column",
        marginY: { md: 0, xl: 2 },
      }}
      title={label}
      aria-description={`${label}`}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: { md: 45.5, lg: 55.5 },
          alignItems: "center",
          justifyContent: "center",
          px: 0.5,
          gap: 2,
          cursor: "pointer",
          backgroundColor: isPage() ? "white" : "none",
        }}
      >
        <Icon
          sx={{
            width: 20,
            color: isPage() ? "red" : "white",
          }}
          onClick={() => {
            if (label.toLowerCase() === "dashboard") {
              navigate("/");
              return;
            }
            navigate(label.toLowerCase());
          }}
        />
        <Typography
          variant="body2"
          sx={{
            width: "65%",
            color: isPage() ? "red" : "white",
            fontWeight: 550,
            display: active ? "none" : "flex",
            position: "relative",
            height: "100%",
            alignItems: "center",
            justifyContent: "start",
          }}
          onClick={() => {
            if (label.toLowerCase() === "dashboard") {
              navigate("/");
              return;
            }
            navigate(label.toLowerCase());
          }}
        >
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Typography>
        <ChevronRight sx={{ width: "18px", color: "white" }} />
      </Box>

      {sublinks &&
        sublinks.map((link, index) => (
          <li
            style={{
              width: "50%",
              height: "auto",
              color: "white",
              fontSize: 12,
              marginTop: 2.5,
              marginBottom: 2.5,
              display: active ? "none" : "list-item",
              listStyleType: "square",
            }}
            key={index}
            onClick={() => {
              navigate(`${label.toLowerCase()}/${link}`);
            }}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </li>
        ))}
    </Box>
  );
};

import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/user";
import { Profile } from "../profile/profile";

interface InputProps {
  mode: "read" | "edit";
  name: string;
  content: string | number;
}
export const InformationContainer = (props: InputProps) => {
  const [property, setProperty] = useState(props.content);
  const { user, updateUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user!.role === "admin") return;
    if (props.name.toLowerCase() === "support email") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          emails: { ...user!.profile.emails, supportEmail: e.target.value },
        },
      });
    }
    if (props.name.toLowerCase() === "dispute email") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          emails: { ...user!.profile.emails, disputeEmail: e.target.value },
        },
      });
    }
    if (props.name.toLowerCase() === "website") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          website: e.target.value,
        },
      });
    }
    if (props.name.toLowerCase() === "bank name") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          bank: e.target.value,
        },
      });
    }
    if (props.name.toLowerCase() === "account number") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          accountNumber: Number(e.target.value),
        },
      });
    }
    if (props.name.toLowerCase() === "address 1") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          address: {
            ...user!.profile.address,
            address1: e.target.value,
          },
        },
      });
    }
    if (props.name.toLowerCase() === "address 1") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          address: {
            ...user!.profile.address,
            address2: e.target.value,
          },
        },
      });
    }
    if (props.name.toLowerCase() === "mobile number") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          personalPhone: Number(e.target.value),
        },
      });
    }
    if (props.name.toLowerCase() === "alternate mobile number") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          altPersonalPhone: Number(e.target.value),
        },
      });
    }
    if (props.name.toLowerCase() === "dispute email") {
      updateUser(user!.email, {
        ...user!,
        profile: {
          ...user!.profile,
          emails: { ...user!.profile.emails, personalEmail: e.target.value },
        },
      });
    }
  };
  return (
    <Stack
      sx={{
        width: "auto",
        height: "auto",
        gap: 1.5,
        alignItems: "start",
      }}
    >
      <label
        htmlFor={props.name}
        style={{
          fontSize: 13,
        }}
      >
        {props.name}
      </label>
      <input
        value={property}
        type="text"
        readOnly={props.mode === "read"}
        disabled={props.mode === "read"}
        style={{
          width: "auto",
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: props.mode === "read" ? "#E0E0E0" : "white",
          border: "none",
          color: props.mode === "read" ? "#575555" : "black",
          fontFamily: "poppins",
          borderRadius: 5,
          cursor: props.mode === "read" ? "not-allowed" : "text",
          flexShrink: 0,
        }}
        onChange={(e) => {
          setProperty(e.target.value);
          handleChange(e);
        }}
      />
    </Stack>
  );
};

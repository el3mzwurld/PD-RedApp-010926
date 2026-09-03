import { Stack } from "@mui/material";

interface InputProps {
  mode: "read" | "edit";
  name: string;
  content: string;
}
export const InformationContainer = (props: InputProps) => {
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
        value={props.content}
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
      />
    </Stack>
  );
};

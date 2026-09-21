import React, { useState } from "react";
import type {
  Administrator,
  Customer,
  Dispute,
  Merchant,
  Transaction,
} from "../../lib/types";
import { Box, Button, Modal, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";
import { InformationContainer } from "./InformationContainer";

export const PopupModal = ({
  open,
  data,
  title,
  buttonTitle1,
  options,
  buttonTitle2,
  setOpen,
}: {
  open: boolean;
  data: Merchant | Customer | Transaction | Administrator | Dispute;
  buttonTitle1: string;
  title: string;
  options: number;
  buttonTitle2?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formattedData: { title: string; content: string }[] = Object.entries(
    data,
  ).map(([key, value]) => ({
    title: `${key.charAt(0) + key.slice(1)}`,
    content: JSON.stringify(value),
  }));

  return (
    <div style={{ background: "none" }}>
      <Modal
        open={open}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
        sx={{ background: "none" }}
      >
        <Box
          sx={{
            width: "75%",
            position: "absolute",
            height: "auto",
            minHeight: 350,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.5,
          }}
        >
          {/* header */}
          <div
            style={{
              width: "100%",
              height: 80,
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              padding: "0px 15px",
            }}
          >
            <h4>{title}</h4>

            <Close
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            />
          </div>
          {/* body */}
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "start",
              flexWrap: "wrap",
              gap: 5,
            }}
          >
            {formattedData.map((piece, index) => {
              const title = piece.title;
              const content = JSON.parse(piece.content);

              return (
                <InformationContainer
                  mode="read"
                  name={piece.title}
                  content={piece.content}
                  key={index}
                />
              );
            })}
          </Stack>
          {/* button group */}
          <Stack direction={"row"}>
            {options >= 1 ? (
              <Button
                variant="contained"
                sx={{ px: 2.5, py: 1.25, color: "white" }}
              >
                {buttonTitle1}
              </Button>
            ) : (
              <>
                {" "}
                <Button
                  variant="contained"
                  sx={{ px: 2.5, py: 1.25, color: "white" }}
                >
                  {buttonTitle1}
                </Button>
                <Button
                  variant="contained"
                  sx={{ px: 2.5, py: 1.25, color: "white" }}
                >
                  {buttonTitle2}
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

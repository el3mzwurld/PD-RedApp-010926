import { CheckCircle, QuestionMarkOutlined } from "@mui/icons-material";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";

type AcceptanceModalProps = {
  open: boolean;
  onClose: () => void;
  message?: string;
};

export const AcceptanceModal = ({
  open,
  onClose,
  message = "Accepted successfully",
}: AcceptanceModalProps) => {
  const [step, setStep] = useState<"confirmation" | "success">("confirmation");

  function handleConfirmation(action: "accept" | "reject") {
    if (action === "reject") {
      onClose();
      return;
    }

    setStep("success");
  }
  const handleConfirm = () => {
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="acceptance-modal-title"
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.48)" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(392px, calc(100% - 32px))",
          minHeight: 344,
          boxSizing: "border-box",
          px: 3,
          py: 6.5,
          borderRadius: 2.5,
          bgcolor: "common.white",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {step === "success" ? (
          <CheckCircle sx={{ color: "#4caf43", fontSize: 76 }} />
        ) : (
          <QuestionMarkOutlined sx={{ color: "primary.main", fontSize: 76 }} />
        )}
        <Typography
          id="acceptance-modal-title"
          sx={{ color: "#111", fontSize: 16, fontWeight: 700 }}
        >
          {step === "confirmation" ? "Confirm this action?" : message}
        </Typography>
        {step === "success" ? (
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              width: 180,
              height: 48,
              borderRadius: 24,
              bgcolor: "#f21620",
              color: "common.white",
              fontSize: 14,
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#d90f18",
                boxShadow: "none",
              },
            }}
          >
            OKAY
          </Button>
        ) : (
          <Stack direction={"row"} spacing={2.5} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              onClick={() => handleConfirmation("accept")}
              sx={{
                width: 180,
                height: 48,
                borderRadius: 24,
                bgcolor: "#f21620",
                color: "common.white",
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#d90f18",
                  boxShadow: "none",
                },
              }}
            >
              Yes
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleConfirmation("reject")}
              sx={{
                width: 180,
                height: 48,
                borderRadius: 24,
                bgcolor: "white",
                color: "red",
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "none",
                border: "1.8px solid red",
                "&:hover": {
                  bgcolor: "#ffffff67",
                  boxShadow: "none",
                },
              }}
            >
              No
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

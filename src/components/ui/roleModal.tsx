import { CheckCircle, Close, QuestionMarkOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { AdminRole } from "../../lib/types";
import { useUser } from "../../context/user";
import { useAdmin } from "../../hooks/useAdmin";

type AcceptanceModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (permission: AdminRole["permission"]) => void;
};

export const RoleModal = ({
  open,
  onClose,
  onSubmit,
}: AcceptanceModalProps) => {
  const { user } = useUser();
  const role = user!.role;

  const { permissions } = useAdmin(role);

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
          width: { xs: "80%", md: "60%" },
          minHeight: 350,
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
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            height: "auto",
          }}
        >
          <Close
            sx={{ fontSize: 20, color: "primary.main" }}
            onClick={onClose}
          />
        </div>
        <Stack sx={{ width: "100%", height: { xs: "auto" }, overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: "none", md: "block" } }}>
                  S/N
                </TableCell>
                <TableCell colSpan={2} scope="col">
                  Permission
                </TableCell>
                <TableCell
                  colSpan={3}
                  scope="col"
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  Description
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.length !== 0
                ? permissions.map((p, index) => (
                    <TableRow key={index}>
                      {" "}
                      <TableCell sx={{ display: { xs: "none", md: "block" } }}>
                        {index + 1}
                      </TableCell>
                      <TableCell colSpan={2} scope="col">
                        {p.permission}
                      </TableCell>
                      <TableCell
                        colSpan={3}
                        scope="col"
                        sx={{ display: { xs: "none", md: "block" } }}
                      >
                        {p.description}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          sx={{
                            width: "auto",
                            px: 2.5,
                            py: 0.5,
                            color: "primary.white",
                          }}
                          onClick={() => {
                            onSubmit(p);
                            onClose();
                          }}
                        >
                          SELECT
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Stack>
      </Box>
    </Modal>
  );
};

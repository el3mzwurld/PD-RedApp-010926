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
          width: "50%",
          minHeight: 350,
          //   boxSizing: "border-box",
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
        <section style={{ width: "100%", height: 300, overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell colSpan={2} scope="col">
                  Permission
                </TableCell>
                <TableCell colSpan={3} scope="col">
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
                      <TableCell>{index + 1}</TableCell>
                      <TableCell colSpan={2} scope="col">
                        {p.permission}
                      </TableCell>
                      <TableCell colSpan={3} scope="col">
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
        </section>
      </Box>
    </Modal>
  );
};

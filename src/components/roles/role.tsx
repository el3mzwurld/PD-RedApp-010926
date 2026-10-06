import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import { NavBar } from "../ui/navbar";
import { motion } from "motion/react";
import { Search } from "../ui/Search";
import { ArrowDownward } from "@mui/icons-material";
import { useState } from "react";
import type { AdminRole } from "../../lib/types";
import { useUser } from "../../context/user";
import { useAdmin } from "../../hooks/useAdmin";
import { RoleModal } from "../ui/roleModal";
import { formatDate } from "../../lib/utils";

export const Role = () => {
  const theme = useTheme();
  const { user } = useUser();
  const { createRole, roles } = useAdmin(user!.role);
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [permission, setPermission] = useState<AdminRole["permission"] | null>(
    null,
  );
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const onSubmit = (perm: AdminRole["permission"]) => {
    setPermission(perm);
  };

  const handleSubmit = () => {
    if (!permission) return;
    if (name.trim().length === 0) return;
    const perm: typeof permission = {
      ...permission,
      description: desc,
    };
    createRole(perm, name);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        px: { lg: 1 },
        paddingTop: 1.8,
        flex: 1,
        gap: 2.5,
      }}
    >
      <NavBar />
      <Box
        component={"main"}
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 0,
          gap: 2.5,
        }}
      >
        <motion.div
          style={{
            width: "100%",
            justifyContent: "start",
            alignItems: "center",
            padding: "5px 0px",
            gap: "12px",
            display: "flex",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeIn" }}
        >
          <p
            style={{
              cursor: "pointer",
              color: "red",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            Roles
          </p>
        </motion.div>
        <Box
          sx={{
            width: "100%",
            minHeight: "80vh",
            backgroundColor: "lightgray",
            borderRadius: { xs: 2, md: 3.5 },
            padding: { xs: 2, md: 4.5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 4, md: 5 },
            justifyContent: "start",
          }}
        >
          <Stack
            direction={"column"}
            spacing={3}
            sx={{
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
              backgroundColor: "none",
              padding: 1,
            }}
          >
            {/* role creation container */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "end",
                flexWrap: "wrap",
                justifyContent: "start",
                width: "100%",
                rowGap: { xs: 2.5, md: 3 },
              }}
            >
              {/* role name */}
              <Stack spacing={1} sx={{ width: { xs: "100%", md: "auto" } }}>
                <label style={{ fontSize: 14 }}>Role Name</label>
                <TextField
                  type="text"
                  placeholder="Enter role name"
                  variant="filled"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    width: { xs: "100%", md: 220 },
                    height: 48,
                    border: "none",
                    fontFamily: "poppins",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#f4f4f4",
                    },
                  }}
                ></TextField>
              </Stack>
              {/* role description */}
              <Stack spacing={1} sx={{ width: { xs: "100%", md: "auto" } }}>
                <label style={{ fontSize: 14 }}>Role Description</label>
                <TextField
                  type="text"
                  placeholder="Enter role description"
                  variant="filled"
                  sx={{
                    width: { xs: "100%", md: 600 },
                    height: 48,
                    // backgroundColor: "white",
                    border: "none",
                    fontFamily: "poppins",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#f4f4f4",
                    },
                  }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></TextField>
              </Stack>
              {/* select permission */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  height: 45,
                  fontSize: 14,
                  width: { xs: "100%", md: 300 },
                }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Select Permissions
              </Button>
            </Box>

            {/* action button */}

            <Button
              variant="contained"
              sx={{
                width: 150,
                height: 48,
                fontSize: 14,
                color: "white",
                borderRadius: 25,
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Stack>

          <motion.div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 15,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeIn" }}
          >
            {/* list container */}
            <div
              style={{
                width: "100%",
                height: "auto",
                paddingLeft: 22.5,
                paddingRight: 22.5,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: "white",
                borderRadius: 12,
              }}
            >
              {/* download button */}
              <div
                style={{
                  height: 40,
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <motion.button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: 130,
                    justifyContent: "center",
                    gap: 10,
                    height: "95%",
                    backgroundColor: theme.palette.primary.main,
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: 5,
                    fontWeight: 500,
                  }}
                >
                  <ArrowDownward sx={{ width: 20 }} />
                  Download
                </motion.button>
              </div>

              {/* container */}
              <TableContainer>
                <Table
                  sx={{
                    width: "100%",
                    height: "auto",
                    padding: { lg: 1.5, xl: 2.5 },
                    borderCollapse: "separate",
                    borderSpacing: "0px 10px",
                  }}
                  aria-description="customers-table"
                >
                  <TableHead>
                    <TableRow sx={{ border: "none" }}>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        S/N
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Date Created
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roles.length !== 0 &&
                      roles.map((r, index) => (
                        <TableRow
                          sx={{ backgroundColor: "#F4F4F4" }}
                          key={index}
                        >
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {r.permission.description}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {formatDate(r.createdAt)}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Button variant="text">VIEW</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </motion.div>
        </Box>

        <RoleModal open={open} onClose={onClose} onSubmit={onSubmit} />
      </Box>{" "}
    </Box>
  );
};

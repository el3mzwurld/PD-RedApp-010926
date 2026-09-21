import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { NavBar } from "../ui/navbar";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { InformationContainer } from "../ui/InformationContainer";
import { useUser } from "../../context/user";
import { Navigate } from "react-router-dom";

type Ward = {
  name: string;
  latitude: number;
  longitude: number;
};

type LGA = {
  name: string;
  wards: Ward[];
};

interface States {
  state: string;
  lgas: LGA[];
}

export const Profile = () => {
  const { user, updateUser } = useUser();

  // theme
  const theme = useTheme();
  // geo data states
  const [geoData, setGeoData] = useState<States[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // page state
  const [page, setPage] = useState<"profile" | "credentials">("profile");

  const handlePageChange = (route: typeof page) => {
    if (page === route.trim()) {
      return;
    }
    setPage(route);
  };

  useEffect(() => {
    if (user!.role === "merchant") {
      setSelectedState(user!.profile.state ?? "");
    }
  }, [user]);

  useEffect(() => {
    fetch("/nigeria-data/full.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON asset");
        return res.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => console.error(err));
  }, []);

  const matchToState = geoData.find(
    (item) => item.state.trim() === selectedState.trim(),
  );
  const availableLgas = matchToState ? matchToState.lgas : [];
  const matchToLga = availableLgas.find(
    (item) => item.name.trim() === selectedLga.trim(),
  );
  const availableCities = matchToLga ? matchToLga.wards : [];

  if (user!.role === "admin") {
    return <Navigate to={"/unauthorized"} replace />;
  }
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
            gap: "60px",
            display: "flex",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeIn" }}
        >
          <p
            style={{ cursor: "pointer", color: "red", fontWeight: 500 }}
            onClick={() => {
              handlePageChange("profile");
            }}
          >
            Merchant Profile
          </p>
          <p
            style={{ cursor: "pointer", color: "red", fontWeight: 500 }}
            onClick={() => {
              handlePageChange("credentials");
            }}
          >
            Merchant Credentials
          </p>
        </motion.div>

        <section
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "lightgray",
            borderRadius: 12,
            padding: "45px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 25,
          }}
        >
          {page === "profile" ? (
            <>
              {/* merchant ID */}
              <Stack
                sx={{
                  width: "auto",
                  height: "auto",
                  gap: 1.5,
                  alignItems: "start",
                }}
              >
                <label htmlFor="merchant-id" style={{ fontSize: 13 }}>
                  Merchant ID
                </label>
                <input
                  value={user!.profile.ID}
                  readOnly
                  style={{
                    width: 200,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    backgroundColor: "#E0E0E0",
                    border: "none",
                    color: "#A09D9D",
                    fontFamily: "poppins",
                    borderRadius: 5,
                    cursor: "not-allowed",
                  }}
                />
              </Stack>
              {/* company logo */}
              <Stack
                sx={{
                  width: "auto",
                  height: "auto",
                  gap: 2.5,
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  Company Logo
                </Typography>
                {/* profile img */}
                <div
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "#A09D9D",
                    borderRadius: "100%",
                  }}
                ></div>
              </Stack>
              {/* business information */}
              <Stack
                sx={{
                  height: "auto",
                  gap: 2.5,
                  alignItems: "start",
                  width: "100%",
                }}
              >
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  Business Information{" "}
                  {user!.isComplete === false && (
                    <span style={{ fontSize: 12 }}>
                      (Please complete your profile)
                    </span>
                  )}
                </Typography>

                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    flexWrap: "wrap",
                    flex: 1,
                    height: "auto",
                    rowGap: 4.5,
                    alignItems: "start",
                    justifyContent: "start",
                    columnGap: 2.5,
                    width: "100%",
                  }}
                >
                  <InformationContainer
                    mode="read"
                    name="Business Name"
                    content={user!.profile.businessName}
                  />
                  <InformationContainer
                    mode="read"
                    name="Business Number"
                    content={user!.profile.ID}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Support Email"
                    content={user!.profile.emails.supportEmail ?? ""}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Dispute Email"
                    content={user!.profile.emails.disputeEmail ?? ""}
                  />
                  <InformationContainer
                    mode="read"
                    name="Business Email"
                    content={user!.profile.emails.businessEmail}
                  />
                  <InformationContainer
                    mode="read"
                    name="Phone Number"
                    content={String(user!.profile.phone)}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Website"
                    content={user!.profile.website ?? ""}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Bank Name"
                    content={user!.profile.bank ?? ""}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Account Number"
                    content={String(user!.profile.accountNumber ?? "")}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Address 1"
                    content={user!.profile.address.address1 ?? ""}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Address 2"
                    content={user!.profile.address.address2 ?? ""}
                  />
                  <InformationContainer
                    mode="read"
                    name="Sector/Industry"
                    content={user!.profile.sector ?? ""}
                  />
                  {/* state */}
                  <Stack
                    sx={{
                      width: "auto",
                      height: "auto",
                      gap: 1.5,
                      alignItems: "start",
                    }}
                  >
                    <label htmlFor="state" style={{ fontSize: 13 }}>
                      State
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedLga("");
                        setSelectedCity("");
                        updateUser(user!.email, {
                          ...user!,
                          profile: { ...user!.profile, state: e.target.value },
                        });
                      }}
                      style={{
                        width: "auto",
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                        border: "none",
                        color: "black",
                        fontFamily: "poppins",
                        borderRadius: 5,
                        cursor: "pointer",
                        flexShrink: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                    >
                      {selectedState.trim().length === 0 && (
                        <option value="">Select an option</option>
                      )}
                      {geoData.map((item, index) => {
                        const name = item.state.trim();
                        return (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </Stack>
                  {/* city */}
                  <Stack
                    sx={{
                      width: "auto",
                      height: "auto",
                      gap: 1.5,
                      alignItems: "start",
                    }}
                  >
                    <label htmlFor="City" style={{ fontSize: 13 }}>
                      Cities
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        updateUser(user!.email, {
                          ...user!,
                          profile: { ...user!.profile, city: e.target.value },
                        });
                      }}
                      style={{
                        width: "auto",
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                        border: "none",
                        color: "black",
                        fontFamily: "poppins",
                        borderRadius: 5,
                        cursor: "pointer",
                        flexShrink: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      {selectedCity.trim().length === 0 && (
                        <option value="">Select an option</option>
                      )}
                      {availableCities.map((item, index) => {
                        const name = item.name.trim();
                        return (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </Stack>
                  {/* local government */}
                  <Stack
                    sx={{
                      width: "auto",
                      height: "auto",
                      gap: 1.5,
                      alignItems: "start",
                    }}
                  >
                    <label htmlFor="LGA" style={{ fontSize: 13 }}>
                      Local Government
                    </label>
                    <select
                      value={selectedLga}
                      onChange={(e) => {
                        setSelectedLga(e.target.value);
                        updateUser(user!.email, {
                          ...user!,
                          profile: { ...user!.profile, lga: e.target.value },
                        });
                      }}
                      style={{
                        width: "auto",
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                        border: "none",
                        color: "black",
                        fontFamily: "poppins",
                        borderRadius: 5,
                        cursor: "pointer",
                        flexShrink: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      {selectedLga.trim().length === 0 && (
                        <option value="">Select an option</option>
                      )}
                      {availableLgas.map((item, index) => {
                        const name = item.name.trim();
                        return (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </Stack>
                  <InformationContainer
                    mode="read"
                    name="Country"
                    content="Nigeria"
                  />
                </Stack>
              </Stack>
              {/* contact information */}
              <Stack
                sx={{
                  height: "auto",
                  gap: 2.5,
                  alignItems: "start",
                  width: "100%",
                }}
              >
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  Contact Information
                </Typography>
                {/* contact information */}
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    flexWrap: "wrap",
                    flex: 1,
                    height: "auto",
                    rowGap: 4.5,
                    alignItems: "start",
                    justifyContent: "start",
                    columnGap: 2.5,
                    width: "100%",
                  }}
                >
                  <InformationContainer
                    mode="read"
                    name="First Name"
                    content={user!.profile.fName}
                  />
                  <InformationContainer
                    mode="read"
                    name="Last Name"
                    content={user!.profile.lName}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Mobile Number"
                    content={String(user!.profile.personalPhone ?? "")}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Alternate Mobile Number"
                    content={String(user!.profile.altPersonalPhone ?? "")}
                  />
                  <InformationContainer
                    mode="edit"
                    name="Email Address"
                    content={user!.profile.emails.personalEmail ?? ""}
                  />
                </Stack>
              </Stack>
              {/* kyc */}
              <Stack
                sx={{
                  width: "100%",
                  height: "auto",
                  gap: 2.5,
                  alignItems: "start",
                }}
              >
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  KYC Upload
                </Typography>

                <Stack
                  sx={{
                    width: "85%",
                    height: "auto",
                    p: 5,
                    backgroundColor: "white",
                    boxShadow: "2.5px 2.5px 10px #888888",
                    gap: 1.5,
                  }}
                >
                  <div
                    style={{
                      height: 75,
                      width: "100%",
                      backgroundColor: theme.palette.background.paper,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      padding: "12.5px 7px",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        height: "100%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        padding: 15,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Company CAC Certificate
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    ></div>
                  </div>
                  {/* utility bill */}
                  <div
                    style={{
                      height: 90,
                      width: "100%",
                      backgroundColor: theme.palette.background.paper,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      padding: "12.5px 7px",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        height: "100%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        padding: 15,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Utility Bill{" "}
                        <span style={{ fontSize: 14, color: "lightgray" }}>
                          (Electricity/Water Bill)
                        </span>{" "}
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    ></div>
                  </div>
                  {/* ID */}
                  <div
                    style={{
                      height: 90,
                      width: "100%",
                      backgroundColor: theme.palette.background.paper,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      padding: "12.5px 7px",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        height: "100%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        padding: 15,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Means of Identification{" "}
                        <span style={{ fontSize: 14, color: "lightgray" }}>
                          (Driver’s License, International passport, Natonal
                          identity card or Permanent Voter’s card)
                        </span>
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    ></div>
                  </div>
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              {/* button group */}
              <Stack
                direction={"row"}
                sx={{
                  width: "50%",
                  height: 80,
                  py: 0.65,
                  alignItems: "end",
                  justifyContent: "space-evenly",
                }}
              >
                <InformationContainer
                  mode="read"
                  name="Test Key"
                  content={String(user!.profile.keys.test)}
                />

                <Button
                  variant="contained"
                  sx={{ height: 48, px: 5, borderRadius: 25 }}
                >
                  Test Transaction
                </Button>
              </Stack>

              <Stack
                direction={"row"}
                sx={{
                  width: "50%",
                  height: 80,
                  py: 0.65,
                  alignItems: "end",
                  justifyContent: "space-evenly",
                }}
              >
                <InformationContainer
                  mode="read"
                  name="Life Key"
                  content={String(user!.profile.keys.life)}
                />

                <Button
                  variant="contained"
                  sx={{ height: 48, px: 5, borderRadius: 25 }}
                >
                  Test Transaction
                </Button>
              </Stack>
            </>
          )}
        </section>
      </Box>
    </Box>
  );
};

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Merchant, Profile } from "../lib/types";
import { generateBusinessCode, getDate } from "../lib/utils";

interface UserContextType {
  users: Profile[];
  user: Profile | null;
  createUser: (
    businessName: string,
    businessEmail: string,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    password: string,
  ) => boolean;
  login: (
    businessEmail: string,
    password: string,
    role?: Profile["role"],
  ) => boolean;
  updateUser: (businessEmail: string, updatedUserObject: Profile) => void;
  logout: () => void;
  authError: string | null;
}

const UserContext = createContext<UserContextType | null>(null);

const storageKey_Users = "red:users";
const storageKey_CurrentSession = "red:session";

const demoAdministrator: Profile = {
  role: "admin",
  profile: {
    fName: "Toyin",
    lName: "Ojedeji",
    createdAt: "2026-01-01T00:00:00.000Z",
    role: {
      name: "Administrator",
      createdAt: "2026-01-01T00:00:00.000Z",
      permissions: [
        { permission: "manage_merchants", description: "Manage merchants" },
        { permission: "manage_roles", description: "Manage roles" },
      ],
    },
  },
  email: "t.ojedeji@redtech.com",
  password: "admin123",
  isComplete: true,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<Profile[]>(() => {
    const saved = localStorage.getItem(storageKey_Users);
    const savedUsers: Profile[] = saved ? JSON.parse(saved) : [];
    return savedUsers.some((savedUser) => savedUser.role === "admin")
      ? savedUsers
      : [...savedUsers, demoAdministrator];
  });

  const [user, setUser] = useState<Profile | null>(() => {
    const session = localStorage.getItem(storageKey_CurrentSession);
    return session ? JSON.parse(session) : null;
  });

  const [authError, setAuthError] = useState<string | null>(null);

  console.log(user);
  const createUser = (
    businessName: string,
    businessMail: string,
    firstName: string,
    lastName: string,
    phone: number,
    password: string,
  ): boolean => {
    setAuthError(null);
    const exists = users.find((m) => businessMail === m.email);
    if (exists) {
      setAuthError("An email address already exists for this user");
      return false;
    }

    const created = getDate();
    const userProfile: Merchant = {
      ID: generateBusinessCode(businessName),
      businessName,
      businessNumber: phone,
      emails: {
        businessEmail: businessMail,
        contactEmail: null,
        disputeEmail: null,
        personalEmail: null,
        supportEmail: null,
      },
      phone,
      fName: firstName,
      lName: lastName,
      isKYCComplete: false,
      isActive: false,
      createdAt: created,
      status: "New",
      keys: { test: 1111, life: 1111 },
      address: {
        address1: null,
        address2: null,
      },
      accountNumber: null,
      altPersonalPhone: null,
      bank: null,
      city: null,
      companyLogo: null,
      country: null,
      lga: null,
      personalPhone: null,
      sector: null,
      state: null,
      website: null,
    };

    const newUser: Profile = {
      profile: userProfile,
      email: businessMail,
      password,
      isComplete: false,
      role: "merchant",
    };

    setUsers((prevUsers) => {
      const updated = [...prevUsers, newUser];
      localStorage.setItem(storageKey_Users, JSON.stringify(updated));
      return updated;
    });

    return true;
  };

  const login = (
    email: string,
    password: string,
    role: Profile["role"] = "merchant",
  ): boolean => {
    setAuthError(null);
    const exists = users.find((u) => u.email === email && u.role === role);

    if (!exists || exists.password !== password) {
      setAuthError(
        "Invalid credentials, please ensure you provide correct credentials",
      );
      return false;
    }

    localStorage.setItem(storageKey_CurrentSession, JSON.stringify(exists));
    setUser(exists);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(storageKey_CurrentSession);
    setUser(null);
    setAuthError(null);
  };

  const updateUser = (mail: string, updatedProfile: Profile) => {
    if (!user) return;
    if (mail !== user.email) return;

    const update: Profile = {
      ...user,
      ...updatedProfile,
    };
    const updatedUsers = users.map((u) =>
      u.email === mail ? { ...u, ...updatedProfile } : u,
    );

    // persist to local storage
    localStorage.setItem(storageKey_Users, JSON.stringify(updatedUsers));
    localStorage.setItem(storageKey_CurrentSession, JSON.stringify(update));

    // set user and users
    setUser(update);
    setUsers(updatedUsers);

    console.log(update);
  };

  useEffect(() => {
    if (!authError) return;

    const clearError = setTimeout(() => {
      setAuthError(null);
    }, 3000);

    return () => {
      clearTimeout(clearError);
    };
  }, [authError]);

  return (
    <UserContext.Provider
      value={{ authError, createUser, login, logout, updateUser, user, users }}
    >
      {children}
    </UserContext.Provider>
  );
};

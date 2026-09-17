import { createContext, useContext, useState, type ReactNode } from "react";
import type { Merchant, Profile } from "../lib/types";
import { getDate } from "../lib/utils";

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
  ) => boolean; // Changed to boolean to let UI know it succeeded
  login: (businessEmail: string, password: string) => boolean;
  updateUser: (businessEmail: string, updatedUserObject: Profile) => void;
  logout: () => void;
  authError: string | null;
}

const UserContext = createContext<UserContextType | null>(null);

const storageKey_Users = "red:users";
const storageKey_CurrentSession = "red:session";

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
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<Profile | null>(() => {
    const session = localStorage.getItem(storageKey_CurrentSession);
    return session ? JSON.parse(session) : null;
  });

  const [authError, setAuthError] = useState<string | null>(null);

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
      ID: crypto.randomUUID(),
      businessName,
      businessNumber: phone,
      emails: { businessEmail: businessMail },
      phone,
      fName: firstName,
      lName: lastName,
      isKYCComplete: false,
      isActive: false,
      createdAt: created,
      status: "New",
      keys: { test: 1111, life: 1111 },
      address: {},
    };

    const newUser: Profile = {
      profile: userProfile,
      email: businessMail,
      password,
      isComplete: false,
      role: "merchant",
    };

    // Fix: Functional update to ensure fresh state access and synchronization
    setUsers((prevUsers) => {
      const updated = [...prevUsers, newUser];
      localStorage.setItem(storageKey_Users, JSON.stringify(updated));
      return updated;
    });

    return true;
  };

  const login = (email: string, password: string): boolean => {
    setAuthError(null);
    const exists = users.find((u) => u.email === email);

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
    // Fix: Correct mapping update logic without duplicate appending
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((u) =>
        u.email === mail ? { ...u, ...updatedProfile } : u,
      );
      localStorage.setItem(storageKey_Users, JSON.stringify(updatedUsers));

      // Fix: If updating the currently logged-in user, sync their active session too
      if (user?.email === mail) {
        const updatedSession =
          updatedUsers.find((u) => u.email === mail) || null;
        if (updatedSession) {
          localStorage.setItem(
            storageKey_CurrentSession,
            JSON.stringify(updatedSession),
          );
          setUser(updatedSession);
        }
      }

      return updatedUsers;
    });
  };

  return (
    <UserContext.Provider
      value={{ authError, createUser, login, logout, updateUser, user, users }}
    >
      {children}
    </UserContext.Provider>
  );
};

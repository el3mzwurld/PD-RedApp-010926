import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Home } from "../pages/home";
import { Dashboard } from "../components/dashboard/dashoard";
import { Profile } from "../components/profile/profile";
import { Customers } from "../components/customers/customers";
import { Disputes } from "../components/disputes/disputes";
import { Settlement } from "../components/settlement/settlement";
import { Transaction } from "../components/transaction/transaction";
import Users from "../components/users/Users";
import { PaymentLink } from "../components/link/PaymentLink";
import { Merchants } from "../components/merchants/merchants";
import { Role } from "../components/roles/role";
import { NotFound } from "../components/not-found/notfound";
import { Settings } from "./../components/settings/settings";
import { useUser } from "../context/user";
import type { Profile as ProfileType } from "../lib/types";
import { Login } from "../components/auth/login";
import { Signup } from "../components/auth/signup";
import { Unauthorized } from "../components/auth/unauthorized";
export const AppRouter = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* anyone logged in */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="settlement" element={<Settlement />} />
          <Route path="transaction" element={<Transaction />} />

          {/* merchant-only */}
          <Route element={<ProtectedRoute allowedRoles={["merchant"]} />}>
            <Route path="customers" element={<Customers />} />
            <Route path="users" element={<Users />} />
            <Route path="payment-link" element={<PaymentLink />} />
          </Route>

          {/* admin-only */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="merchant/:mode" element={<Merchants role="admin" />} />
            <Route path="role" element={<Role />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

interface ProtectedRouteProps {
  allowedRoles?: Array<ProfileType["role"]>;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/*SPA*/}
    </Routes>
  );
};

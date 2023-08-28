import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../Pages/DashBoardPage";
import AuthPage from "../Pages/AuthPage";
const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};

export default MyRoutes;

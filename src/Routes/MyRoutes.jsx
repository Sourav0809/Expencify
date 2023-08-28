import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";
const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default MyRoutes;

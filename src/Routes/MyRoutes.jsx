import { Route, Routes } from "react-router-dom";
import ExpencePage from "../Pages/ExpencePage";
import DashBoard from "../Components/DashBoard/UI/DashBoard";
import ProfileViewPage from "../Pages/ProfileViewPage";
import UserProfilePage from "../Pages/UserProfilePage";
import AuthPage from "../Pages/AuthPage";
import { useSelector } from "react-redux";

const MyRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.userProfile);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          {userInfo ? (
            <>
              <Route path="/" element={<ExpencePage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/profile" element={<ProfileViewPage />} />
              <Route path="*" element={<ExpencePage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<UserProfilePage />} />
              <Route path="*" element={<UserProfilePage />} />
            </>
          )}
        </>
      ) : (
        <>
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </>
      )}
    </Routes>
  );
};

export default MyRoutes;

import { Route, Routes } from "react-router-dom";
import UserProfilePage from "../Pages/UserProfilePage";
import AuthPage from "../Pages/AuthPage";
import { useContext } from "react";
import authContext from "../Context/AuthContext/authContext";
import userProfileCtx from "../Context/UserProfile/userProfileCtx";
import DashBoard from "../Components/DashBoard/UI/DashBoard";
import SideBar from "../Components/SideBar/SideBar";
import ProfileViewPage from "../Pages/ProfileViewPage";
import ExpencePage from "../Pages/ExpencePage";
const MyRoutes = () => {
  const { isUserLoggedIn } = useContext(authContext);
  const { userInfo } = useContext(userProfileCtx);
  return (
    <Routes>
      {isUserLoggedIn ? (
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
              <Route path="/userprofile" element={<UserProfilePage />} />
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

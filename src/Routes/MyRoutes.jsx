import { Route, Routes } from "react-router-dom";
import UserProfilePage from "../Pages/UserProfilePage";
import AuthPage from "../Pages/AuthPage";
import { useContext } from "react";
import authContext from "../Context/AuthContext/authContext";
import userProfileCtx from "../Context/UserProfile/userProfileCtx";
import DashBoard from "../Components/DashBoard/UI/DashBoard";
const MyRoutes = () => {
  const { isUserLoggedIn } = useContext(authContext);
  const { userInfo } = useContext(userProfileCtx);
  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          {userInfo ? (
            <>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="*" element={<DashBoard />} />
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

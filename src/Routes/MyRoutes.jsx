import { Route, Routes } from "react-router-dom";
import UserProfilePage from "../Pages/UserProfilePage";
import AuthPage from "../Pages/AuthPage";
import { useContext } from "react";
import authContext from "../Context/AuthContext/authContext";
const MyRoutes = () => {
  const { isUserLoggedIn } = useContext(authContext);

  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          <Route path="/userprofile" element={<UserProfilePage />} />
          <Route path="*" element={<UserProfilePage />} />
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

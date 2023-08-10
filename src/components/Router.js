import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userInfo, refreshUserData }) => {
  return (
    <div>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    userInfo={userInfo}
                    refreshUserData={refreshUserData}
                  />
                }
              />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;

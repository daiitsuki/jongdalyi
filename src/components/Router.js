import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import Chat from "../routes/Chat";
import CalendarPage from "../routes/Calendar";

const AppRouter = ({ isLoggedIn, userInfo, refreshUserData }) => {
  return (
    <div className="container">
      <Router>
        {isLoggedIn && <Navigation />}
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
              <Route path="/chat" element={<Chat />} />
              <Route
                path="/calendar"
                element={<CalendarPage userInfo={userInfo} />}
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

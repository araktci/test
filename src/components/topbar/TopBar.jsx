import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import "./TopBar.css";

export default function TopBar() {
  return (
    <>
      <div className="topBar">
        <div className="topBarWrapper">
          <div className="topBarLeft">
            <img src="image/user.jpeg" className="topAvatar" />
            <div className="topBarIconContainer">
              <NotificationsIcon />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topBarIconContainer">
              <LanguageIcon />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topBarIconContainer">
              <SettingsIcon />
            </div>
          </div>
          <div className="topBarRight">
            <div className="topBarLogo">پنل مدیریت</div>
          </div>
        </div>
      </div>
    </>
  );
}

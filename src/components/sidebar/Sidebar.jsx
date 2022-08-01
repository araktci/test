import React from "react";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">داشبورد</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem">
                  <LineStyleIcon className="sidebarIcon" />
                  خانه
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">تنظیمات</h3>
            <ul className="sidebarList">
              <Link to="/settings/cities" className="link">
                <li className="sidebarListItem">
                  <LineStyleIcon className="sidebarIcon" />
                  شهرها
                </li>
              </Link>
              <Link to="/settings/centers" className="link">
                <li className="sidebarListItem">
                  <LineStyleIcon className="sidebarIcon" />
                  مراکز
                </li>
              </Link>
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                انبار
              </li>
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                تجهیزات
              </li>
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                نوع مصرف
              </li>
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                سیم بان
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">کاربران</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                گروه های کاربری
              </li>
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                ثبت کاربر
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">حوالجات</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                ثبت حواله
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">اقلام</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                ثبت اقلام
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">انتقال</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                انتقال
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useSearchParams } from "react-router-dom";
import CollapsedTitle from "../../components/CollapsedTitle";
import "./style.css";

const navDataList = [
  {
    title: "总览",
    icon: "",
    path: "/",
  },
  {
    title: "测试套",
    icon: "",
    path: "/testSuite",
  },
  {
    title: "分类",
    icon: "",
    path: "/feature",
  },
];

SideNav.propTypes = {
  clickHandle: PropTypes.func,
};

/** 左侧导航栏 */
export default function SideNav() {
  const [fold, setFold] = useState(false);
  const [params] = useSearchParams();
  const testTaskId = params.get("testTaskId");

  return (
    <div className={fold ? "side-nav side-nav_collapsed" : "side-nav"}>
      <div className="side-head">
        <NavLink to={`/?testTaskId=${testTaskId}`}>
          <span>测试报告</span>
        </NavLink>
      </div>
      <div className="side-menu">
        <ul>
          {navDataList.map((linkData, index) => (
            <li key={index}>
              <NavLink to={`${linkData.path}?testTaskId=${testTaskId}`} className={({ isActive }) => (isActive ? "active" : "")}>
                <span className="side-item-icon">{linkData.icon}</span>
                <div className="side-item-title">{linkData.title}</div>
                <CollapsedTitle title={linkData.title} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="side-footer" onClick={() => setFold(!fold)}>
        <span className="side-footer-icon"></span>
        <span className="side-footer-title">折叠</span>
        <CollapsedTitle title="展开" />
      </div>
    </div>
  );
}

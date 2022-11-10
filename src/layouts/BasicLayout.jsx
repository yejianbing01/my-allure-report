import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSearchParams, Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { getTestResult } from "../redux/actions";
import "./BasicLayout.css";

BasicLayout.propTypes = {
  getTestResult: PropTypes.func,
};
/** 带导航布局 */
function BasicLayout({ getTestResult }) {
  const [params] = useSearchParams();

  useEffect(() => {
    const testTaskId = params.get("testTaskId");
    getTestResult({ testTaskId });
  }, []);

  return (
    <div className="basicLayout">
      <aside className="nav">
        <SideNav title="测试报告" />
      </aside>
      <article className="content">
        <Outlet />
      </article>
    </div>
  );
}

export default connect(null, { getTestResult })(BasicLayout);

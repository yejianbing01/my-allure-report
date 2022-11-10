import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSearchParams, Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { getTestResult } from "../redux/actions";
import "./BasicLayout.css";

BasicLayout.propTypes = {
  testJobName: PropTypes.string,
  getTestResult: PropTypes.func,
};
/** 带导航布局 */
function BasicLayout({ testJobName, getTestResult }) {
  const [params] = useSearchParams();

  useEffect(() => {
    const testTaskId = params.get("testTaskId");
    getTestResult({ testTaskId });
  }, []);

  return (
    <div className="basicLayout">
      <aside className="nav">
        <SideNav title={testJobName} />
      </aside>
      <article className="content">
        <Outlet />
      </article>
    </div>
  );
}

export default connect(
  ({ testTreeReducer: { summaryData } }) => ({
    testJobName: summaryData.testJobName,
  }),
  { getTestResult }
)(BasicLayout);

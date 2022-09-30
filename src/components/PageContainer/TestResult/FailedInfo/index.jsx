import React from "react";
import PropTypes from "prop-types";
import "./style.css";

FailedInfo.propTypes = {
  trace: PropTypes.string,
};

/** 断言失败信息 */
export default function FailedInfo({ trace }) {
  const dataList = trace.replace(/%n%t/g, "%n").split("%n");

  return (
    <div className="overview-failed_info">
      <div className="overview_failed_trace">
        {dataList.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
      {/* <pre className="overview_failed_trace">
        <code>{trace}</code>
      </pre> */}
    </div>
  );
}

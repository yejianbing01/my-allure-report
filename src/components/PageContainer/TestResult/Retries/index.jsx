import React from "react";
import PropTypes from "prop-types";
import "./style.css";

Retries.propTypes = {
  data: PropTypes.object,
};

// TODO 待实现
/** 重试 */
export default function Retries({ data }) {
  return <div className="retries">{data ? "" : <div className="no-data">暂无数据</div>}</div>;
}

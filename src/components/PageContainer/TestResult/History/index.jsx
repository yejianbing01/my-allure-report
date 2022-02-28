import React from "react";
import PropTypes from "prop-types";
import "./style.css";

History.propTypes = {
  data: PropTypes.object,
};

// TODO 待实现
/** 历史 */
export default function History({ data }) {
  return <div className="history">{data ? "" : <div className="no-data">暂无数据</div>}</div>;
}

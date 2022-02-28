import React from "react";
import PropTypes from "prop-types";
import { PASSED, FAILURE, SKIP } from "../../../config";
import "./style.css";

StatusLabel.propTypes = {
  status: PropTypes.string,
  title: PropTypes.any,
  addStatus: PropTypes.func,
  subStatus: PropTypes.func,
};

/**
 * 测试用例状态label标签
 * @param {Object} props
 * @return {Object}
 */
export default function StatusLabel(props) {
  const { status, title, addStatus, subStatus, selected } = props;

  const clickHandle = () => {
    if (addStatus) {
      selected ? subStatus(status) : addStatus(status);
    }
  };

  const statusMap = {
    [PASSED]: (
      <span
        className={`label label-status-passed 
        ${selected ? "passed-selected" : ""}`}
        onClick={clickHandle}
      >
        {title}
      </span>
    ),
    [FAILURE]: (
      <span className={`label label-status-failed ${selected ? "failed-selected" : ""}`} onClick={clickHandle}>
        {title}
      </span>
    ),
    [SKIP]: (
      <span className={`label label-status-skip ${selected ? "skip-selected" : ""}`} onClick={clickHandle}>
        {title}
      </span>
    ),
  };

  return statusMap[status] ? statusMap[status] : "";
}

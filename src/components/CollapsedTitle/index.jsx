import React from "react";
import PropTypes from "prop-types";
import "./style.css";

CollapsedTitle.propTypes = {
  title: PropTypes.string,
};

/** 悬浮提示信息 */
export default function CollapsedTitle({ title }) {
  return (
    <div className="collapsedTitle">
      <div className="triangle"></div>
      <div className="title">{title}</div>
    </div>
  );
}

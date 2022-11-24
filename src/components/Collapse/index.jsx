import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import StatusLabel from "../StatusLabel";
import { PASSED, FAILURE, SKIP } from "../../../config";
import { durationToString } from "../../utils/utils";
import "./style.css";
import CollapseItem from "./CollapseItem";

export { CollapseItem };

Collapse.propTypes = {
  title: PropTypes.string,
  passedNum: PropTypes.number,
  failedNum: PropTypes.number,
  skipNum: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.any,
};

/** 折叠面板 */
export default function Collapse(props) {
  const { title, passedNum, failedNum, skipNum, duration, children } = props;

  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback((e) => {
    const nextEle = e.currentTarget.nextElementSibling;
    if (!nextEle.style.display || nextEle.style.display === "none") {
      nextEle.style.display = "block";
      e.currentTarget.classList.add("collapse-expanded");
    } else {
      nextEle.style.display = "none";
      e.currentTarget.classList.remove("collapse-expanded");
    }
    setExpanded(!expanded);
  }, []);

  return (
    <div className="collapse">
      <div className="collapse-title" onClick={handleClick}>
        <div className="collapse-left">
          <span className="collapse-left-icon"></span>
          <span className="collapse-left-title">{title}</span>
        </div>
        <div className="collapse-right">
          {failedNum ? <StatusLabel status={FAILURE} title={failedNum} selected={true} /> : ""}
          {skipNum ? <StatusLabel status={SKIP} title={skipNum} selected={true} /> : ""}
          {passedNum ? <StatusLabel status={PASSED} title={passedNum} selected={true} /> : ""}
          {duration ? <span>{durationToString(duration)}</span> : ""}
        </div>
      </div>
      <div className="collapse-content">{expanded ? children : null}</div>
    </div>
  );
}

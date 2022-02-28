import React, { useCallback, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PASSED, FAILURE, SKIP } from "../../../../config";
import { selectTestCase } from "../../../redux/actions";
import { durationToString } from "../../../utils/utils";
import "./style.css";

CollapseItem.propTypes = {
  flag: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  duration: PropTypes.number,
  id: PropTypes.string,
  selectTestCase: PropTypes.func,
};

/** 测试用例 */
function CollapseItem(props) {
  const { id, flag: status, index: order, name: title, duration: time, selectTestCase } = props;
  const statusMapping = useMemo(() => ({
    [PASSED]: "collapse-item-icon_passed",
    [FAILURE]: "collapse-item-icon_failed",
    [SKIP]: "collapse-item-icon_skip",
  }));
  // TODO取消DOM操作
  const handleClick = useCallback((event) => {
    document.querySelector(".collapse-item-active")?.classList?.remove("collapse-item-active");
    event.currentTarget.classList.add("collapse-item-active");
  }, []);

  return (
    <div
      className="collapse-item"
      onClick={(event) => {
        selectTestCase({ id });
        handleClick(event);
      }}
    >
      <div className="collapse-item-left">
        <span className={`collapse-item-icon ${statusMapping[status]}`}></span>
        <span className="collapse-item-order">{`${order}.`}</span>
        <span className="collapse-item-title">{title}</span>
      </div>
      <div className="collapse-item-right">
        <span>{durationToString(time)}</span>
      </div>
    </div>
  );
}

export default connect(null, (dispatch) => bindActionCreators({ selectTestCase }, dispatch))(CollapseItem);

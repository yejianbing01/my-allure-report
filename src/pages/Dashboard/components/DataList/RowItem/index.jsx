import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

RowItem.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  data: PropTypes.shape({
    failed: PropTypes.number,
    passed: PropTypes.number,
    skip: PropTypes.number,
  }),
};
/** 数据项 */
export default function RowItem(props) {
  const { name, data, link } = props;

  return (
    <div className="row-item">
      <Link to={link}>
        <div className="row-item_name">
          <p>{name}</p>
        </div>
        <div className="row-item_status">
          <div className="case-num">
            {data.failed ? (
              <div className="failed" style={{ flexGrow: `${data.failed}` }}>
                {data.failed}
              </div>
            ) : (
              ""
            )}
            {data.passed ? (
              <div className="passed" style={{ flexGrow: `${data.passed}` }}>
                {data.passed}
              </div>
            ) : (
              ""
            )}
            {data.skip ? (
              <div className="skip" style={{ flexGrow: `${data.skip}` }}>
                {data.skip}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

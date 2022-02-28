import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

BoxFooter.propTypes = {
  hasRows: PropTypes.bool,
  title: PropTypes.string,
  link: PropTypes.string,
};
/** 数据项 */
export default function BoxFooter(props) {
  const { hasRows, title, link } = props;

  return <div className="box_footer">{hasRows ? <Link to={link}>显示所有</Link> : <p>{`没有${title}`}</p>}</div>;
}

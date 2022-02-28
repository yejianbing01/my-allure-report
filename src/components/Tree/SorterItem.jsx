import React, { useState } from "react";
import PropTypes from "prop-types";

SorterItem.propTypes = {
  name: PropTypes.string,
};

/**
 * 排序
 * @param {Object} props
 * @return {Object}
 */
export default function SorterItem(props) {
  const { name } = props;
  const [sort, setSort] = useState("");

  const onClick = (e) => {
    const parentNode = e.currentTarget.parentNode;
    [...parentNode.children].forEach((childrenNode) => (childrenNode.className = "sort-item"));

    if (sort !== "desc") {
      setSort("desc");
      e.currentTarget.classList.add("sort-desc");
    } else {
      setSort("asc");
      e.currentTarget.classList.add("sort-asc");
    }
  };

  return (
    <div className="sort-item" onClick={onClick}>
      <span className="sort-item_name">{name}</span>
      <span className="sort-item_icon">
        <span className="sort-icon_asc"></span>
        <span className="sort-icon_desc"></span>
      </span>
    </div>
  );
}

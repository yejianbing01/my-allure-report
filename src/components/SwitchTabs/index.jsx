import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

SwitchTabs.propTypes = {
  dataList: PropTypes.array,
};

/** tab切换 */
export default function SwitchTabs(props) {
  const { dataList } = props;
  const [curTab, setCurTab] = useState(0);

  const onClick = (e) => setCurTab(Number(e.currentTarget.dataset.index));

  return (
    <div className="switchTabs">
      <ul>
        {dataList.map((data, index) => (
          <li key={index} data-index={index} onClick={onClick} className={index === curTab ? "active" : ""}>
            {data.title}
          </li>
        ))}
      </ul>
      <div className="switchTabs-content">{dataList[curTab].content}</div>
    </div>
  );
}

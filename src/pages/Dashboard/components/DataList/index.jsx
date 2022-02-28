import React from "react";
import PropTypes from "prop-types";
import RowItem from "./RowItem";
import BoxFooter from "./BoxFooter";
import "./style.css";

DataList.propTypes = {
  title: PropTypes.string,
  dataList: PropTypes.array,
  link: PropTypes.string,
};
/** 数据集 */
export default function DataList(props) {
  const { title = "测试套", dataList = [], link } = props;

  return (
    <div className="data-box">
      <div className="data-box_title">
        <h2>{title}</h2>
        <span>{`总共${dataList.length}项`}</span>
      </div>
      <div className="data-box_table">
        {dataList.slice(0, 10).map((data, index) => (
          <RowItem key={index} link={link} {...data} />
        ))}
      </div>
      <div className="data-box_footer">
        <BoxFooter hasRows={dataList.length ? true : false} title={title} link={link} />
      </div>
    </div>
  );
}

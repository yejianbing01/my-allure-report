/* eslint-disable react/prop-types */
import React from "react";
import Collapse, { CollapseItem } from "../Collapse";
import StatusLabel from "../StatusLabel";
import SorterItem from "./SorterItem";
import { TEST_SUITE } from "../../../config";
import "./style.css";

const sortItemList = [];
// const sortItemList = [{ title: "order" }, { title: "名称" }, { title: "用时" }, { title: "状态" }];

/**
 * 用例结果树
 * @param {Object} props
 * @return {Object}
 */
export default function Tree(props) {
  const { totalNumList, dataList, addStatus, subStatus } = props;

  return (
    <div className="tree">
      <div className="tree-header">
        <div className="tree-header_sorter">
          {sortItemList.map((sortItem) => (
            <SorterItem key={sortItem.title} name={sortItem.title} />
          ))}
        </div>
        <div className="tree-header_filter">
          <span>通过用例状态过滤：</span>
          {totalNumList.map(({ status, value, selected }) => (
            <StatusLabel key={status} status={status} title={value} selected={selected} addStatus={addStatus} subStatus={subStatus} />
          ))}
        </div>
      </div>
      <div className="tree-content">
        {dataList.length ? (
          dataList.map((data, index) => {
            return CollapseRender({ index, ...data });
          })
        ) : (
          <div className="no-data">没有记录</div>
        )}
      </div>
    </div>
  );
}

/** 遍历数据，获取用例折叠树 */
function CollapseRender(props) {
  const { children, tests, hooks, title, index, type, testCaseSummary } = props;
  if (type === TEST_SUITE) {
    const getChildren = () => {
      const hookList = hooks?.map((hook, hookIndex) => <CollapseItem key={hookIndex} index={hookIndex} {...hook} />) || [];
      const testList = tests?.map((test, testIndex) => <CollapseItem key={testIndex} index={testIndex} {...test} />) || [];
      const childrenList = children?.map((data, childrenIndex) => CollapseRender({ index: `${index}${childrenIndex}`, ...data })) || [];
      return [...hookList, ...testList, ...childrenList];
    };
    return (
      <Collapse
        key={index}
        title={title}
        passedNum={testCaseSummary?.PASSED?.num}
        failedNum={testCaseSummary?.FAILURE?.num}
        skipNum={testCaseSummary?.SKIP?.num}
      >
        {getChildren()}
      </Collapse>
    );
  } else {
    return <CollapseItem key={index} {...props} />;
  }
}

import React, { useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Overview from "./Overview";
import StatusLabel from "../../StatusLabel";
import SwitchTabs from "../../SwitchTabs";
import History from "./History";
import Retries from "./Retries";
import EmptyView from "./EmptyView";
import { PASSED, FAILURE, SKIP } from "../../../../config/constants";
import { Skeleton } from "antd";
import "./style.css";

TestResult.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  duration: PropTypes.number,
  level: PropTypes.string,
  testStepList: PropTypes.array,
  testResult: PropTypes.object,
  isLoading: PropTypes.bool,
};
/** 用例详情信息 */
function TestResult({ id, status, title, duration, level, testStepList, testResult, isLoading }) {
  const statusMapping = useMemo(() => ({ [PASSED]: "成功", [FAILURE]: "失败", [SKIP]: "跳过" }));
  return isLoading ? (
    <Skeleton active style={{ padding: "15px 15px 10px" }} />
  ) : id ? (
    <div className="test-result">
      <div className="test-result_title">
        <StatusLabel status={status} title={statusMapping[status]} selected={true} />
        <h2>{title}</h2>
      </div>
      <SwitchTabs
        dataList={[
          {
            title: "总览",
            content: (
              <Overview
                {...{
                  status,
                  title,
                  duration,
                  level,
                  testStepList,
                  testResult,
                }}
              />
            ),
          },
          { title: "历史", content: <History /> },
          { title: "重试次数", content: <Retries /> },
        ]}
      />
    </div>
  ) : (
    <EmptyView />
  );
}

export default connect(({ testCaseReducer: { id, status, title, duration, level, testResult, testStepList }, loadingReducer: { isLoading } }) => ({
  id,
  status,
  title,
  duration,
  level,
  testResult,
  testStepList,
  isLoading,
}))(TestResult);

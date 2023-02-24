import React, { useEffect } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { findTestTaskList } from "../../redux/actions";
import Summary from "./components/Summary";
import HistoryTrend from "./components/HistoryTrend";
import DataList from "./components/DataList";
import { durationToString } from "../../utils/utils";
import "./style.css";

Dashboard.propTypes = {
  testJobId: PropTypes.string,
  testTaskId: PropTypes.string,
  summaryData: PropTypes.object,
  totalDataList: PropTypes.array,
  featuresDataList: PropTypes.array,
  failedDataList: PropTypes.array,
  historyXAxis: PropTypes.array,
  passNumList: PropTypes.array,
  failedNumList: PropTypes.array,
  skipNumList: PropTypes.array,
  findTestTaskList: PropTypes.func,
  addStatus: PropTypes.func,
  subStatus: PropTypes.func,
  didTestCase: PropTypes.func,
  statusList: PropTypes.array,
};
/** 看板页面 */
function Dashboard({
  testJobId,
  testTaskId,
  summaryData: { testJobName, serverURL, startTime, endTime, duration, totalTestCaseNum, totalNumList },
  totalDataList,
  featuresDataList,
  failedDataList,
  historyXAxis,
  passNumList,
  failedNumList,
  skipNumList,
  findTestTaskList,
}) {
  useEffect(() => {
    testJobId && findTestTaskList({ testJobId });
  }, [testJobId]);

  if (testJobName) {
    return (
      <div className="dashboard">
        <div className="content">
          <div className="widgets-grid">
            <div className="widgets-grid_col">
              <Summary
                subTitle={testJobName + (serverURL ? `(${serverURL})` : "")}
                time={endTime ? `${startTime} ~ ${endTime}(${durationToString(duration)})` : startTime}
                {...{ totalTestCaseNum, totalNumList }}
              />
              <DataList title={"测试套"} dataList={totalDataList} link={`/testSuite?testTaskId=${testTaskId}`} />
              <DataList title={"分类"} dataList={featuresDataList} link={`/feature?testTaskId=${testTaskId}`} />
            </div>
            <div className="widgets-grid_col">
              <HistoryTrend {...{ historyXAxis, passNumList, failedNumList, skipNumList }} />
              <DataList title={"错误类别"} dataList={failedDataList} link={`/feature?testTaskId=${testTaskId}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Spin style={{ margin: "50vh 40vw" }} tip="拼命加载中..." />;
}

export default connect(
  ({
    testTreeReducer: { testJobId, testTaskId, summaryData, totalDataList, featuresDataList, failedDataList },
    dashboardReducer: { historyXAxis, passNumList, failedNumList, skipNumList },
  }) => ({
    testJobId,
    testTaskId,
    summaryData,
    totalDataList,
    featuresDataList,
    failedDataList,
    historyXAxis,
    passNumList,
    failedNumList,
    skipNumList,
  }),
  { findTestTaskList }
)(Dashboard);

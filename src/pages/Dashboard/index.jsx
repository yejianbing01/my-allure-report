import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
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
};
/** 看板页面 */
function Dashboard({
  testJobId,
  testTaskId,
  summaryData: { env, startTime, endTime, duration, totalTestCaseNum, totalNumList },
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

  return (
    <div className="dashboard">
      <div className="content">
        <div className="widgets-grid">
          <div className="widgets-grid_col">
            <Summary
              title={env}
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
  (dispatch) => bindActionCreators({ findTestTaskList }, dispatch)
)(Dashboard);

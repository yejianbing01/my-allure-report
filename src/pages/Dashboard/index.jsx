import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { findTestTaskList } from "../../redux/actions";
import Summary from "./components/Summary";
import HistoryTrend from "./components/HistoryTrend";
import DataList from "./components/DataList";
import { durationToString } from "../../utils/utils";
import "./style.css";
import Tree from "../../components/Tree";
import { featuresAddStatus as addStatus, featuresSubStatus as subStatus, didTestCase } from "../../redux/actions";

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
  apiFoxResult: PropTypes.object,
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
  apiFoxResult: { apiFoxTotalTestCaseNum, apiFoxTotalNumList, apiFoxTestItemList },
  addStatus,
  subStatus,
  didTestCase,
  statusList,
}) {
  useEffect(() => {
    testJobId && findTestTaskList({ testJobId });
  }, [testJobId]);

  useEffect(() => {
    return () => didTestCase();
  }, []);

  return (
    <div className="dashboard">
      <div className="content">
        <div className="widgets-grid">
          {apiFoxTotalTestCaseNum ? (
            <>
              <div className="widgets-grid_col">
                <Summary
                  title={"基于模型测试"}
                  subTitle={testJobName ? `${testJobName}(${serverURL})` : ""}
                  time={endTime ? `${startTime} ~ ${endTime}(${durationToString(duration)})` : startTime}
                  {...{ totalTestCaseNum, totalNumList }}
                />
                <DataList title={"测试套"} dataList={totalDataList} link={`/testSuite?testTaskId=${testTaskId}`} />
                <DataList title={"分类"} dataList={featuresDataList} link={`/feature?testTaskId=${testTaskId}`} />
                <HistoryTrend {...{ historyXAxis, passNumList, failedNumList, skipNumList }} />
                <DataList title={"错误类别"} dataList={failedDataList} link={`/feature?testTaskId=${testTaskId}`} />
              </div>
              <div className="widgets-grid_col">
                <Summary
                  title={testJobName ? `接口冒烟测试` : ""}
                  time={endTime ? `${startTime} ~ ${endTime}(${durationToString(duration)})` : startTime}
                  {...{ totalTestCaseNum: apiFoxTotalTestCaseNum, totalNumList: apiFoxTotalNumList }}
                />
                <Tree {...{ dataList: apiFoxTestItemList, totalNumList: apiFoxTotalNumList, statusList, addStatus, subStatus }} />
              </div>
            </>
          ) : (
            <>
              <div className="widgets-grid_col">
                <Summary
                  title={"基于模型测试"}
                  subTitle={testJobName ? `${testJobName}(${serverURL})` : ""}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(
  ({
    testTreeReducer: { testJobId, testTaskId, summaryData, totalDataList, featuresDataList, failedDataList, apiFoxResult },
    dashboardReducer: { historyXAxis, passNumList, failedNumList, skipNumList },
    testStatusReducer: { statusList },
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
    apiFoxResult,
    statusList,
  }),
  { findTestTaskList, addStatus, subStatus, didTestCase }
)(Dashboard);

import _ from "lodash";
import { FIND_TEST_TREE_LIST, ADD_STATUS, SUB_STATUS, FEATURES_SUB_STATUS, FEATURES_ADD_STATUS } from "./constants";
import { PASSED, FAILURE, SKIP } from "../../../config";
import testResult, { getTestSuiteWithSummary, getSortTestItemList, getTestResultSummary, filterSelectedCase } from "./dataFactory/testResult";
import { findTestTreeList, getTestTaskDetail } from "../../services/service";

/** 初始状态 */
// const initState = {
//   // 基础数据
//   testJobId: null,
//   testTaskId: null,
//   // 看板-汇总数据
//   summaryData: {
//     testJobName: null,
//     startTime: null,
//     endTime: null,
//     duration: null,
//     totalTestCaseNum: 0,
//     totalNumList: [],
//   },
//   // 看板-测试套统计数据
//   totalDataList: [],
//   // 看板-分类统计数据
//   featuresDataList: [],
//   // 看板-错误分类数据
//   failedDataList: [],
//   // statistics: {
//   //   blocker: 0,
//   //   critical: 0,
//   //   normal: 0,
//   //   minor: 0,
//   //   trivial: 0,
//   // },
//   // 测试套页面数据
//   totalNumList: [],
//   dataList: [],
//   statusList: [PASSED, FAILURE, SKIP],
//   // 分类页面数据
//   sortTestItemList: [],
//   featuresStatusList: [PASSED, FAILURE, SKIP],
//   featuresTotalNumList: [],
//   // 原始数据
//   orgDataList: [],
//   orgSortTestItemList: [],
// };

/** 查询测试执行结果 */
export function getTestResult({ testTaskId }) {
  return async (dispatch) => {
    const [testTaskDetail = {}, suiteTreeList = []] = await Promise.all([
      getTestTaskDetail({ testTaskId }),
      findTestTreeList({ testTaskId }).then((dataList) => dataList.map((data) => data.suiteTree)),
    ]);
    const { testJobName, serverURLName, serverURL, startTime, endTime, duration, testJobId, statistics = {}, apiFoxResultList = [] } = testTaskDetail;

    testResult.create({ testTaskId, suiteTreeList });
    const testSuiteList = getTestSuiteWithSummary(_.cloneDeep(testResult.testSuiteList));
    const testResultSummary = getTestResultSummary(testSuiteList);
    const sortTestItemList = getSortTestItemList(testSuiteList);
    const { total: totalTestCaseNum, PASSED: passedTestCase, FAILURE: failedTestCase, SKIP: skipTestCase } = testResultSummary;
    const passPercent = getPercent(passedTestCase.num, totalTestCaseNum);
    const failedPercent = 100 - passPercent;
    const skipPercent = 100 - passPercent - failedPercent;
    const totalNumList = [
      {
        status: PASSED,
        value: passedTestCase.num,
        percent: `通过${passPercent}%`,
        selected: true,
      },
      {
        status: FAILURE,
        value: failedTestCase.num,
        percent: `失败${failedPercent}%`,
        selected: true,
      },
      {
        status: SKIP,
        value: skipTestCase.num,
        percent: `跳过${skipPercent}%`,
        selected: true,
      },
    ];
    const totalDataList = testSuiteList.map((ele) => {
      return {
        name: ele.title,
        data: {
          passed: ele.testCaseSummary.PASSED.num,
          failed: ele.testCaseSummary.FAILURE.num,
        },
      };
    });
    const featuresDataList = sortTestItemList.map((ele) => {
      let data = {};
      if (ele.testCaseSummary[PASSED]) {
        data = { passed: ele.testCaseSummary[PASSED].num };
      } else if (ele.testCaseSummary[FAILURE]) {
        data = { failed: ele.testCaseSummary[FAILURE].num };
      } else {
        data = { skip: ele.testCaseSummary[SKIP].num };
      }
      return {
        name: ele.title,
        data,
      };
    });
    const failedNameMapping = {
      blocker: "崩溃", // "崩溃",
      critical: "严重", // "严重",
      normal: "普通", // "普通"
      minor: "次要", // "次要",
      trivial: "轻微", // "轻微",
    };
    const failedDataList = Object.entries(statistics)
      .filter(([, value]) => value !== 0)
      .map(([key, value]) => ({
        name: failedNameMapping[key],
        data: { failed: value },
      }));

    // apiFox 数据处理
    const apiFoxResult = {
      apiFoxTotalTestCaseNum: 0,
      apiFoxTotalNumList: [],
      apiFoxTestItemList: [],
    };
    if (apiFoxResultList[0]) {
      try {
        const apiFoxResultOrg = JSON.parse(apiFoxResultList[0].replace(/'/g, '"'))?.result;
        if (apiFoxResultOrg) {
          const { total, pending, failed } = apiFoxResultOrg.stats.requests;
          const failedPercent = getPercent(failed, total);
          const skipPercent = getPercent(pending, total);
          const passPercent = 100 - failedPercent - skipPercent;

          apiFoxResult.apiFoxTotalTestCaseNum = total;
          apiFoxResult.apiFoxTotalNumList = [
            {
              status: PASSED,
              value: total - failed - pending,
              percent: `通过${passPercent}%`,
              selected: true,
            },
            {
              status: FAILURE,
              value: failed,
              percent: `失败${failedPercent}%`,
              selected: true,
            },
            {
              status: SKIP,
              value: pending,
              percent: `跳过${skipPercent}%`,
              selected: true,
            },
          ];

          const testItemList = apiFoxResultOrg.failures.map((ele) => ({ name: ele.test, flag: FAILURE, message: ele.message }));
          apiFoxResult.apiFoxTestItemList = testItemList;
        }
      } catch (error) {
        console.log(error);
      }
    }

    dispatch({
      type: FIND_TEST_TREE_LIST,
      payload: {
        // 基础数据
        testJobId,
        testTaskId,
        // 汇总数据
        summaryData: {
          testJobName,
          serverURLName,
          serverURL,
          startTime,
          endTime,
          duration,
          totalTestCaseNum,
          totalNumList,
        },
        // 看板-测试套统计数据
        totalDataList,
        // 看板-分类统计数据
        featuresDataList,
        // 看板-错误分类数据
        failedDataList,
        // 测试套页面数据
        totalNumList,
        dataList: testSuiteList,
        // 分类页面数据
        sortTestItemList,
        featuresTotalNumList: _.cloneDeep(totalNumList),
        // 原始数据
        orgDataList: testResult.testSuiteList,
        orgSortTestItemList: sortTestItemList,
        // apiFox测试结果
        apiFoxResult,
      },
    });
  };
}

/** 增加用例状态 */
export function addStatus(status) {
  return {
    type: ADD_STATUS,
    payload: { status },
  };
}

/** 减少用例状态 */
export function subStatus(status) {
  return {
    type: SUB_STATUS,
    payload: { status },
  };
}

/** features增加用例状态 */
export function featuresAddStatus(status) {
  return {
    type: FEATURES_ADD_STATUS,
    payload: { status },
  };
}

/** 减少用例状态 */
export function featuresSubStatus(status) {
  return {
    type: FEATURES_SUB_STATUS,
    payload: { status },
  };
}

// ---------- handle ----------
function getPercent(num, total) {
  if (num == 0 || total == 0) {
    return 0;
  } else {
    const percent = (num / total) * 100;
    if (percent < 1) {
      return 1;
    } else {
      return Math.floor(percent);
    }
  }
}

function handleAddStatus({ orgDataList, statusList, status, totalNumList }) {
  const newStatusList = [status].concat(statusList);
  const testSuiteList = filterSelectedCase({
    testSuiteList: _.cloneDeep(orgDataList),
    statusList: newStatusList,
  });
  const newTestSuiteList = getTestSuiteWithSummary(testSuiteList);

  const newTotalNumList = totalNumList.map((total) => {
    total.status === status && (total.selected = true);
    return total;
  });

  return {
    statusList: newStatusList,
    dataList: newTestSuiteList,
    totalNumList: newTotalNumList,
  };
}

function handleSubStatus({ orgDataList, statusList, status, totalNumList }) {
  const newStatusList = [...statusList];
  const index = newStatusList.findIndex((ele) => ele === status);
  index >= 0 && newStatusList.splice(index, 1);

  const testSuiteList = filterSelectedCase({
    testSuiteList: _.cloneDeep(orgDataList),
    statusList: newStatusList,
  });
  const newTestSuiteList = getTestSuiteWithSummary(testSuiteList);

  const newTotalNumList = totalNumList.map((total) => {
    total.status === status && (total.selected = false);
    return total;
  });

  return {
    statusList: newStatusList,
    dataList: newTestSuiteList,
    totalNumList: newTotalNumList,
  };
}

function handleFeaturesAddStatus({ orgSortTestItemList, statusList, status, featuresTotalNumList }) {
  const newStatusList = [status].concat(statusList);
  const sortTestItemList = filterSelectedCase({
    testSuiteList: _.cloneDeep(orgSortTestItemList),
    statusList: newStatusList,
  });

  const newFeaturesTotalNumList = featuresTotalNumList.map((total) => {
    total.status === status && (total.selected = true);
    return total;
  });

  return {
    featuresStatusList: newStatusList,
    sortTestItemList,
    featuresTotalNumList: newFeaturesTotalNumList,
  };
}

function handleFeaturesSubStatus({ orgSortTestItemList, statusList, status, featuresTotalNumList }) {
  const newStatusList = [...statusList];
  const index = newStatusList.findIndex((ele) => ele === status);
  index >= 0 && newStatusList.splice(index, 1);

  const sortTestItemList = filterSelectedCase({
    testSuiteList: _.cloneDeep(orgSortTestItemList),
    statusList: newStatusList,
  });

  const newFeaturesTotalNumList = featuresTotalNumList.map((total) => {
    total.status === status && (total.selected = false);
    return total;
  });

  return {
    featuresStatusList: newStatusList,
    sortTestItemList,
    featuresTotalNumList: newFeaturesTotalNumList,
  };
}

/** reducer */
export function reducer(
  state = {
    // 基础数据
    testJobId: null,
    testTaskId: null,
    // 看板-汇总数据
    summaryData: {
      testJobName: null,
      serverURLName: null,
      serverURL: null,
      startTime: null,
      endTime: null,
      duration: null,
      totalTestCaseNum: 0,
      totalNumList: [],
    },
    // 看板-测试套统计数据
    totalDataList: [],
    // 看板-分类统计数据
    featuresDataList: [],
    // 看板-错误分类数据
    failedDataList: [],
    // statistics: {
    //   blocker: 0,
    //   critical: 0,
    //   normal: 0,
    //   minor: 0,
    //   trivial: 0,
    // },
    // 测试套页面数据
    totalNumList: [],
    dataList: [],
    statusList: [PASSED, FAILURE, SKIP],
    // 分类页面数据
    sortTestItemList: [],
    featuresStatusList: [PASSED, FAILURE, SKIP],
    featuresTotalNumList: [],
    // 原始数据
    orgDataList: [],
    orgSortTestItemList: [],
    // apiFox测试结果
    apiFoxResult: {},
  },
  action
) {
  switch (action.type) {
    case FIND_TEST_TREE_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_STATUS:
      return {
        ...state,
        ...handleAddStatus({
          orgDataList: state.orgDataList,
          statusList: state.statusList,
          totalNumList: state.totalNumList,
          ...action.payload,
        }),
      };
    case SUB_STATUS:
      return {
        ...state,
        ...handleSubStatus({
          orgDataList: state.orgDataList,
          statusList: state.statusList,
          totalNumList: state.totalNumList,
          ...action.payload,
        }),
      };
    case FEATURES_ADD_STATUS:
      return {
        ...state,
        ...handleFeaturesAddStatus({
          orgSortTestItemList: state.orgSortTestItemList,
          statusList: state.featuresStatusList,
          featuresTotalNumList: state.featuresTotalNumList,
          ...action.payload,
        }),
      };
    case FEATURES_SUB_STATUS:
      return {
        ...state,
        ...handleFeaturesSubStatus({
          orgSortTestItemList: state.orgSortTestItemList,
          statusList: state.featuresStatusList,
          featuresTotalNumList: state.featuresTotalNumList,
          ...action.payload,
        }),
      };
    default:
      return state;
  }
}

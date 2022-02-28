import { findTestTaskList as asyncFindTestTaskList } from "../../services/service";
import { FIND_TEST_TASK_LIST } from "./constants";

// 看板初始状态
const initState = {
  // x坐标轴字段
  historyXAxis: [],
  // 通过数量
  passNumList: [],
  // 失败数量
  failedNumList: [],
  // 跳过数量
  skipNumList: [],
};

/**
 * 查询测试任务执行历史记录
 * @param {Object} params
 * @param {String} params.testJobId 测试任务id
 */
export function findTestTaskList({ testJobId }) {
  return (dispatch) => {
    asyncFindTestTaskList({ testJobId }).then((dataList) => {
      const historyXAxis = [],
        passNumList = [],
        failedNumList = [],
        skipNumList = [];
      dataList?.forEach((data) => {
        historyXAxis.push(data.execNo);
        passNumList.push(data.statistics?.passes);
        skipNumList.push(data.statistics?.pending);
        failedNumList.push(data.statistics?.blocker + data.statistics?.critical + data.statistics?.normal + data.statistics?.minor + data.statistics?.trivial);
      });
      dispatch({
        type: FIND_TEST_TASK_LIST,
        payload: {
          historyXAxis: historyXAxis.reverse(),
          passNumList: passNumList.reverse(),
          failedNumList: failedNumList.reverse(),
          skipNumList: skipNumList.reverse(),
        },
      });
    });
  };
}

/** reducer */
export function reducer(state = initState, action) {
  switch (action.type) {
    case FIND_TEST_TASK_LIST:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

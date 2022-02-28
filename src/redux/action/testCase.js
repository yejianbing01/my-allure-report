import { SELECT_TEST_CASE, DID_TEST_CASE_DETAIL } from "./constants";
import { getTestItemDetail } from "../../services/service";

/** 初始状态 */
const initState = {
  id: null,
  status: null,
  title: null,
  duration: null,
  level: null,
  testResult: {},
  testStepList: [],
};

/** 选择用例查看详情 */
export function selectTestCase({ id }) {
  return async (dispatch) => {
    const detail = await getTestItemDetail({ id }).then((res) => {
      const { flag: status, name: title, duration, level, testStepList, testResult } = res?.getTestItemDetail?.data || {};
      return { id, status, title, duration, level, testStepList, testResult };
    });

    dispatch({
      type: SELECT_TEST_CASE,
      payload: detail,
    });
  };
}

export function didTestCase() {
  return {
    type: DID_TEST_CASE_DETAIL,
  };
}

/** reducer */
export function reducer(state = initState, action) {
  switch (action.type) {
    case SELECT_TEST_CASE:
      return { ...state, ...action.payload };
    case DID_TEST_CASE_DETAIL:
      return { ...initState };
    default:
      return state;
  }
}

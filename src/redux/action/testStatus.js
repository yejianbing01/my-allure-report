import { ADD_STATUS, SUB_STATUS } from "./constants";
import { PASSED, FAILURE, SKIP } from "../../../config";
import _ from "lodash";

/** 初始数据 */
const initState = {
  statusList: [PASSED, FAILURE, SKIP],
};

/**
 * 减少用例状态
 * @param {String} status
 */
const handleSubStatus = (state, action) => {
  const { payload } = action;
  const _state = _.cloneDeep(state);
  const index = _state.statusList.findIndex((ele) => ele === payload.status);
  index >= 0 && _state.statusList.splice(index, 1);
  return _state;
};

/**
 * 增加用例状态
 * @param {String} status
 */
const handleAddStatus = (state, action) => {
  const { payload } = action;
  const _state = _.cloneDeep(state);
  _state.statusList.push(payload.status);
  return _state;
};

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

/** reducer */
export function reducer(state = initState, action) {
  switch (action.type) {
    case ADD_STATUS:
      return handleAddStatus(state, action);
    case SUB_STATUS:
      return handleSubStatus(state, action);
    default:
      return state;
  }
}

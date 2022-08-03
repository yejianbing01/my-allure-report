import { OPEN_LOADING, CLOSE_LOADING } from "./constants";

/** 初始状态 */
const initState = {
  isLoading: false,
};

/** 开始loading */
export function openLoading() {
  return { type: OPEN_LOADING };
}

/** 结束loading */
export function closeLoading() {
  return { type: CLOSE_LOADING };
}

/** reducer */
export function reducer(state = initState, action) {
  switch (action.type) {
    case OPEN_LOADING:
      return { ...state, isLoading: true };
    case CLOSE_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
